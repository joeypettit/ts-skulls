import React, { useContext, useState, useEffect } from "react";
import { PropsWithChildren } from "react";
import { useSocket } from "./SocketProvider";
import { Game, Player } from "common-models";

interface Props {
  userId: string;
  userName: string;
}

interface GameProviderValue {
  game: Game | null;
  user: Player | undefined;
  actions: {
    createGame: () => void;
    enterExistingGame: (gameId: string) => void;
    toggleReorder: () => void;
    startGame: () => void;
  };
}

// create socket context
const GameContext = React.createContext<GameProviderValue | null>(null);

// export socket context, this will be imported into children components of provider
// that use the socket
export function useGameContext() {
  const gameContext = useContext(GameContext);
  if (!gameContext) {
    throw new Error("No Game Context Provided");
  }
  return gameContext;
}

// socket provider will wrap other components in App
export function GameProvider({
  userId,
  userName,
  children,
}: PropsWithChildren<Props>) {
  const socket = useSocket().socket;

  // ~~~~~~~~~~~~~ game Logic ~~~~~~~~~~~~~~~~
  const [game, setGame] = useState<Game | null>(null);
  // player object of this user
  const [user, setUser] = useState<Player | undefined>(undefined);

  // set up listeners for game updates
  useEffect(() => {
    // if there is no socket, do nothing
    if (socket === null) return;
    // create 'update game' socket event listener
    // when update recieved, update local game
    socket.on("updateGame", (incomingGame: Game) => {
      console.log("game", incomingGame);

      const updatedGame = new Game(
        incomingGame.id,
        incomingGame.inProgress,
        incomingGame.gamePhase,
        incomingGame.currentRound,
        incomingGame.firstToPlayId,
        incomingGame.playerOrder,
        incomingGame.players,
        incomingGame.currentBet,
        incomingGame.currentPlayerId
      );
      console.log("updated,", updatedGame);
      if (updatedGame) {
        console.log(updatedGame.id, "update");

        // setGame(updatedGame);
        // setUser(updatedGame.getPlayerById(userId));
        // console.log("updateGame", updatedGame);
      } else {
        throw "no updated game";
      }
    });

    // clean up: remove event listener when client navigates away from page
    return () => {
      socket.off("updateGame");
    };
  }, [socket, userId]);

  // ~~~~~ Game actions (outgoing) ~~~~~~
  function createGame(): void {
    if (userName) {
      socket?.emit("createGame", userName);
    } else {
      alert("Please enter your name!");
    }
  }

  function enterExistingGame(gameId: string): void {
    if (userName && socket) {
      socket.emit("enterExistingGame", userName, gameId);
    } else {
      alert("Please enter your name!");
    }
  }

  function toggleReorder(): void {
    const gameId = game?.id;
    if (gameId && socket) {
      socket.emit("toggleReorder", gameId);
    } else {
      alert("Game Not Found");
    }
  }

  function startGame(): void {
    if (game && socket) {
      socket.emit("startGame", game.id);
    } else {
      alert("Game Not Found");
    }
  }

  // ~~~~~~ PROVIDER VALUE ~~~~~~~
  const value: GameProviderValue = {
    user,
    game,
    actions: {
      createGame,
      enterExistingGame,
      toggleReorder,
      startGame,
    },
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

import React, { useContext, useState, useEffect } from "react";
import { PropsWithChildren } from "react";
import { useSocket } from "./SocketProvider";
import type Game from "../modelsClient/Game";
import type Player from "../modelsClient/Player";

interface Props {
  userId: string;
  userName: string;
}

export interface ProviderValue {
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
const GameContext = React.createContext<ProviderValue | null>(null);

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
    socket.on("updateGame", (updateGame: Game) => {
      setGame(updateGame);
      setUser(updateGame?.getPlayerById(userId));
      console.log("updateGame", updateGame);
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
  const value: ProviderValue = {
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

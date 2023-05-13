import React, { useContext, useState, useEffect } from "react";
import { PropsWithChildren } from "react";
import { useSocket } from "./SocketProvider";
import type Game from "../../models/Game";
import type Player from "../../models/Player";

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
    socket.on("updateGame", (updatedGame: Game) => {
      setGame(updatedGame);
      setUser(updatedGame?.getPlayerById(userId));
      console.log("updatedGame", updatedGame);
    });

    // clean up: remove event listener when client navigates away from page
    return () => {
      socket.off("updateGame");
    };
  }, [socket]);

  // ~~~~~ Game actions (outgoing) ~~~~~~
  function createGame(): void {
    if (userName) {
      socket?.emit("createGame", userName);
    } else {
      alert("Please enter your name!");
    }
  }

  function enterExistingGame(gameId: string): void {
    if (userName) {
      socket?.emit("enterExistingGame", userName, gameId);
    } else {
      alert("Please enter your name!");
    }
  }

  function toggleReorder(): void {
    const gameId = game?.gameId;
    if (gameId) {
      socket?.emit("toggleReorder", gameId);
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
    },
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

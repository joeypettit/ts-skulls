import React, { useContext, useState, useEffect } from "react";
import { PropsWithChildren } from "react";
import { useSocket } from "./SocketProvider";
import type Game from "../../models/Game";

interface Props {
  userId: string;
  userName: string;
}

export interface ProviderValue {
  game: Game | null;
  userId: string;
  actions: {
    createGame: () => void;
    enterExistingGame: () => void;
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
  // game in local
  const [game, setGame] = useState<Game | null>(null);

  // set up listeners for game updates
  useEffect(() => {
    // if there is no socket, do nothing
    if (socket === null) return;
    // create 'update game' socket event listener
    // when update recieved, update local game
    socket.on("updateGame", (updatedGame: Game) => {
      setGame(updatedGame);
      console.log("updatedGame", updatedGame);
    });

    // clean up: remove event listener when client navigates away from page
    return () => {
      socket.off("updateGame");
    };
  }, [socket]);

  // ~~~~~ Game actions (outgoing) ~~~~~~
  function createGame() {
    if (userName) {
      socket?.emit("createGame", userName);
    } else {
      alert("Please enter your name!");
    }
  }

  function enterExistingGame() {
    if (userName) {
      socket?.emit("enterExistingGame", userName);
    } else {
      alert("Please enter your name!");
    }
  }

  // ~~~~~~ PROVIDER VALUE ~~~~~~~
  const value: ProviderValue = {
    userId,
    game,
    actions: {
      createGame,
      enterExistingGame,
    },
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
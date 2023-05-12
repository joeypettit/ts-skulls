import React, { useContext, useState, useEffect } from "react";
import { PropsWithChildren } from "react";
import type { GameState } from "../../models";
import { useSocket } from "./SocketProvider";

interface Props {
  userId: string;
  userName: string;
}

export interface ProviderValue {
  gameState: GameState | null;
  userId: string;
  createNewGame: () => void;
  enterExistingGame: () => void;
}

// create socket context
const GameStateContext = React.createContext<ProviderValue | null>(null);

// export socket context, this will be imported into children components of provider
// that use the socket
export function useGameState() {
  const gameStateContext = useContext(GameStateContext);
  if (!gameStateContext) {
    throw new Error("No GameState Context Provided");
  }
  return gameStateContext;
}

// socket provider will wrap other components in App
export function GameStateProvider({
  userId,
  userName,
  children,
}: PropsWithChildren<Props>) {
  const socket = useSocket().socket;

  // ~~~~~~~~~~~~~ gameState Logic ~~~~~~~~~~~~~~~~
  // gameState in local state
  const [gameState, setGameState] = useState<GameState | null>(null);

  // set up listeners for gamestate updates
  useEffect(() => {
    // if there is no socket, do nothing
    if (socket === null) return;
    // create 'update gamestate' socket event listener
    // when update recieved, update local gameState
    socket.on("updateGameState", (updatedGameState: GameState) => {
      setGameState(updatedGameState);
      console.log("updatedGameState", updatedGameState);
    });

    // clean up: remove event listener when client navigates away from page
    return () => {
      socket.off("updateGameState");
    };
  }, [socket]);

  // ~~~~~ GameState actions (outgoing) ~~~~~~
  function createNewGame() {
    if (userName) {
      socket?.emit("createGameState", userName);
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
    gameState,
    createNewGame,
    enterExistingGame,
  };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
}

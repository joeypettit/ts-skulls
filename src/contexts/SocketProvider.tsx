import React, { useContext, useState, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { PropsWithChildren } from "react";
import generateId from "../util/generateId";
import type { GameState } from "../models";

interface Props {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  gameId: string;
  setGameId: React.Dispatch<React.SetStateAction<string>>;
}

//~~~ Socket.io EVENT types
interface ServerToClientEvents {
  updateGameState: (newGameState: GameState) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

interface ProviderValue {
  socket: SocketType | null;
  gameState: GameState | null;
  userId: string;
}

// create socket context
const SocketContext = React.createContext<SocketType | null>(null);

// export socket context, this will be imported into children components of provider
// that use the socket
export function useSocket() {
  return useContext(SocketContext);
}

// socket provider will wrap other components in App
export function SocketProvider({
  userId,
  setUserId,
  gameId,
  setGameId,
  children,
}: PropsWithChildren<Props>) {
  // ~~~~~~~~~~~~ Socket Logic ~~~~~~~~~~~~
  const [socket, setSocket] = useState<SocketType | null>(null);

  // create new socket on initial render, and if the user's id ever changes
  // this is put into a useEffect to avoid reconnecting every re-render
  useEffect(() => {
    let userIdForSocket: string;

    if (!userId) {
      userIdForSocket = generateId();
      setUserId(userIdForSocket);
    } else {
      userIdForSocket = userId;
    }

    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      window.location.origin,
      {
        query: { userId: userIdForSocket },
      }
    );

    setSocket(newSocket);

    // clean up function in return will close socket connection when
    // user navigates away from page
    return () => {
      newSocket.close();
    };
  }, [userId, setSocket, setUserId]);

  // ~~~~~~~~~~~~~ gameState Logic ~~~~~~~~~~~~~~~~
  // update gameState in state
  const [gameState, setGameState] = useState<GameState | null>(null);

  const updateGameState = useCallback(
    (newGameState: GameState) => {
      if (newGameState.gameId !== gameId) {
        setGameId(newGameState.gameId);
      }
      setGameState(newGameState);
    },
    [setGameId, setGameState, gameId]
  );

  // set up listeners for gamestate updates
  useEffect(() => {
    // if we do not have a socket, do nothing
    if (socket == null) return;
    // create 'update gamestate' socket event listener
    // when update recieved, pass arguments to updateGameState
    socket.on("updateGameState", (newGameState: GameState) =>
      updateGameState(newGameState)
    );

    // clean up: remove event listener when client navigates away from page
    return () => {
      socket.off("updateGameState");
    };
  }, [socket, updateGameState]);

  // ~~~~~~ PROVIDER VALUE ~~~~~~~
  const value: ProviderValue = {
    gameState,
    userId,
    socket,
  };

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

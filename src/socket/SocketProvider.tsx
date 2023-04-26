import React, { useContext, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { PropsWithChildren } from "react";
import generateId from "../util/generateId";
import type { GameState } from "../../models";

interface Props {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

//~~~ Socket.io EVENT types
interface ServerToClientEvents {
  updateGameState: (updatedGameState: GameState) => void;
}

interface ClientToServerEvents {
  createGameState: (userName: string) => void;
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
  children,
}: PropsWithChildren<Props>) {
  // ~~~~~~~~~~~~ Socket Logic ~~~~~~~~~~~~
  const [socket, setSocket] = useState<SocketType | null>(null);

  // create new socket on initial render, and if the user's id ever changes
  // this is put into a useEffect to avoid reconnecting every re-render
  useEffect(() => {
    let userIdForSocket: string;

    if (!userId) {
      userIdForSocket = generateId(5);
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
  // gameState in local state
  const [gameState, setGameState] = useState<GameState | null>(null);

  // set up listeners for gamestate updates
  useEffect(() => {
    // if there is no socket, do nothing
    if (socket == null) return;
    // create 'update gamestate' socket event listener
    // when update recieved, update local gameState
    socket.on("updateGameState", (updatedGameState: GameState) =>
      setGameState(updatedGameState)
    );

    // clean up: remove event listener when client navigates away from page
    return () => {
      socket.off("updateGameState");
    };
  }, [socket]);

  // ~~~~~ socket.io actions (outgoing) ~~~~~~

  function requestNewGameState(userName: string) {
    socket?.emit("createGameState", userName);
  }

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

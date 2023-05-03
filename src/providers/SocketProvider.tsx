import React, { useContext, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { PropsWithChildren } from "react";
import generateId from "../util/generateId";
import {
  ServerToClientEvents,
  ClientToServerEvents,
  ClientSocketType,
} from "../../socketTypes";

interface Props {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

export interface ProviderValue {
  socket: ClientSocketType | null;
}

// create socket context
const SocketContext = React.createContext<ProviderValue | null>(null);

// export socket context, this will be imported into children components of provider
// that use the socket
export function useSocket() {
  const socketContext = useContext(SocketContext);
  if (!socketContext) {
    throw new Error("No Socket Context Provided");
  }
  return socketContext;
}

// socket provider will wrap other components in App
export function SocketProvider({
  userId,
  setUserId,
  children,
}: PropsWithChildren<Props>) {
  // ~~~~~~~~~~~~ Socket Logic ~~~~~~~~~~~~
  const [socket, setSocket] = useState<ClientSocketType | null>(null);

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

  // ~~~~~~ PROVIDER VALUE ~~~~~~~
  const value: ProviderValue = {
    socket,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

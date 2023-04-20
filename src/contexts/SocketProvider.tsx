import React, { useContext, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { PropsWithChildren } from "react";
import generateId from "../util/generateId";

interface SocketProps {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

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
}: PropsWithChildren<SocketProps>) {
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

    console.log("new socket", newSocket);

    setSocket(newSocket);

    // clean up function in return will close socket connection when
    // user navigates away from page
    return () => {
      newSocket.close();
    };
  }, [userId, setSocket, setUserId]);

  // create socket provider, pass it the socket now stored in state.
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

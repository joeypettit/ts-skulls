import type { Socket } from "socket.io-client";
import GameState from "./Game";

export interface ServerToClientEvents {
  updateGame: (updatedGameState: GameState) => void;
}

export interface ClientToServerEvents {
  createGame: (userName: string) => void;
  enterExistingGame: (userName: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}

export type ClientSocketType = Socket<ServerToClientEvents, ClientToServerEvents>;
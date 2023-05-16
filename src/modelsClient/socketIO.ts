import type { Socket } from "socket.io-client";
import GameState from "./ClientGame";

export interface ServerToClientEvents {
  updateGame: (updateGame: GameState) => void;
}

export interface ClientToServerEvents {
  createGame: (userName: string) => void;
  enterExistingGame: (userName: string, gameId: string) => void;
  toggleReorder: (gameId: string) => void;
  startGame: (gameId: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}

export type ClientSocketType = Socket<ServerToClientEvents, ClientToServerEvents>;
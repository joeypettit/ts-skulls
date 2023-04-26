import type { Socket } from "socket.io-client";
import { GameState } from "./models";


export interface ServerToClientEvents {
  updateGameState: (updatedGameState: GameState) => void;
}

export interface ClientToServerEvents {
  createGameState: (userName: string) => void;
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
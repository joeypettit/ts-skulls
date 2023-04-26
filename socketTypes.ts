import type { Socket } from "socket.io-client";
import { GameState } from "./models";


export interface ServerToClientEvents {
  updateGameState: (updatedGameState: GameState) => void;
}

export interface ClientToServerEvents {
  createGameState: (userName: string) => void;
}

export type ClientSocketType = Socket<ServerToClientEvents, ClientToServerEvents>;
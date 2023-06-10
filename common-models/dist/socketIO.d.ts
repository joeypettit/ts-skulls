import type { Socket } from "socket.io-client";
import { Game } from "./Game";
export interface ServerToClientEvents {
    updateGame: (updateGame: Game) => void;
}
export interface ClientToServerEvents {
    createGame: (userName: string) => void;
    enterExistingGame: (userName: string, gameId: string) => void;
    toggleReorder: (gameId: string) => void;
    addPlayerToOrderArray: (gameId: string) => void;
    startGame: (gameId: string) => void;
}
export type ClientSocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

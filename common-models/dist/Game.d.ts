import { Player } from "./Player";
import { Bet } from "./Bet";
import { GamePhase } from "./GamePhase";
export declare class Game {
    id: string;
    inProgress: boolean;
    gamePhase: GamePhase;
    currentRound: number;
    firstToPlayId: string;
    playerOrder: string[];
    players: {
        [key: string]: Player;
    };
    currentBet: Bet | null;
    currentPlayerId: string;
    constructor(id: string, inProgress: boolean, gamePhase: GamePhase, currentRound: number, firstToPlayId: string, playerOrder: string[], players: {
        [key: string]: Player;
    }, currentBet: Bet | null, currentPlayerId: string);
}

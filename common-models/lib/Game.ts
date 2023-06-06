import {Player} from "./Player";
import {Bet} from "./Bet";
import {GamePhase} from './GamePhase';

export class Game {

    constructor(
        public id: string, 
        public inProgress: boolean, 
        public gamePhase: GamePhase,
        public currentRound: number,
        public firstToPlayId: string,
        public playerOrder: string[],
        public players: Map<string, Player>,
        public currentBet: Bet | null,
        public currentPlayerId: string) {
    }
  }

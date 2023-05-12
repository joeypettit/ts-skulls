import Player from "./Player";
import Bet from "./Bet";

export default class GameState {
    gameId: string;
    inProgress: boolean;
    phase: "game-lobby" | "players-reordering" | "set-round" | "play-or-bet" | "raise-or-pass" | "flip-cards" | "better-wins" | "better-lost";
    currentRound: number;
    firstToPlayIndex: number;
    playerTurnIndex: number;
    players: Map<string, Player>;
    currentBet: Bet | null;

    constructor( userId: string, playerName: string) {

        this.gameId = "1234";
        this.inProgress = false;
        this.phase = "game-lobby";
        this.currentRound = 0;
        this.firstToPlayIndex = 0;
        this.playerTurnIndex = 0;
        this.currentBet = null;
        this.players = new Map([[userId, new Player(userId, playerName, true)]]);
    }

    getPartyLeader(): Player {
        let partyLeader;
        this.players.forEach((player)=>{
            if(player.isPartyLeader === true){
                partyLeader = player;
                return;
            }
        })
        if(!partyLeader){
            throw "error"
        }
        return partyLeader;
        }
    
    getPlayerById(userId: string){
        return this.players.get(userId);
        }
    }

import { Game, Player, Bet, GamePhase } from "common-models";


export class ClientGame extends Game {

    constructor(game: Game) {
        super(
            game.id,
            game.inProgress,
            game.gamePhase,
            game.currentRound,
            game.firstToPlayId,
            game.playerOrder, 
            game.players,
            game.currentBet,
            game.currentPlayerId)
    }

    get partyLeader(): Player {
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
        const player = this.players.get(userId);
        if(!player){
            throw "In getPlayerById, id does not exist"
        }
        return player;
        }

    getPlayerOrderIndex(userId: string){
        const playerIndex = this.playerOrder.findIndex((playerId)=>{
            return userId === playerId;
        });
        return playerIndex;
    }

    }


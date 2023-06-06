import {Player} from "./Player";
import {Bet} from "./Bet";
import {GamePhase} from './GamePhase';

export class Game {

    constructor(
        private _id: string, 
        private _inProgress: boolean, 
        private _gamePhase: GamePhase,
        private _currentRound: number,
        private _firstToPlayId: string,
        private _playerOrder: string[],
        private _players: Map<string, Player>,
        private _currentBet: Bet | null,
        private _currentPlayerId: string) {
    }

    get id() {
        return this._id;
      }
    
      set id(value: string) {
        this._id = value;
      }
    
      get inProgress() {
        return this._inProgress;
      }
    
      set inProgress(value: boolean) {
        this._inProgress = value;
      }
    
      get gamePhase() {
        return this._gamePhase;
      }
    
      set gamePhase(value: GamePhase) {
        this._gamePhase = value;
      }
    
      get currentRound() {
        return this._currentRound;
      }
    
      set currentRound(value: number) {
        this._currentRound = value;
      }
    
      get firstToPlayId() {
        return this._firstToPlayId;
      }
    
      set firstToPlayId(value: string) {
        this._firstToPlayId = value;
      }
    
      get playerOrder() {
        return this._playerOrder;
      }
    
      set playerOrder(value: string[]) {
        this._playerOrder = value;
      }
    
      get players() {
        return this._players;
      }
    
      set players(value: Map<string, Player>) {
        this._players = value;
      }
    
      get currentBet() {
        return this._currentBet;
      }
    
      set currentBet(value: Bet | null) {
        this._currentBet = value;
      }
    
      get currentPlayerId() {
        return this._currentPlayerId;
      }
    
      set currentPlayerId(value: string) {
        this._currentPlayerId = value;
      }

    get partyLeader(): Player {
        let partyLeader;
        this._players.forEach((player)=>{
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
        const player = this._players.get(userId);
        if(!player){
            throw "In getPlayerById, id does not exist"
        }
        return player;
        }

    getPlayerOrderIndex(userId: string){
        const playerIndex = this._playerOrder.findIndex((playerId)=>{
            return userId === playerId;
        });
        return playerIndex;
    }

    }


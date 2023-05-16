import Player from "./Player";
import Bet from "./Bet";
import {GamePhase} from './GamePhase';
import Utility from './Utility';



export default class Game {
    private _id: string;
    private _inProgress: boolean;
    private _gamePhase: GamePhase;
    private _currentRound: number;
    private _firstToPlayId: string;
    private _playerOrder: string[];
    private _players: Map<string, Player>;
    private _currentBet: Bet | null;
    private _currentPlayerId: string;

    constructor( userId: string, playerName: string) {
        this._id = Utility.generateId(3);
        this._inProgress = false;
        this._gamePhase = GamePhase.Lobby;
        this._currentRound = 0;
        this._firstToPlayId = '';
        this._playerOrder = [];
        this._currentBet = null;
        this._players = new Map([[userId, new Player(userId, playerName, true)]]);
        this._currentPlayerId = userId;
    }

    get id(){
        return this._id;
    }

    get inProgress(){
        return this._inProgress;
    }

    get gamePhase(){
        return this._gamePhase;
    }

    get currentRound(){
        return this._currentRound;
    }

    get firstToPlayIndex(){
        return this._firstToPlayId;
    }

    get playerTurnOrder(){
        return this._playerOrder;
    }

    get currentBet(){
        return this._playerOrder;
    }

    get players(){
        return this._players;
    }

    get currentPlayer(){
        return this._currentPlayerId;
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

    set gamePhase(newPhase){
        this._gamePhase = newPhase;
    }
    
    getPlayerById(userId: string){
        const player = this._players.get(userId);
        if(!player){
            throw "In getPlayerById, id does not exist"
        }
        return player;
        }

    addNewPlayer(userId: string, userName: string){
        const newPlayer = new Player(userId, userName, false);
        this._players.set(userId, newPlayer);
        return Game;
    }

    prepNewRound(){
        this._inProgress = true;
        this._currentRound++;
        
        // check for better elimination
        if(this._gamePhase === GamePhase.Elimination && this._currentBet){
            const better = this.getPlayerById(this._currentBet.betterId);
            better.isEliminated = true;
        }
        
        // determine starting player of next round, set accordingly
        this.setStartingPlayer();

        this._players.forEach((player)=>{
            player.hasFolded = false;
            player.isPlayerTurn = false;
            player.prepPlayerHand();
            player.shuffleHand();
        });
        this._currentBet = null;
        this._gamePhase = GamePhase.SetRound;
    }

    getRandomPlayerId(): string {
        const numOfPlayers = this._playerOrder.length;
        const playerIndex = Utility.randomNumberBetweenZeroAnd(numOfPlayers);
        const randomPlayerId = this._playerOrder[playerIndex];
        return randomPlayerId;
    }

    private setStartingPlayer(){
        const currentPlayer = this.getPlayerById(this._currentPlayerId)
        // if: first round - choose random player to start play
        // else if: if better is eliminated, select next player in playerOrder starts play
        // else if: better is first to play in next round
        if(this._currentRound === 1){
            this._currentPlayerId = this.getRandomPlayerId();
        } else if(currentPlayer.allCards.length <= 0 && this._currentBet){
            const nextPlayerIndex = this.getPlayerOrderIndex(this._currentBet.betterId) + 1;
            const nextPlayerId = this._playerOrder[nextPlayerIndex];
            this._firstToPlayId = nextPlayerId;
            this._currentPlayerId = this._firstToPlayId;
        } else if(this._currentBet) {
            this._firstToPlayId = this._currentBet.betterId;
            this._currentPlayerId = this._currentBet.betterId;
        } else {
            throw "in SetFirstToPlay, No bet was found"
        }
    }

    getPlayerOrderIndex(userId: string){
        const playerIndex = this._playerOrder.findIndex((playerId)=>{
            return userId === playerId;
        });
        return playerIndex;
    }

    }


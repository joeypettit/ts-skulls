import Player from "./Player";
import Bet from "./Bet";
import {GamePhase} from './GamePhase';
import Utility from './Utility';



export default class Game {
    private _gameId: string;
    private _inProgress: boolean;
    private _gamePhase: GamePhase;
    private _currentRound: number;
    private _firstToPlay: string;
    private _playerTurnOrder: string[];
    private _players: Map<string, Player>;
    private _currentBet: Bet | null;
    private _currentPlayer: string;

    constructor( userId: string, playerName: string) {
        this._gameId = Utility.generateId(3);
        this._inProgress = false;
        this._gamePhase = GamePhase.Lobby;
        this._currentRound = 0;
        this._firstToPlay = '';
        this._playerTurnOrder = [];
        this._currentBet = null;
        this._players = new Map([[userId, new Player(userId, playerName, true)]]);
        this._currentPlayer = userId;
    }

    get gameId(){
        return this._gameId;
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
        return this._firstToPlay;
    }

    get playerTurnOrder(){
        return this._playerTurnOrder;
    }

    get currentBet(){
        return this._playerTurnOrder;
    }

    get players(){
        return this._players;
    }

    get currentPlayer(){
        return this._currentPlayer;
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
        return this._players.get(userId);
        }
    }

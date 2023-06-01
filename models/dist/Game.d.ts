import Player from "./Player";
import { GamePhase } from './GamePhase';
export default class Game {
    private _id;
    private _inProgress;
    private _gamePhase;
    private _currentRound;
    private _firstToPlayId;
    private _playerOrder;
    private _players;
    private _currentBet;
    private _currentPlayerId;
    constructor(userId: string, playerName: string);
    get id(): string;
    get inProgress(): boolean;
    get gamePhase(): GamePhase;
    get currentRound(): number;
    get firstToPlayIndex(): string;
    get playerTurnOrder(): string[];
    get currentBet(): string[];
    get players(): Map<string, Player>;
    get currentPlayer(): string;
    get partyLeader(): Player;
    set gamePhase(newPhase: GamePhase);
    getPlayerById(userId: string): Player;
    addNewPlayer(userId: string, userName: string): typeof Game;
    prepNewRound(): void;
    getRandomPlayerId(): string;
    private setStartingPlayer;
    getPlayerOrderIndex(userId: string): number;
}

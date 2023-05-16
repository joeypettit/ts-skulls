import Player from "./Player";
import Bet from "./Bet";
import { GamePhase } from "./GamePhase";
import Utility from "./Utility";

export default class ClientGame {
    private _id: string;
    private _inProgress: boolean;
    private _gamePhase: GamePhase;
    private _currentRound: number;
    private _firstToPlayId: string;
    private _playerOrder: string[];
    private _players: Map<string, Player>;
    private _currentBet: Bet | null;
    private _currentPlayerId: string;

  constructor(
    id: string,
    inProgress: boolean,
    gamePhase: GamePhase,
    currentRound: number,
    firstToPlayId: string,
    playerOrder: string[],
    players: Map<string, Player>,
    currentBet: Bet | null,
    currentPlayerId: string
  ) {
    console.log('id', id);
    this._id = id;
    this._inProgress = inProgress;
    this._gamePhase = gamePhase;
    this._currentRound = currentRound;
    this._firstToPlayId = firstToPlayId
    this._playerOrder = playerOrder
    this._players = players
    this._currentBet = currentBet
    this._currentPlayerId = currentPlayerId
  }

  get id() {
    return this._id;
  }

  get inProgress() {
    return this._inProgress;
  }

  get gamePhase() {
    return this._gamePhase;
  }

  get currentRound() {
    return this._currentRound;
  }

  get firstToPlayId() {
    return this._firstToPlayId;
  }

  get playerOrder() {
    return this._playerOrder;
  }

  get players() {
    return this._players;
  }

  get currentPlayerId() {
    return this._currentPlayerId;
  }

  get currentBet() {
    return this._currentBet;
  }

  get partyLeader(): Player {
    let partyLeader;
    this._players.forEach((player) => {
      if (player.isPartyLeader === true) {
        partyLeader = player;
        return;
      }
    });
    if (!partyLeader) {
      throw "error, no party leader";
    }
    return partyLeader;
  }

  set id(value: string) {
    this._id = value;
  }

  set inProgress(value: boolean) {
    this._inProgress = value;
  }

  set gamePhase(value: GamePhase) {
    this._gamePhase = value;
  }

  set currentRound(value: number) {
    this._currentRound = value;
  }

  set firstToPlayId(value: string) {
    this._firstToPlayId = value;
  }

  set playerOrder(value: string[]) {
    this._playerOrder = value;
  }

  set players(value: Map<string, Player>) {
    this._players = value;
  }

  set currentBet(value: Bet | null) {
    this._currentBet = value;
  }

  set currentPlayerId(value: string) {
    this._currentPlayerId = value;
  }

  getPlayerById(userId: string) {
    console.log("in getPlayerById");
    const player = this._players.get(userId);
    if (!player) {
      throw "In getPlayerById, id does not exist";
    }
    return player;
  }
}

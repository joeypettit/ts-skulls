"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Game = /** @class */ (function () {
    function Game(id, inProgress, gamePhase, currentRound, firstToPlayId, playerOrder, players, currentBet, currentPlayerId) {
        this.id = id;
        this.inProgress = inProgress;
        this.gamePhase = gamePhase;
        this.currentRound = currentRound;
        this.firstToPlayId = firstToPlayId;
        this.playerOrder = playerOrder;
        this.players = players;
        this.currentBet = currentBet;
        this.currentPlayerId = currentPlayerId;
    }
    return Game;
}());
exports.Game = Game;

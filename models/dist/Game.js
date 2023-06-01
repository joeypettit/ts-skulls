"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = require("./Player");
var GamePhase_1 = require("./GamePhase");
var Utility_1 = require("./Utility");
var Game = /** @class */ (function () {
    function Game(userId, playerName) {
        this._id = Utility_1.default.generateId(3);
        this._inProgress = false;
        this._gamePhase = GamePhase_1.GamePhase.Lobby;
        this._currentRound = 0;
        this._firstToPlayId = '';
        this._playerOrder = [];
        this._currentBet = null;
        this._players = new Map([[userId, new Player_1.default(userId, playerName, true)]]);
        this._currentPlayerId = userId;
    }
    Object.defineProperty(Game.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "inProgress", {
        get: function () {
            return this._inProgress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "gamePhase", {
        get: function () {
            return this._gamePhase;
        },
        set: function (newPhase) {
            this._gamePhase = newPhase;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "currentRound", {
        get: function () {
            return this._currentRound;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "firstToPlayIndex", {
        get: function () {
            return this._firstToPlayId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "playerTurnOrder", {
        get: function () {
            return this._playerOrder;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "currentBet", {
        get: function () {
            return this._playerOrder;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "players", {
        get: function () {
            return this._players;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "currentPlayer", {
        get: function () {
            return this._currentPlayerId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "partyLeader", {
        get: function () {
            var partyLeader;
            this._players.forEach(function (player) {
                if (player.isPartyLeader === true) {
                    partyLeader = player;
                    return;
                }
            });
            if (!partyLeader) {
                throw "error";
            }
            return partyLeader;
        },
        enumerable: false,
        configurable: true
    });
    Game.prototype.getPlayerById = function (userId) {
        var player = this._players.get(userId);
        if (!player) {
            throw "In getPlayerById, id does not exist";
        }
        return player;
    };
    Game.prototype.addNewPlayer = function (userId, userName) {
        var newPlayer = new Player_1.default(userId, userName, false);
        this._players.set(userId, newPlayer);
        return Game;
    };
    Game.prototype.prepNewRound = function () {
        this._inProgress = true;
        this._currentRound++;
        // check for better elimination
        if (this._gamePhase === GamePhase_1.GamePhase.Elimination && this._currentBet) {
            var better = this.getPlayerById(this._currentBet.betterId);
            better.isEliminated = true;
        }
        // determine starting player of next round, set accordingly
        this.setStartingPlayer();
        this._players.forEach(function (player) {
            player.hasFolded = false;
            player.isPlayerTurn = false;
            player.prepPlayerHand();
            player.shuffleHand();
        });
        this._currentBet = null;
        this._gamePhase = GamePhase_1.GamePhase.SetRound;
    };
    Game.prototype.getRandomPlayerId = function () {
        var numOfPlayers = this._playerOrder.length;
        var playerIndex = Utility_1.default.randomNumberBetweenZeroAnd(numOfPlayers);
        var randomPlayerId = this._playerOrder[playerIndex];
        return randomPlayerId;
    };
    Game.prototype.setStartingPlayer = function () {
        var currentPlayer = this.getPlayerById(this._currentPlayerId);
        // if: first round - choose random player to start play
        // else if: if better is eliminated, select next player in playerOrder starts play
        // else if: better is first to play in next round
        if (this._currentRound === 1) {
            this._currentPlayerId = this.getRandomPlayerId();
        }
        else if (currentPlayer.allCards.length <= 0 && this._currentBet) {
            var nextPlayerIndex = this.getPlayerOrderIndex(this._currentBet.betterId) + 1;
            var nextPlayerId = this._playerOrder[nextPlayerIndex];
            this._firstToPlayId = nextPlayerId;
            this._currentPlayerId = this._firstToPlayId;
        }
        else if (this._currentBet) {
            this._firstToPlayId = this._currentBet.betterId;
            this._currentPlayerId = this._currentBet.betterId;
        }
        else {
            throw "in SetFirstToPlay, No bet was found";
        }
    };
    Game.prototype.getPlayerOrderIndex = function (userId) {
        var playerIndex = this._playerOrder.findIndex(function (playerId) {
            return userId === playerId;
        });
        return playerIndex;
    };
    return Game;
}());
exports.default = Game;

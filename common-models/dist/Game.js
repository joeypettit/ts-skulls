"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Game = /** @class */ (function () {
    function Game(_id, _inProgress, _gamePhase, _currentRound, _firstToPlayId, _playerOrder, _players, _currentBet, _currentPlayerId) {
        this._id = _id;
        this._inProgress = _inProgress;
        this._gamePhase = _gamePhase;
        this._currentRound = _currentRound;
        this._firstToPlayId = _firstToPlayId;
        this._playerOrder = _playerOrder;
        this._players = _players;
        this._currentBet = _currentBet;
        this._currentPlayerId = _currentPlayerId;
    }
    Object.defineProperty(Game.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "inProgress", {
        get: function () {
            return this._inProgress;
        },
        set: function (value) {
            this._inProgress = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "gamePhase", {
        get: function () {
            return this._gamePhase;
        },
        set: function (value) {
            this._gamePhase = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "currentRound", {
        get: function () {
            return this._currentRound;
        },
        set: function (value) {
            this._currentRound = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "firstToPlayId", {
        get: function () {
            return this._firstToPlayId;
        },
        set: function (value) {
            this._firstToPlayId = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "playerOrder", {
        get: function () {
            return this._playerOrder;
        },
        set: function (value) {
            this._playerOrder = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "players", {
        get: function () {
            return this._players;
        },
        set: function (value) {
            this._players = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "currentBet", {
        get: function () {
            return this._currentBet;
        },
        set: function (value) {
            this._currentBet = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "currentPlayerId", {
        get: function () {
            return this._currentPlayerId;
        },
        set: function (value) {
            this._currentPlayerId = value;
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
    Game.prototype.getPlayerOrderIndex = function (userId) {
        var playerIndex = this._playerOrder.findIndex(function (playerId) {
            return userId === playerId;
        });
        return playerIndex;
    };
    return Game;
}());
exports.Game = Game;

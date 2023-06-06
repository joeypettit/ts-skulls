"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var Player = /** @class */ (function () {
    function Player(id, name, isPartyLeader) {
        this.name = name;
        this.isPlayerTurn = false;
        this.id = id;
        this.isConnected = true;
        this.allCards = this.generateAllCardsArray();
        this.cardsInHand = [];
        this.cardsInPlay = [];
        this.hasFolded = false;
        this.points = 0;
        this.isPartyLeader = isPartyLeader;
        this.isEliminated = false;
    }
    Player.prototype.generateAllCardsArray = function () {
        // randomize the id of each card
        var cardIds = [1, 2, 3, 4];
        cardIds.sort(function (a, b) { return 0.5 - Math.random(); });
        return ([
            {
                id: cardIds[0],
                isSkull: false,
                isRevealed: false,
            },
            {
                id: cardIds[1],
                isSkull: true,
                isRevealed: false,
            },
            {
                id: cardIds[2],
                isSkull: false,
                isRevealed: false,
            },
            {
                id: cardIds[3],
                isSkull: false,
                isRevealed: false,
            },
        ]);
    };
    Player.prototype.prepPlayerHand = function () {
        var _this = this;
        this.cardsInHand = [];
        this.cardsInPlay = [];
        this.allCards.map(function (card) {
            var cardForHand = __assign(__assign({}, card), { isRevealed: false });
            _this.cardsInHand.push(cardForHand);
        });
    };
    Player.prototype.shuffleHand = function () {
        this.cardsInHand.sort(function (a, b) { return 0.5 - Math.random(); });
    };
    return Player;
}());
exports.Player = Player;

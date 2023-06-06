"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamePhase = void 0;
var GamePhase;
(function (GamePhase) {
    GamePhase["Lobby"] = "LOBBY";
    GamePhase["PlayersReordering"] = "PLAYERS-REORDERING";
    GamePhase["SetRound"] = "SET-ROUND";
    GamePhase["PlayOrBet"] = "PLAY-OR-BET";
    GamePhase["RaiseOrPass"] = "RAISE-OR-PASS";
    GamePhase["FlipCards"] = "FLIP-CARDS";
    GamePhase["WinRound"] = "WIN-ROUND";
    GamePhase["LoseRound"] = "LOSE-ROUND";
    GamePhase["Elimination"] = "ELIMINATION";
    GamePhase["WinGame"] = "WIN-GAME";
})(GamePhase = exports.GamePhase || (exports.GamePhase = {}));

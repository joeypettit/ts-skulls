"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utility = /** @class */ (function () {
    function Utility() {
    }
    Utility.generateId = function (idLength) {
        var id = "";
        var letters = "abcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < idLength; i++) {
            if (Math.floor(Math.random() * 2) < 1) {
                var nextChar = letters.charAt(Math.floor(Math.random() * letters.length));
                id += nextChar;
            }
            else {
                var nextChar = Math.floor(Math.random() * 10);
                id += nextChar;
            }
        }
        return id;
    };
    Utility.randomNumberBetweenZeroAnd = function (num) {
        var randomNum = Math.floor(Math.random() * num);
        return randomNum;
    };
    return Utility;
}());
exports.default = Utility;

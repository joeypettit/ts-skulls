export interface Card {
    id: number;
    isSkull: boolean;
}

export class Player {
    name: string;
    isPlayerTurn: boolean;
    id: string;
    isConnected: boolean;
    allCards: Card[];
    cardsInHand: Card[];
    cardsInPlay: Card[];
    hasFolded: boolean;
    points: number;
    isPartyLeader: boolean;

    constructor(id: string, name: string, isPartyLeader: boolean){
        this.name = name;
        this.isPlayerTurn = false;
        this.id = id;
        this.isConnected = true;
        this.allCards = [];
        this.cardsInHand = [];
        this.cardsInPlay= [];
        this.hasFolded= false;
        this.points = 0;
        this.isPartyLeader = isPartyLeader;
    }
}

export interface Bet {
    numberOfCards: number;
    better: {id: string, name: string};
    rosesNeededToWin: number;
    revealedSkullWasFrom: string | null;
}

export class GameState {
    gameId: string;
    inProgress: boolean;
    gamePhase: "pre-game" | "game-lobby" | "players-reordering" | "set-round" | "play-or-bet" | "raise-or-pass" | "flip-cards" | "better-wins" | "better-lost";
    currentRound: number;
    firstToPlayIndex: number;
    playerTurnIndex: number;
    players: Player[];
    currentBet: Bet | null;

    constructor( userId: string, playerName: string) {
        this.gameId = "1234";
        this.inProgress = false;
        this.gamePhase = "pre-game";
        this.currentRound = 0;
        this.firstToPlayIndex = 0;
        this.playerTurnIndex = 0;
        this.currentBet = null;
        this.players = [new Player(userId, playerName, true)];
    }
}
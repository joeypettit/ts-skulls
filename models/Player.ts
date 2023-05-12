import Card from "./Card";

export default class Player {
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
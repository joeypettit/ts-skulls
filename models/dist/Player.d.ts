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
    isEliminated: boolean;
    constructor(id: string, name: string, isPartyLeader: boolean);
    private generateAllCardsArray;
    prepPlayerHand(): void;
    shuffleHand(): void;
}

import {Card} from "./Card";

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
    isEliminated: boolean;

    constructor(id: string, name: string, isPartyLeader: boolean){
        this.name = name;
        this.isPlayerTurn = false;
        this.id = id;
        this.isConnected = true;
        this.allCards = this.generateAllCardsArray();
        this.cardsInHand = [];
        this.cardsInPlay= [];
        this.hasFolded= false;
        this.points = 0;
        this.isPartyLeader = isPartyLeader;
        this.isEliminated = false;
    }

    private generateAllCardsArray(){
        // randomize the id of each card
        const cardIds = [1, 2, 3, 4];
        cardIds.sort((a, b) => 0.5 - Math.random());
        return([
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
          ])
    }

    prepPlayerHand(): void{
            this.cardsInHand = [];
            this.cardsInPlay = [];
            this.allCards.map((card)=>{
                const cardForHand = {...card, isRevealed: false};
                this.cardsInHand.push(cardForHand);
            })
    }

    shuffleHand(): void{
        this.cardsInHand.sort((a, b) => 0.5 - Math.random());
    }
}
import { Player } from "common-models";

export class ServerPlayer extends Player {

    constructor(id: string, name: string, isPartyLeader: boolean){
        super(
            
        )
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
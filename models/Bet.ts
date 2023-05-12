export default interface Bet {
    numberOfCards: number;
    better: {id: string, name: string};
    rosesNeededToWin: number;
    revealedSkullWasFrom: string | null;
}


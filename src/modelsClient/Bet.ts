export default interface Bet {
    numberOfCards: number;
    betterId: string;
    rosesNeededToWin: number;
    revealedSkullWasFrom: string | null;
}


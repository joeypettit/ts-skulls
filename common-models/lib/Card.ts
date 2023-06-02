export default interface Card {
    id: number | 'censored';
    isSkull: boolean | 'censored';
    isRevealed: boolean;
}

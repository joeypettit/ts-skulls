import { Game, Utility, Player, GamePhase } from "common-models";

export default class ServerGame extends Game {
  constructor(userId: string, playerName: string) {
    const id = Utility.generateId(3);
    const inProgress = false;
    const gamePhase = GamePhase.Lobby;
    const currentRound = 0;
    const firstToPlayId = "";
    const playerOrder: string[] = [userId];
    const currentBet = null;
    const players = { [userId]: new Player(userId, playerName, true) };
    const currentPlayerId = userId;

    super(
      id,
      inProgress,
      gamePhase,
      currentRound,
      firstToPlayId,
      playerOrder,
      players,
      currentBet,
      currentPlayerId
    );
  }

  get partyLeader(): Player {
    for (let key in this.players) {
      const player = this.players[key];
      if (player.isPartyLeader === true) {
        return player;
      }
    }
    throw new Error("No party leader found.");
  }

  getPlayerById(userId: string) {
    const player = this.players[userId];
    if (!player) {
      throw new Error("In getPlayerById, id does not exist");
    }
    return player;
  }

  getPlayerOrderIndex(userId: string) {
    const playerIndex = this.playerOrder.findIndex((playerId) => {
      return userId === playerId;
    });
    return playerIndex;
  }

  addNewPlayer(userId: string, userName: string) {
    const newPlayer = new Player(userId, userName, false);
    this.players[userId] = newPlayer;
    this.playerOrder.push(userId);
    return this;
  }

  prepNewRound() {
    this.inProgress = true;
    this.currentRound++;

    // check for better elimination
    if (this.gamePhase === GamePhase.Elimination && this.currentBet) {
      const better = this.getPlayerById(this.currentBet.betterId);
      better.isEliminated = true;
    }

    // determine starting player of next round, set accordingly
    this.setStartingPlayer();

    for (let key in this.players) {
      const player = this.players[key];
      player.hasFolded = false;
      player.isPlayerTurn = false;
      player.prepPlayerHand();
      player.shuffleHand();
    }

    this.currentBet = null;
    this.gamePhase = GamePhase.SetRound;
  }

  getRandomPlayerId(): string {
    const numOfPlayers = this.playerOrder.length;
    const playerIndex = Utility.randomNumberBetweenZeroAnd(numOfPlayers);
    const randomPlayerId = this.playerOrder[playerIndex];
    return randomPlayerId;
  }

  private setStartingPlayer() {
    const currentPlayer = this.getPlayerById(this.currentPlayerId);
    // if: first round - choose random player to start play
    // else if: if better is eliminated, select next player in playerOrder starts play
    // else if: better is first to play in next round
    if (this.currentRound === 1) {
      this.currentPlayerId = this.getRandomPlayerId();
    } else if (currentPlayer.allCards.length <= 0 && this.currentBet) {
      const nextPlayerIndex =
        this.getPlayerOrderIndex(this.currentBet.betterId) + 1;
      const nextPlayerId = this.playerOrder[nextPlayerIndex];
      this.firstToPlayId = nextPlayerId;
      this.currentPlayerId = this.firstToPlayId;
    } else if (this.currentBet) {
      this.firstToPlayId = this.currentBet.betterId;
      this.currentPlayerId = this.currentBet.betterId;
    } else {
      throw "in SetFirstToPlay, No bet was found";
    }
  }

//   createCensoredCopy(userId: string){

//     const censoredPlayers = {};

//     for(let key in this.players){
//         const player = {...this.players[key]}
//         if(key === userId){
//             censoredPlayers[key] = player;
//         }else{
//             player.allCards.forEach((card)=>{
                
//             })
//         }
//     }


//     const copy = {
//         id: this.id,
//         inProgress: this.inProgress,
//         gamePhase: this.gamePhase,
//         currentRound: this.currentRound,
//         firstToPlayId: this.firstToPlayId,
//         playerOrder: this.playerOrder,
//         players: this.players,
//         currentBet: this.currentBet,
//         currentPlayerId: this.currentPlayerId
//     }
//   }
}

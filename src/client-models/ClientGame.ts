import { Game, Player, Bet, GamePhase } from "common-models";

export class ClientGame extends Game {
  constructor(game: Game) {
    super(
      game.id,
      game.inProgress,
      game.gamePhase,
      game.currentRound,
      game.firstToPlayId,
      game.playerOrder,
      game.players,
      game.currentBet,
      game.currentPlayerId
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

  get lastPlayerInOrderArray(): Player {
    return this.getPlayerById(this.playerOrder[this.playerOrder.length - 1]);
  }

  getPlayerById(userId: string) {
    const player = this.players[userId];
    if (!player) {
      throw new Error(`In getPlayerById, id ${userId}does not exist`);
    }
    return player;
  }

  getPlayerOrderIndex(userId: string) {
    const playerIndex = this.playerOrder.findIndex((playerId) => {
      return userId === playerId;
    });
    return playerIndex;
  }
}

import { createServer } from "http";
import { Server } from "socket.io";
import { ServerToClientEvents, ClientToServerEvents } from "common-models";
import { InterServerEvents, SocketData } from "./server-models/SocketIO";

import ServerGame from "./server-models/ServerGame";
import { GamePhase } from "common-models";

// socket.io server
const httpServer = createServer();
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer);
const PORT = process.env.PORT || 5000;

// Map contains all currently active game
const activeGames = new Map<string, ServerGame>(null);

io.on("connection", (socket) => {
  console.log("connected", socket.handshake.query.userId);

  socket.on("createGame", (userName) => {
    const userId = String(socket.handshake.query.userId);

    const game = new ServerGame(userId, userName);
    activeGames.set(game.id, game);

    // create new rooms based on gameId and userId
    socket.join(game.id);
    socket.join(userId);

    io.in(game.id).emit("updateGame", game);
  });

  socket.on("enterExistingGame", (userName, gameId) => {
    const userId = String(socket.handshake.query.userId);

    console.log("existingGame", userName, gameId, userId);

    const game = activeGames.get(gameId);

    if (game) {
      game.addNewPlayer(userId, userName);
      socket.join(game.id);
      socket.join(userId);
      io.in(game.id).emit("updateGame", game);
    } else {
      throw new Error(`Game ${gameId} Not Found`);
    }
  });

  socket.on("toggleReorder", (gameId) => {
    console.log(gameId);
    const game = activeGames.get(gameId);

    if (game) {
      if (game.gamePhase === GamePhase.Lobby) {
        game.gamePhase = GamePhase.PlayersReordering;
        game.clearOrderArray();
        game.addPlayerToOrderArray(game.partyLeader.id);
      } else if (game.gamePhase === GamePhase.PlayersReordering) {
        game.gamePhase = GamePhase.Lobby;
      } else {
        throw new Error(`Incorrect Gamephase Type: ${game.gamePhase}`);
      }
      io.in(gameId).emit("updateGame", game);
    } else {
      throw new Error(`Game ${gameId} Not Found`);
    }
  });

  socket.on("addPlayerToOrderArray", (gameId) => {
    const userId = String(socket.handshake.query.userId);
    const game = activeGames.get(gameId);

    if (game) {
      game.addPlayerToOrderArray(userId);

      const playersObjectLength = Object.keys(game.players).length;
      if (game.playerOrder.length >= playersObjectLength) {
        game.gamePhase = GamePhase.Lobby;
      }
    } else {
      throw new Error(`Game ${gameId} Not Found`);
    }

    io.in(gameId).emit("updateGame", game);
  });

  socket.on("startGame", (gameId) => {
    const game = activeGames.get(gameId);

    if (game) {
      game.prepNewRound();
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});

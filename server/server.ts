import { createServer } from "http";
import { Server } from "socket.io";
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from "../socketTypes";
import { GameState } from "../models";
import generateId from "./util/generateId";

// socket.io server
const httpServer = createServer();
const io = new Server<ClientToServerEvents,
ServerToClientEvents,
InterServerEvents,
SocketData>(httpServer);
const PORT = process.env.PORT || 5000;


// Map contains all currently active gamestates
const activeGameStates = new Map();


io.on("connection", (socket) => {
    console.log("connected", socket.handshake.query.userId);

    socket.on("createGameState", (userName)=>{
        const userId = String(socket.handshake.query.userId);
        const gameId = generateId(3);
    
    // create new rooms based on gameId and userId
    socket.join(gameId);
    socket.join(userId);

    const gameState = new GameState(userId, userName);
    activeGameStates.set(gameId, gameState);

    io.in(gameId).emit("updateGameState", gameState);
    })
    
});

httpServer.listen(PORT, ()=>{
    console.log(`listening on PORT ${PORT}`)
});
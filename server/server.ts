import { createServer } from "http";
import { Server } from "socket.io";
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from "../models/socketIO";
import Game from "../models/Game";
import generateId from "./util/generateId";

// socket.io server
const httpServer = createServer();
const io = new Server<ClientToServerEvents,
ServerToClientEvents,
InterServerEvents,
SocketData>(httpServer);
const PORT = process.env.PORT || 5000;


// Map contains all currently active game
const activeGames = new Map<string, Game>(null);


io.on("connection", (socket) => {
    console.log("connected", socket.handshake.query.userId);

    socket.on("createGame", (userName)=> {
        const userId = String(socket.handshake.query.userId);
        const gameId = generateId(3);
    
    // create new rooms based on gameId and userId
    socket.join(gameId);
    socket.join(userId);

    const game = new Game(userId, userName);
    activeGames.set(gameId, game);

    io.in(gameId).emit("updateGame", game);
    })

    
});

httpServer.listen(PORT, ()=>{
    console.log(`listening on PORT ${PORT}`)
});
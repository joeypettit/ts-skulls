import { createServer } from "http";
import { Server } from "socket.io";
import { ServerToClientEvents, ClientToServerEvents } from "common-models";
import {InterServerEvents, SocketData} from './server-models/SocketIO';

import ServerGame from "./server-models/ServerGame";
import { GamePhase, Utility } from "common-models";

// socket.io server
const httpServer = createServer();
const io = new Server<ClientToServerEvents,
ServerToClientEvents,
InterServerEvents,
SocketData>(httpServer);
const PORT = process.env.PORT || 5000;


// Map contains all currently active game
const activeGames = new Map<string, ServerGame>(null);


io.on("connection", (socket) => {
    console.log("connected", socket.handshake.query.userId);

    socket.on("createGame", (userName)=> {
        const userId = String(socket.handshake.query.userId);
        const gameId = Utility.generateId(3);
    
        // create new rooms based on gameId and userId
        socket.join(gameId);
        socket.join(userId);

        const game = new ServerGame(userId, userName);
        activeGames.set(gameId, game);
        
        console.log('this is the game', game);

        io.in(gameId).emit("updateGame", game);
    })

    socket.on("enterExistingGame", (userName, gameId)=>{
        const userId = String(socket.handshake.query.userId);

        // create new rooms based on gameId and userId
        socket.join(gameId);
        socket.join(userId);

        const game = activeGames.get(gameId);

        if(game){
            game.addNewPlayer(userName, userId);
            io.in(gameId).emit("updateGame", game);
        }else{
            // emit error message
        }
    })

    socket.on("toggleReorder", (gameId)=>{
        const game = activeGames.get(gameId);

        if(game){
            if(game.gamePhase === GamePhase.Lobby){
                game.gamePhase = GamePhase.PlayersReordering;
            }else if( game.gamePhase === GamePhase.PlayersReordering){
                game.gamePhase = GamePhase.Lobby;
            }else{
                throw('in toggleReorder: incorrect gamephase type');
            }
            io.in(gameId).emit("updateGame", game);
        }else{
            throw('In toggleReorder: no game found');
        }
    });
    socket.on("startGame", (gameId)=> {
        const game = activeGames.get(gameId);

        if(game){
            game.prepNewRound();
            
        }

    })

    
});

httpServer.listen(PORT, ()=>{
    console.log(`listening on PORT ${PORT}`)
});
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log('connected');
    // console.log("connected", socket.handshake.query.userId);
});

httpServer.listen(3000);
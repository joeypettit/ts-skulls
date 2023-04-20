import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer);
const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
    console.log('connected');
    console.log("connected", socket.handshake.query.userId);
});

httpServer.listen(PORT, ()=>{
    console.log(`listening on PORT ${PORT}`)
});
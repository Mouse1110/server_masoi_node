const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const http = require("http");
const server = http.Server(app);
const {Server} = require("socket.io");
var io = new Server(server);
server.listen(5000,function(){
    console.log("running");
})

// Event

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('msg','hello user');
  });

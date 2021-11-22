const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const PORT = process.env.PORT || 5000;

const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
      origin: "http://servermasoi.herokuapp.com/",
      methods: ["GET", "POST"]
    }
  });


server.listen(PORT,function(){
    console.log("running");
})

app.get("/",function(req,res){
    res.send("hello");
})

// Event

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('msg','hello user');
  });

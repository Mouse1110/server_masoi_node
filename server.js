const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const PORT = process.env.PORT || 5000;

var server = require('http').createServer();
var io = require('socket.io')(server);


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

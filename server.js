const express = require("express");
const app = express();
const cors = require("cors");
const UserController = require("./controller/user.controller");

app.use(cors());

const PORT = process.env.PORT || 5000;

const http = require('http');
const server = http.createServer(app);

const io = require("socket.io")(server, {
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

function setData(id,name,qt,card){
  return {id:id,name:name,qt:qt,card:card};
}
// Data
var arr = [];
// Event
io.on('connection', (socket) => {
    socket.emit('msg','hello user');
    // Join Room
    socket.on('joinroom',function(data){
       //set id user join
       UserController.insert({id:socket.id,name:data.name,qt:false,ss:false}).then(function(data){
         if (data){
          socket.join("room");
          UserController.getAll().then(function(data){
            io.to("room").emit("joinroom",data);
          });
         }
       });
    });
    //  Choose Card
    socket.on("chooseCard",function(data){
      arr = data;
      console.log(arr);
    });
    // SetQT
    socket.on("setQT",function(){
      UserController.updateQT(socket.id).then(function(json){
        UserController.getAll().then(function(data){
          io.to("room").emit("joinroom",data);
        });
      });
    });
    // San Sang
    socket.on("ready",function(){
      UserController.updateSS(socket.id).then(function(json){
        UserController.getAll().then(function(data){
          io.to("room").emit("joinroom",data);
        });
      });
    });
    // Disconnect
    socket.on('disconnect', function() {
      // clear id user leave
     console.log('disconnect');
     UserController.delete(socket.id).then(function(json){
       console.log(json);
      UserController.getAll().then(function(data){
        io.to("room").emit("joinroom",data);
      });
     });
    
  });
  });

// Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://masoigame:zPB3Rri1VNkkp6J5@cluster0.a4dtz.mongodb.net/masoigame?retryWrites=true&w=majority',function(err){
    if (err){
        console.log('err: ',err);
    }else{
        console.log('server mongo connected success');
    }
});

const UserModel = require("../model/user.model");

module.exports.insert = async function(json){
    var user = new UserModel({
        socket:json.id,
        name:json.name,
        qt:json.qt,
        ss:json.ss
    });
    var data = await UserModel.findOne({socket:json.id});
    var log;
    if (data){
        log = await UserModel.updateOne({_id:data._id},{$set:{name:json.name}});
        return true;
    }
    log = await user.save();
  if (!log){
      return false;
  }
  return true;
}

module.exports.getAll = async function(){
    var data = await UserModel.find({});
  return data;
}

module.exports.delete = async function(socket){
    var data = await UserModel.deleteOne({socket:socket});
    
  return data;
}
module.exports.updateQT = async function(socket){
    var data = await UserModel.findOne({socket:socket});
    var json = await UserModel.updateMany({},{$set:{qt:false}});
     json = await UserModel.updateOne({socket:socket},{$set:{qt:true}});
  return json;
}
module.exports.updateSS = async function(socket){
    var data = await UserModel.findOne({socket:socket});
    console.log(data.ss);
    var json = await UserModel.updateOne({socket:socket},{$set:{ss:!data.ss}});
  return json;
}
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    socket:String,
    name:String,
    qt:Boolean,
    ss:Boolean,
    card:Number
});

module.exports = mongoose.model('user',userSchema);
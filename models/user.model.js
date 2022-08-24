const {Schema,model}= require("mongoose")

const UserSchema= new Schema({
    name:String,
    email:String,
    hash:String,
    ip:String
})

const User= model("user",UserSchema);

module.exports= User
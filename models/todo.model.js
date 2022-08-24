const {Schema,model}= require("mongoose")



const ObjectId= Schema.Types.ObjectId;
const todoSchema= new Schema({
    taskname:String,
    status:Boolean,
    tag:{type:String, enum:["personal","official","family"]},
    userId:ObjectId
})

const Todo= model("todo",todoSchema);

module.exports= Todo
const {Router}= require("express");
const Todo = require("../models/todo.model");

const todoRoute= Router();

todoRoute.get("/todos",async(req,res)=>{
    console.log(req.query)
    let {status,tag}= req.query;
    if(status=='pending'){
        status=false
    }else if(status=='done'){
        status=true
    }
    const userId=req.headers.userid;

    if(status&&tag){
        try{
            const todo= await Todo.find({userId,status,tag})
           return  res.status(201).json(todo)
        }catch(e){
           return  res.status(501).send("Internal server error from todo")
        }
    }
    if(status){
        try{
            const todo= await Todo.find({userId,status})
           return  res.status(201).json(todo)
        }catch(e){
           return  res.status(501).send("Internal server error from todo")
        }
    }

    if(tag){
        try{
            const todo= await Todo.find({userId,tag})
           return  res.status(201).json(todo)
        }catch(e){
           return  res.status(501).send("Internal server error from todo")
        }
    }
    try{
        const todo= await Todo.find({userId})
       return  res.status(201).json(todo)
    }catch(e){
       return  res.status(501).send("Internal server error from todo")
    }
})

todoRoute.post("/todos/create", async(req,res)=>{
    const {taskname,status,tag,userId}= req.body;
    try{
        await Todo.insertMany(req.body);
        return res.status(201).send("Todo Created Successful")
    }catch(e){
         return res.status(500).send("Not Created")
    }
})



todoRoute.put("/todos/edit/:todoId", async(req,res)=>{
    const id= req.params.todoId;
    const {taskname,status,tag,userId}= req.body;
    try{
        await Todo.updateOne({_id:id},{$set:{taskname,status,tag}});
        return res.status(201).send("Todo Edited Successful")
    }catch(e){
         return res.status(500).send("Not Edited")
    }
})


todoRoute.delete("/todos/delete/:todoId", async(req,res)=>{
    const id= req.params.todoId;
    try{
        await Todo.deleteOne({_id:id})
        return res.status(201).send("Todo Edited Successful")
    }catch(e){
         return res.status(500).send("Not Deleted")
    }
})


todoRoute.get("/todos/:todoId", async (req,res)=>{
    const id= req.params.todoId
    try{
        const todo= await Todo.find({_id:id})
       return  res.status(201).json(todo)
    }catch(e){
       return  res.status(501).send("Internal server error from todo")
    }
})





module.exports= todoRoute
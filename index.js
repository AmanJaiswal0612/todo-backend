const express= require("express");
const connection = require("./db");
const tokenChecker = require("./middlewares/tokenChecker");
const app= express();
const signRoute= require("./routes/signup.route");
const todoRoute = require("./routes/todo.route");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/",(req,res)=>{
   res.send("Welcome to Server")
})
app.use(signRoute)
app.use(tokenChecker)
app.use(todoRoute)


const PORT =process.env.PORT||8080
app.listen(PORT, async () => {
    try {
      await connection;
    } catch (e) {
      console.log(e);
    }
  });
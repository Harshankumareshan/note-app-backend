const express = require("express")
const cors = require("cors")
const { connection } = require("./db.js")
const { userRouter } = require("./routes/user.routes")
const { noteRouter } = require("./routes/note.routes.js")
require("dotenv").config()
const port = process.env.port
const app = express()
app.use(cors())
app.use(express.json())
connection()
app.use("/user",userRouter)
app.use("/note",noteRouter)

app.get("/",(req,res)=>{
    res.send({
        message:"api is working now"
    })
})



app.listen(port,async()=>{

    try{
      
        console.log("server is connected")
    }catch(error){
        console.log(error)

    }

    console.log("server is running on port number",port)
})
const express = require('express')
require('dotenv').config()
const app = express();
require("./DB/conn")
const cors = require("cors")
const port = process.env.PORT || 3000;
const AuthRouter = require("./routes/AuthRouter")
const UserRouter = require("./routes/UserRouter")
const AdminRouter = require("./routes/AdminRouter")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.get("/",(req,res) =>{
    res.send("hello")
})

app.use("/auth",AuthRouter)
app.use("/userPage",UserRouter)
app.use("/adminPage",AdminRouter)

app.listen(port,() =>{
    console.log("Server is Connected")
})

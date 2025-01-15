const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/db");
const userRouter = require("./routes/user.routes");
const inventoryRouter = require("./routes/inventory.routes");
// const oemRouter = require("./routes/oem.routes");
require("dotenv").config()

const app=express()
app.use(express.json())
app.use(cors())

const PORT= process.env.PORT || 8000



app.get("/", (req, res)=>{
    res.status(200).json("wellcome to backend api!")
})

app.use("/", userRouter)
app.use("/", inventoryRouter)
// app.use("/", oemRouter)

app.listen(PORT, async()=>{
    try {
        await dbConnect
        console.log(`server running on ${PORT} also connected Db`)
    } catch (error) {
        console.log(error); 
    }
})
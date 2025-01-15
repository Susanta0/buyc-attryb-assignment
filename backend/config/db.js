const {connect}=require("mongoose")
require("dotenv").config()

const url= process.env.DB_URL

const dbConnect= connect(url)

module.exports=dbConnect
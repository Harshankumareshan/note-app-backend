const mongoose = require("mongoose")

require("dotenv").config();
const connection = async ()=>{
   await mongoose.connect(process.env.mongourl)
 console.log("db is connected")
}






module.exports = {
    connection,
};
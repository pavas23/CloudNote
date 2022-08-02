
// connecting our mongoose to mongod local database 
const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/iNotebook";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongod successfully!!");
    })
}

module.exports = connectToMongo;



const mongoose=require("mongoose");
const dotenv=require("dotenv")
dotenv.config()
const URL=process.env.DB_URL

//todo schema

mongoose.connect(URL).then(()=>(
    console.log("DB connected successfully")
)).catch((error)=>{
    console.error(error)
})
const todoSchema=new mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})

const todo=mongoose.model("todos",todoSchema);  
module.exports={
    todo
}
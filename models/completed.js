const mongoose=require("mongoose");

const completedSchema=new mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})

const completed=mongoose.model("completed",completedSchema);
module.exports={
    completed
}
const express=require("express");
const app=express();
const dotenv=require("dotenv");
const cors=require("cors")
dotenv.config();
app.use(cors({
    origin:"http://localhost:5173",
    origin:"https://todo-app-frontend-mu-olive.vercel.app/",
}))
const PORT=process.env.PORT||4000
const UserRouter=require("./routes/User")
//middlewares
app.use(express.json());
//mounting
app.use("/api/v1",UserRouter)

app.listen(PORT,()=>{
    console.log(`App is running at port ${PORT}`)
})


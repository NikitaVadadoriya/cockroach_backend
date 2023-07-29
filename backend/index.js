const express =require('express')
const cors = require('cors')
const app = express()
require("dotenv").config();

const corsOpion = {
    origin:"*"
}

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors(corsOpion))

const router = require('./routes/userRoute')
app.use('/api/user',router)


app.get('/',(req,res)=>{
    res.send('welcome to vercel')
})
app.listen(process.env.DB_PORT,()=>{
    console.log(`app are running port no ${process.env.DB_PORT}`)
})
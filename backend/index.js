
const express =  require('express');
const mongoose = require('mongoose');

const cors = require('cors');
require('dotenv').config();

const mongoString = process.env.DATABASE_URL
const routes = require('./routes/routes')

const app = express();
app.use(express.json());
app.use(cors())
app.listen(5000,()=>{
    console.log(`http://localhost:${5000}`)
})


mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error',(error) =>{
    console.log(error)
})


database.once('connected',() =>{
    console.log('database connected')
})

app.use('/api',routes)
app.use('/',(req,res) =>{
    res.send("Backend stored")
})

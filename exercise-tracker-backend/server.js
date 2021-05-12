const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const excersieRouter = require('./routes/exercise');
const usersRouter = require('./routes/users');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

console.log(`uri ${process.env.ATLAS_URI}`)
app.use(cors());
app.use(express.json());
app.use('/exercise',excersieRouter);
app.use('/users',usersRouter);

const uri = process.env.ATLAS_URI;
mongoose.connect("mongodb+srv://testing:testing123@cluster0.poq3j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log(`Yeah mongoDB is connected`);
})




app.listen(port, ()=>{
    console.log(`server is running on port: ${port}`);
})
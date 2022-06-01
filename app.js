require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/userRoutes')
const router1 = require('./routes/notesRoutes')

const app = express();
app.use(express.json());
app.use(cors());


//Routers
app.use('/users', router);
app.use('/api/notes', router1);



//Listen
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log("Server is running on", PORT);
})


//Connect to MongoDB
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    // useCreateIndex: true,
    // useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true


}, err=>{
    if(err) throw err;
    console.log("Connected to Mongodb");
})
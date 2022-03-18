const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');


const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use("/public/uploads", express.static(__dirname + '/public/uploads'));
//app.use("AllPosts/public/uploads", express.static(__dirname + 'AllPosts/public/uploads'));
//connect to mongodb
const dbURI = 'mongodb+srv://shikhar:test1234@cluster0.dixvc.mongodb.net/barter?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log(`connected to database :${result.connection.host}`))
    .catch((err) => console.log(err))
    

app.use(require('./router/auth'));
app.use(require('./router/addpost'));





app.listen(5000, console.log("server started at 5000"));


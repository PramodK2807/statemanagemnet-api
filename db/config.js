const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://test:test123@cluster0.rqzfmzk.mongodb.net/e-commerce?retryWrites=true&w=majority");



// const getData = require('../mongo/mongoConn');
// const express = require('express');
// let port = 2000;
// let cors = require('cors');
// let bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// let PORT = process.env.PORT || 3000;
// dotenv.config();
// const url = 'mongodb+srv://test:test123@cluster0.rqzfmzk.mongodb.net/e-commerce?retryWrites=true&w=majority';

// const {MongoClient} = require("mongodb");

// const client = new MongoClient(url);
// // const dbConnect = require('./dbConnect');
// const app = express();

// app.use(cors())
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// async function getData (){
//     let result = await client.connect();
//     let db = result.db("BookMyShow");
// }

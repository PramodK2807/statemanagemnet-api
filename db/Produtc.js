const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    userId:String,
    img:String,
    company:String
})

module.exports = mongoose.model("products", productSchema)
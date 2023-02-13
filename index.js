const express = require('express');
const cors = require("cors")
let bodyParser = require('body-parser');
const dotenv = require('dotenv');
let PORT = process.env.PORT || 3000;
dotenv.config();
require("./db/config");
const User = require('./db/Users')
const Product = require('./db/Produtc')
const app = express();
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-commerce'


// app.use(express.json())
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    let data = result.toObject();
    delete data.password;
    // res.send(data)
    Jwt.sign({data},jwtKey,{expiresIn:"2h"},(err, token) => {
        res.send({data , auth:token});
    })
    console.log(data)


})


app.post("/login", async (req, res) => {
    // res.send(req.body);
    console.log(req.body)
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({user},jwtKey,{expiresIn:"2h"},(err, token) => {
                res.send({user , auth:token});

            })
           
        }
        else {
            res.send("User Not Found");
        }
    }
    else {
        res.send("User Not Found");
    }
})



app.post('/addProduct', async(req, res) => {
    let product = new Product(req.body)
    let result = await product.save()
    res.send(result);
})



app.get('/products', async(req, res) => {
    let products = await Product.find();
    if(products.length > 0) {
        res.send(products);
    }
    else{
        res.send("Product Not Found");
    }
})


app.delete("/products/:id", async (req, res) => {
    // res.send(req.params);
    const result =await Product.deleteOne({_id: req.params.id})
    res.send(result);
})


app.get('/products/:id', async(req, res) => {
    let result = await Product.findOne({_id:req.params.id})
    if(result){
        res.send(result)

    }
    else{
        res.send("Result not found")
    }
})

app.put('/products/:id', async(req, res) => {
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
        )
        res.send(result)

})

app.get('/search', async(req, res) => {
    let result = await Product.find({})
    res.send(result)
})


app.get('/search/:key', async (req, res) => {
    let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}}
        ]
    });

    res.send(result)
})


app.listen(PORT)
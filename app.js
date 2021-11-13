console.log('hello world')
const express =require('express')
const app= express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
require('dotenv/config')//with this we can import specific constants from .env file
const api = process.env.API_URL


//special section for calling middleware apis
app.use(bodyParser.json())//to parse json requests for the server
app.use(morgan('tiny'))//morgan is used to log requests, tiny is parameter



const productSchema = mongoose.Schema({
    name:String,
    image:String,
    countInStock:Number
})

const Product = mongoose.model('Product',productSchema)  //This is model

app.get(`${api}/products`,async (req,res)=>{//Broswer to Server
    const productList = await Product.find()
    if(!productList){
        res.status(500).json({success:false})
    }
    res.send(productList)
})

mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=>{
    console.log(err)
})

app.post(`${api}/products`,(req,res)=>{//client wil post request to the server in JSON form. But for server to understnd tat json we need a middleware such as body-parser
    const product = new Product({
        name:req.body.name,
        image:req.body.image,
        countInStock:req.body.countInStock
    })
    product.save().then((createdProduct=>{
        res.status(201).json(createdProduct)//tell client his product has been created
    })).catch((err)=>{
        res.status(500).json({
            error:err,
            success:false
        })
    })
})
app.listen(3000,()=>{//this is the server starting code
    console.log('server is running http://localhost:3000')
})

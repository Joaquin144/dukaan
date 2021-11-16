console.log('hello world')
const express =require('express')
const app= express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
require('dotenv/config')//with this we can import specific constants from .env file
const api = process.env.API_URL
//const Product = require('./models/product')
const productsRouter = require('./routers/products')
//special section for calling middleware apis
app.use(bodyParser.json())//to parse json requests for the server
app.use(morgan('tiny'))//morgan is used to log requests, tiny is parameter

//routers :----
app.use(`${api}/products`,productsRouter)


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


app.listen(3000,()=>{//this is the server starting code
    console.log('server is running http://localhost:3000')
})

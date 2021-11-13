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

app.get(`${api}/products`,(req,res)=>{//Broswer to Server
    const product = {
        id: 1,
        name: 'cheese',
        image: 'some_url'
    }
    res.send(product)
})

//mongoose.connect()

app.post(`${api}/products`,(req,res)=>{//client wil post request to the server in JSON form. But for server to understnd tat json we need a middleware such as body-parser
    const newProduct= req.body//jo bhi request hum bhejenge woh server mein product ban jayega. For example filing a complain report, filling a bio data ,giving exams etc.
    console.log(newProduct)
    res.send(newProduct)
})
app.listen(3000,()=>{//this is the server starting code
    console.log('server is running http://localhost:3000')
})

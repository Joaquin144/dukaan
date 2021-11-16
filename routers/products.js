const express = require('express')
const router = express.Router()
const {Product} = require('../models/product')//ise kahte hain object bana kar assign karna

router.get(`/`,async (req,res)=>{//Broswer to Server
    const productList = await Product.find()
    if(!productList){
        res.status(500).json({success:false})
    }
    res.send(productList)
})

router.post(`/`,(req,res)=>{//client wil post request to the server in JSON form. But for server to understnd tat json we need a middleware such as body-parser
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
module.exports = router
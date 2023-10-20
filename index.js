import express from "express";
const app = express();
app.use(express.json());
import dotenv from 'dotenv'
dotenv.config();
import mongoose, {model, Schema } from "mongoose";

const connectMongodb= async()=>{
    const response = await mongoose.connect(process.env.ECOMMERCE_URI)
    if(response){
        console.log("You have successfully connect with mongodb")
    }
}
connectMongodb()
const ProductSchema = new Schema({
     name: String,
     description: String,
     price: String,
     productImage: String,
     brand: String
})
const Product = mongoose.model('Product',ProductSchema)

app.post('/product', async (req,res)=>{
    const {name, description, price, productImage, brand}=req.body
    if (!name) 
    {
        return res.json({
            success: false,
            message: `Product name is required `
        });
    }
    if (!productImage) 
    {
        return res.json({
            success: false,
            message: `product image is required `
        });
    }

    if (!price) 
    {
        return res.json({
            success: false,
            message: `Price is required `
        });
    }

    if (!description) {
        return res.json({
            success: false,
            message: `description is required `
        });
    }

    if (!brand) {

        return res.json({
            success: false,
            message: `Brand is required `
        });
    }


    const productObject = new Product({
        name:name,
        description:description,
        price:price,
        productImage:productImage,
        brand:brand
    })
    const savedProduct = await productObject.save()
    res.json({
       " result":true,
        "product":savedProduct,
       " message":"product added successfully"

    })
})


app.get('/product', async (req,res)=>{
    const Products = await Product.find()
    res.json({
        " result":true,
         "prductc": Products,
        " message":"product added successfully"
     })


})
app.get('/product', async (req,res)=>{
    const {name}=req.query
    const productOne = await Product.findOne({name:name})
    res.json({
        "result":true,
         "prductc":productOne,
        "message":"This is your product"
 
     })


})


app.listen(5000, () => {
    console.log(`this server is running in port 5000`)
})
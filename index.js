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
const ProductSchema=new Schema({
     name: String,
     description: String,
     price: Number,
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
    if (!image) 
    {
        return res.json({
            success: false,
            message: `image url is required `
        });
    }

    if (!title) 
    {
        return res.json({
            success: false,
            message: `title is required `
        });
    }

    if (!description) {
        return res.json({
            success: false,
            message: `description is required `
        });
    }

    if (!price) {

        return res.json({
            success: false,
            message: `price is required `
        });
    }


    const productObject = new Product({
        name:name,
        description:description,
        price:price,
        productImage:productImage,
        brand:brand
    })
    const savedProduct= await productObject.save()
    res.json({
       " result":true,
        "product":savedProduct,
       " message":"product   added successfully"

    })
})



app.listen(5000, () => {
    console.log(`this server is running in port 5000`)
})
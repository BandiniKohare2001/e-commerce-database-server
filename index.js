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



app.listen(5000, () => {
    console.log(`this server is running in port 5000`)
})
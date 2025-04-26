import { json } from "express"
import { v2 as cloudinary } from "cloudinary";
import Product from "../model/Product.js";

//api/product/add
export const addProduct=async(req,res)=>{
    try{
    let productData=JSON.parse(req.body.productData);
    let images=req.files;
    let imageUrl=await Promise.all(images.map(async(item)=>{
        let result=await cloudinary.uploader.upload(item.path,{resource_type:"image"}) ;
        return result.secure_url;
    }));
    const data=await Product.create({...productData,images:imageUrl})
    res.status(200).json({
        success:true,
        response:data,
        message:"successfully uploaded"
    })
}
catch(error){
    res.status(500).json({
        success:false,
        message:"error in add product "+error.message
    });

}
}
//get productList   api/product/list
export const productList=async(req,res)=>{
    try {
        const products=await Product.find({});
        if(!products){
            return res.status(500).json({
                success:false,
                message:"product does not exist"
            })
        }
        return res.status(200).json({
            success:true,
            products,
            message:"successfully fetch"
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"error in a fetching product "+ error.message
        })
        
    }
}
//find product by id api/product/id
export const productById=async(req,res)=>{
    try {
        const {id}=req.body;
        const product=await Product.findById(id);
        if(!product){
            return res.status(500).json({
                success:false,
                message:"product does not exist"
            })
        }
        return res.status(200).json({
            success:true,
            product,
            message:"successfully fetch"
        })
        
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"error in a fetching  product  by id"+ error.message
        })
        
    }
}
//change stock api/product/stock
export const changeStock=async(req,res)=>{
    try {
        const{id,inStock}=req.body;
        const product=await Product.findByIdAndUpdate(id,{inStock});
        if(!product){
            return res.status(500).json({
                success:false,
                message:"error in changing stock"
            })
        }
        res.status(200).json({
            success:true,
            product,
            message:"successfully change stock"
        })

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"error in a fetching  product  by id"+ error.message
        })
        
    }
}
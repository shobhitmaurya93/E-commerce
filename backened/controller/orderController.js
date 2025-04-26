import Order from "../model/Order.js";
import Product from "../model/Product.js";
import mongoose from "mongoose";
//place Order cod ;/api/order/cod
export const placeOrderCOD=async(req,res)=>{
    try {
        const{userId,items,address}=req.body;
        if(!address||items.length==0){
           return res.status(500).json({
            success:false,
            message:"Invalid data"
           }) 
        }
        //calculate amount;
        let amount=await items.reduce(async(acc,item)=>{
            const product=await Product.findById(item.product);
            return (await acc)+product.price*item.quantity;
        },0);
        //add tak change 
        amount+=Math.floor(amount*0.02);
        const order=await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType:"cod"
        });
        if(order){
            return res.status(200).json({
                success:true,
                message:"order place successfully"
            })
        }
        else{
            return res.status(200).json({
                success:false,
                message:"error iin order placing"
            })

        }
    } catch (error) {
     res.status(500).json({
            success:false,
            message:error.message
           }) 
    }
}
//get order by User ID:api/order/user/id
export const getUserOrders = async (req, res) => {
    try {
        const { id } = req.params;

        const orders=await Order.find({
            userId:id,$or:[{paymentType:"cod"},{isPaid:true}]
            }).populate("items.product").sort({createdAt:-1})

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
//get all orders (for seller /admin): api/order/seller
export const getAllOrder=async(req,res)=>{
    try {
        const orders=await Order.find({
        }).populate("items.product").sort({createdAt:-1})
        res.status(200).json({
            success:true,
            orders
        })    
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        }) 
    }
}


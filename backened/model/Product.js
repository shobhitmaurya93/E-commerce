import mongoose from 'mongoose';
const productSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number ,required:true},
    oldPrice:{type:Number ,required:true},
    images:{type:Array ,required:true},
    inStock:{type:Boolean ,default:true},
    catName:{type:String, required:true}
},
{
    timestamps:true
})
const Product=mongoose.models.product ||mongoose.model("product",productSchema);
export default Product;
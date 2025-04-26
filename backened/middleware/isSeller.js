import jwt from 'jsonwebtoken'
import "dotenv/config"
const isSeller=async(req,res,next)=>{
    const{sellerToken}=req.cookies;
    try{
        if(!sellerToken){
            return res.status(400).json({
                success:false,
                message:"not authorized"
            })
        }
        const decodeSellerToken=jwt.verify(sellerToken,process.env.JWT_TOKEN);
        if(decodeSellerToken.email==process.env.SELLER_EMAIL){
            next();
        }
        else{
            return res.status(400).json({
                success:false,
                message:"not authorized"
            })
        }
    }
    catch(error){ 
        return res.status(400).json({
        success:false,
        message:"not authorized"+error.message
    })
    }
}
export default isSeller;
import "dotenv/config";
import jwt from "jsonwebtoken";
// api/seller/login
export const sellerLogin = async (req, res) => {
    try{
  const { email, password } = req.body;
  if (
    password === process.env.SELLER_PASSWORD &&
    email === process.env.SELLER_EMAIL
  ) {
    const token = jwt.sign({ email }, process.env.JWT_TOKEN, {
      expiresIn: "7d",
    });
    res.cookie("sellerToken", token, {
      httpOnly: true,
      secure: process.env.JWT_TYPE === "production",
      sameSite: process.env.JWT_TYPE === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
     return res.status(200).json({
      success: true,
      message: "Seller Successfully logged In",
    });
  }else{
    return res.status(500).json({
        success:false,
        message:"password and email doest not match"
    })
  }
}
catch(error){
    return res.status(500).json({
        success:false,
        message:"seller login failed "+ error.message
    })
}
};
//is seller auth api/sellerAuth
export const isSellerAuth=async(req,res)=>{
    try{
        return  res.status(200).json({
            success:true,
        })
    }
    catch(error){
        return res.status(200).json({
            success:true,
            message:error.message
        })
    }
}
export const sellerLogout=async(req,res)=>{
     try{
        res.clearCookie("sellerToken", {
            httpOnly: true,
            secure: process.env.JWT_TYPE === 'production',
            sameSite: process.env.JWT_TYPE === 'production' ? "none" : "strict",
        });
        return res.status(200).json({
            success:true,
            message:"logout"
        })
     }
     catch(error){
        return res.status(200).json({
            success:true,
            message:"error in logout"+error.message
        });
     }
}

import express from 'express';
import { isSellerAuth, sellerLogin, sellerLogout } from '../controller/SellerController.js';
import isSeller from '../middleware/isSeller.js';
const sellerRouter=express.Router();
sellerRouter.post("/login",sellerLogin);
sellerRouter.get("/is-auth",isSeller,isSellerAuth);
sellerRouter.get("/logout",sellerLogout);
export default sellerRouter;

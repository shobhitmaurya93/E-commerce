import express from 'express'
import authUser from '../middleware/authUser.js';
import { updateCart } from '../controller/cartController.js';
const cartRouter=express.Router();
cartRouter.put("/update",authUser,updateCart);
export default cartRouter;
import express from 'express'
import authUser from '../middleware/authUser.js';
import { addAddress, getAddress } from '../controller/addressController.js';
const addressRouter=express.Router();
addressRouter.post("/add",authUser,addAddress);
addressRouter.get("/get/:userId",authUser,getAddress);
export default addressRouter;

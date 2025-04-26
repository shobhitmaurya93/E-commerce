import express from 'express';
import authUser from '../middleware/authUser.js';
import { getAllOrder, getUserOrders, placeOrderCOD } from '../controller/orderController.js';
import isSeller from '../middleware/isSeller.js';
const orderRouter =express.Router();
orderRouter.post("/cod",authUser,placeOrderCOD);
orderRouter.get("/user/:id",authUser,getUserOrders);
orderRouter.get("/seller",isSeller,getAllOrder);
export default orderRouter;




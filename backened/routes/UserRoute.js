import express from 'express';
import { isAuth, login, logout, register } from '../controller/UserController.js';
import authUser from '../middleware/authUser.js';
const UserRoute=express.Router();
UserRoute.post("/register",register);
UserRoute.post("/login",login);
UserRoute.get("/is-auth",authUser,isAuth);
UserRoute.get("/logout",authUser,logout)
export default UserRoute;
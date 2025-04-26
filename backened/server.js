import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import dbConnect from './config/database.js';
import "dotenv/config";
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './config/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/order.Route.js';
import UserRoute from './routes/UserRoute.js';

const app = express();
const port = process.env.PORT || 4000;

// Allowed multiple origins
const allowedOrigins = ['http://localhost:5173'];

// Middlewares
dbConnect();
connectCloudinary();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Routes
app.use("/api/user", UserRoute);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);       // ✅ fixed
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);     // ✅ fixed

// Server listener
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

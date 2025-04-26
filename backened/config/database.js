import mongoose from 'mongoose';
import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();
const dbConnect = () => {
    mongoose.connect(`${process.env.MONGODB_URL}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("✅ DB Connection Successful");
    })
    .catch((error) => {
        console.log("ssue in DB Connection");
        console.error(error.message);
        console.log(`${process.env.MONGODB_URL}`);
        process.exit(1);
    });
};

export default dbConnect;


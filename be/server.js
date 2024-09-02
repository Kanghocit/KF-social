import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routers/userRoutes.js'
import postRoutes from './routers/postRoutes.js'


dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json()); // to prase  Json data in the req.body
app.use(express.urlencoded({ extended: false})); // to prase from data in the req.body
app.use(cookieParser());


// routes

app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);



app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

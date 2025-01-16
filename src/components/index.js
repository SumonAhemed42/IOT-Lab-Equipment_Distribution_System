import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "I’m coming from backend",
        success: true,
    })
})

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
    origin: process.env.URL,
    credentials: true
}
app.use(cors(corsOptions));

server.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});
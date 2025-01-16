import mongoose from "mongoose";

const connectDB = async (dbName?: string) => {
    const primaryDB = "accounts";
    try {
        await mongoose.connect(`mongodb://localhost:27017/${dbName ? dbName : primaryDB}`);
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
};

export default connectDB;
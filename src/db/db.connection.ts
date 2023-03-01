import mongoose from 'mongoose';

// Connet to MongoDB
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('MongoDB Connected');
    } catch (error: any) {
        console.error(error.message);
        process.exit(1);
    }
};
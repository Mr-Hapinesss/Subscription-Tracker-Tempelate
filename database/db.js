import mongoose from 'mongoose';
import { Mongo_URI, NODE_ENV } from '../Config/env.js';

if(!Mongo_URI){
    throw new Error('Please define Mongodb_URI environment variable inside .env.<development/production>');
}

const connectDB = async () => {
    try {
        await mongoose.connect(Mongo_URI);
        console.log(`MongoDB connected in ${NODE_ENV} successfully`)
    } catch (error) {
        console.error('error connecting to database: ', error);
        process.exit(1);
    }
}

export default connectDB;
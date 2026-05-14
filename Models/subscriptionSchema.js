import mongoose from 'mongoose';

const subscriptionSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        minLength: [0, 'Price must be greater than 0'],
    },
    currency: {
        type: String,
        enum: ['USD', 'KES', 'EUR'],
        default: 'USD',
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    category: {
        type: String,
        enum: ['sports', 'news', 'lifestyle', 'finance', 'politics'],
        required: true,
    },
    paymentMethod:{
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: true, vali
    }


}, { timestamps: true });

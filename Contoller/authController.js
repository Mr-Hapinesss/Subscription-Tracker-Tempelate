import mongoose from "mongoose";
import User from "../Models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRY, JWT_SECRET } from "../Config/env.js";

export const signUp = async ( req, res, next ) => {
    const session = await mongoose.startSession(); //mongoose transaction session ... Atomic (all or none)
    session.startTransaction();

    try {
        // Creating a new user
        const { name, email, password } = req.body;

        // Check if the user exists
        const userExists = await User.findOne({email});
        if (userExists) {
            const error = new Error('User already exists');
            error.statusCode= 409;
            throw error;
        }

        // If not continue to creating user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create([{ name, email, password: hashedPassword }], {session});

        const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, { expiresIn: JWT_EXPIRY});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUsers[0],
            }
        })

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}


export const signIn = async ( req, res, next ) => {

    try {
        
        const { email, password } = req.body;

        // Check if exists
        const user = await User.findOne({email});
        if(!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        //If he does verify password
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) {
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({userId: user._id}, JWT_SECRET, { expiresIn: JWT_EXPIRY});
        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                token,
                user
            }
        });


    } catch (error) {
        next(error);
    }
}


export const signOut = async ( req, res, next ) => {}
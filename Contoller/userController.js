import User from "../Models/userSchema.js";

//Fetch all users from db -- admin only
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json({ success: true, data: users});

    } catch (error) {
        next(error);
    }
}

// Fetch one User -- admin only
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('password'); // Finds the user by id and omits the password field

        if(!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: user});

    } catch (error) {
        next(error);
    }
}

// Create a new user -- admin only
export const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const newUser = await User.create({ name, email, password }); // This will create a new user in the database

        res.status(201).json({ success: true, data: newUser});

    } catch (error) {
        next(error);
    }
}

// Update a user -- authenticated users only
export const updateUser = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true }); // {new: true} updates the user and returns the updated user

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
}

// Delete a user -- authenticated users only
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id); // This will delete the user from the database
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
}

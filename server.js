// importing dependencies

import express from 'express';
import { PORT } from './Config/env.js';
import connectDB from './database/db.js';


//Routes
import userRouter from './Routes/userRoutes.js';
import authRouter from './Routes/authRoutes.js';
import subscriptionRouter from './Routes/subscriptionRoutes.js';

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);


app.get("/", (req, res) =>{ // this is the home route
    res.send("This is the subscription tracker's API");
});

app.listen(PORT, async () =>{ // this is the listening port for the server
    console.log(`API is running on port http://localhost:${PORT}`);

    await connectDB();
});

export default app;

// importing dependencies

import express from 'express';
import { PORT } from './Config/env.js';
import connectDB from './database/db.js';


//Routes
import userRouter from './Routes/userRoutes.js';
import authRouter from './Routes/authRoutes.js';
import subscriptionRouter from './Routes/subscriptionRoutes.js';
import errorMiddleware from './Middleware/error.js';
import cookieParser from 'cookie-parser';

const app = express();

//built-in muddlewares
app.use(express.json);
app.use(express.urlencoded({extended: false}));

app.use(cookieParser());


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

//error middleware
app.use(errorMiddleware);

app.get("/", (req, res) =>{ // this is the home route
    res.send("This is the subscription tracker's API");
});

app.listen(PORT, async () =>{ // this is the listening port for the server
    console.log(`API is running on port http://localhost:${PORT}`);

    await connectDB();
});

export default app;

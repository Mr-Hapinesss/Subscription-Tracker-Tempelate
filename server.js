// importing dependencies

import express from 'express';
import { PORT } from './Config/env.js';
const app = express(); 


app.get("/", (req, res) =>{ // this is the home route
    res.send("This is the subscription tracker's API");
});

app.listen(PORT, () =>{ // this is the listening port for the server
    console.log(`API is running on port http://localhost:${PORT}`);
});

export default app;
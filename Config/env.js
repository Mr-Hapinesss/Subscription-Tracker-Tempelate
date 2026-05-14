import { config } from 'dotenv'; // import the config function from the dotenv package

config( { path: `.env.${process.env.NODE_ENV || 'development'}` } ); 
// call the config function with the path to the .env file based on the current NODE_ENV environment variable, defaulting to 'development' if NODE_ENV is not set

export  const { PORT, NODE_ENV, Mongo_URI } = process.env; 
// export the PORT variable from the process.env object, which will be used to set the listening port for the server
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/users.js';
import dotenv from 'dotenv';

// Use .env variables 
dotenv.config()
const PORT = process.env.PORT;
const CONNECTION_URL = process.env.URL

// use express
const app = express();
app.use(express.json());

// use cors
app.use(cors());

// Listen on port 3000 and connect to Mongo database
app.listen(PORT, () => {
    mongoose.connect(CONNECTION_URL)
    .then(()=> {
        console.log(`Connected to Mongo DB, and Server running on port: http://localhost:${PORT}`);
    })
    .catch(error=> console.log(error))
});

// get route
app.get('/', (req, res) => res.send('Benvenuto nella homepage'));
app.use('/users', router);
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authenticationRoute from './routes/AuthenticationRoute';
import userRoute from './routes/UserRoute';

const server = express();

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true},
    () => console.log('Connected to database')
);

server.use(express.json());

server.use('/api/user', authenticationRoute);
server.use('/api/user', userRoute);

server.listen(10080, () => console.log('Back-end server started'));

module.exports = server;
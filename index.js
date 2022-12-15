import express from 'express';
import 'dotenv/config';
import { configureDatabase } from './src/configs/DbConfig.js';
import userRouter from './src/routers/UserRouter.js';


const app=express();
app.use(express.json());
app.use(userRouter);
configureDatabase();
app.listen(process.env.SERVER_PORT,()=>{
    console.log(`Server is running at ${process.env.SERVER_PORT}`)
})
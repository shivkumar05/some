import mongoose from "mongoose";
import 'dotenv/config';

export function configureDatabase() {
    mongoose.connect(process.env.DB_URL);
    const dbConnection=mongoose.connection;
    dbConnection.on('error',()=>{
        console.log('Error in db connection')
    });
    dbConnection.once('connected',()=>{
        console.log('Db Connected');
    });
}
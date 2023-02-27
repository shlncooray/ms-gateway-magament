/*
 * File name: dbConfig.js
 * Purpose: Mongodb database connection
 * Created on Wed Feb 21 2023
 *
 * Copyright (c) 2023 Shelan Cooray
 * Author: shlncooray@gmail.com
 */

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//Mongose Connection
export const mongoDbConnection = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(`${process.env.MONGO_DB_URI}/${process.env.DB_NAME}`, {
        useNewUrlParser: true
    }).then(() => {
        process.stdout.write(`Successfully connect to MongoDB. \n`);
    }).catch(err => console.error("Connection error", err));
}
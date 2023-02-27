/*
 * File name: app.js
 * Purpose: MS-Gateway REST API application entry point
 * Created on Wed Feb 22 2023
 *
 * Copyright (c) 2023 Shelan Cooray
 * Author: shlncooray@gmail.com
 */

import express from "express";
import dotenv from "dotenv";

import { bodyParserConfigs } from "./src/config/bodyParser.js";
import { mongoDbConnection } from "./src/config/dbConfig.js";
import { routes } from "./src/routes/route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

mongoDbConnection();
bodyParserConfigs(app);

routes(app);

app.get("/", (_req, res) => {
    res.send(`MS Gateway API server is running on port ${PORT}`);
});

app.listen(PORT, ()=> {
    process.stdout.write(`MS Gateway API server is running on port ${PORT} \n`);
});
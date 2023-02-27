/*
 * File name: body-parser.js
 * Purpose: Setup REST API req/res content to be support on JSON or URL Encoded format
 * Created on Wed Feb 21 2023
 *
 * Copyright (c) 2023 Shelan Cooray
 * Author: shlncooray@gmail.com
 */

import bodyParser from "body-parser";

//BodyParse Setup
export const bodyParserConfigs = (app) => {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
}

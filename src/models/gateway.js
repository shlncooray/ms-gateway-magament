/*
 * File name: gateway.js
 * Purpose: Mongoose Schema file for 'Gateway'
 * Created on Wed Feb 20 2023
 *
 * Copyright (c) 2023 Shelan Cooray
 * Author: shlncooray@gmail.com
 */

import mongoose, { Schema } from "mongoose";

const GatewaySchema = new Schema({
    serialNumber: {
        type: String,
        required: 'An unique serial number is required',
        unique: true
    },
    name: {
        type: String,
        required: 'Gateway name is required'
    },
    ipv4Address: {
        type: String,
        required: 'IPv4 Address is required'
    },
    devices: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Device",
        }
    ]
}, { versionKey: false });

export const Gateway = mongoose.model("Gateway", GatewaySchema);
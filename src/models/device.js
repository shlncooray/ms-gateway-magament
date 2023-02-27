/*
 * File name: device.js
 * Purpose: Mongoose Schema file for 'Device'
 * Created on Wed Feb 20 2023
 *
 * Copyright (c) 2023 Shelan Cooray
 * Author: shlncooray@gmail.com
 */

import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const DeviceSchema = new Schema({
    uuid: {
        type: String,
        default: uuidv4()
    },
    vendor: {
        type: String,
        required: 'Vendor name is required'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "Offline"
    }
}, { versionKey: false });

export const Device = mongoose.model("Device", DeviceSchema);
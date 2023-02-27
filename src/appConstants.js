/*
 * File name: appConstants.js
 * Purpose: Application constants to be use across the application code
 * Created on Wed Feb 22 2023
 *
 * Copyright (c) 2023 Shelan Cooray
 * Author: shlncooray@gmail.com
 */

export const HTTP_CODES = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    CONFLICT: 409,
    SERVER_ERROR: 500
}

export const MONGODB_CODES = {
    DUPLICATE: 11000
}

export const MAX_DEVICES_PER_GATEWAY = 10;

export const DEVICE_ACTIONS = {
    ADD: 'add',
    REMOVE: 'remove'
}
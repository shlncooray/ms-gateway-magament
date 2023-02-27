/*
 * File name: util.js
 * Purpose: Shared utility functions
 * Created on Wed Feb 20 2023
 *
 * Copyright (c) 2023 Shelan Cooray
 * Author: shlncooray@gmail.com
 */

import { HTTP_CODES, MONGODB_CODES } from "../appConstants.js";

const ipv4Regex =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

/**
 * Generate an error response with Error code, failure and error message
 * @param {Object} response
 * @param {Object} error
 * @returns
 */
export const serverError = (response, error) => {
  if (error.code == MONGODB_CODES.DUPLICATE) {
    return response.status(HTTP_CODES.CONFLICT).json({
      success: false,
      msg: `Duplicate key found for ${JSON.stringify(error.keyValue)}`,
    });
  }
  return response
    .status(HTTP_CODES.SERVER_ERROR)
    .json({ success: false, msg: error.message });
};

/**
 * Evaluate the IPv4 address validations
 * @param {string} ipv4Address
 * @returns an object with { isValid: boolean, message: string }
 */
export const validateIPv4Address = (ipv4Address) => {
  if (ipv4Regex.test(ipv4Address)) {
    return { isValid: true, message: null };
  }
  return { isValid: false, message: "Invalid IPv4 Address" };
};

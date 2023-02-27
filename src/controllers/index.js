/*
 * File name: index.js
 * Purpose: 
 * Created on Wed Feb 20 2023
 *
 * Copyright (c) 2023 Shelan Cooray
 * Author: shlncooray@gmail.com
 */

import {
  getGateways,
  getGatewayById,
  createGateway,
  patchGateway,
  updateGateway,
  deleteGateway,
} from "./gatewayController.js";
import {
  getDevices,
  createDevice,
  updateDevice,
  getDeviceById,
  deleteDevice,
} from "./deviceController.js";

export {
  getDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
  getGateways,
  getGatewayById,
  createGateway,
  patchGateway,
  updateGateway,
  deleteGateway,
};

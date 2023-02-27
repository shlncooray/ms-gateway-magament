/*
 * File name: route.js
 * Purpose: MS-Gateway REST API routes
 * Created on Wed Feb 22 2023
 *
 * Copyright (c) 2023 Shelan Cooray
 * Author: shlncooray@gmail.com
 */

import {
  createDevice,
  createGateway,
  deleteGateway,
  getDevices,
  getGateways,
  updateGateway,
  getGatewayById,
  patchGateway,
  deleteDevice,
  getDeviceById,
  updateDevice,
} from "../controllers/index.js";

export const routes = async (app) => {
  await app.route("/device").get(getDevices).post(createDevice);

  app
    .route("/device/:deviceId")
    .get(getDeviceById)
    .put(updateDevice)
    .delete(deleteDevice);

  app.route("/gateway").get(getGateways).post(createGateway);

  app
    .route("/gateway/:gatewayId")
    .get(getGatewayById)
    .put(updateGateway)
    .patch(patchGateway)
    .delete(deleteGateway);
};

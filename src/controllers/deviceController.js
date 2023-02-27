/*
 * File name: deviceController.js
 * Purpose: Peripheral Device related REST API controllers
 * Created on Wed Feb 20 2023
 *
 * Copyright (c) 2023 Shelan Cooray
 * Author: shlncooray@gmail.com
 */

import { DeviceService } from "../services/deviceService.js";

export const getDevices = async (req, res) => {
  const deviceService = new DeviceService(req, res);
  return await deviceService.getDevices();
};

export const getDeviceById = async (req, res) => {
  const deviceService = new DeviceService(req, res);
  return await deviceService.getDeviceById();
};

export const createDevice = async (req, res) => {
  const deviceService = new DeviceService(req, res);
  return await deviceService.createDevice();
};

export const updateDevice = async (req, res) => {
  const deviceService = new DeviceService(req, res);
  return await deviceService.updateDevice();
};

export const deleteDevice = async (req, res) => {
  const deviceService = new DeviceService(req, res);
  return await deviceService.deleteDevice();
};

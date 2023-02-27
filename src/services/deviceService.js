/*
 * File name: deviceService.js
 * Purpose: Device related service functions
 * Created on Wed Feb 20 2023
 *
 * Copyright (c) 2023 Shelan Cooray
 * Author: shlncooray@gmail.com
 */

import { HTTP_CODES } from "../appConstants.js";
import { Device, Gateway } from "../models/index.js";
import { serverError } from "../util/util.js";

/**
 * Class to provide the Peripheral Device related REST operations business logic
 */
export class DeviceService {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  /**
   * Get all devices
   */
  getDevices = async () => {
    try {
      const devices = await Device.find().exec();
      this.res
        .status(HTTP_CODES.SUCCESS)
        .json({ data: [...devices], success: true });
    } catch (error) {
      serverError(this.res, err);
    }
  };

  /**
   * Get a single device by given ID
   */
  getDeviceById = async () => {
    try {
      let device = await Device.findById(this.req.params.deviceId).exec();
      if (device == null) {
        device = {};
      }
      this.res.status(HTTP_CODES.SUCCESS).json({ data: device, success: true });
    } catch (error) {
      serverError(this.res, err);
    }
  };

  /**
   * Create a new device
   */
  createDevice = async () => {
    try {
      //Creating device
      const device = await Device.create(this.req.body);

      // Attaching device to Gateway if gatewayId provided
      if (device._id && this.req.body.gatewayId) {
        const response = await this._addDeviceToGateway(this.req, device._id);
        if (response.error) {
          return this.res.status(HTTP_CODES.CONFLICT).json({
            data: device,
            success: false,
            message: `Device created and but ${response.error}`,
          });
        }
      }
      return this.res.status(HTTP_CODES.SUCCESS).json({
        data: device,
        success: true,
        message: `Device created and connected successfully`,
      });
    } catch (err) {
      serverError(this.res, err);
    }
  };

  /**
   * Update a single device by given ID
   */
  updateDevice = async () => {
    try {
      const gateway = await Device.findByIdAndUpdate(
        { _id: this.req.params.deviceId },
        this.req.body,
        { new: true }
      ).exec();
      this.res.status(HTTP_CODES.SUCCESS).json({
        data: gateway,
        success: true,
        message: `Device is updated successfully!`,
      });
    } catch (err) {
      serverError(this.res, err);
    }
  };

  /**
   * Remove device from Gateway(if attached) and delete a single device by given ID
   */
  deleteDevice = async () => {
    try {
      await this._removeDeviceFromGateway(this.req);
      await Device.deleteOne({ _id: this.req.params.deviceId }).exec();
      this.res.status(HTTP_CODES.SUCCESS).json({
        data: {},
        message: `Successfully deleted Device!`,
        success: true,
      });
    } catch (err) {
      serverError(this.res, err);
    }
  };

  // Private Functions
  _addDeviceToGateway = async (req, deviceId) => {
    const gateway = await Gateway.findById(req.body.gatewayId).exec();
    if (!gateway) {
      return {
        error: `No such a Gateway ID is found ${req.body.gatewayId}`,
        success: null,
      };
    }
    if (gateway.devices.length > 10) {
      return {
        error:
          "Couldn't complete the connecting the device to the Gateway, because already 10 devices connected!",
        success: null,
      };
    }
    await Gateway.findByIdAndUpdate(
      { _id: req.body.gatewayId },
      { $push: { devices: deviceId } },
      { new: true, useFindAndModify: false }
    ).exec();
    return {
      error: null,
      success: true,
    };
  };

  _removeDeviceFromGateway = async (req) => {
    const gateway = await Gateway.findOne({
      devices: req.params.deviceId,
    }).exec();
    
    if (gateway) {
      const gatewayId = gateway._id.toString();

      return await Gateway.findByIdAndUpdate(
        { _id: gatewayId },
        { $pull: { devices: req.params.deviceId } },
        { new: true, useFindAndModify: false }
      ).exec();
    }
  };
}

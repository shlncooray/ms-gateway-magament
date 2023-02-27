/*
 * File name: gatewayService.js
 * Purpose: Gateway related service functions
 * Created on Wed Feb 20 2023
 *
 * Copyright (c) 2023 Shelan Cooray
 * Author: shlncooray@gmail.com
 */

import {
  DEVICE_ACTIONS,
  HTTP_CODES,
  MAX_DEVICES_PER_GATEWAY,
} from "../appConstants.js";
import { Gateway } from "../models/index.js";
import { serverError, validateIPv4Address } from "../util/util.js";

/**
 * Class to provide the Gateway related REST operations business logic
 */
export class GatewayService {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  /**
   * Get all gateways
   */
  getGateways = async () => {
    try {
      const gateway = await Gateway.find()
        .populate({ path: "devices", select: "uuid vendor status createdDate" })
        .exec();
      this.res
        .status(HTTP_CODES.SUCCESS)
        .json({ data: [...gateway], success: true });
    } catch (err) {
      serverError(this.res, err);
    }
  };

  /**
   * Get a single gateway by given ID
   */
  getGatewayById = async () => {
    try {
      let gateway = await Gateway.findById(this.req.params.gatewayId)
        .populate({ path: "devices", select: "uuid vendor status createdDate" })
        .exec();
      if(gateway == null) {
        gateway = {}
      }
      this.res
        .status(HTTP_CODES.SUCCESS)
        .json({ data: gateway, success: true });
    } catch (err) {
      serverError(this.res, err);
    }
  };

  /**
   * Create a single gateway
   */
  createGateway = async () => {
    let  ipv4AddressValidObject = {};

    try {
      if(this.req.body.ipv4Address) {
        ipv4AddressValidObject = validateIPv4Address(this.req.body.ipv4Address);
      }

      if(!ipv4AddressValidObject.isValid) {
        return this.res.status(HTTP_CODES.BAD_REQUEST).json({
            success: false,
            message: `${ipv4AddressValidObject.message}`,
          });
      }

      const gateway = await Gateway.create(this.req.body);
      return this.res.status(HTTP_CODES.SUCCESS).json({
        data: gateway,
        success: true,
        message: `Gateway created successfully!`,
      });
    } catch (err) {
      serverError(this.res, err);
    }
  };

  /**
   * Update a single gateway by given ID
   */
  updateGateway = async () => {
    try {
      const gateway = await Gateway.findByIdAndUpdate(
        { _id: this.req.params.gatewayId },
        this.req.body,
        { new: true }
      ).exec();
      this.res.status(HTTP_CODES.SUCCESS).json({
        data: gateway,
        success: true,
        message: `Gateway updated successfully!`,
      });
    } catch (err) {
      serverError(this.res, err);
    }
  };

  /**
   * Add new devices to a given gateway by providing device ID
   */
  patchGateway = async () => {
    const req = this.req;
    const res = this.res;
    try {
      // Adding device existing device/s to an Gateway
      if (
        req.body.type === DEVICE_ACTIONS.ADD &&
        req.body.devices &&
        req.params.gatewayId
      ) {
        for (const device of req.body.devices) {
          const response = await this._addDeviceToGateway(req, device);
          if (response.error) {
            return res.status(HTTP_CODES.CONFLICT).json({
              data: device,
              success: false,
              message: response.error,
            });
          }
        }

        return res.status(HTTP_CODES.SUCCESS).json({
          data: req.body.devices,
          success: true,
          message: `Device/s connected to Gateway successfully!`,
        });
      }

      // Removing device (not deleting) existing device to an Gateway
      if (
        req.body.type === DEVICE_ACTIONS.REMOVE &&
        req.body.devices &&
        req.params.gatewayId
      ) {
        for (const device of req.body.devices) {
          await this._removeDeviceFromGateway(req, device);
        }

        return res.status(HTTP_CODES.SUCCESS).json({
          data: req.body.devices,
          success: true,
          message: `Device/s removed from Gateway successfully!`,
        });
      }
    } catch (err) {
      serverError(res, err);
    }
  };

  /**
   * Delete a single device by given ID
   */
  deleteGateway = async () => {
    try {
      const checkGateway = await Gateway.findById(
        this.req.params.gatewayId
      ).exec();
      if (checkGateway.devices.length > 0) {
        return this.res.status(HTTP_CODES.CONFLICT).json({
          success: false,
          message: `Before you delete the gateway makesure to remove all linked devices from Gateway!`,
        });
      }

      const gateway = await Gateway.deleteOne({
        _id: this.req.params.gatewayId,
      }).exec();
      return this.res.status(HTTP_CODES.SUCCESS).json({
        data: gateway,
        success: true,
        message: `Gateway is deleted successfully!`,
      });
    } catch (err) {
      serverError(this.res, err);
    }
  };

  // private function
  _addDeviceToGateway = async (req, deviceId) => {
    const gateway = await Gateway.findById(req.params.gatewayId).exec();
    if (gateway.devices.length >= MAX_DEVICES_PER_GATEWAY) {
      return {
        error:
          "Couldn't complete the connecting the device to the Gateway, because already 10 devices connected!",
        success: null,
      };
    }

    await Gateway.findByIdAndUpdate(
      { _id: req.params.gatewayId },
      { $push: { devices: deviceId } },
      { new: true, useFindAndModify: false }
    ).exec();

    return {
      error: null,
      success: true,
    };
  };

  _removeDeviceFromGateway = async (req, deviceId) => {
    return await Gateway.findByIdAndUpdate(
      { _id: req.params.gatewayId },
      { $pull: { devices: deviceId } },
      { new: true, useFindAndModify: false }
    ).exec();
  };
}

/*
 * File name: max-devices.test.js
 * Purpose: API Test for adding more than 10 Devices to a Gateway
 * Created on Wed Feb 22 2023
 *
 * Copyright (c) 2023 Shelan Cooray
 * Author: shlncooray@gmail.com
 */

import request from "supertest";
import dotenv from "dotenv";

dotenv.config();

const baseURL = `http://localhost:${process.env.PORT}`;

describe("Max device attached test suite", () => {
  let newGateway = {};
  let newDeviceIds = [];
  let newElevenathDevice = {};

  const gatewayPost = {
    serialNumber: "SFJNAM678245",
    name: "Niel-Amastrong",
    ipv4Address: "172.1.1.1"
  };

  const gatewayPatchAdd = {
    type: "add",
    devices: [],
  };

  const devicesPostArray = [
    {
      vendor: "TP-Link1",
      status: "Offline",
    },
    {
      vendor: "TP-Link2",
      status: "Offline",
    },
    {
      vendor: "TP-Link3",
      status: "Offline",
    },
    {
      vendor: "TP-Link4",
      status: "Offline",
    },
    {
      vendor: "TP-Link5",
      status: "Offline",
    },
    {
      vendor: "TP-Link6",
      status: "Offline",
    },
    {
      vendor: "TP-Link7",
      status: "Offline",
    },
    {
      vendor: "TP-Link8",
      status: "Offline",
    },
    {
      vendor: "TP-Link9",
      status: "Offline",
    },
    {
      vendor: "TP-Link10",
      status: "Offline",
    },
  ];

  const eleventhDevice = {
    vendor: "TP-Link11",
    status: "Offline",
  };

  beforeAll(async () => {
    // Adding a new gateway
    newGateway = await request(baseURL).post("/gateway").send(gatewayPost);

    // Adding a new 10 devices
    for (const device of devicesPostArray) {
      const newDevice = await request(baseURL).post("/device").send(device);
      newDeviceIds.push(newDevice.body.data._id);
    }

    // Attaching a new 10 devices to new gateway
    for (const deviceId of newDeviceIds) {
      gatewayPatchAdd.devices.push(deviceId);
      await request(baseURL)
        .patch(`/gateway/${newGateway.body.data._id}`)
        .send(gatewayPatchAdd);
    }
  });

  afterAll(async () => {
    // Remove from gateway and deleting all created devices
    for (const deviceId of newDeviceIds) {
      await request(baseURL).delete(`/device/${deviceId}`);
    }
    // Delete Eleventh Device 
    await request(baseURL).delete(`/device/${newElevenathDevice.body.data._id}`);
    // Delete Gateway
    await request(baseURL).delete(`/gateway/${newGateway.body.data._id}`);
  });

  it("should be device length equals to 10", async () => {
    const response = await request(baseURL).get(
      `/gateway/${newGateway.body.data._id}`
    );
    expect(response.body.data.devices.length == 10).toBe(true);
  });

  it("should return 409 status code since already 10 devices attached", async () => {
    newElevenathDevice = await request(baseURL).post("/device").send(eleventhDevice);
    gatewayPatchAdd.devices.push(newElevenathDevice.body.data._id);
    const response = await request(baseURL)
      .patch(`/gateway/${newGateway.body.data._id}`)
      .send(gatewayPatchAdd);
    expect(response.statusCode).toBe(409);
  });
});

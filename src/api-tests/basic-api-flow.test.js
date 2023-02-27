/*
 * File name: basic-api-flow.test.js
 * Purpose: MS-Gateway REST API Basic test flow
 * Created on Wed Feb 22 2023
 *
 * Copyright (c) 2023 Shelan Cooray
 * Author: shlncooray@gmail.com
 */

import request from "supertest";
import dotenv from "dotenv";

dotenv.config();

const baseURL = `http://localhost:${process.env.PORT}`;

describe("Gateway REST API End Points: both /gateway and /device test suite", () => {
  let newGateway = {};
  let newDevice = {};

  const gatewayPost = {
    serialNumber: "MKJNAM678245",
    name: "Mcanzi-top1",
    ipv4Address: "255.255.255.255",
  };

  const gatewayPut = {
    name: "Apallo-voy",
    ipv4Address: "255.255.255.254",
  };

  const gatewayPatchAdd = {
    type: "add",
    devices: [],
  };

  const gatewayPatchRemove = {
    type: "remove",
    devices: [],
  };

  const gatewayWithWrongIp = {
    serialNumber: "MKJNAM678245",
    name: "Mcanzi-top1",
    ipv4Address: "255.255.255.256",
  };

  const devicePost = {
    vendor: "TP-Link",
    status: "Offline",
  };

  beforeAll(async () => {
    newGateway = await request(baseURL).post("/gateway").send(gatewayPost);
    newDevice = await request(baseURL).post("/device").send(devicePost);
  });
  afterAll(async () => {
    await request(baseURL).delete(`/device/${newDevice.body.data._id}`);
    await request(baseURL).delete(`/gateway/${newGateway.body.data._id}`);
  });

  // Create new Gateway
  it("should return 200", async () => {
    const response = await request(baseURL).get("/gateway");
    expect(response.statusCode).toBe(200);
  });

  // Try to create a new Gateway with same Serial Number
  it("should return 409 since trying to add gateway with duplicate serialNumber", async () => {
    const response = await request(baseURL).post("/gateway").send(gatewayPost);
    expect(response.statusCode).toBe(409);
  });

  // Try to create a new Gateway with invalid IPv4Address
  it("should return 400 since trying to add gateway with invalid ipv4address", async () => {
    const response = await request(baseURL)
      .post("/gateway")
      .send(gatewayWithWrongIp);
    expect(response.statusCode).toBe(400);
  });

  // GET All Gateways
  it("should return gateways", async () => {
    const response = await request(baseURL).get("/gateway");
    expect(response.body.data.length >= 1).toBe(true);
  });

  // Create a new Devices
  it("should equal to updated name and return 200", async () => {
    const response = await request(baseURL)
      .put(`/gateway/${newGateway.body.data._id}`)
      .send(gatewayPut);
    expect(response.body.data.name).toEqual("Apallo-voy");
    expect(response.statusCode).toBe(200);
  });


  // Add newly created Device to a Gateway
  it("should return 200", async () => {
    gatewayPatchAdd.devices.push(newDevice.body.data._id);
    const response = await request(baseURL)
      .patch(`/gateway/${newGateway.body.data._id}`)
      .send(gatewayPatchAdd);
    expect(response.statusCode).toBe(200);
  });

  // GET a Gateway by ID and check for attached device available
  it("should device length equals to 1", async () => {
    const response = await request(baseURL).get(
      `/gateway/${newGateway.body.data._id}`
    );
    expect(response.body.data.devices.length == 1).toBe(true);
  });

  // Remove a device from a Gateway
  it("should return 200", async () => {
    gatewayPatchRemove.devices.push(newDevice.body.data._id);
    const response = await request(baseURL)
      .patch(`/gateway/${newGateway.body.data._id}`)
      .send(gatewayPatchRemove);
    expect(response.statusCode).toBe(200);
  });

  // GET a Gateway by ID after removing the attached device
  it("should device length equals to 0", async () => {
    const response = await request(baseURL).get(
      `/gateway/${newGateway.body.data._id}`
    );
    expect(response.body.data.devices.length == 0).toBe(true);
  });
});

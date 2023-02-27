/*
 * File name: gatewayController.js
 * Purpose: Gateway related REST API controllers
 * Created on Wed Feb 20 2023
 *
 * Copyright (c) 2023 Shelan Cooray
 * Author: shlncooray@gmail.com
 */

import { GatewayService } from "../services/gatewayService.js";

export const getGateways = async (req, res) => {
    const gatewayService = new GatewayService(req, res);
    return await gatewayService.getGateways();
};

export const getGatewayById = async (req, res) => {
    const gatewayService = new GatewayService(req, res);
    return await gatewayService.getGatewayById();
};

export const createGateway = async (req, res) => {
    const gatewayService = new GatewayService(req, res);
    return await gatewayService.createGateway();
};

export const updateGateway = async (req, res) => {
    const gatewayService = new GatewayService(req, res);
    return await gatewayService.updateGateway();
};

export const patchGateway = async (req, res) => {
    const gatewayService = new GatewayService(req, res);
    return await gatewayService.patchGateway();
};

export const deleteGateway = async (req, res) => {
    const gatewayService = new GatewayService(req, res);
    return await gatewayService.deleteGateway();
};



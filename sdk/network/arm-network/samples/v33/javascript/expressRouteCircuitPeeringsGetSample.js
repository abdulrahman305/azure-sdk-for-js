/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Gets the specified peering for the express route circuit.
 *
 * @summary Gets the specified peering for the express route circuit.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-01-01/examples/ExpressRouteCircuitPeeringGet.json
 */
async function getExpressRouteCircuitPeering() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const circuitName = "circuitName";
  const peeringName = "MicrosoftPeering";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuitPeerings.get(
    resourceGroupName,
    circuitName,
    peeringName,
  );
  console.log(result);
}

async function main() {
  getExpressRouteCircuitPeering();
}

main().catch(console.error);

/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  NetworkManagerConnection,
  NetworkManagementClient
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Create a network manager connection on this subscription.
 *
 * @summary Create a network manager connection on this subscription.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-11-01/examples/NetworkManagerConnectionSubscriptionPut.json
 */
async function createOrUpdateSubscriptionNetworkManagerConnection() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const networkManagerConnectionName = "TestNMConnection";
  const parameters: NetworkManagerConnection = {
    networkManagerId:
      "/subscriptions/subscriptionC/resourceGroup/rg1/providers/Microsoft.Network/networkManagers/testNetworkManager"
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.subscriptionNetworkManagerConnections.createOrUpdate(
    networkManagerConnectionName,
    parameters
  );
  console.log(result);
}

async function main() {
  createOrUpdateSubscriptionNetworkManagerConnection();
}

main().catch(console.error);
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
  FirewallPacketCaptureParameters,
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Runs a packet capture on AzureFirewall.
 *
 * @summary Runs a packet capture on AzureFirewall.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2023-11-01/examples/AzureFirewallPacketCapture.json
 */
async function azureFirewallPacketCapture() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const azureFirewallName = "azureFirewall1";
  const parameters: FirewallPacketCaptureParameters = {
    durationInSeconds: 300,
    fileName: "azureFirewallPacketCapture",
    filters: [
      {
        destinationPorts: ["4500"],
        destinations: ["20.1.2.0"],
        sources: ["20.1.1.0"],
      },
      {
        destinationPorts: ["123", "80"],
        destinations: ["10.1.2.0"],
        sources: ["10.1.1.0", "10.1.1.1"],
      },
    ],
    flags: [{ type: "syn" }, { type: "fin" }],
    numberOfPacketsToCapture: 5000,
    sasUrl: "someSASURL",
    protocol: "Any",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.azureFirewalls.beginPacketCaptureAndWait(
    resourceGroupName,
    azureFirewallName,
    parameters,
  );
  console.log(result);
}

async function main() {
  azureFirewallPacketCapture();
}

main().catch(console.error);

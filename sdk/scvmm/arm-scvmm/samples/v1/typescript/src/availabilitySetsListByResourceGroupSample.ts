/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ScVmm } from "@azure/arm-scvmm";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to List of AvailabilitySets in a resource group.
 *
 * @summary List of AvailabilitySets in a resource group.
 * x-ms-original-file: specification/scvmm/resource-manager/Microsoft.ScVmm/stable/2023-10-07/examples/AvailabilitySets_ListByResourceGroup_MaximumSet_Gen.json
 */
async function availabilitySetsListByResourceGroupMaximumSet() {
  const subscriptionId =
    process.env["SCVMM_SUBSCRIPTION_ID"] ||
    "79332E5A-630B-480F-A266-A941C015AB19";
  const resourceGroupName = process.env["SCVMM_RESOURCE_GROUP"] || "rgscvmm";
  const credential = new DefaultAzureCredential();
  const client = new ScVmm(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.availabilitySets.listByResourceGroup(
    resourceGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List of AvailabilitySets in a resource group.
 *
 * @summary List of AvailabilitySets in a resource group.
 * x-ms-original-file: specification/scvmm/resource-manager/Microsoft.ScVmm/stable/2023-10-07/examples/AvailabilitySets_ListByResourceGroup_MinimumSet_Gen.json
 */
async function availabilitySetsListByResourceGroupMinimumSet() {
  const subscriptionId =
    process.env["SCVMM_SUBSCRIPTION_ID"] ||
    "79332E5A-630B-480F-A266-A941C015AB19";
  const resourceGroupName = process.env["SCVMM_RESOURCE_GROUP"] || "rgscvmm";
  const credential = new DefaultAzureCredential();
  const client = new ScVmm(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.availabilitySets.listByResourceGroup(
    resourceGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  availabilitySetsListByResourceGroupMaximumSet();
  availabilitySetsListByResourceGroupMinimumSet();
}

main().catch(console.error);

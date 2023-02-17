/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Creates or updates a Global parameter
 *
 * @summary Creates or updates a Global parameter
 * x-ms-original-file: specification/datafactory/resource-manager/Microsoft.DataFactory/stable/2018-06-01/examples/GlobalParameters_Create.json
 */
async function globalParametersCreate() {
  const subscriptionId =
    process.env["DATAFACTORY_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-12345678abc";
  const resourceGroupName = process.env["DATAFACTORY_RESOURCE_GROUP"] || "exampleResourceGroup";
  const factoryName = "exampleFactoryName";
  const globalParameterName = "default";
  const defaultParam = {
    properties: { waitTime: { type: "Int", value: 5 } },
  };
  const credential = new DefaultAzureCredential();
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.globalParameters.createOrUpdate(
    resourceGroupName,
    factoryName,
    globalParameterName,
    defaultParam
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a Global parameter
 *
 * @summary Creates or updates a Global parameter
 * x-ms-original-file: specification/datafactory/resource-manager/Microsoft.DataFactory/stable/2018-06-01/examples/GlobalParameters_Update.json
 */
async function globalParametersUpdate() {
  const subscriptionId =
    process.env["DATAFACTORY_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-12345678abc";
  const resourceGroupName = process.env["DATAFACTORY_RESOURCE_GROUP"] || "exampleResourceGroup";
  const factoryName = "exampleFactoryName";
  const globalParameterName = "default";
  const defaultParam = {
    properties: { waitTime: { type: "Int", value: 5 } },
  };
  const credential = new DefaultAzureCredential();
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.globalParameters.createOrUpdate(
    resourceGroupName,
    factoryName,
    globalParameterName,
    defaultParam
  );
  console.log(result);
}

async function main() {
  globalParametersCreate();
  globalParametersUpdate();
}

main().catch(console.error);

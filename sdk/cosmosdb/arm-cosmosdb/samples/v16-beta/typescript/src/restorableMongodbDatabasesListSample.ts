/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Show the event feed of all mutations done on all the Azure Cosmos DB MongoDB databases under the restorable account.  This helps in scenario where database was accidentally deleted to get the deletion time.  This API requires  'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission
 *
 * @summary Show the event feed of all mutations done on all the Azure Cosmos DB MongoDB databases under the restorable account.  This helps in scenario where database was accidentally deleted to get the deletion time.  This API requires  'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/preview/2024-05-15-preview/examples/CosmosDBRestorableMongodbDatabaseList.json
 */
async function cosmosDbRestorableMongodbDatabaseList() {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] ||
    "2296c272-5d55-40d9-bc05-4d56dc2d7588";
  const location = "WestUS";
  const instanceId = "d9b26648-2f53-4541-b3d8-3044f4f9810d";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.restorableMongodbDatabases.list(
    location,
    instanceId,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  cosmosDbRestorableMongodbDatabaseList();
}

main().catch(console.error);

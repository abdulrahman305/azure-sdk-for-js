/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Updates the Autoscale Configuration for HDInsight cluster.
 *
 * @summary Updates the Autoscale Configuration for HDInsight cluster.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2023-04-15-preview/examples/DisableClusterAutoScale.json
 */
async function disableAutoscaleForTheHdInsightCluster() {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cluster1";
  const roleName = "workernode";
  const parameters = {};
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.beginUpdateAutoScaleConfigurationAndWait(
    resourceGroupName,
    clusterName,
    roleName,
    parameters
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates the Autoscale Configuration for HDInsight cluster.
 *
 * @summary Updates the Autoscale Configuration for HDInsight cluster.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2023-04-15-preview/examples/EnableOrUpdateAutoScaleWithLoadBasedConfiguration.json
 */
async function enableOrUpdateAutoscaleWithTheLoadBasedConfigurationForHdInsightCluster() {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cluster1";
  const roleName = "workernode";
  const parameters = {
    autoscale: { capacity: { maxInstanceCount: 5, minInstanceCount: 3 } },
  };
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.beginUpdateAutoScaleConfigurationAndWait(
    resourceGroupName,
    clusterName,
    roleName,
    parameters
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates the Autoscale Configuration for HDInsight cluster.
 *
 * @summary Updates the Autoscale Configuration for HDInsight cluster.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2023-04-15-preview/examples/EnableOrUpdateAutoScaleWithScheduleBasedConfiguration.json
 */
async function enableOrUpdateAutoscaleWithTheScheduleBasedConfigurationForHdInsightCluster() {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cluster1";
  const roleName = "workernode";
  const parameters = {
    autoscale: {
      recurrence: {
        schedule: [
          {
            days: ["Thursday"],
            timeAndCapacity: {
              maxInstanceCount: 4,
              minInstanceCount: 4,
              time: "16:00",
            },
          },
        ],
        timeZone: "China Standard Time",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.beginUpdateAutoScaleConfigurationAndWait(
    resourceGroupName,
    clusterName,
    roleName,
    parameters
  );
  console.log(result);
}

async function main() {
  disableAutoscaleForTheHdInsightCluster();
  enableOrUpdateAutoscaleWithTheLoadBasedConfigurationForHdInsightCluster();
  enableOrUpdateAutoscaleWithTheScheduleBasedConfigurationForHdInsightCluster();
}

main().catch(console.error);
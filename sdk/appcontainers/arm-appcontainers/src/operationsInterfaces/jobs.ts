/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import {
  Job,
  JobsListBySubscriptionOptionalParams,
  JobsListByResourceGroupOptionalParams,
  JobsGetOptionalParams,
  JobsGetResponse,
  JobsCreateOrUpdateOptionalParams,
  JobsCreateOrUpdateResponse,
  JobsDeleteOptionalParams,
  JobPatchProperties,
  JobsUpdateOptionalParams,
  JobsUpdateResponse,
  JobExecutionTemplate,
  JobsStartOptionalParams,
  JobsStartResponse,
  JobsStopExecutionOptionalParams,
  JobExecutionNamesCollection,
  JobsStopMultipleExecutionsOptionalParams,
  JobsStopMultipleExecutionsResponse,
  JobsListSecretsOptionalParams,
  JobsListSecretsResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Jobs. */
export interface Jobs {
  /**
   * Get the Container Apps Jobs in a given subscription.
   * @param options The options parameters.
   */
  listBySubscription(
    options?: JobsListBySubscriptionOptionalParams
  ): PagedAsyncIterableIterator<Job>;
  /**
   * Get the Container Apps Jobs in a given resource group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: JobsListByResourceGroupOptionalParams
  ): PagedAsyncIterableIterator<Job>;
  /**
   * Get the properties of a Container Apps Job.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jobName Name of the Container Apps Job.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    jobName: string,
    options?: JobsGetOptionalParams
  ): Promise<JobsGetResponse>;
  /**
   * Create or Update a Container Apps Job.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jobName Name of the Container Apps Job.
   * @param jobEnvelope Properties used to create a container apps job
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    jobName: string,
    jobEnvelope: Job,
    options?: JobsCreateOrUpdateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<JobsCreateOrUpdateResponse>,
      JobsCreateOrUpdateResponse
    >
  >;
  /**
   * Create or Update a Container Apps Job.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jobName Name of the Container Apps Job.
   * @param jobEnvelope Properties used to create a container apps job
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    jobName: string,
    jobEnvelope: Job,
    options?: JobsCreateOrUpdateOptionalParams
  ): Promise<JobsCreateOrUpdateResponse>;
  /**
   * Delete a Container Apps Job.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jobName Name of the Container Apps Job.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    jobName: string,
    options?: JobsDeleteOptionalParams
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Delete a Container Apps Job.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jobName Name of the Container Apps Job.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    jobName: string,
    options?: JobsDeleteOptionalParams
  ): Promise<void>;
  /**
   * Patches a Container Apps Job using JSON Merge Patch
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jobName Name of the Container Apps Job.
   * @param jobEnvelope Properties used to create a container apps job
   * @param options The options parameters.
   */
  beginUpdate(
    resourceGroupName: string,
    jobName: string,
    jobEnvelope: JobPatchProperties,
    options?: JobsUpdateOptionalParams
  ): Promise<
    SimplePollerLike<OperationState<JobsUpdateResponse>, JobsUpdateResponse>
  >;
  /**
   * Patches a Container Apps Job using JSON Merge Patch
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jobName Name of the Container Apps Job.
   * @param jobEnvelope Properties used to create a container apps job
   * @param options The options parameters.
   */
  beginUpdateAndWait(
    resourceGroupName: string,
    jobName: string,
    jobEnvelope: JobPatchProperties,
    options?: JobsUpdateOptionalParams
  ): Promise<JobsUpdateResponse>;
  /**
   * Start a Container Apps Job
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jobName Name of the Container Apps Job.
   * @param template Properties used to start a job instance.
   * @param options The options parameters.
   */
  beginStart(
    resourceGroupName: string,
    jobName: string,
    template: JobExecutionTemplate,
    options?: JobsStartOptionalParams
  ): Promise<
    SimplePollerLike<OperationState<JobsStartResponse>, JobsStartResponse>
  >;
  /**
   * Start a Container Apps Job
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jobName Name of the Container Apps Job.
   * @param template Properties used to start a job instance.
   * @param options The options parameters.
   */
  beginStartAndWait(
    resourceGroupName: string,
    jobName: string,
    template: JobExecutionTemplate,
    options?: JobsStartOptionalParams
  ): Promise<JobsStartResponse>;
  /**
   * Terminates execution of a running container apps job
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jobName Name of the Container Apps Job.
   * @param jobExecutionName Job execution name.
   * @param options The options parameters.
   */
  beginStopExecution(
    resourceGroupName: string,
    jobName: string,
    jobExecutionName: string,
    options?: JobsStopExecutionOptionalParams
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Terminates execution of a running container apps job
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jobName Name of the Container Apps Job.
   * @param jobExecutionName Job execution name.
   * @param options The options parameters.
   */
  beginStopExecutionAndWait(
    resourceGroupName: string,
    jobName: string,
    jobExecutionName: string,
    options?: JobsStopExecutionOptionalParams
  ): Promise<void>;
  /**
   * Terminates execution of a running container apps job
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jobName Name of the Container Apps Job.
   * @param jobExecutionName List of all job executions that should be stopped.
   * @param options The options parameters.
   */
  beginStopMultipleExecutions(
    resourceGroupName: string,
    jobName: string,
    jobExecutionName: JobExecutionNamesCollection,
    options?: JobsStopMultipleExecutionsOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<JobsStopMultipleExecutionsResponse>,
      JobsStopMultipleExecutionsResponse
    >
  >;
  /**
   * Terminates execution of a running container apps job
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jobName Name of the Container Apps Job.
   * @param jobExecutionName List of all job executions that should be stopped.
   * @param options The options parameters.
   */
  beginStopMultipleExecutionsAndWait(
    resourceGroupName: string,
    jobName: string,
    jobExecutionName: JobExecutionNamesCollection,
    options?: JobsStopMultipleExecutionsOptionalParams
  ): Promise<JobsStopMultipleExecutionsResponse>;
  /**
   * List secrets for a container apps job
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param jobName Name of the Container Apps Job.
   * @param options The options parameters.
   */
  listSecrets(
    resourceGroupName: string,
    jobName: string,
    options?: JobsListSecretsOptionalParams
  ): Promise<JobsListSecretsResponse>;
}
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
  NeighborGroup,
  NeighborGroupsListByResourceGroupOptionalParams,
  NeighborGroupsListBySubscriptionOptionalParams,
  NeighborGroupsCreateOptionalParams,
  NeighborGroupsCreateResponse,
  NeighborGroupsGetOptionalParams,
  NeighborGroupsGetResponse,
  NeighborGroupPatch,
  NeighborGroupsUpdateOptionalParams,
  NeighborGroupsUpdateResponse,
  NeighborGroupsDeleteOptionalParams
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a NeighborGroups. */
export interface NeighborGroups {
  /**
   * Displays NeighborGroups list by resource group GET method.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: NeighborGroupsListByResourceGroupOptionalParams
  ): PagedAsyncIterableIterator<NeighborGroup>;
  /**
   * Displays NeighborGroups list by subscription GET method.
   * @param options The options parameters.
   */
  listBySubscription(
    options?: NeighborGroupsListBySubscriptionOptionalParams
  ): PagedAsyncIterableIterator<NeighborGroup>;
  /**
   * Implements the Neighbor Group PUT method.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param neighborGroupName Name of the Neighbor Group.
   * @param body Request payload.
   * @param options The options parameters.
   */
  beginCreate(
    resourceGroupName: string,
    neighborGroupName: string,
    body: NeighborGroup,
    options?: NeighborGroupsCreateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<NeighborGroupsCreateResponse>,
      NeighborGroupsCreateResponse
    >
  >;
  /**
   * Implements the Neighbor Group PUT method.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param neighborGroupName Name of the Neighbor Group.
   * @param body Request payload.
   * @param options The options parameters.
   */
  beginCreateAndWait(
    resourceGroupName: string,
    neighborGroupName: string,
    body: NeighborGroup,
    options?: NeighborGroupsCreateOptionalParams
  ): Promise<NeighborGroupsCreateResponse>;
  /**
   * Gets the Neighbor Group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param neighborGroupName Name of the Neighbor Group.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    neighborGroupName: string,
    options?: NeighborGroupsGetOptionalParams
  ): Promise<NeighborGroupsGetResponse>;
  /**
   * Updates the Neighbor Group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param neighborGroupName Name of the Neighbor Group.
   * @param body Neighbor Group properties to update. Only annotations are supported.
   * @param options The options parameters.
   */
  beginUpdate(
    resourceGroupName: string,
    neighborGroupName: string,
    body: NeighborGroupPatch,
    options?: NeighborGroupsUpdateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<NeighborGroupsUpdateResponse>,
      NeighborGroupsUpdateResponse
    >
  >;
  /**
   * Updates the Neighbor Group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param neighborGroupName Name of the Neighbor Group.
   * @param body Neighbor Group properties to update. Only annotations are supported.
   * @param options The options parameters.
   */
  beginUpdateAndWait(
    resourceGroupName: string,
    neighborGroupName: string,
    body: NeighborGroupPatch,
    options?: NeighborGroupsUpdateOptionalParams
  ): Promise<NeighborGroupsUpdateResponse>;
  /**
   * Implements Neighbor Group DELETE method.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param neighborGroupName Name of the Neighbor Group.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    neighborGroupName: string,
    options?: NeighborGroupsDeleteOptionalParams
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Implements Neighbor Group DELETE method.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param neighborGroupName Name of the Neighbor Group.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    neighborGroupName: string,
    options?: NeighborGroupsDeleteOptionalParams
  ): Promise<void>;
}
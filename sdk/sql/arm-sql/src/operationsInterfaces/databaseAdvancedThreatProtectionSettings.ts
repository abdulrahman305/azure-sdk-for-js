/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  DatabaseAdvancedThreatProtection,
  DatabaseAdvancedThreatProtectionSettingsListByDatabaseOptionalParams,
  AdvancedThreatProtectionName,
  DatabaseAdvancedThreatProtectionSettingsGetOptionalParams,
  DatabaseAdvancedThreatProtectionSettingsGetResponse,
  DatabaseAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
  DatabaseAdvancedThreatProtectionSettingsCreateOrUpdateResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a DatabaseAdvancedThreatProtectionSettings. */
export interface DatabaseAdvancedThreatProtectionSettings {
  /**
   * Gets a list of database's Advanced Threat Protection states.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database.
   * @param options The options parameters.
   */
  listByDatabase(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabaseAdvancedThreatProtectionSettingsListByDatabaseOptionalParams
  ): PagedAsyncIterableIterator<DatabaseAdvancedThreatProtection>;
  /**
   * Gets a database's Advanced Threat Protection state.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database.
   * @param advancedThreatProtectionName The name of the Advanced Threat Protection state.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    options?: DatabaseAdvancedThreatProtectionSettingsGetOptionalParams
  ): Promise<DatabaseAdvancedThreatProtectionSettingsGetResponse>;
  /**
   * Creates or updates a database's Advanced Threat Protection state.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database.
   * @param advancedThreatProtectionName The name of the Advanced Threat Protection state.
   * @param parameters The database Advanced Threat Protection state.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    parameters: DatabaseAdvancedThreatProtection,
    options?: DatabaseAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams
  ): Promise<DatabaseAdvancedThreatProtectionSettingsCreateOrUpdateResponse>;
}
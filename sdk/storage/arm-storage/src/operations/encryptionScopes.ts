/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { EncryptionScopes } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { StorageManagementClient } from "../storageManagementClient";
import {
  EncryptionScope,
  EncryptionScopesListNextOptionalParams,
  EncryptionScopesListOptionalParams,
  EncryptionScopesListResponse,
  EncryptionScopesPutOptionalParams,
  EncryptionScopesPutResponse,
  EncryptionScopesPatchOptionalParams,
  EncryptionScopesPatchResponse,
  EncryptionScopesGetOptionalParams,
  EncryptionScopesGetResponse,
  EncryptionScopesListNextResponse,
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing EncryptionScopes operations. */
export class EncryptionScopesImpl implements EncryptionScopes {
  private readonly client: StorageManagementClient;

  /**
   * Initialize a new instance of the class EncryptionScopes class.
   * @param client Reference to the service client
   */
  constructor(client: StorageManagementClient) {
    this.client = client;
  }

  /**
   * Lists all the encryption scopes available under the specified storage account.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param accountName The name of the storage account within the specified resource group. Storage
   *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
   *                    only.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    accountName: string,
    options?: EncryptionScopesListOptionalParams,
  ): PagedAsyncIterableIterator<EncryptionScope> {
    const iter = this.listPagingAll(resourceGroupName, accountName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listPagingPage(
          resourceGroupName,
          accountName,
          options,
          settings,
        );
      },
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    accountName: string,
    options?: EncryptionScopesListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<EncryptionScope[]> {
    let result: EncryptionScopesListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(resourceGroupName, accountName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        accountName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    accountName: string,
    options?: EncryptionScopesListOptionalParams,
  ): AsyncIterableIterator<EncryptionScope> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      accountName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Synchronously creates or updates an encryption scope under the specified storage account. If an
   * encryption scope is already created and a subsequent request is issued with different properties,
   * the encryption scope properties will be updated per the specified request.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param accountName The name of the storage account within the specified resource group. Storage
   *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
   *                    only.
   * @param encryptionScopeName The name of the encryption scope within the specified storage account.
   *                            Encryption scope names must be between 3 and 63 characters in length and use numbers, lower-case
   *                            letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a
   *                            letter or number.
   * @param encryptionScope Encryption scope properties to be used for the create or update.
   * @param options The options parameters.
   */
  put(
    resourceGroupName: string,
    accountName: string,
    encryptionScopeName: string,
    encryptionScope: EncryptionScope,
    options?: EncryptionScopesPutOptionalParams,
  ): Promise<EncryptionScopesPutResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        encryptionScopeName,
        encryptionScope,
        options,
      },
      putOperationSpec,
    );
  }

  /**
   * Update encryption scope properties as specified in the request body. Update fails if the specified
   * encryption scope does not already exist.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param accountName The name of the storage account within the specified resource group. Storage
   *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
   *                    only.
   * @param encryptionScopeName The name of the encryption scope within the specified storage account.
   *                            Encryption scope names must be between 3 and 63 characters in length and use numbers, lower-case
   *                            letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a
   *                            letter or number.
   * @param encryptionScope Encryption scope properties to be used for the update.
   * @param options The options parameters.
   */
  patch(
    resourceGroupName: string,
    accountName: string,
    encryptionScopeName: string,
    encryptionScope: EncryptionScope,
    options?: EncryptionScopesPatchOptionalParams,
  ): Promise<EncryptionScopesPatchResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        encryptionScopeName,
        encryptionScope,
        options,
      },
      patchOperationSpec,
    );
  }

  /**
   * Returns the properties for the specified encryption scope.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param accountName The name of the storage account within the specified resource group. Storage
   *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
   *                    only.
   * @param encryptionScopeName The name of the encryption scope within the specified storage account.
   *                            Encryption scope names must be between 3 and 63 characters in length and use numbers, lower-case
   *                            letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a
   *                            letter or number.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    accountName: string,
    encryptionScopeName: string,
    options?: EncryptionScopesGetOptionalParams,
  ): Promise<EncryptionScopesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, encryptionScopeName, options },
      getOperationSpec,
    );
  }

  /**
   * Lists all the encryption scopes available under the specified storage account.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param accountName The name of the storage account within the specified resource group. Storage
   *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
   *                    only.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    accountName: string,
    options?: EncryptionScopesListOptionalParams,
  ): Promise<EncryptionScopesListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, options },
      listOperationSpec,
    );
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param accountName The name of the storage account within the specified resource group. Storage
   *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
   *                    only.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    accountName: string,
    nextLink: string,
    options?: EncryptionScopesListNextOptionalParams,
  ): Promise<EncryptionScopesListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, nextLink, options },
      listNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const putOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/encryptionScopes/{encryptionScopeName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.EncryptionScope,
    },
    201: {
      bodyMapper: Mappers.EncryptionScope,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.encryptionScope,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.subscriptionId,
    Parameters.encryptionScopeName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const patchOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/encryptionScopes/{encryptionScopeName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.EncryptionScope,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.encryptionScope,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.subscriptionId,
    Parameters.encryptionScopeName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/encryptionScopes/{encryptionScopeName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.EncryptionScope,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.subscriptionId,
    Parameters.encryptionScopeName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/encryptionScopes",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.EncryptionScopeListResult,
    },
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.filter,
    Parameters.maxpagesize1,
    Parameters.include3,
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.subscriptionId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.EncryptionScopeListResult,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.subscriptionId,
    Parameters.nextLink,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import type { TokenCredential } from "@azure/core-auth";
import type { PurviewMetadataPoliciesRestClient } from "./clientDefinitions.js";

export function PurviewMetadataPoliciesClient(
  Endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {},
): PurviewMetadataPoliciesRestClient {
  const baseUrl = options.baseUrl ?? `${Endpoint}/policyStore`;
  options.apiVersion = options.apiVersion ?? "2021-07-01-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://purview.azure.net/.default"],
    },
  };

  return getClient(baseUrl, credentials, options) as PurviewMetadataPoliciesRestClient;
}

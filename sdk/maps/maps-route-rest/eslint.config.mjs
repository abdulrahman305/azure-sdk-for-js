import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    rules: {
      // Exporting the factory function is a convention for Rest Level Client
      "@azure/azure-sdk/ts-modules-only-named": "off",
    },
  },
]);

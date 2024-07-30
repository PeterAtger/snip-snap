const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  rules: {
    "no-restricted-exports": "off",
    "import/prefer-default-export": "off",
    "react/require-default-props": "off",
    "import/extensions": 0,
    "no-param-reassign": [
      "error",
      {
        "props": true,
        "ignorePropertyModificationsFor": [
          "state"
        ]
      }
    ]
  }
    
  ,
  extends: [
    "airbnb",
    "airbnb-typescript",
  ],
};

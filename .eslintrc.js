export default {
  "extends": "airbnb-base",
  "plugins": [
    "import"
  ],
  "env": {
    "node": true, // Node.js global variables and Node.js-specific rules.
    "es6": true, // enable all ECMAScript 6 features except for modules.
  },
  "rules": {
    "no-use-before-define": ["error", { "functions": false, "classes": false }],
    "linebreak-style": [2, "windows"],
    "global-require": [0],
    "no-console": [0],
    "import/no-dynamic-require": [0],
    "import/prefer-default-export": [0],
    "max-len": [0]
  }
};
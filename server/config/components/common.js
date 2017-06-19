const joi = require('joi');

function CommonComponentValidation() {
  const self = this;

  self.commonValidation = function (processType) {
    console.log('\x1b[32m', `✔ Common configuration component for ${processType} process loaded.`, '\x1b[0m', '\nValidating common component...');

    const envVarsSchema = joi.object().keys({
      NODE_ENV: joi.string().valid(['development', 'staging', 'production']).required(),
    }).unknown().required();

    const { error, value: envVars } = joi.validate(process.env, envVarsSchema);

    if (error) {
      throw new Error(`Common component validation error: ${error.message}`);
    } else {
      console.log('\x1b[32m', `✔ Common configuration component for ${processType} process validated.`, '\x1b[0m');
      return Promise.resolve({ env: envVars.NODE_ENV });
    }
  };
}

module.exports = new CommonComponentValidation();

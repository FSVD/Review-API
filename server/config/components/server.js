const joi = require('joi');

function ServerComponentValidation() {
  const self = this;

  self.serverValidation = function (processType, processPort) {
    console.log('\x1b[32m', `✔ Server configuration component for ${processType} process loaded.`, '\x1b[0m', '\nValidating server component...');

    process.env.PROCESS_PORT = processPort;

    const envVarsSchema = joi.object().keys({
      PROCESS_PORT: joi.number().required(),
    }).unknown().required();

    const { error, value: envVars } = joi.validate(process.env, envVarsSchema);

    if (error) {
      throw new Error(`Server component validation error: ${error.message}`);
    } else {
      console.log('\x1b[32m', `✔ Server configuration component for ${processType} process validated.`, '\x1b[0m');
      return Promise.resolve({ server: { port: envVars.PROCESS_PORT } });
    }
  };
}

module.exports = new ServerComponentValidation();

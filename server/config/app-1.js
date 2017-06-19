const common = require('./components/common');
const server = require('./components/server');

function ProcessConfiguration() {
  const self = this;

  self.processModulesValidation = function (processType, processPort) {
    let commonConfigurationResult = {};
    let serverConfigurationResult = {};
    const processConfigurationResult = {};

    return common.commonValidation(processType)
      .then((result) => {
        commonConfigurationResult = JSON.parse(JSON.stringify(result));
        return Promise.resolve(server.serverValidation(processType, processPort));
      })
      .then((result) => {
        serverConfigurationResult = JSON.parse(JSON.stringify(result));
        // processConfigurationResult = { ...commonConfigurationResult, serverConfigurationResult}; // spread operator (...) is not supported in Node 6.10.3
        Object.assign(processConfigurationResult, commonConfigurationResult, serverConfigurationResult);
        return Promise.resolve(processConfigurationResult);
      })
      .catch(error => Promise.reject({ error, message: error.message, propagatedBy: { module: `${processType} processConfiguration`, function: 'processModulesValidation' } }));
  };
}

module.exports = new ProcessConfiguration();

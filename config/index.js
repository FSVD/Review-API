function ConfigurationManager() {
  const self = this;

  self.checkProcessConfiguration = (processType, processPort) => {
    try {
      console.log(`Loading ${processType} process configuration...`);

      const processConfiguration = require(`./${processType}`);
      let processConfigurationResult = {};

      return processConfiguration.processModulesValidation(processType, processPort)
        .then((result) => {
          processConfigurationResult = JSON.parse(JSON.stringify(result));
          Object.assign(processConfigurationResult, { response: 'SUCCESFULLY CONFIGURED' });
          return Promise.resolve(processConfigurationResult);
        }).catch(err => Promise.reject({ error: err, message: err.message, propagatedBy: { module: 'checkConfigurationManager', function: 'checkProcessConfiguration' } }));
    } catch (error) {
      if (error.code === 'MODULE_NOT_FOUND') {
        throw new Error(`NO CONFIGIGURATION FOR PROCESS TYPE: ${processType}`);
      }
      throw error;
    }
  };
}

module.exports = new ConfigurationManager();

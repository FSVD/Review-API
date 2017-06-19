// Require dotenv module to read .env file from root
require('dotenv').config({ silent: true });

// Require db configuration to run database when application start
require('./db/');

// Require loadash which provides utilities to manage multidimensional array
const _ = require('lodash');

// Require configuration module to check processes configurations
const ConfigurationManager = require('./config/');

// Create processes and ports arrays from environment variables
const processes = process.env.PROCESSES.split(',');
const ports = process.env.PORTS.split(',');

// Check configuration for each process and if is ok execute the process
const processesData = _.zip(processes, ports);

processesData.map((currentDataSet) => {
  const processType = currentDataSet[0];
  const processPort = currentDataSet[1];

  try {
    if ((processType === 'app-1') || (processType === 'app-2') || (processType === 'app-3') || (processType === 'app-4')) {
      ConfigurationManager.checkProcessConfiguration(processType, processPort)
        .then((result) => {
          executeProcess(processType, processPort, result);
        }).catch((error) => {
          console.log('\x1b[31m', `✘ ${processType} configuration fail: ${error.message}`, '\x1b[0m');
        });
    } else {
      throw new Error(`"${processType}" is an unsupported process process type. Use : "app-1, app-2, app-3 or app-4"!`);
    }
  } catch (error) {
    console.log('\x1b[31m', `✘ ${error.message}`, '\x1b[0m');
  }
});

function executeProcess(processType, processPort, configurationResult) {
  const processConfigurationResult = JSON.parse(JSON.stringify(configurationResult));
  const processConfigurationResponse = processConfigurationResult.response;
  // console.log(processConfigurationResult);
  console.log('\x1b[32m', `\n✔ ${processType} process configuration state: ${processConfigurationResponse} => LAUNCH ${processType.toUpperCase()} PROCESS IN CLUSTER MODE`, '\x1b[0m');

  // Set value of environment variables specific to current process
  process.env.PROCESS_TYPE = processType;
  process.env.PROCESS_PORT = processPort;

  require(`./lib/${processType}`);
}

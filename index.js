// Require dotenv module to read .env file from root
require('dotenv').config({ silent: true });
// Import zip utility from loadash
const zip = require('lodash/zip');
// Import configuration module to check processes configurations
const ConfigurationManager = require('./config/index');
// Create processes and ports arrays from environment variables
const processes = process.env.PROCESSES.split(',');
const ports = process.env.PORTS.split(',');
const processesData = zip(processes, ports);

processesData.map((currentProcessDataSet) => {
  const processType = currentProcessDataSet[0];
  const processPort = currentProcessDataSet[1];

  return loadProcess(processType, processPort);
});

// Check configuration for each process and if is ok execute the process
function loadProcess(processType, processPort) {
  try {
    if ((processType === 'GraphQL-api') || (processType === 'REST-api')) {
      ConfigurationManager.checkProcessConfiguration(processType, processPort)
        .then((result) => {
          executeProcess(processType, processPort, result);
        }).catch((error) => {
          console.log('\x1b[31m', `✘ ${processType} configuration fail: ${error}`, '\x1b[0m');
        });
    } else {
      throw new Error(`"${processType}" is an unsupported process process type. Use : "GraphQL-api or REST-api"!`);
    }
  } catch (error) {
    console.log('\x1b[31m', `✘ ${error.message}`, '\x1b[0m');
  }
}

function executeProcess(processType, processPort, configurationResult) {
  const processConfigurationResult = JSON.parse(JSON.stringify(configurationResult));
  const processConfigurationResponse = processConfigurationResult.response;
  console.log('\x1b[32m', `\n✔ ${processType} process configuration state: ${processConfigurationResponse} => LAUNCH ${processType.toUpperCase()} PROCESS IN CLUSTER MODE`, '\x1b[0m');

  // Set value of environment variables specific to current process
  process.env.PROCESS_TYPE = processType;
  process.env.PROCESS_PORT = processPort;

  require(`./src/${processType}`);
}

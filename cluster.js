const processType = process.env.PROCESS_TYPE;
const processPort = process.env.PROCESS_PORT;
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
// Set the fork path based on current precess type
const forkPath = `./src/${processType}/index`;

if (cluster.isMaster) {
  console.log('\x1b[36m', `✔ Master ${process.pid} is running`, '\x1b[0m');

  // Setup the master to execute the worker based on current fork path
  cluster.setupMaster({ exec: forkPath });

  // Fork workers.
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log('\x1b[33m', `✘ worker ${worker.process.pid} died, restarting...`, '\x1b[0m');
    cluster.fork();
  });
} else {
  require('./bin/www');
  console.log(`✔ ${processType} Worker ${process.pid} started on port ${processPort}`);
}

delete require.cache[require.resolve('./cluster')];

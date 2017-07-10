// Require db configuration to run database when application start
require('../../db/');
require('../../cluster');

delete require.cache[require.resolve('./index')];

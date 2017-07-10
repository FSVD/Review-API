// Require knex db configuration
import { knex } from '../../db/index';
require('../../cluster');

delete require.cache[require.resolve('./index')];

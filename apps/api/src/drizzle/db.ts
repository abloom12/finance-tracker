import { drizzle } from 'drizzle-orm/node-postgres';

import { config } from '../env.js';
import * as schema from './schema.js';

export const db = drizzle(config.database.url!, { schema });

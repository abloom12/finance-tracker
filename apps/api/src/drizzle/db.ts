import 'dotenv/config';

import { drizzle } from 'drizzle-orm/node-postgres';

import { config } from '../env';
import * as schema from './schema';

export const db = drizzle(config.database.url!, { schema });

import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import connection from './connectors';

export default abstract class ResourceModelInterface {
  db: PostgresJsDatabase<typeof schema>;

  constructor() {
    this.db = connection.db;
  }
}

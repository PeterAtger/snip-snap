/* eslint-disable class-methods-use-this */
import 'dotenv/config';

import postgres from 'postgres';
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../schema';

export default class BaseConnector {
  db: PostgresJsDatabase<typeof schema>;

  constructor() {
    const connectionString = process.env.POSTGRES_URL;
    if (!connectionString) {
      throw new Error('POSTGRES_URL is not defined');
    }

    const connection = postgres(connectionString, {
      prepare: false,
    });

    this.db = drizzle(connection, { schema });
  }

  getConnection() {
    return this.db;
  }
}

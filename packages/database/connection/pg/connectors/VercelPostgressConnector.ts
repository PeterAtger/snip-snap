/* eslint-disable class-methods-use-this */
import { VercelPgDatabase, drizzle as drizzleVercel } from 'drizzle-orm/vercel-postgres';
import { sql as VercelSql } from '@vercel/postgres';
import { drizzle as drizzleNode } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../schema';

export default class VercelPostgressConnector {
  db: VercelPgDatabase<typeof schema>;

  constructor() {
    this.db = process.env.NODE_ENV === 'production'
      ? drizzleVercel(VercelSql, { schema })
      : drizzleNode(
        new Pool({ connectionString: process.env.POSTGRES_URL }),
        { schema },
      );
  }

  getConnection() {
    return this.db;
  }
}

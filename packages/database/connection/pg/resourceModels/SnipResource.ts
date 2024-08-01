/* eslint-disable @typescript-eslint/no-shadow */
import { logger } from '@repo/utils';
import {
  and, desc, eq, count,
} from 'drizzle-orm';
import ResourceModelInterface from '../ResourceModelInterface';
import { snips } from '../schema';
import { SnipType } from '../../../types/SnipType';

export default class SnipResource extends ResourceModelInterface {
  async createSnip(snip: SnipType): Promise<string | false> {
    try {
      const [{ insertedId }] = await this.db
        .insert(snips)
        .values(snip)
        .returning({ insertedId: snips.id });

      return insertedId;
    } catch (e) {
      logger.error(`Could not insert user ${e}`);

      return false;
    }
  }

  async getAllSnips(page: number): Promise<false | SnipType[]> {
    const data = await this.db.query.snips.findMany({
      limit: 10,
      offset: (page - 1) * 10,
      orderBy: [desc(snips.created)],
    });

    if (!data) {
      logger.info('Could not find any snippets');

      return false;
    }

    return data;
  }

  async getUserSnips(userId: string): Promise<false | SnipType[]> {
    const data = await this.db.query.snips.findMany({
      where: eq(snips.user, userId),
      orderBy: [desc(snips.created)],
    });

    if (!data) {
      logger.info(`Could not find any snippets for user: ${userId}`);

      return false;
    }

    return data;
  }

  async getSnipById(userId: string, snipId: string): Promise<false | SnipType> {
    const data = await this.db.query.snips.findFirst({
      where: and(
        eq(snips.id, snipId),
        eq(snips.user, userId),
      ),
    });

    if (!data) {
      logger.info(`Could not find snippet with id: ${snipId}`);

      return false;
    }

    return data;
  }

  async getSnipCount() {
    const result = await this.db.select({ count: count() }).from(snips);

    return result[0].count;
  }
}

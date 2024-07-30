import { logger } from '@repo/utils';
import { and, desc, eq } from 'drizzle-orm';
import ResourceModelInterface from '../ResourceModelInterface';
import { snips, users } from '../schema';
import { SnipType } from '../../../types/SnipType';

export default class SnipResource extends ResourceModelInterface {
  async createSnip({
    id,
    snip,
    lang,
    user,
    created,
  }: SnipType): Promise<string | false> {
    try {
      const [{ insertedId }] = await this.db.insert(snips).values({
        id, snip, lang, user, created,
      }).returning({ insertedId: users.id });

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
}

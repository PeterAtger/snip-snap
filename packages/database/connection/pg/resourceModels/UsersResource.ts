import { eq } from 'drizzle-orm';
import { logger } from '@repo/utils';
import ResourceModelInterface from '../ResourceModelInterface';
import { users } from '../schema';
import { UserType } from '../../../types/UserType';

export default class UsersResource extends ResourceModelInterface {
  async createUser({
    id,
    name,
    email,
    image,
    password,
  }: UserType): Promise<string | false> {
    try {
      const [{ insertedId }] = await this.db.insert(users).values({
        id, name, email, image, password,
      }).returning({ insertedId: users.id });

      return insertedId;
    } catch (e) {
      logger.error(`Could not insert user ${e}`);

      return false;
    }
  }

  async updateUser({
    id,
    name,
    email,
    password,
  }: UserType): Promise<boolean> {
    try {
      const [{ insertedId = 0 } = {}] = await this.db.update(users)
        .set({
          name,
          email,
          password: password || null,
        }).where(eq(users.id, id))
        .returning({ insertedId: users.id });

      return !!insertedId;
    } catch (e) {
      logger.error(`Could not insert user ${e}`);

      return false;
    }
  }

  async getUser(email: string): Promise<false | UserType> {
    const data = await this.db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!data) {
      logger.info(`Could not find user ${email}`);

      return false;
    }

    return data;
  }
}

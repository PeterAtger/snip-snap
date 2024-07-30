import { logger } from '@repo/utils';
import { SnipResource } from '../../connection';

type SnipParams = {
  id?: string;
  snip?: string;
  lang?: string;
  user?: string;
  created?: Date;
};

export default class Snip {
  id: string;

  snip: string;

  lang: string;

  user: string;

  created?: Date;

  resource: SnipResource;

  constructor({
    id,
    snip,
    lang,
    user,
    created,
  }: SnipParams = {}) {
    this.id = id || '';
    this.snip = snip || '';
    this.lang = lang || '';
    this.user = user || '';
    this.created = created; // May be undefined
    this.resource = new SnipResource();
  }

  setId(value: string) {
    this.id = value;

    return this;
  }

  setSnip(value: string) {
    this.snip = value;

    return this;
  }

  setLang(value: string) {
    this.lang = value;

    return this;
  }

  setUser(value: string) {
    this.user = value;

    return this;
  }

  setCreated(value: Date) {
    this.created = value;

    return this;
  }

  async save() {
    const {
      id, snip, lang, user,
    } = this;

    if (!id || !snip || !lang || !user) {
      logger.error('Missing required fields');

      return false;
    }

    return this.resource.createSnip({
      id,
      snip,
      lang,
      user,
      created: new Date(),
    });
  }

  async getAllSnips(page: number): Promise<false | Snip[]> {
    const snips = await this.resource.getAllSnips(page);

    if (!snips) {
      logger.info('Could not find any snippets');

      return false;
    }

    return snips.map(({
      id, snip, lang, user, created,
    }) => new Snip({
      id, snip, lang, user, created,
    }));
  }

  async getUserSnips(userId: string): Promise<false | Snip[]> {
    const snips = await this.resource.getUserSnips(userId);

    if (!snips) {
      logger.info('Could not find any snippets');

      return false;
    }

    return snips.map(({
      id, snip, lang, user, created,
    }) => new Snip({
      id, snip, lang, user, created,
    }));
  }

  async loadSnipById(userId: string, snipId: string) {
    const snipData = await this.resource.getSnipById(userId, snipId);

    if (!snipData) {
      logger.info('Could not find snippet');

      return false;
    }

    const {
      id, snip, lang, user, created,
    } = snipData;

    return this.setId(id)
      .setSnip(snip)
      .setLang(lang)
      .setUser(user)
      .setCreated(created);
  }
}

import { logger } from '@repo/utils';
import { SnipResource } from '../../connection';
import { SnipType } from '../../types/SnipType';

type SnipParams = Partial<SnipType>;

export default class Snip {
  id: string;

  snip: string;

  lang: string;

  user: string;

  description: string;

  created?: Date;

  resource: SnipResource;

  constructor({
    id,
    snip,
    lang,
    user,
    description,
    created,
  }: SnipParams = {}) {
    this.id = id || '';
    this.snip = snip || '';
    this.lang = lang || '';
    this.user = user || '';
    this.created = created; // May be undefined
    this.description = description || '';
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

  setDescription(value: string) {
    this.description = value;

    return this;
  }

  async save() {
    const {
      id, snip, lang, user, description,
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
      description,
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
      id, snip, lang, user, created, description,
    }) => new Snip({
      id, snip, lang, user, created, description,
    }));
  }

  async getUserSnips(userId: string): Promise<false | Snip[]> {
    const snips = await this.resource.getUserSnips(userId);

    if (!snips) {
      logger.info('Could not find any snippets');

      return false;
    }

    return snips.map(({
      id, snip, lang, user, created, description,
    }) => new Snip({
      id, snip, lang, user, created, description,
    }));
  }

  async loadSnipById(userId: string, snipId: string) {
    const snipData = await this.resource.getSnipById(userId, snipId);

    if (!snipData) {
      logger.info('Could not find snippet');

      return false;
    }

    const {
      id, snip, lang, user, created, description,
    } = snipData;

    return this.setId(id)
      .setSnip(snip)
      .setLang(lang)
      .setUser(user)
      .setCreated(created)
      .setDescription(description);
  }
}

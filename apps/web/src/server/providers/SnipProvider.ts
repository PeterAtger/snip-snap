import { SnipsModel } from '@repo/database';

export class SnipProvider {
  model: SnipsModel;

  constructor() {
    this.model = new SnipsModel();
  }

  async getSnips(page?: number) {
    return this.model.getAllSnips(page || 1);
  }
}

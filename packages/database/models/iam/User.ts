import { randomUUID } from 'crypto';
import { hashString } from '@repo/utils';
import { UsersResource } from '../../connection';

type UserParams = {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  image?: string;
};

export default class User {
  email: string;

  name: string;

  id: string;

  image: string;

  password: string;

  resource: UsersResource;

  avatarUrl = 'https://cdn.auth0.com/avatars/';

  constructor({
    id,
    name,
    email,
    password,
    image,
  }: UserParams = {}) {
    this.email = email || '';
    this.name = name || '';
    this.id = id || '';
    this.image = image || '';
    this.password = password ? hashString(password) : '';
    this.resource = new UsersResource();
  }

  setEmail(value: string) {
    this.email = value;

    return this;
  }

  setName(value: string) {
    this.name = value;

    return this;
  }

  setId(value: string) {
    this.id = value;

    return this;
  }

  setImage(value: string) {
    this.image = value;

    return this;
  }

  setDefaultImage() {
    if (!this.name) {
      return this;
    }

    const initials = this.name
      .split(' ')
      .map((word) => word.charAt(0).toLowerCase())
      .join('');

    this.image = `${this.avatarUrl}${initials}.png`;

    return this;
  }

  setPassword(value: string) {
    this.password = hashString(value);

    return this;
  }

  validatePassword(value: string, shouldHash: boolean = true): boolean {
    const passwordToCheck = shouldHash ? hashString(value) : value;

    return passwordToCheck === this.password;
  }

  async loadUserWithEmail(searchEmail: string): Promise<boolean> {
    if (!searchEmail) {
      return false;
    }

    const data = await this.resource.getUser(searchEmail);

    if (!data) {
      return false;
    }

    const {
      id,
      name,
      email,
      image,
      password,
    } = data;

    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password || '';
    this.image = image || '';

    return true;
  }

  async saveUser(): Promise<boolean> {
    const {
      name,
      email,
      image,
      password,
    } = this;

    if (!(email && name && password)) {
      throw new Error('Please Initialize all required fields');
    }

    const id = randomUUID();

    const returnedId = await this.resource.createUser({
      id,
      name,
      email,
      image,
      password,
      emailVerified: null,
    });

    if (!returnedId) {
      return false;
    }

    return true;
  }

  async updateUser(): Promise<boolean> {
    const {
      id,
      name,
      email,
      password,
    } = this;

    const isUpdated = await this.resource.updateUser({
      id,
      name,
      email,
      password,
    });

    return isUpdated;
  }

  async checkUserExists(searchEmail: string): Promise<boolean> {
    const data = await this.resource.getUser(searchEmail);

    if (!data) {
      return false;
    }

    return true;
  }

  isNewValue(
    variable: string,
    value: string,
    shouldHash: boolean = false,
  ): boolean {
    const valueToCheck = (
      variable === 'password' && shouldHash
        ? hashString(value)
        : value
    );

    const oldValue = this[variable as keyof typeof this];

    return oldValue !== valueToCheck;
  }
}

export type UserType = {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date | null;
  password: string | null;
  image?: string | null;
};

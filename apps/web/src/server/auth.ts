import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { DbConnector } from '@repo/database';
import { env } from '@/env.mjs';

export const {
  handlers, signIn, signOut, auth,
} = NextAuth({
  adapter: DrizzleAdapter(DbConnector.getConnection()),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
});

'use server';

import { FormResultType } from '@/types/FormResult';
import { signIn } from '@/server/auth';

export default async (): Promise<FormResultType> => {
  await signIn('github', { redirectTo: '/' });

  return {
    success: true,
    message: 'Sign in successful',
  };
};

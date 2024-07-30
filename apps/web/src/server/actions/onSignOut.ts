'use server';

import { FormResultType } from '@/types/FormResult';
import { signOut } from '@/server/auth';

export default async (): Promise<FormResultType> => {
  await signOut();

  return {
    success: true,
    message: 'Sign out successful',
  };
};

'use server';

import { SnipsModel } from '@repo/database';
import { FormResultType } from '@/types/FormResult';
import { auth } from '../auth';

export default async (prevState: FormResultType, formData: FormData): Promise<FormResultType> => {
  const formObject = Object.fromEntries(formData);
  const {
    title,
    desc,
    lang,
    content,
  } = formObject as Record<string, string>;
  const session = await auth();

  if (!title || !lang || !desc || !content || !session) {
    return {
      success: false,
      message: 'All fields are required',
    };
  }

  const snip = new SnipsModel({
    id: title,
    lang,
    user: session.user?.id,
    description: desc,
    snip: content,
  });

  const id = await snip.save();

  if (!id) {
    return {
      success: false,
      message: 'Failed to save snippet',
    };
  }

  return {
    success: true,
    message: 'Snippet created',
  };
};

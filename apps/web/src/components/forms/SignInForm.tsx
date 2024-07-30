'use client';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui';
import { useFormState } from 'react-dom';
import onSignIn from '@/server/actions/onSignIn';

export function SignInForm() {
  const [, onSubmit] = useFormState(onSignIn, { success: false, message: '' });

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl flex justify-center">Login</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form action={onSubmit}>
          <Button type="submit" className="w-full">Sign in with Github</Button>
        </form>
      </CardContent>
    </Card>
  );
}

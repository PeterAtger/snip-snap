import { SignInForm } from '@/components/forms/SignInForm';

export default async function SignIn() {
  return (
    <section className="flex lg:flex-row flex-col flex-1 h-auto items-center justify-center">
      <SignInForm />
    </section>
  );
}

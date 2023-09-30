import { isAuthenticated } from '@hbo-ict/actions';
import { Button, SignInForm } from '@hbo-ict/ui';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function SignIn() {
  const isAuthed = await isAuthenticated();

  if (isAuthed) {
    redirect('/workspace');
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="font-normal text-slate-500">Welcome back. please sign in</p>
      <SignInForm />
      <div className="flex flex-row items-center justify-center">
        <p className="text-slate-500 text-sm">
          New to the platform?{' '}
          <Button variant="link" asChild>
            <Link href="sign-up">Sign Up</Link>
          </Button>
        </p>
      </div>
    </div>
  );
}

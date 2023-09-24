import { Button } from '@hbo-ict/ui';
import { SignInForm } from '../../../blocks/sign-in-form';
import Link from 'next/link';

export default function SignIn() {
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

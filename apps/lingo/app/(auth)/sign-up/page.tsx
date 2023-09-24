import { Button } from '@hbo-ict/ui';
import { SignUpForm } from '../../../blocks/sign-up-form';
import Link from 'next/link';

export default function SignUp() {
  return (
    <div className=" flex flex-col gap-4 ">
      <p className="font-normal text-slate-500">Welcome. please sign up</p>
      <SignUpForm />
      <div className="flex flex-row items-center justify-center">
        <p className="text-slate-500 text-sm">
          Already have an account?{' '}
          <Button variant="link" asChild>
            <Link href="sign-in">Sign in</Link>
          </Button>
        </p>
      </div>
    </div>
  );
}

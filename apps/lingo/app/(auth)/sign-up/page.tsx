import { Button, SignUpForm } from '@hbo-ict/ui';
import Link from 'next/link';
import { isAuthenticated } from '@hbo-ict/actions';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function SignUp() {
  const isAuthed = await isAuthenticated();

  if (isAuthed) {
    redirect('/workspace');
  }

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

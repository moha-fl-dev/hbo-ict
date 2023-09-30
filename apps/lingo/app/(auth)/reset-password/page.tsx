import { Button, ResetPasswordForm } from '@hbo-ict/ui';
import Link from 'next/link';

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="font-normal text-slate-500">Please provide your email.</p>
      <ResetPasswordForm />
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

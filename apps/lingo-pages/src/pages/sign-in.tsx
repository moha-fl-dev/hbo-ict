import {
  type SignInDto,
  SignInSchema,
  SuccesfulAuthResponse,
} from '@hbo-ict/lingo/types';
import {
  AuthLayout,
  Button,
  Form,
  RedAlertWithNoTitle,
  SignInForm,
} from '@hbo-ict/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Api } from '@hbo-ict/query-fns';
import Link from 'next/link';

export default function SignIn() {
  const [serverError, setServerError] = useState<boolean>(false);
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['auth'],
    mutationFn: Api.auth.signIn,
    onError: (error) => {
      setServerError(true);
    },
    onSuccess: (data: unknown) => {
      const res = data as SuccesfulAuthResponse;
      router.push('/workspace');
    },
  });

  const form = useForm<SignInDto>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
      remember_me: false,
    },
  });

  function onSubmit(values: SignInDto) {
    mutate(values);
  }

  return (
    <Form {...form}>
      {serverError && (
        <RedAlertWithNoTitle description="Invalid login credentials" />
      )}

      <SignInForm form={form} onSubmit={form.handleSubmit(onSubmit)} />
    </Form>
  );
}

SignIn.getLayout = function getLayout(page: JSX.Element) {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-4 w-full">
        <p className="font-normal text-slate-500">
          Welcome back. please sign in
        </p>
        {page}
        <div className="flex flex-row items-center justify-center">
          <p className="text-slate-500 text-sm">
            New to the platform?{' '}
            <Button variant="link" asChild>
              <Link href="sign-up">Sign Up</Link>
            </Button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

import {
  type SignInDto,
  SignInSchema,
  SignUpDto,
  SignUpSchema,
} from '@hbo-ict/lingo/types';
import {
  AuthLayout,
  Button,
  Form,
  RedAlertWithNoTitle,
  SignUpForm,
} from '@hbo-ict/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import type { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Api } from '@hbo-ict/query-fns';
import Link from 'next/link';

export default function SignUp() {
  const [serverError, setServerError] = useState<boolean>(false);
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: Api.auth.signUp,
    onError: (error) => {
      setServerError(true);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const form = useForm<SignUpDto>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
  });

  function onSubmit(values: SignUpDto) {
    mutate(values);
  }

  return (
    <Form {...form}>
      {serverError && (
        <RedAlertWithNoTitle description="Something went wrong, please try again later." />
      )}

      <SignUpForm form={form} onSubmit={form.handleSubmit(onSubmit)} />
    </Form>
  );
}

SignUp.getLayout = function getLayout(page: JSX.Element) {
  return (
    <AuthLayout>
      <div className=" flex flex-col gap-4 ">
        <p className="font-normal text-slate-500">Welcome. please sign up</p>
        {page}
        <div className="flex flex-row items-center justify-center">
          <p className="text-slate-500 text-sm">
            Already have an account?{' '}
            <Button variant="link" asChild>
              <Link href="sign-in">Sign in</Link>
            </Button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

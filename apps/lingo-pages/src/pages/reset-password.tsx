import {
  type SignInDto,
  SignInSchema,
  SignUpDto,
  SignUpSchema,
  ResetPasswordDto,
  emailSchema,
} from '@hbo-ict/lingo/types';
import {
  AuthLayout,
  Button,
  Form,
  RedAlertWithNoTitle,
  ResetPasswordForm,
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

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  return {
    props: {
      data: 'to hell.',
    },
  };
}

export default function ResetPassword() {
  const [serverError, setServerError] = useState<boolean>(false);
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: Api.forgotPassword,
    onError: (error) => {
      setServerError(true);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const form = useForm<ResetPasswordDto>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: ResetPasswordDto) {
    mutate(values);
  }

  return (
    <Form {...form}>
      {serverError && (
        <RedAlertWithNoTitle description="Invalid login credentials" />
      )}

      <ResetPasswordForm form={form} onSubmit={form.handleSubmit(onSubmit)} />
    </Form>
  );
}

ResetPassword.getLayout = function getLayout(page: JSX.Element) {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-4 w-full">
        <p className="font-normal text-slate-500">Please provide your email.</p>
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

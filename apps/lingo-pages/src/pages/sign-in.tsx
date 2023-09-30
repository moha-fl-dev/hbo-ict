import { type SignInDto, SignInSchema } from '@hbo-ict/lingo/types';
import {
  AuthLayout,
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RedAlertWithNoTitle,
} from '@hbo-ict/ui';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import type { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { signInFn } from '@hbo-ict/query-fns';

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

export default function SignIn({ data }: { data: string }) {
  const [serverError, setServerError] = useState<boolean>(false);
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: signInFn,
    onError: (error) => {
      setServerError(true);
    },
    onSuccess: (data) => {
      router.push('/');
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

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 "
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@email.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-between items-center align-middle">
          <FormField
            control={form.control}
            name="remember_me"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row gap-2 align-middle items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        return field.onChange(checked);
                      }}
                    />
                  </FormControl>
                  <FormLabel>Remember me</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="ghost" asChild>
            <Link href="/reset-password" className="text-slate-500 text-sm">
              Forgot password?
            </Link>
          </Button>
        </div>
        <Button type="submit" size={'lg'} className="w-full">
          Sign in {data}
        </Button>
      </form>
    </Form>
  );
}

SignIn.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

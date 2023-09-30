'use client';

import { SignInSchema, SignInDto } from '@hbo-ict/lingo/types';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { signInAction } from '@hbo-ict/actions';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/form';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { RedAlertWithNoTitle } from '../components/red-alert';
import { Checkbox } from '../components/check-box';
import { redirect } from 'next/navigation';

export function SignInForm() {
  const [serverError, setServerError] = useState<boolean>(false);

  const form = useForm<SignInDto>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
      remember_me: false,
    },
  });

  async function onSubmit(values: SignInDto) {
    try {
      const result = await signInAction(values);

      if (result.status !== 202) {
        setServerError(() => true);
        return;
      }
    } catch (error) {
      redirect('/workspace');
    }
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
          Sign in
        </Button>
      </form>
    </Form>
  );
}

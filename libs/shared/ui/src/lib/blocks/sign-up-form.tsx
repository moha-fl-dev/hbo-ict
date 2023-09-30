'use client';

import { SignUpDto, SignUpSchema } from '@hbo-ict/lingo/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { signUpAction } from '@hbo-ict/actions';
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
import { redirect } from 'next/navigation';

export function SignUpForm() {
  const [serverError, setServerError] = useState<boolean>(false);

  const form = useForm<SignUpDto>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
  });

  async function onSubmit(values: SignUpDto) {
    try {
      const result = await signUpAction(values);
      console.log('Result ', result);
      if (result.status !== 201) {
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
        <RedAlertWithNoTitle description="Something went wrong, please try again later." />
      )}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
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

        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size={'lg'} className="w-full">
          Sign Up
        </Button>
      </form>
    </Form>
  );
}

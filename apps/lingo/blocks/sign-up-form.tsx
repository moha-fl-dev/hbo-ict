'use client';

import { SignUpDto, SignUpSchema } from '@hbo-ict/lingo/types';
import {
  Button,
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
import { useForm } from 'react-hook-form';
import { SignUpAction } from '../actions/_actions';
import { useState } from 'react';

export function SignUpForm() {
  const [serverError, setServerError] = useState<boolean>(false);

  const form = useForm<SignUpDto>({
    // @ts-expect-error unexplainable type error. followed the docs to the letter. maybe typescript version mismatch?
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
  });

  async function onSubmit(values: SignUpDto) {
    const result = await SignUpAction(values);
    if (result.status !== 201) {
      setServerError(() => true);
    }

    console.log(result);
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

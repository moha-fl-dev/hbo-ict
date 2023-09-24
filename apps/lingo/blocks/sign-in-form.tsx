'use client';

import { SignInSchema, SignInDto } from '@hbo-ict/lingo/types';
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@hbo-ict/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export function SignInForm() {
  const form = useForm<SignInDto>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
      remember_me: false,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: SignInDto) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values);
  }

  return (
    <Form {...form}>
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

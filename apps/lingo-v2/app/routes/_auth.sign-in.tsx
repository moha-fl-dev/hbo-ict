import { SignInDto, SignInSchema } from '@hbo-ict/lingo/types';
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RedAlertWithNoTitle,
  Form,
  Checkbox,
} from '@hbo-ict/ui';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@remix-run/react';

export default function SignIn() {
  const [serverError, setServerError] = useState<boolean>(false);

  const form = useForm<SignInDto>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: SignInDto) {
    console.log(values);
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="font-normal text-slate-500">Welcome back. please sign in</p>

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
              <Link to="/forgot-password" className="text-slate-500 text-sm">
                Forgot password?
              </Link>
            </Button>
          </div>
          <Button type="submit" size={'lg'} className="w-full">
            Sign in
          </Button>
        </form>
      </Form>
      <div className="flex flex-row items-center justify-center">
        <p className="text-slate-500 text-sm">
          New to the platform?{' '}
          <Button variant="link" asChild>
            <Link to="/sign-up">Sign Up</Link>
          </Button>
        </p>
      </div>
    </div>
  );
}

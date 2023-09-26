import { SignUpDto, SignUpSchema } from '@hbo-ict/lingo/types';
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
} from '@hbo-ict/ui';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@remix-run/react';

export default function SignUp() {
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
    console.log(values);
  }

  return (
    <div className=" flex flex-col gap-4 ">
      <p className="font-normal text-slate-500">Welcome. please sign up</p>

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
      <div className="flex flex-row items-center justify-center">
        <p className="text-slate-500 text-sm">
          Already have an account?{' '}
          <Button variant="link" asChild>
            <Link to="/sign-in">Sign in</Link>
          </Button>
        </p>
      </div>
    </div>
  );
}

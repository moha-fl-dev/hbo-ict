import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@hbo-ict/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { ActionArgs, ActionFunction } from '@remix-run/node';
import { Form, Link } from '@remix-run/react';
import { useForm } from 'react-hook-form';

import * as z from 'zod';

const formSchema = z.object({
  email: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  console.log(Object.fromEntries(formData.entries()));

  return null;
};

export default function ForgotPassword() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: FormValues) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="font-normal text-slate-500">Please provide your email.</p>
      <Form className="flex flex-col gap-4 " method="post">
        <Input placeholder="johndoe@email.com" name="email" />
        <Button type="submit" size={'lg'} className="w-full">
          Reset
        </Button>
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

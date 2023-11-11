import Link from 'next/link';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/form';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { Checkbox } from '../components/check-box';
import type { SignInDto } from '@hbo-ict/lingo/types';
import { SignUpDto } from '@hbo-ict/lingo/types';
import type { MinimalFormProps } from '../types';

/**
 * reusable form for signing in takes a form and a submit handler.
 * @param param0
 * @returns
 */
export function SignInForm({ form, onSubmit }: MinimalFormProps<SignInDto>) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 ">
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
  );
}

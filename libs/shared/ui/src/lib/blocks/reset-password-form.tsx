'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import * as z from 'zod';
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
import { MinimalFormProps } from '../types';
import { ResetPasswordDto } from '@hbo-ict/lingo/types';

/**
 * reusable form for resetting a password.
 * @param param0
 * @returns
 */
export function ResetPasswordForm({
  form,
  onSubmit,
}: MinimalFormProps<ResetPasswordDto>) {
  return (
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
      <Button type="submit" size={'lg'} className="w-full">
        Reset
      </Button>
    </form>
  );
}

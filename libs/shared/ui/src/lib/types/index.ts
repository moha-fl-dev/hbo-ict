import { ReactElement } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

/**
 * MinimalFormProps
 * @description
 * Minimal form props for use in the shared ui library
 * @param T - Generic type for the form
 * @returns MinimalFormProps
 *
 */
export type MinimalFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: () => void;
};

export type WorkspaceMenu = {
  name: string;
  path: string;
  icon: ReactElement;
  active: boolean;
};

import { FieldValues, UseFormReturn } from 'react-hook-form';

export type MinimalFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: () => void;
};

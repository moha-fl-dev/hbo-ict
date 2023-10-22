import {
  useDepartments,
  useTeams,
  useTeamsWithDepartment,
} from '@hbo-ict/hooks';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  WorkspaceRootLayout,
} from '@hbo-ict/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'name must be at least 2 characters.',
  }),
  department: z.object({
    id: z.string().uuid({
      message: 'You must select a department.',
    }),
  }),
  team: z.object({
    id: z.string().uuid({
      message: 'You must select a team.',
    }),
  }),
});

export default function ManageAccount() {
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    string | null
  >(null);

  const { departments } = useDepartments();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      department: {
        id: '',
      },
      team: {
        id: '',
      },
    },
  });

  const { teams } = useTeamsWithDepartment(selectedDepartmentId as string);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Finish setting up your account</AlertDialogTitle>
            <AlertDialogDescription>
              <em>alimoha72@gmail.com</em>
            </AlertDialogDescription>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>name</FormLabel>
                      <FormControl>
                        <Input placeholder="John doe" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department.id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select
                        onValueChange={
                          (field.onChange,
                          (value) => {
                            setSelectedDepartmentId(() => value as string);
                            field.onChange(value);
                            form.resetField('team.id');
                          })
                        }
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <ScrollArea className="max-h-[400px]">
                            {departments?.map((department) => (
                              <SelectItem
                                className={`hover:bg-slate-50 transition-colors ${
                                  field.value === department.id &&
                                  'bg-slate-100'
                                }`}
                                key={department.id}
                                value={department.id}
                              >
                                {department.name}
                              </SelectItem>
                            ))}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        You can manage departments in{' '}
                        <Link href="/workspace/manage/departments">
                          <em>department settings</em>
                        </Link>
                        .
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="team.id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your team" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <ScrollArea className="max-h-[400px]">
                            {teams?.map((team) => (
                              <SelectItem
                                className={`hover:bg-slate-50 transition-colors ${
                                  field.value === team.id && 'bg-slate-100'
                                }`}
                                key={team.id}
                                value={team.id}
                              >
                                {team.name}
                              </SelectItem>
                            ))}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        You can manage teams in{' '}
                        <Link href="/workspace/manage/teams">
                          <em>teams settings</em>
                        </Link>
                        .
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>
          </AlertDialogHeader>
          {/* <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter> */}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

ManageAccount.getLayout = function getLayout(page: JSX.Element) {
  return <WorkspaceRootLayout>{page}</WorkspaceRootLayout>;
};

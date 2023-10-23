import {
  useCurrentEmployeeExtendedDetails,
  useCurrentUser,
  useDepartments,
  useTeamsWithDepartment,
} from '@hbo-ict/hooks';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
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
import { useEffect, useState } from 'react';
import { set, useFieldArray, useForm } from 'react-hook-form';
import {
  accountSchema,
  AccountDto,
  passwordSchema,
  PasswordDto,
} from '@hbo-ict/lingo/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '@hbo-ict/query-fns';

export default function ManageAccount() {
  const queryClient = useQueryClient();
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    string | null
  >(null);

  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  const { departments } = useDepartments();
  const { currentUser } = useCurrentUser();
  const { currentEmployeeExtendedDetails } =
    useCurrentEmployeeExtendedDetails();

  const form = useForm<AccountDto>({
    resolver: zodResolver(accountSchema),
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

  useEffect(() => {
    if (currentEmployeeExtendedDetails) {
      form.setValue('name', currentEmployeeExtendedDetails.name!);
      form.setValue(
        'department.id',
        currentEmployeeExtendedDetails.Team?.departmentId!
      );
      form.setValue('team.id', currentEmployeeExtendedDetails.Team?.id!);
      setSelectedDepartmentId(
        currentEmployeeExtendedDetails.Team?.departmentId!
      );
    }
  }, [currentEmployeeExtendedDetails, form.setValue]);

  const { teams } = useTeamsWithDepartment(selectedDepartmentId as string);

  useEffect(() => {
    if (teams) {
      setSelectedTeamId(currentEmployeeExtendedDetails!.teamId!);
    }
  }, [teams]);

  const accountForm = useForm<PasswordDto>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
    },
  });
  const { mutate } = useMutation({
    mutationKey: ['update-account'],
    mutationFn: Api.employee.upsert,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(['currentEmployeeExtendedDetails']);
    },
  });

  function onSubmit(values: AccountDto) {
    console.log(values);
    mutate(values);
  }

  function onAccountSubmit(values: PasswordDto) {
    console.log(values);
  }

  return (
    <div className="col-span-4 h-full">
      <div className="flex flex-col gap-4">
        <div className="p-4">
          <em>
            <h1 className="text-xl font-semibold text-slate-600">Account</h1>
          </em>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <Label className="text-slate-600 space-y-4">
                {currentUser?.email}
              </Label>
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
                      value={selectedDepartmentId || ''}
                      onValueChange={
                        (field.onChange,
                        (value) => {
                          setSelectedDepartmentId(value as string);
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
                                field.value === department.id && 'bg-slate-100'
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
                      value={selectedTeamId || ''}
                      onValueChange={
                        (field.onChange,
                        (value) => {
                          field.onChange(value);
                          setSelectedTeamId(value);
                        })
                      }
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={`Select your team`} />
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
              <Button type="submit" className="">
                Submit
              </Button>
            </form>
          </Form>
        </div>
        <div className="bg-slate-50 rounded-sm p-4">
          <div className="flex flex-row justify-between items-center">
            <em>
              <h1 className="text-xl font-semibold text-slate-600">Security</h1>
            </em>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Reset password</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Reset password</DialogTitle>
                  <DialogDescription>
                    You will have to login after resetting the password.
                  </DialogDescription>
                </DialogHeader>
                <Form {...accountForm}>
                  <form
                    onSubmit={accountForm.handleSubmit(onAccountSubmit)}
                    className="flex flex-col gap-4"
                  >
                    <FormField
                      control={accountForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="********"
                              type="password"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-row justify-end">
                      <Button type="submit" className="">
                        Change password
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

ManageAccount.getLayout = function getLayout(page: JSX.Element) {
  return <WorkspaceRootLayout>{page}</WorkspaceRootLayout>;
};

import { useDepartments, useTeams } from '@hbo-ict/hooks';
import type { CreateTeamDto } from '@hbo-ict/lingo/types';
import { createTeamSchema } from '@hbo-ict/lingo/types';
import { Api } from '@hbo-ict/query-fns';
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  QuickLinksPopover,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  WorkspaceRootLayout,
  formatDateWithRelativeTime,
  toast,
} from '@hbo-ict/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { InfoCircledIcon, PlusIcon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ManageTeams() {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);

  const { isError: _isTeamsError, teams } = useTeams();
  const { departments, isError: _isDepartmentsError } = useDepartments();
  const queryClient = useQueryClient();

  const form = useForm<CreateTeamDto>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      name: '',
      department: {
        id: '',
      },
    },
  });

  const { mutate } = useMutation({
    mutationKey: ['create-team'],
    mutationFn: Api.team.create,
    onSuccess(data) {
      queryClient.invalidateQueries(['teams']);
      toast({
        description: `${data.name} team has been created.`,
      });
      setSheetOpen(() => false);
      form.reset();
    },
  });

  function onSubmit(values: CreateTeamDto) {
    mutate(values);
  }

  return (
    <div className="container flex flex-col gap-4 mt-4">
      <div className="flex flex-row justify-between items-center content-center">
        <span>Teams #{teams?.length}</span>
        <Sheet open={sheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant={'workspace'}
              onClick={() => setSheetOpen(() => true)}
            >
              <div className="flex flex-row gap-2 items-center">
                <PlusIcon fontSize={10} />
                <span>New</span>
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent side={'right'} className="p-0 md:max-w-xl sm:max-w-xl">
            <SheetHeader>
              <SheetTitle className="p-4">Add new team</SheetTitle>
              <Separator />
            </SheetHeader>
            <div className="flex flex-col justify-between ">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-4 p-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Engineering"
                            {...field}
                            type="text"
                          />
                        </FormControl>
                        <FormDescription>
                          This is the public display name for the team.
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
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the department that owns this component" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <ScrollArea className="max-h-[400px] h-[400px]">
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
                  <Button variant={'workspace'} type="submit">
                    Create team
                  </Button>
                </form>
              </Form>
              <div>
                <Separator />
                <div className="flex flex-row gap-2 content-end items-end justify-end p-4">
                  <SheetClose asChild>
                    <Button
                      variant={'outline'}
                      onClick={() => setSheetOpen(() => false)}
                    >
                      Cancel
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </div>
          </SheetContent>
          <SheetOverlay onClick={() => setSheetOpen(() => false)} />
        </Sheet>
      </div>
      <Table>
        <TableCaption>End of teams list</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              <InfoCircledIcon />
            </TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Tickets</TableHead>
            <TableHead className="text-right">Components</TableHead>
            <TableHead className="text-right">Members</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams?.map((team, i) => {
            const componentIds = team.components.reduce(
              (acc, cur) => {
                acc.id = cur.id;
                return acc;
              },
              { id: '' },
            );

            return (
              <TableRow key={i} className={`${i % 2 === 0 && 'bg-muted/50'}`}>
                <TableCell>
                  <QuickLinksPopover
                    feature={{ ...team, baseHref: '/workspace/tickets?team' }}
                  />
                </TableCell>
                <TableCell>
                  <span>{team.name}</span>
                </TableCell>
                <TableCell>
                  <span>
                    {formatDateWithRelativeTime(
                      team.createdAt,
                    ).formatMonthAndYear()}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/workspace/tickets?team=${encodeURIComponent(
                      team.id,
                    )}`}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <span>{team._count.Tickets}</span>
                        </TooltipTrigger>
                        <TooltipContent>View ticket</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/workspace/manage/components/${encodeURIComponent(
                      componentIds.id,
                    )}`}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <span>{team._count.components}</span>
                        </TooltipTrigger>
                        <TooltipContent>View components</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/workspace/manage/teams/${encodeURIComponent(
                      team.id,
                    )}`}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <span>{team._count.members}</span>
                        </TooltipTrigger>
                        <TooltipContent>View team members</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

ManageTeams.getLayout = function getLayout(page: JSX.Element) {
  return (
    <WorkspaceRootLayout>
      <Head>
        <title>Teams</title>
      </Head>
      <ScrollArea className="max-h-[90vh] h-[90vh] min-h[90vh]">
        {page}
      </ScrollArea>
    </WorkspaceRootLayout>
  );
};

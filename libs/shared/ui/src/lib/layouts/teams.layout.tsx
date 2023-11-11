import { Api } from '@hbo-ict/query-fns';
import { Department, Team } from '@prisma/client/lingo';
import {
  useIsFetching,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import Link from 'next/link';
import router from 'next/router';
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../components/table';
import { ScrollArea } from '../components/scroll-area';
import { Button } from '../components/button';
import { useForm } from 'react-hook-form';
import type { CreateTeamDto } from '@hbo-ict/lingo/types';
import { createTeamSchema } from '@hbo-ict/lingo/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '../hooks/use-toast';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from '../components/sheet';
import { PlusIcon } from '@radix-ui/react-icons';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from '../components/form';
import { Input } from '../components/input';
import { Separator } from '../components/seperator';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/select';
import { useDepartments, useTeams } from '@hbo-ict/hooks';

export function TeamsLayout({ children }: { children: React.ReactNode }) {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);

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

  const { teams } = useTeams();

  const { departments } = useDepartments();

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
      router.push(`/workspace/manage/teams/?team=${data.id}`);
    },
  });

  function onSubmit(values: CreateTeamDto) {
    mutate(values);
  }

  return (
    <div className="grid grid-flow-row grid-cols-5 h-full gap-4">
      <div className="col-span-1">
        <ScrollArea className="max-h-[80vh] h-[80vh] min-h[80vh]">
          <Table>
            <TableCaption>End of teams list</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">
                  <div className="flex flex-row justify-between items-center">
                    <span>Teams</span>
                    <Sheet open={sheetOpen}>
                      <SheetTrigger asChild>
                        <Button
                          variant={'workspace'}
                          size={'sm'}
                          className="h-8"
                          onClick={() => setSheetOpen(() => true)}
                        >
                          <div className="flex flex-row gap-2 items-center">
                            <PlusIcon fontSize={10} />
                            <span>Add</span>
                          </div>
                        </Button>
                      </SheetTrigger>
                      <SheetContent
                        side={'right'}
                        className="p-0 md:max-w-xl sm:max-w-xl"
                      >
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
                                      This is the public display name for the
                                      team.
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
                                          <SelectValue placeholder="Select the team that owns this component" />
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
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams?.map((team, i) => (
                <TableRow key={i} className="">
                  <TableCell
                    className={`${
                      router.query.team === team.id &&
                      'bg-slate-100 hover:bg-slate-100'
                    } transition-colors hover:bg-slate-50`}
                    key={i}
                  >
                    <Link
                      href={`/workspace/manage/teams/?team=${encodeURIComponent(
                        team.id,
                      )}`}
                      className="w-full block"
                    >
                      <span>{team.name}</span>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {children}
    </div>
  );
}

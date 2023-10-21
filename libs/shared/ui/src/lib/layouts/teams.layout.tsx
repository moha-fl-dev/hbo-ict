import { Api } from '@hbo-ict/query-fns';
import { Department } from '@prisma/client/lingo';
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
import {
  SingleNameFieldDto,
  SingleNameFieldSchema,
} from '@hbo-ict/lingo/types';
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

export function TeamsLayout({ children }: { children: React.ReactNode }) {
  const isFetching = useIsFetching();
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const form = useForm<SingleNameFieldDto>({
    resolver: zodResolver(SingleNameFieldSchema),
    defaultValues: {
      name: '',
    },
  });
  const { data: teams } = useQuery<Department[]>({
    queryKey: ['teams'],
    queryFn: Api.team.getAll,
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
      router.push(`/workspace/manage/teams/?team=${data.name}`);
    },
  });

  function onSubmit(values: SingleNameFieldDto) {
    mutate(values);
  }

  if (isFetching > 0) {
    return (
      <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-white bg-opacity-50">
        <svg
          xmlns="http://www.w3.org/150/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-spin"
        >
          <line x1="12" x2="12" y1="2" y2="6" />
          <line x1="12" x2="12" y1="18" y2="22" />
          <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
          <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
          <line x1="2" x2="6" y1="12" y2="12" />
          <line x1="18" x2="22" y1="12" y2="12" />
          <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
          <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
        </svg>
      </div>
    );
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
                      router.query.team === team.name &&
                      'bg-slate-100 hover:bg-slate-100'
                    } transition-colors hover:bg-slate-50`}
                    key={i}
                  >
                    <Link
                      href={`/workspace/manage/teams/?team=${encodeURIComponent(
                        team.name
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

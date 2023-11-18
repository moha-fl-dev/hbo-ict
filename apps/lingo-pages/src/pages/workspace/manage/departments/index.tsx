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

import { useDepartments } from '@hbo-ict/hooks';
import type { SingleNameFieldDto } from '@hbo-ict/lingo/types';
import { SingleNameFieldSchema } from '@hbo-ict/lingo/types';
import { Api } from '@hbo-ict/query-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { InfoCircledIcon, PlusIcon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ManageDepartments() {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const form = useForm<SingleNameFieldDto>({
    resolver: zodResolver(SingleNameFieldSchema),
    defaultValues: {
      name: '',
    },
  });

  const { mutate } = useMutation({
    mutationKey: ['create-department'],
    mutationFn: Api.department.create,
    onSuccess(data) {
      queryClient.invalidateQueries(['departments']);
      toast({
        description: `${data?.name} department has been created.`,
      });
      setSheetOpen(() => false);
    },
  });

  function onSubmit(values: SingleNameFieldDto) {
    mutate(values);
  }

  const { departments } = useDepartments();

  return (
    <div className="container flex flex-col gap-4 mt-4">
      <div className="flex flex-row justify-between items-center content-center">
        <h1>Departments #{departments?.length}</h1>

        <Sheet open={sheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant={'workspace'}
              className="flex flex-row gap-2 content-center"
              onClick={() => setSheetOpen(() => true)}
            >
              <PlusIcon />
              <span>New</span>
            </Button>
          </SheetTrigger>
          <SheetContent side={'right'} className="p-0 md:max-w-xl sm:max-w-xl">
            <SheetHeader>
              <SheetTitle className="p-4">Add new Department</SheetTitle>
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
                        <FormLabel>Department name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Engineering"
                            {...field}
                            type="text"
                          />
                        </FormControl>
                        <FormDescription>
                          This is the public display name for the department.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button variant={'workspace'} type="submit">
                    Create department
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
        <TableCaption>End of departments list</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              <InfoCircledIcon />
            </TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Tickets</TableHead>
            <TableHead className="text-right">Teams</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departments?.map((department, i) => {
            const totalTickets = department.teams.reduce(
              (sum, team) => sum + team._count.Tickets,
              0,
            );
            return (
              <TableRow key={i} className={`${i % 2 === 0 && 'bg-muted/50'}`}>
                <TableCell>
                  <QuickLinksPopover
                    feature={{
                      ...department,
                      baseHref: '/workspace/tickets?department',
                    }}
                  />
                </TableCell>
                <TableCell>
                  <span>{department.name}</span>
                </TableCell>
                <TableCell>
                  <span>
                    {formatDateWithRelativeTime(
                      department.createdAt,
                    ).formatMonthAndYear()}
                  </span>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/workspace/tickets?department=${encodeURIComponent(
                      department.id,
                    )}`}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <span>{totalTickets}</span>
                        </TooltipTrigger>
                        <TooltipContent>View tickets</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/workspace/manage/departments/${department.id}`}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <span>{department._count.teams}</span>
                        </TooltipTrigger>
                        <TooltipContent>View teams</TooltipContent>
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

ManageDepartments.getLayout = function getLayout(page: JSX.Element) {
  return (
    <WorkspaceRootLayout>
      <Head>
        <title>Departments</title>
      </Head>
      <ScrollArea className="max-h-[90vh] h-[90vh] min-h[90vh]">
        {page}
      </ScrollArea>
    </WorkspaceRootLayout>
  );
};

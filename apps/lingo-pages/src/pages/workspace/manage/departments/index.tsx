import {
  SingleNameFieldDto,
  SingleNameFieldSchema,
} from '@hbo-ict/lingo/types';
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
  WorkspaceRootLayout,
  useToast,
} from '@hbo-ict/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from '@radix-ui/react-icons';
import {
  useIsFetching,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Department } from '@prisma/client/lingo';

export default function ManageDepartments() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isFetching = useIsFetching();

  const form = useForm<SingleNameFieldDto>({
    resolver: zodResolver(SingleNameFieldSchema),
    defaultValues: {
      name: '',
    },
  });

  const { data: departments } = useQuery({
    queryKey: ['departments'],
    queryFn: Api.department.getAll,
  });

  const { mutate } = useMutation({
    mutationKey: ['create-department'],
    mutationFn: Api.department.create,
    onSuccess(data) {
      queryClient.invalidateQueries(['departments']);
      toast({
        description: `${data?.name} department has been created.`,
      });
    },
  });

  function onSubmit(values: SingleNameFieldDto) {
    mutate(values);
  }

  if (isFetching > 0) {
    return (
      <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-white bg-opacity-50">
        {/* <div className="w-20 h-20 border-4 border-gray-15 rounded-full animate-spin"></div> */}
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
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-row justify-end content-end items-end  align-middle">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={'workspace'}>
              <div className="flex flex-row gap-2 items-center">
                <PlusIcon fontSize={10} />
                <span>Add Department</span>
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent side={'right'} className="p-0 md:max-w-2xl sm:max-w-xl">
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
                          <Input placeholder="shadcn" {...field} type="text" />
                        </FormControl>
                        <FormDescription>
                          This is the public display name for the department.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button variant={'workspace'} type="submit">
                    Save
                  </Button>
                </form>
              </Form>
              <div>
                <Separator />
                <div className="flex flex-row gap-2 content-end items-end justify-end p-4">
                  <SheetClose asChild>
                    <Button variant={'outline'}>Cancel</Button>
                  </SheetClose>
                </div>
              </div>
            </div>
          </SheetContent>
          <SheetOverlay />
        </Sheet>
      </div>
      <div>
        <Table>
          <TableCaption>A list of Departments.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Department</TableHead>
            </TableRow>
          </TableHeader>
          {
            <TableBody>
              {departments?.map((department: Department, i: number) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    {department.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          }
        </Table>
      </div>
    </div>
  );
}

ManageDepartments.getLayout = function getLayout(page: JSX.Element) {
  return <WorkspaceRootLayout>{page}</WorkspaceRootLayout>;
};

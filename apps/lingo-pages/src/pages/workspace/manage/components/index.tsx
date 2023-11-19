import { useComponents, useTeams } from '@hbo-ict/hooks';
import type {
  ComponentWithTicketsCount,
  CreateComponentDto,
} from '@hbo-ict/lingo/types';
import { createComponentSchema } from '@hbo-ict/lingo/types';
import { Api } from '@hbo-ict/query-fns';
import {
  Badge,
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
  SheetContent,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
  WorkspaceRootLayout,
  toast,
} from '@hbo-ict/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ManageComponents() {
  const _router = useRouter();
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const form = useForm<CreateComponentDto>({
    resolver: zodResolver(createComponentSchema),
    defaultValues: {
      name: '',
      team: {
        id: '',
      },
    },
  });

  const { components } = useComponents();

  const { teams } = useTeams();

  const { mutate } = useMutation({
    mutationKey: ['create-component'],
    mutationFn: Api.component.create,
    onSuccess(data) {
      queryClient.invalidateQueries(['components']);
      toast({
        description: `${data.name} component has been created.`,
      });
      setOpenSheet(false);
    },
  });

  function onSubmit(values: CreateComponentDto) {
    mutate(values);
  }

  return (
    <div className="container flex flex-col gap-4 mt-4">
      <div className="flex flex-row justify-between items-center content-center">
        <h1>Comonents #{components?.length}</h1>
        <div className="flex flex-row gap-4">
          <Sheet open={openSheet}>
            <SheetTrigger asChild>
              <Button
                variant={'workspace'}
                className="w-full"
                onClick={() => setOpenSheet(true)}
              >
                <div className="flex flex-row gap-2 items-center">
                  <PlusIcon fontSize={10} />
                  <span>New</span>
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent
              side={'right'}
              className="p-0 md:max-w-xl sm:max-w-xl"
            >
              <SheetHeader>
                <SheetTitle className="p-4">Add new Component</SheetTitle>
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
                          <FormLabel>Component name</FormLabel>
                          <FormControl>
                            <Input placeholder="CMS" {...field} type="text" />
                          </FormControl>
                          <FormDescription>
                            This is the public display name for the component.
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
                                <SelectValue placeholder="Select the team that owns this component" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <ScrollArea className="max-h-[400px] h-[400px]">
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
                              team setting
                            </Link>
                            .
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button variant={'workspace'} type="submit">
                      Create component
                    </Button>
                  </form>
                </Form>
                <div>
                  <Separator />
                  <div className="flex flex-row gap-2 content-end items-end justify-end p-4">
                    <Button
                      variant={'outline'}
                      onClick={() => setOpenSheet(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
            <SheetOverlay
              onClick={() => setOpenSheet(false)}
              className="backdrop-blur-0 "
            />
          </Sheet>
        </div>
      </div>
      <div className="grid xl:grid-cols-4 grid-cols-1 gap-2">
        {components?.map((component) => (
          <Component key={component.id} component={component} />
        ))}
      </div>
    </div>
  );
}

function Component({ component }: { component: ComponentWithTicketsCount }) {
  return (
    <div className="bg-accent/20 shadow-sm border rounded ">
      <div className="flex flex-col  ">
        <div className="flex flex-row justify-between items-center p-2">
          <div className="flex flex-row gap-2 items-center">
            <span>{component.name}</span>
          </div>
          <Badge variant={'LOW'} className="rounded-full">
            Operational
          </Badge>
        </div>
        <Separator />
        <div className="flex flex-row justify-between items-center text-xs content-center p-2 bg-accent/50">
          <Link
            href={`/workspace/tickets?component=${component.id}`}
            className="hover:cursor-pointer text-primary"
          >
            <span>Tickets: #{component._count.Ticket}</span>
          </Link>
          <QuickLinksPopover
            feature={{
              ...component,
              baseHref: '/workspace/tickets?component',
            }}
          />
        </div>
      </div>
    </div>
  );
}

ManageComponents.getLayout = function getLayout(page: JSX.Element) {
  return (
    <WorkspaceRootLayout>
      <Head>
        <title>Manage components</title>
      </Head>
      <ScrollArea className="max-h-[90vh] h-[90vh] min-h[90vh]">
        {page}
      </ScrollArea>
    </WorkspaceRootLayout>
  );
};

import { useComponents, useTeams } from '@hbo-ict/hooks';
import type { CreateComponentDto } from '@hbo-ict/lingo/types';
import { createComponentSchema } from '@hbo-ict/lingo/types';
import { Api } from '@hbo-ict/query-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from '@radix-ui/react-icons';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../components/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/form';
import { Input } from '../components/input';
import { ScrollArea } from '../components/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/select';
import { Separator } from '../components/seperator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from '../components/sheet';
import { toast } from '../hooks/use-toast';

export function ComponentsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
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
      router.push(`/workspace/manage/components/?component=${data.id}`);
    },
  });

  function onSubmit(values: CreateComponentDto) {
    mutate(values);
  }

  return (
    <div className="container shadow-lg p-4 h-[90vh]">
      <div className="border h-full">
        <div className="grid grid-cols-5 h-full">
          <div className="row-span-full lg:col-span-1 col-span-2 border-r">
            <div className="border-b">
              <div className="p-4">
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
                                  <Input
                                    placeholder="CMS"
                                    {...field}
                                    type="text"
                                  />
                                </FormControl>
                                <FormDescription>
                                  This is the public display name for the
                                  component.
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
                                    <ScrollArea className="max-h-[400px]">
                                      {teams?.map((team) => (
                                        <SelectItem
                                          className={`hover:bg-slate-50 transition-colors ${
                                            field.value === team.id &&
                                            'bg-slate-100'
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
            <ScrollArea className="h-[75vh] max-h-[75vh]">
              <div className="flex flex-col w-full ">
                {components?.map((component, i) => (
                  <Link
                    key={i}
                    className={`${
                      router.query.component === component.id &&
                      'bg-workspace-secondary'
                    } p-4 transition-colors hover:text-workspace-foreground border-b`}
                    href={`/workspace/manage/components/?component=${component.id}`}
                  >
                    <span className="font-medium">{component.name}</span>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="row-span-full col-span-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

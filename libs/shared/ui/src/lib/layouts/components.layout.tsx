import { useComponents, useTeams } from '@hbo-ict/hooks';
import type { Component, CreateComponentDto } from '@hbo-ict/lingo/types';
import { TicketStatusEnum, createComponentSchema } from '@hbo-ict/lingo/types';
import { Api } from '@hbo-ict/query-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { LockOpen1Icon, PlusIcon } from '@radix-ui/react-icons';
import { ScrollArea } from '@radix-ui/react-scroll-area';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import router from 'next/router';
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
import { SummaryLink } from '../components/summaryLink';
import { toast } from '../hooks/use-toast';

export function ComponentsLayout() {
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
    <div className="">
      <div className="flex flex-row justify-end">
        <Sheet open={openSheet}>
          <SheetTrigger asChild>
            <Button
              variant={'workspace'}
              size={'sm'}
              className="h-8"
              onClick={() => setOpenSheet(true)}
            >
              <div className="flex flex-row gap-2 items-center">
                <PlusIcon fontSize={10} />
                <span>New</span>
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent side={'right'} className="p-0 md:max-w-xl sm:max-w-xl">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-4">
        {components?.map((component, i) => (
          <ComponentCard key={i} component={component} />
        ))}
      </div>
    </div>
  );
}

function ComponentCard({ component }: { component: Component }) {
  return (
    <div className="border rounded p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{component.name}</h3>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <SummaryLink
          max={100}
          min={10}
          icon={<LockOpen1Icon />}
          label={'Total open'}
          href={`/workspace/tickets?component=${encodeURIComponent(
            component.id,
          )}&ticket_status=${TicketStatusEnum.OPEN}`}
        />
        <SummaryLink
          max={100}
          min={10}
          icon={<LockOpen1Icon />}
          label={'Total active'}
          href={`/workspace/tickets?component=${encodeURIComponent(
            component.id,
          )}&ticket_status=${TicketStatusEnum.ACTIVE}`}
        />
        <SummaryLink
          max={100}
          min={10}
          icon={<LockOpen1Icon />}
          label={'Total on hold'}
          href={`/workspace/tickets?component=${encodeURIComponent(
            component.id,
          )}&ticket_status=${TicketStatusEnum.HOLD}`}
        />
        <SummaryLink
          max={100}
          min={10}
          icon={<LockOpen1Icon />}
          label={'Total closed'}
          href={`/workspace/tickets?component=${encodeURIComponent(
            component.id,
          )}&ticket_status=${TicketStatusEnum.CLOSED}`}
        />
      </div>
    </div>
  );
}

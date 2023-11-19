import {
  useComponentsWithTeamId,
  useCreateTicket,
  useEmployees,
  useTeams,
} from '@hbo-ict/hooks';
import type { CreateTicketDto } from '@hbo-ict/lingo/types';
import {
  SeverityEnum,
  TicketStatusEnum,
  createTicketSchema,
} from '@hbo-ict/lingo/types';
import { Api } from '@hbo-ict/query-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../components/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../components/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/form';
import { Input } from '../components/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/pop-over';
import { ScrollArea } from '../components/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/select';
import { Textarea } from '../components/textarea';
import { useToast } from '../hooks/use-toast';
import { cn } from '../utils';

type FormAction = 'CREATE' | 'UPDATE';

type TicketFormProps = {
  action: FormAction;
  defaultValues?: CreateTicketDto;
};

type TicketNumberState = {
  mode: FormAction;
  ticketNumber: string | null;
};

type TicketNumberAction =
  | { type: 'CREATE'; payload: string }
  | { type: 'UPDATE' };

function reducer(
  state: TicketNumberState,
  action: TicketNumberAction,
): TicketNumberState {
  switch (action.type) {
    case 'CREATE':
      return { mode: 'CREATE', ticketNumber: action.payload };
    case 'UPDATE':
      return { ...state, mode: 'UPDATE' };
    default:
      throw new Error('Unhandled action type');
  }
}

export function TicketForm({ defaultValues, action }: TicketFormProps) {
  //
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');

  const [state, dispatch] = useReducer(reducer, {
    mode: action,
    ticketNumber: defaultValues?.ticketNumber || null,
  });

  const shouldFetchTicketNumber =
    state.mode === 'CREATE' && state.ticketNumber === null;

  const ticketForm = useForm<CreateTicketDto>({
    resolver: zodResolver(createTicketSchema),
    defaultValues,
  });

  const severityOptions = Object.values(SeverityEnum);

  const statusOptions = Object.values(TicketStatusEnum);

  const { teams } = useTeams();
  const { components } = useComponentsWithTeamId(selectedTeamId);
  const { ticketNumber: ticket_number, isSuccess } = useCreateTicket({
    enabled: shouldFetchTicketNumber,
  });

  const { employees } = useEmployees();

  useEffect(() => {
    if (defaultValues?.teamId) {
      setSelectedTeamId(defaultValues.teamId);
    }

    if (defaultValues?.ticketNumber) {
      ticketForm.setValue('ticketNumber', defaultValues?.ticketNumber);
      ticketForm.setValue('callerId', defaultValues?.callerId);
      ticketForm.setValue('assigneeId', defaultValues?.assigneeId);
      dispatch({ type: 'UPDATE' });
    }
  }, [defaultValues]);

  useEffect(() => {
    if (isSuccess && ticket_number && state.mode === 'CREATE') {
      dispatch({ type: 'CREATE', payload: ticket_number.number });
      ticketForm.setValue('ticketNumber', ticket_number.number);
    } else if (state.mode === 'UPDATE') {
      dispatch({ type: 'UPDATE' });
    }
  }, [isSuccess, ticket_number]);

  const { mutate: createTicket } = useMutation({
    mutationKey: ['create-ticket'],
    mutationFn: Api.ticket.create,
    onSuccess() {
      ticketForm.reset();
      toast({
        description: 'Ticket created successfully',
      });
      router.push(`/workspace/tickets/${ticket_number?.number}`);
      queryClient.invalidateQueries({
        queryKey: ['many-tickets'],
      });
    },
  });

  const { mutate: updateTicket } = useMutation({
    mutationKey: ['update-ticket'],
    mutationFn: Api.ticket.update,
    onSuccess() {
      toast({
        description: 'Ticket updated successfully',
      });
      queryClient.invalidateQueries({
        queryKey: ['ticket'],
      });
      queryClient.invalidateQueries({
        queryKey: ['many-tickets'],
      });
    },
  });

  function sumit(payload: CreateTicketDto) {
    if (action === 'UPDATE') {
      console.log(action, { payload });
      return updateTicket(payload);
    } else {
      console.log(action, { payload });
      return createTicket(payload);
    }
  }

  return (
    <Form {...ticketForm}>
      <form onSubmit={ticketForm.handleSubmit(sumit)}>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <div className="flex-1">
                <FormField
                  control={ticketForm.control}
                  name="ticketNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex flex-row items-center justify-between">
                        <span>Ticket Number</span>
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1234567890123456"
                          readOnly
                          {...field}
                          className="flex-1 bg-slate-100"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={ticketForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex flex-row items-center justify-between">
                        <span>Status</span>
                        <FormMessage />
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={TicketStatusEnum.OPEN} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <ScrollArea className="max-h-[400px]">
                            {statusOptions?.map((status) => (
                              <SelectItem
                                className={`hover:bg-slate-50 transition-colors ${
                                  field.value === status && 'bg-slate-100'
                                }`}
                                key={status}
                                value={status}
                              >
                                {status}
                              </SelectItem>
                            ))}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={ticketForm.control}
              name="callerId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="flex flex-row items-center justify-between">
                      <span>Caller</span>
                      <FormMessage />
                    </FormLabel>
                    <FormControl className="flex-1">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'w-full justify-between',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value
                                ? employees?.find(
                                    (employee) => employee.id === field.value,
                                  )?.name
                                : 'Select caller'}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search employees..."
                              className="h-9"
                            />
                            <CommandEmpty>No employee found.</CommandEmpty>
                            <CommandGroup>
                              {employees?.map((employee) => (
                                <CommandItem
                                  value={employee.name!}
                                  key={employee.id}
                                  onSelect={() => {
                                    ticketForm.setValue(
                                      'callerId',
                                      employee.id!,
                                    );
                                  }}
                                >
                                  {employee.name}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      employee.id === field.value
                                        ? 'opacity-100'
                                        : 'opacity-0',
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={ticketForm.control}
              name="assigneeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row items-center justify-between">
                    <span>Assignee</span>
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'w-full justify-between',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value
                              ? employees?.find(
                                  (employee) => employee.id === field.value,
                                )?.name
                              : 'Select assignee'}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search employees..."
                            className="h-9"
                          />
                          <CommandEmpty>No employee found.</CommandEmpty>
                          <CommandGroup>
                            {employees?.map((employee) => (
                              <CommandItem
                                value={employee.name!}
                                key={employee.id}
                                onSelect={() => {
                                  ticketForm.setValue(
                                    'assigneeId',
                                    employee.id!,
                                  );
                                }}
                              >
                                {employee.name}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    employee.id === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-4">
            <FormField
              control={ticketForm.control}
              name="teamId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row items-center justify-between">
                    <span>Team</span>
                    <FormMessage />
                  </FormLabel>

                  <Select
                    onValueChange={
                      (field.onChange,
                      (value) => {
                        setSelectedTeamId(value as string);
                        field.onChange(value);
                      })
                    }
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Team" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <ScrollArea className="max-h-[400px] h-[400px]">
                        {teams?.map((team) => (
                          <SelectItem
                            className={`hover:bg-slate-50 transition-colors ${
                              field.value === team.name && 'bg-slate-100'
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
                </FormItem>
              )}
            />

            <FormField
              control={ticketForm.control}
              name="componentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row items-center justify-between">
                    <span>Component</span>
                    <FormMessage />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Component" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <ScrollArea className="max-h-[400px] h-[400px]">
                        {components?.map((component) => (
                          <SelectItem
                            className={`hover:bg-slate-50 transition-colors ${
                              field.value === component.name && 'bg-slate-100'
                            }`}
                            key={component.id}
                            value={component.id}
                          >
                            {component.name}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={ticketForm.control}
              name="severity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row items-center justify-between">
                    <span>Severity</span>
                    <FormMessage />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={SeverityEnum.LOW} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <ScrollArea className="max-h-[400px]">
                        {severityOptions?.map((severity) => (
                          <SelectItem
                            className={`hover:bg-slate-50 transition-colors ${
                              field.value === severity && 'bg-slate-100'
                            }`}
                            key={severity}
                            value={severity}
                          >
                            {severity}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <FormField
            control={ticketForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex flex-row items-center justify-between">
                  <span> Title</span>
                  <FormMessage />
                </FormLabel>
                <FormControl>
                  <Input className="h-[50px]" placeholder="Title" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={ticketForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex flex-row items-center justify-between">
                  <span>Description</span>
                  <FormMessage />
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="h-[100px]"
                    placeholder="Describe the issue"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex flex-row justify-end">
            <Button type="submit" variant={'workspace'}>
              {action}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

import {
  CreateTicketDto,
  SeverityEnum,
  TicketStatusEnum,
  createTicketSchema,
} from '@hbo-ict/lingo/types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/form';
import { useTeams, useComponentsWithTeamId } from '@hbo-ict/hooks';
import { useEffect, useState } from 'react';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { Textarea } from '../components/textarea';
import { ScrollArea } from '../components/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type TicketFormProps = {
  action: 'create' | 'update';
  defaultValues?: CreateTicketDto;
};

export function TicketForm({ defaultValues, action }: TicketFormProps) {
  //

  const ticketForm = useForm<CreateTicketDto>({
    resolver: zodResolver(createTicketSchema),
    defaultValues,
  });

  const [selectedTeamId, setSelectedTeamId] = useState<string>('');
  const severityOptions = Object.values(SeverityEnum);
  const statusOptions = Object.values(TicketStatusEnum);

  const { teams } = useTeams();
  const { components } = useComponentsWithTeamId(selectedTeamId);

  useEffect(() => {
    if (defaultValues?.teamId) {
      setSelectedTeamId(defaultValues.teamId);
    }
  }, [defaultValues]);

  function sumit(payload: CreateTicketDto) {
    if (action === 'update') {
      console.log(payload);
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row items-center justify-between">
                    <span>Caller</span>
                    <FormMessage />
                  </FormLabel>
                  <FormControl className="flex-1">
                    <Input placeholder="Jane" {...field} />
                  </FormControl>
                </FormItem>
              )}
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
                    <Input placeholder="john" {...field} />
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
                      <ScrollArea className="max-h-[400px]">
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
                      <ScrollArea className="max-h-[400px]">
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
          <Button type="submit" variant={'workspace'}>
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}

import { useForm } from 'react-hook-form';
import { Textarea } from '../components/textarea';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../components/form';
import { Button } from '../components/button';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { CreateCommentDto, createCommentSchema } from '@hbo-ict/lingo/types';
import { useMutation } from '@tanstack/react-query';
import { Api } from '@hbo-ict/query-fns';
import { useRouter } from 'next/router';

export function CommmentForm() {
  const router = useRouter();

  const commentForm = useForm<CreateCommentDto>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      content: '',
    },
  });

  const { mutate: createComment } = useMutation({
    mutationKey: ['create-comment'],
    mutationFn: Api.comment.create,
  });

  function sumit(data: CreateCommentDto) {
    console.log(data);
    createComment({
      content: data.content,
      ticketNumber: router.query.ticket as string,
    });
  }

  return (
    <div>
      <Form {...commentForm}>
        <form onSubmit={commentForm.handleSubmit(sumit)}>
          <FormField
            control={commentForm.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Discussion</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="h-[50px]"
                    placeholder="Write comment here..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex flex-row justify-end">
            <Button
              type="submit"
              variant={'secondary'}
              className="mt-2 flex flex-row gap-2 items-center"
            >
              <span>Add comment</span>
              <PaperPlaneIcon />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

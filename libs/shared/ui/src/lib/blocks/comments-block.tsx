import { useFindComment } from '@hbo-ict/hooks';
import { CommentDefaultReturn, CommentType } from '@hbo-ict/lingo/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { formatDate } from '../utils';

export function Comments() {
  const router = useRouter();

  const { comments, isError, isLoading } = useFindComment({
    where: {
      ticket: {
        ticketNumber: {
          number: router.query.ticket as string,
        },
      },
    },
    include: {
      author: true,
    },
  });

  return (
    <div className="w-full flex flex-col gap-2">
      {comments?.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
}

function Comment(comment: CommentDefaultReturn) {
  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-2">
        <span className="text-xs text-primary font-semibold">
          {comment.author.name}
        </span>
        <span className="text-xs text-primary">
          {formatDate(comment.createdAt)}
        </span>
      </div>
      <div className="flex-1 border-gray-300 bg-secondary/30 p-2 rounded-md align-bottom">
        <p className="leading-relaxed text-primary/90 text-sm">
          {comment.content}
        </p>
      </div>
    </div>
  );
}

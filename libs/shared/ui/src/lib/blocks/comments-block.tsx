import { useFindComment } from '@hbo-ict/hooks';
import { CommentDefaultReturn } from '@hbo-ict/lingo/types';
import { useRouter } from 'next/router';
import { formatDate } from '../utils';

export function Comments() {
  const router = useRouter();
  const randomValue = Math.random();
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

  if (randomValue < 1 / 3) {
    <div className="w-full flex flex-col gap-2">
      {comments?.map((comment) => (
        <CommentA key={comment.id} {...comment} />
      ))}
    </div>;
  } else {
    return (
      <div className="w-full flex flex-col gap-2">
        {comments?.map((comment) => (
          <CommentB key={comment.id} {...comment} />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2">
      {comments?.map((comment) => (
        <CommentA key={comment.id} {...comment} />
      ))}
    </div>
  );
}

function CommentA(comment: CommentDefaultReturn) {
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

function CommentB(comment: CommentDefaultReturn) {
  return (
    <div className="bg-secondary/50 rounded-md p-2" key={comment.id}>
      <div className="flex flex-col gap-2">
        <div>
          <span className="text-xs text-primary font-semibold">
            {comment.author.name}
          </span>
        </div>
        <div className="text-sm text-primary/90 ">
          <p className="leading-relaxed">{comment.content}</p>
        </div>
        <div className="text-xs flex fle-row justify-end">
          <span>{formatDate(comment.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

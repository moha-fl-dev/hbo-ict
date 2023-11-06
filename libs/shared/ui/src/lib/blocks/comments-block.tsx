import { useFindComment } from '@hbo-ict/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
        <div className="bg-secondary/50 rounded-md p-2" key={comment.id}>
          <div className="flex flex-col gap-2">
            <div>
              {/* <Link
                href={`/workspace/tickets/?employee=${comment.author.id}`}
                className="hover:underline underline-offset-4"
              >
                
              </Link> */}
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
      ))}
    </div>
  );
}

function formatDate(input: Date | string): string {
  const date = typeof input === 'string' ? new Date(input) : input;

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date input');
  }

  const pad = (num: number) => num.toString().padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

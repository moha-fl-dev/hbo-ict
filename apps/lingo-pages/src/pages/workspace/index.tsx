import { Api } from '@hbo-ict/query-fns';
import {
  ScrollArea,
  ScrollBar,
  Separator,
  WorkspaceRootLayout,
} from '@hbo-ict/ui';
import {
  QueryKey,
  useIsFetching,
  useQueries,
  useQuery,
} from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function Workspace() {
  const router = useRouter();
  const isFetching = useIsFetching({
    fetchStatus: 'fetching',
    exact: true,
    type: 'active',
    predicate: (query) => {
      return ['workspaceRoot', 'user'].includes(query.queryKey.toString());
    }, // only count queries with this queryKey
  });

  const [workspaceRootQuery, userQuery] = useQueries({
    queries: [
      {
        queryKey: ['workspaceRoot'],
        queryFn: Api.workspaceRoot,
      },
      {
        queryKey: ['user'],
        queryFn: Api.me,
      },
    ],
  });

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
    <div className="container px-4 ">
      <div className="grid grid-cols-2 gap-4 grid-flow-row ">
        <ScrollArea className="h-[400px] border rounded-sm p-4 col-span-2 lg:col-span-1 shadow-sm">
          <div>
            {Array.from({ length: 15 }, (_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <p>Here come my tickets {i}</p>
                <Separator />
              </div>
            ))}
          </div>
        </ScrollArea>
        <ScrollArea className="h-[400px] border rounded-sm p-4 col-span-2 lg:col-span-1 shadow-sm">
          <div>
            {Array.from({ length: 15 }, (_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <p>Here come unassigned tickets {i}</p>
                <Separator />
              </div>
            ))}
          </div>
        </ScrollArea>
        <ScrollArea className="h-[400px] border rounded-sm p-4 col-span-2 shadow-sm">
          <div>
            {Array.from({ length: 15 }, (_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <p>Here come all tickets from all departments {i}</p>
                <Separator />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

Workspace.getLayout = function getLayout(page: JSX.Element) {
  return <WorkspaceRootLayout>{page}</WorkspaceRootLayout>;
};

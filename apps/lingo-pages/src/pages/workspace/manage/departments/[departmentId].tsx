import { useDepartment, useTeamsWithDepartment } from '@hbo-ict/hooks';
import type { Team } from '@hbo-ict/lingo/types';
import { ScrollArea, WorkspaceRootLayout } from '@hbo-ict/ui';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Department() {
  const router = useRouter();

  const departmentId = router.query.departmentId as string;

  const { isError: _isError, teams } = useTeamsWithDepartment(departmentId);
  const { department, isError: _departmentError } = useDepartment(departmentId);

  return (
    <div className="container mt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl">
          Teams in{' '}
          <strong className="text-muted-foreground">{department?.name}</strong>{' '}
          department
        </h1>
        <div className="grid xl:grid-cols-5 grid-cols-1 gap-2">
          {teams?.map((team) => <SingleTeam key={team.id} team={team} />)}
        </div>
      </div>
    </div>
  );
}

function SingleTeam({ team }: { team: Pick<Team, 'name' | 'id'> }) {
  return (
    <Link
      href={`/workspace/manage/teams/${team.id}`}
      className="flex flex-row items-center rounded justify-between bg-gray-200 p-2 hover:bg-gray-100 transition-colors group border"
    >
      <span>{team.name}</span>
      <ChevronRightIcon className="transform group-hover:translate-x-1 transition-transform duration-200" />
    </Link>
  );
}

Department.getLayout = function getLayout(page: JSX.Element) {
  return (
    <WorkspaceRootLayout>
      <Head>
        <title>Department</title>
      </Head>
      <ScrollArea className="max-h-[90vh] h-[90vh] min-h[90vh]">
        {page}
      </ScrollArea>
    </WorkspaceRootLayout>
  );
};

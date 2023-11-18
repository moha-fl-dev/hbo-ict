import { useDepartment, useTeamsWithDepartment } from '@hbo-ict/hooks';
import {
  ScrollArea,
  SingleItemLinkWithChevronRightIcon,
  WorkspaceRootLayout,
} from '@hbo-ict/ui';
import Head from 'next/head';
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
          {teams?.map((team) => (
            <SingleItemLinkWithChevronRightIcon
              key={team.id}
              item={{ ...team, href: `/workspace/manage/teams/${team.id}` }}
            />
          ))}
        </div>
      </div>
    </div>
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

import { useTeam } from '@hbo-ict/hooks';
import {
  ScrollArea,
  SingleItemLinkWithChevronRightIcon,
  WorkspaceRootLayout,
} from '@hbo-ict/ui';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Team() {
  const router = useRouter();
  const teamId = router.query.teamId as string;

  const { team, isError: _isTeamError } = useTeam(teamId);

  return (
    <div className="container mt-4">
      {team && (
        <div className="flex flex-col gap-2">
          <h1 className="text-xl">
            members in{' '}
            <strong className="text-muted-foreground">{team.name}</strong> team
          </h1>
          <div className="grid xl:grid-cols-5 grid-cols-1 gap-2">
            <SingleItemLinkWithChevronRightIcon
              item={{
                ...team,
                href: `/workspace/manage/teams/${teamId}`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

Team.getLayout = function getLayout(page: JSX.Element) {
  return (
    <WorkspaceRootLayout>
      <Head>
        <title>Teams</title>
      </Head>
      <ScrollArea className="max-h-[90vh] h-[90vh] min-h[90vh]">
        {page}
      </ScrollArea>
    </WorkspaceRootLayout>
  );
};

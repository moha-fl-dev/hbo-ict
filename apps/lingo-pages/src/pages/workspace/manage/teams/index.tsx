import { WorkspaceRootLayout } from '@hbo-ict/ui';

export default function ManageTeams() {
  return (
    <div>
      <h1>Manage all teams</h1>
    </div>
  );
}

ManageTeams.getLayout = function getLayout(page: JSX.Element) {
  return <WorkspaceRootLayout>{page}</WorkspaceRootLayout>;
};

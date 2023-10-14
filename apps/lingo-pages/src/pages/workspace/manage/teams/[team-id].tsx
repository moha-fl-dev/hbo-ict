import { WorkspaceRootLayout } from '@hbo-ict/ui';

export default function ManageTeam() {
  return (
    <div>
      <h1>Manage team</h1>
    </div>
  );
}

ManageTeam.getLayout = function getLayout(page: JSX.Element) {
  return <WorkspaceRootLayout>{page}</WorkspaceRootLayout>;
};

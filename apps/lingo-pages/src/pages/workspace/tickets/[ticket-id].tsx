import { WorkspaceRootLayout } from '@hbo-ict/ui';

export default function ManageTicket() {
  return (
    <div>
      <h1>Manage a ticket</h1>
    </div>
  );
}

ManageTicket.getLayout = function getLayout(page: JSX.Element) {
  return <WorkspaceRootLayout>{page}</WorkspaceRootLayout>;
};

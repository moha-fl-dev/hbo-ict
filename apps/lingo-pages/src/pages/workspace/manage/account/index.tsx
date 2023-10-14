import { WorkspaceRootLayout } from '@hbo-ict/ui';

export default function ManageAccount() {
  return (
    <div>
      <h1>Manage personal account</h1>
    </div>
  );
}

ManageAccount.getLayout = function getLayout(page: JSX.Element) {
  return <WorkspaceRootLayout>{page}</WorkspaceRootLayout>;
};

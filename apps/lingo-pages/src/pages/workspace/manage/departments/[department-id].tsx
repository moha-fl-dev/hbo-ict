import { WorkspaceRootLayout } from '@hbo-ict/ui';

export default function ManageDepartment() {
  return (
    <div>
      <h1>Manage Department</h1>
    </div>
  );
}

ManageDepartment.getLayout = function getLayout(page: JSX.Element) {
  return <WorkspaceRootLayout>{page}</WorkspaceRootLayout>;
};

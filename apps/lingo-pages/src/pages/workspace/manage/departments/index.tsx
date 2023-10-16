import { WorkspaceRootLayout } from '@hbo-ict/ui';

export default function ManageDepartments() {
  return (
    <div>
      <h1>Manage all Departments</h1>
    </div>
  );
}

ManageDepartments.getLayout = function getLayout(page: JSX.Element) {
  return <WorkspaceRootLayout>{page}</WorkspaceRootLayout>;
};

import { WorkspaceRootLayout } from '@hbo-ict/ui';

export default function ManageComponents() {
  return (
    <div>
      <h1>Manage all components</h1>
    </div>
  );
}

ManageComponents.getLayout = function getLayout(page: JSX.Element) {
  return <WorkspaceRootLayout>{page}</WorkspaceRootLayout>;
};

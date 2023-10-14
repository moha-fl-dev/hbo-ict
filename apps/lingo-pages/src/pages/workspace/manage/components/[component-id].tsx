import { WorkspaceRootLayout } from '@hbo-ict/ui';

export default function ManageComponent() {
  return (
    <div>
      <h1>Manage component</h1>
    </div>
  );
}

ManageComponent.getLayout = function getLayout(page: JSX.Element) {
  return <WorkspaceRootLayout>{page}</WorkspaceRootLayout>;
};

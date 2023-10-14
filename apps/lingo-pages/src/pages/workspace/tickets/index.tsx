import { WorkspaceRootLayout } from '@hbo-ict/ui';

export default function TicketsRoot() {
  return (
    <div>
      <h1>Tickets Root</h1>
    </div>
  );
}

TicketsRoot.getLayout = function getLayout(page: JSX.Element) {
  return <WorkspaceRootLayout>{page}</WorkspaceRootLayout>;
};

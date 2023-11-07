import { ScrollArea } from '../components/scroll-area';

export function TicketsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ScrollArea className="max-h-[90vh] h-[90vh] min-h[90vh]">
      <div>{children}</div>
    </ScrollArea>
  );
}

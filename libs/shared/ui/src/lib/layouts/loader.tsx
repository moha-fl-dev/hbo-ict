import { useIsFetching } from '@tanstack/react-query';

export function QueryLoader(children: React.ReactNode) {
  const isFetching = useIsFetching({
    queryKey: ['isAuthenticated'],
    exact: true,
    fetchStatus: 'fetching',
    type: 'active',
  });
  return (
    <>
      {(isFetching && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-white bg-opacity-50">
          <div className="w-20 h-20 border-4 border-gray-200 rounded-full animate-spin"></div>
        </div>
      )) ||
        children}
    </>
  );
}

import { Api } from '@hbo-ict/query-fns';
import { useQuery } from '@tanstack/react-query';

export function useCurrentEmployeeExtendedDetails() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['currentEmployeeExtendedDetails'],
    queryFn: Api.employee.userProfileExtended,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return {
    currentEmployeeExtendedDetails: data,
    isLoadingCurrentEmployeeExtendedDetails: isLoading,
    isErrorCurrentEmployeeExtendedDetails: isError,
  };
}

export function useTeamMembers({ teamId }: { teamId: string }) {
  const { data, isLoading, isError } = useQuery(
    ['employeesByteam', teamId],
    () => Api.employee.allEmployeesByTeam({ teamId }),
    {
      enabled: !!teamId,
    },
  );

  return {
    employeesByteam: data,
    isLoadingEmployeesByteam: isLoading,
    isErrorEmployeesByteam: isError,
  };
}

export function useEmployees() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['employees'],
    queryFn: Api.employee.all,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    employees: data,
    isLoadingEmployees: isLoading,
    isErrorEmployees: isError,
  };
}

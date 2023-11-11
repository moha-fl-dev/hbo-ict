import type {
  Department,
  StrictTeamWithDepartment,
} from '@hbo-ict/lingo/types';
import { Api } from '@hbo-ict/query-fns';
import { useQuery } from '@tanstack/react-query';

export function useDepartments() {
  const { data, isError } = useQuery<Department[]>({
    queryKey: ['departments'],
    queryFn: Api.department.getAll,
  });

  return {
    departments: data,
    isError,
  };
}

export function useDepartment(departmentId: string) {
  const { data, isError } = useQuery<Department>(
    ['department', departmentId],
    () => Api.department.getById(departmentId),
    { enabled: !!departmentId },
  );

  return {
    department: data,
    isError,
  };
}

export function useDepartmentWithTeams(departmentId: string) {
  const { data, isError } = useQuery<StrictTeamWithDepartment>(
    ['department-teams', departmentId],
    () => Api.team.getTeamsByDepartmentId(departmentId),
    { enabled: !!departmentId },
  );

  return {
    department: data,
    isError,
  };
}

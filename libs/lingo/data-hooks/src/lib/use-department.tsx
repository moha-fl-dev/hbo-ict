import type {
  Department,
  DepartmentWithTeamsCount,
  StrictTeamWithDepartment,
} from '@hbo-ict/lingo/types';
import { department, team } from '@hbo-ict/query-fns';
import { useQuery } from '@tanstack/react-query';

export function useDepartments() {
  const { data, isError } = useQuery<DepartmentWithTeamsCount[]>({
    queryKey: ['departments'],
    queryFn: department.getAll,
  });

  return {
    departments: data,
    isError,
  };
}

export function useDepartment(departmentId: string) {
  const { data, isError } = useQuery<Department>(
    ['department', departmentId],
    () => department.getById(departmentId),
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
    () => team.getTeamsByDepartmentId(departmentId),
    { enabled: !!departmentId },
  );

  return {
    department: data,
    isError,
  };
}

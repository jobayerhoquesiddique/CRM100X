import { User, Stat } from "@shared/schema";

export interface SidebarItem {
  name: string;
  icon: string;
  path: string;
  badge?: number;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string | string[];
    borderWidth: number;
    borderRadius?: number;
  }>;
}

export interface UserDistributionItem {
  role: string;
  percentage: number;
  color: string;
}

export interface NotificationType {
  id: string;
  message: string;
  description?: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export interface FormValues {
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  role: string;
  status: string;
  avatar?: string;
}

export type PaginationInfo = {
  page: number;
  limit: number;
  total: number;
};

export type SortingState = {
  field: string | null;
  direction: 'asc' | 'desc' | null;
};

export type FilterState = {
  role: string;
  search: string;
};

export interface TableColumn {
  header: string;
  accessorKey: string;
  cell?: (row: any) => React.ReactNode;
}

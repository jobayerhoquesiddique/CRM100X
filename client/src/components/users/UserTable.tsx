import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PaginationInfo, SortingState, FilterState, TableColumn } from "@/types";
import { Edit, Trash2, Search, ChevronDown } from "lucide-react";
import { User } from "@shared/schema";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: users.length,
  });
  
  const [sorting, setSorting] = useState<SortingState>({
    field: null,
    direction: null,
  });
  
  const [filters, setFilters] = useState<FilterState>({
    role: "All Users",
    search: "",
  });

  const columns: TableColumn[] = [
    {
      header: "User",
      accessorKey: "name",
      cell: (row) => (
        <div className="flex items-center">
          <img 
            src={row.avatar || `https://i.pravatar.cc/150?u=${row.email}`}
            alt={row.name} 
            className="h-8 w-8 rounded-full mr-3" 
          />
          <div>
            <p className="font-medium">{row.name}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => {
        const statusStyles = {
          Active: "bg-green-100 text-green-800",
          Pending: "bg-yellow-100 text-yellow-800",
          Inactive: "bg-red-100 text-red-800",
        };
        
        return (
          <Badge 
            variant="outline" 
            className={`${statusStyles[row.status as keyof typeof statusStyles]} border-0`}
          >
            {row.status}
          </Badge>
        );
      },
    },
    {
      header: "Last Login",
      accessorKey: "lastLogin",
      cell: (row) => row.lastLogin ? new Date(row.lastLogin).toLocaleString() : "Never",
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-blue-600 hover:text-blue-900"
            onClick={() => onEdit(row)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-red-600 hover:text-red-900"
            onClick={() => onDelete(row)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];
  
  // Filter users based on current filters
  const filteredUsers = users.filter(user => {
    if (filters.role !== "All Users" && user.role !== filters.role) {
      return false;
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
  
  // Sort users if sorting is applied
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sorting.field || !sorting.direction) return 0;
    
    const fieldA = a[sorting.field as keyof User];
    const fieldB = b[sorting.field as keyof User];
    
    if (fieldA < fieldB) return sorting.direction === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return sorting.direction === 'asc' ? 1 : -1;
    
    return 0;
  });
  
  // Paginate users
  const start = (pagination.page - 1) * pagination.limit;
  const end = start + pagination.limit;
  const paginatedUsers = sortedUsers.slice(start, end);
  
  // Handle pagination change
  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, page });
  };
  
  // Handle limit change
  const handleLimitChange = (limit: string) => {
    setPagination({ ...pagination, limit: parseInt(limit), page: 1 });
  };
  
  // Handle role filter change
  const handleRoleFilterChange = (role: string) => {
    setFilters({ ...filters, role });
    setPagination({ ...pagination, page: 1 });
  };
  
  // Handle search filter change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
    setPagination({ ...pagination, page: 1 });
  };
  
  // Calculate pagination information
  const totalPages = Math.ceil(filteredUsers.length / pagination.limit);
  const showingFrom = filteredUsers.length === 0 ? 0 : start + 1;
  const showingTo = Math.min(end, filteredUsers.length);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Select 
              value={filters.role} 
              onValueChange={handleRoleFilterChange}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Users">All Users</SelectItem>
                <SelectItem value="Administrator">Administrators</SelectItem>
                <SelectItem value="Manager">Managers</SelectItem>
                <SelectItem value="Employee">Employees</SelectItem>
                <SelectItem value="Guest">Guests</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="relative">
            <Select 
              value={pagination.limit.toString()} 
              onValueChange={handleLimitChange}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 entries</SelectItem>
                <SelectItem value="25">25 entries</SelectItem>
                <SelectItem value="50">50 entries</SelectItem>
                <SelectItem value="100">100 entries</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Search users..." 
            className="pl-10 pr-3 py-2 w-full md:w-auto md:min-w-[250px]"
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              {columns.map((column) => (
                <TableHead key={column.accessorKey} className="py-3 px-4 text-left font-semibold text-sm text-gray-600">
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50 border-b border-gray-200">
                  {columns.map((column) => (
                    <TableCell key={`${user.id}-${column.accessorKey}`} className="py-3 px-4">
                      {column.cell ? column.cell(user) : user[column.accessorKey as keyof User]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-8 text-gray-500">
                  No users found matching the current filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-4 md:space-y-0">
        <div className="text-sm text-gray-600">
          {filteredUsers.length > 0 
            ? `Showing ${showingFrom} to ${showingTo} of ${filteredUsers.length} entries`
            : "No entries to show"}
        </div>
        
        {totalPages > 1 && (
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-1 text-sm"
            >
              Previous
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={pagination.page === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="px-3 py-1 text-sm"
              >
                {page}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === totalPages}
              className="px-3 py-1 text-sm"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTable;

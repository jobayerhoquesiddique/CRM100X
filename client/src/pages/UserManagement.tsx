import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import UserTable from "@/components/users/UserTable";
import AddUserModal from "@/components/users/AddUserModal";
import EditUserModal from "@/components/users/EditUserModal";
import DeleteUserDialog from "@/components/users/DeleteUserDialog";
import { User } from "@shared/schema";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const UserManagement: React.FC = () => {
  const [addUserOpen, setAddUserOpen] = React.useState(false);
  const [editUserOpen, setEditUserOpen] = React.useState(false);
  const [deleteUserOpen, setDeleteUserOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  // Fetch users
  const { data: users, isLoading } = useQuery({
    queryKey: ["/api/users"],
  });

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditUserOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setDeleteUserOpen(true);
  };

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-blue-600">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-gray-700">User Management</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-2xl font-semibold text-gray-800 mb-6">User Management</h1>

      <Card>
        <CardHeader className="px-6 pt-6 pb-0 flex justify-between items-center border-b border-gray-200">
          <CardTitle className="text-lg font-semibold text-gray-800">Manage Users</CardTitle>
          <Button onClick={() => setAddUserOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-500">Loading users...</p>
            </div>
          ) : (
            <UserTable 
              users={users || []} 
              onEdit={handleEditUser} 
              onDelete={handleDeleteUser} 
            />
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <AddUserModal open={addUserOpen} onOpenChange={setAddUserOpen} />
      <EditUserModal 
        open={editUserOpen} 
        onOpenChange={setEditUserOpen} 
        user={selectedUser} 
      />
      <DeleteUserDialog 
        open={deleteUserOpen} 
        onOpenChange={setDeleteUserOpen} 
        user={selectedUser} 
      />
    </>
  );
};

export default UserManagement;

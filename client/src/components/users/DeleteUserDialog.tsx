import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { User } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface DeleteUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}

const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ open, onOpenChange, user }) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!user) return;

    try {
      await apiRequest("DELETE", `/api/users/${user.id}`);
      
      toast({
        title: "User deleted successfully",
        description: `${user.name} has been removed from the system.`,
      });
      
      // Invalidate users query to refetch the data
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
    } catch (error: any) {
      toast({
        title: "Error deleting user",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      onOpenChange(false);
    }
  };

  if (!user) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {user.name}? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserDialog;

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { User, Stat } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, ChevronRight } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { FadeIn, ScaleIn, StaggerContainer } from "@/components/ui/motion";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";

// Dashboard Components
import WelcomeMessage from "@/components/dashboard/WelcomeMessage";
import KpiCards from "@/components/dashboard/KpiCards";
import RevenueChart from "@/components/dashboard/RevenueChart";
import UserDistributionChart from "@/components/dashboard/UserDistributionChart";
import SalesPipelineWidget from "@/components/dashboard/SalesPipelineWidget";
import TaskCalendarWidget from "@/components/dashboard/TaskCalendarWidget";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import RecentContacts from "@/components/dashboard/RecentContacts";
import MarketTrendsWidget from "@/components/dashboard/MarketTrendsWidget";

// User Management Components
import UserTable from "@/components/users/UserTable";
import AddUserModal from "@/components/users/AddUserModal";
import EditUserModal from "@/components/users/EditUserModal";
import DeleteUserDialog from "@/components/users/DeleteUserDialog";

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [deleteUserOpen, setDeleteUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Fetch stats
  const { data: stats = [], isLoading: isLoadingStats } = useQuery<Stat[]>({
    queryKey: ["/api/stats"],
  });

  // Fetch users
  const { data: users = [], isLoading: isLoadingUsers } = useQuery<User[]>({
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
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-blue-600">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-gray-700">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Welcome Message */}
      <div className="mb-6">
        <WelcomeMessage />
      </div>
      
      {/* Dashboard Tabs */}
      <div className="mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center">
            <TabsList className="mb-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            <div className="flex items-center text-sm text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-2"
                onClick={() => {
                  // Refetch data
                  queryClient.invalidateQueries({queryKey: ["/api/stats"]});
                  queryClient.invalidateQueries({queryKey: ["/api/users"]});
                  
                  // Show toast notification
                  toast({
                    title: "Dashboard Refreshed",
                    description: "Latest data has been loaded.",
                  });
                }}
              >
                <ChevronRight className="h-4 w-4" /> 
                Refresh
              </Button>
            </div>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-2">
            <div className="space-y-6">
              {/* KPI Cards */}
              <div className="mb-6">
                <KpiCards />
              </div>

              {/* Main Dashboard Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="col-span-1 lg:col-span-2">
                  <FadeIn delay={0.1}>
                    <RevenueChart />
                  </FadeIn>
                </div>
                <div className="col-span-1">
                  <FadeIn delay={0.2}>
                    <UserDistributionChart />
                  </FadeIn>
                </div>
              </div>

              {/* Three-column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="col-span-1">
                  <SalesPipelineWidget />
                </div>
                <div className="col-span-1">
                  <TaskCalendarWidget />
                </div>
                <div className="col-span-1">
                  <ActivityFeed />
                </div>
              </div>

              {/* Market Trends and Analytics */}
              <FadeIn delay={0.3}>
                <MarketTrendsWidget />
              </FadeIn>
            </div>
          </TabsContent>

          {/* Sales Tab */}
          <TabsContent value="sales" className="mt-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FadeIn delay={0.1}>
                <RevenueChart />
              </FadeIn>
              <FadeIn delay={0.2}>
                <SalesPipelineWidget />
              </FadeIn>
              <FadeIn delay={0.3} className="lg:col-span-2">
                <MarketTrendsWidget />
              </FadeIn>
            </div>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="mt-2">
            <RecentContacts />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-2">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-1 lg:col-span-2">
                <FadeIn delay={0.1}>
                  <RevenueChart />
                </FadeIn>
              </div>
              <div className="col-span-1">
                <FadeIn delay={0.2}>
                  <UserDistributionChart />
                </FadeIn>
              </div>
              <div className="col-span-1 lg:col-span-3">
                <FadeIn delay={0.3}>
                  <MarketTrendsWidget />
                </FadeIn>
              </div>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="mt-2">
            <FadeIn delay={0.1}>
              <Card className="mb-6">
                <CardHeader className="px-6 pt-6 pb-0 flex justify-between items-center border-b border-gray-200">
                  <CardTitle className="text-lg font-semibold text-gray-800">User Management</CardTitle>
                  <Button onClick={() => setAddUserOpen(true)}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                </CardHeader>
                <CardContent className="p-6">
                  {isLoadingUsers ? (
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
            </FadeIn>
          </TabsContent>
        </Tabs>
      </div>

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

export default Dashboard;

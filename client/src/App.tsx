import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import UserManagement from "@/pages/UserManagement";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";
import Notifications from "@/pages/Notifications";
import ContactsPage from "@/pages/ContactsPage";
import PipelinePage from "@/pages/PipelinePage";
import TasksPage from "@/pages/TasksPage";
import EmailCampaignPage from "@/pages/EmailCampaignPage";
import DocumentsPage from "@/pages/DocumentsPage";
import AIAssistantPage from "@/pages/AIAssistantPage";
import IntegrationsPage from "@/pages/IntegrationsPage";
import AuthPage from "@/pages/auth-page";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { NotificationProvider } from "@/context/NotificationContext";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import PageTransition from "@/components/ui/page-transition";
import { queryClient } from "@/lib/queryClient";

function AuthenticatedRoutes() {
  return (
    <DashboardLayout>
      <PageTransition>
        <Switch>
          <ProtectedRoute path="/" component={() => <Dashboard />} />
          <ProtectedRoute path="/users" component={() => <UserManagement />} />
          <ProtectedRoute path="/analytics" component={() => <Analytics />} />
          <ProtectedRoute path="/contacts" component={() => <ContactsPage />} />
          <ProtectedRoute path="/pipeline" component={() => <PipelinePage />} />
          <ProtectedRoute path="/tasks" component={() => <TasksPage />} />
          <ProtectedRoute path="/email" component={() => <EmailCampaignPage />} />
          <ProtectedRoute path="/documents" component={() => <DocumentsPage />} />
          <ProtectedRoute path="/ai" component={() => <AIAssistantPage />} />
          <ProtectedRoute path="/integrations" component={() => <IntegrationsPage />} />
          <ProtectedRoute path="/settings" component={() => <Settings />} />
          <ProtectedRoute path="/notifications" component={() => <Notifications />} />
          <Route path="/auth" component={AuthPage} />
          <Route component={NotFound} />
        </Switch>
      </PageTransition>
    </DashboardLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NotificationProvider>
          <div className="fixed top-4 right-4 z-50 bg-primary text-white px-4 py-2 rounded">
            <a href="/auth" className="text-white">Go to Auth Page</a>
          </div>
          <Switch>
            <Route path="/auth" component={AuthPage} />
            <Route>
              <AuthenticatedRoutes />
            </Route>
          </Switch>
          <Toaster />
        </NotificationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

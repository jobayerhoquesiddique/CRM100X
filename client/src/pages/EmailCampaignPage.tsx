import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  AlertCircle,
  BarChart4,
  Calendar,
  CheckCircle,
  ChevronDown,
  Copy,
  Edit,
  FileText,
  Filter,
  Mail,
  MailPlus,
  MoreHorizontal,
  Pencil,
  PieChart,
  Plus,
  Search,
  Send,
  Settings,
  Trash2,
  Users,
  PauseCircle,
  PlayCircle,
  ClipboardType
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// Sample data for email campaigns
const campaigns = [
  {
    id: 1,
    name: "April Product Update",
    status: "Sent",
    sentDate: "Apr 02, 2025",
    recipients: 1267,
    openRate: 28.4,
    clickRate: 12.6,
    conversions: 24,
    tags: ["Product", "Newsletter"],
    subject: "Exciting New Features in Our Latest Update",
    createdBy: "You"
  },
  {
    id: 2,
    name: "Enterprise Solution Webinar",
    status: "Scheduled",
    sentDate: "Apr 15, 2025 (Scheduled)",
    recipients: 845,
    openRate: 0,
    clickRate: 0,
    conversions: 0,
    tags: ["Webinar", "Enterprise"],
    subject: "Join Our Exclusive Webinar on Enterprise Solutions",
    createdBy: "Sarah Johnson"
  },
  {
    id: 3,
    name: "Customer Feedback Survey",
    status: "Draft",
    sentDate: "Not Sent",
    recipients: 0,
    openRate: 0,
    clickRate: 0,
    conversions: 0,
    tags: ["Survey", "Feedback"],
    subject: "We Value Your Feedback - Quick 2-Minute Survey",
    createdBy: "You"
  },
  {
    id: 4,
    name: "March Newsletter",
    status: "Sent",
    sentDate: "Mar 05, 2025",
    recipients: 2489,
    openRate: 32.1,
    clickRate: 15.3,
    conversions: 37,
    tags: ["Newsletter", "Monthly"],
    subject: "March Newsletter: Industry Insights and Updates",
    createdBy: "Mark Taylor"
  },
  {
    id: 5,
    name: "New Feature Announcement",
    status: "Sent",
    sentDate: "Mar 22, 2025",
    recipients: 1893,
    openRate: 45.2,
    clickRate: 28.7,
    conversions: 52,
    tags: ["Product", "Announcement"],
    subject: "Introducing Our Game-Changing New Feature",
    createdBy: "You"
  },
  {
    id: 6,
    name: "Spring Promotion",
    status: "Scheduled",
    sentDate: "Apr 10, 2025 (Scheduled)",
    recipients: 3240,
    openRate: 0,
    clickRate: 0,
    conversions: 0,
    tags: ["Promotion", "Seasonal"],
    subject: "Spring Into Savings: Limited-Time Offer Inside",
    createdBy: "Jennifer Lee"
  },
  {
    id: 7,
    name: "Customer Onboarding Sequence",
    status: "Active",
    sentDate: "Ongoing",
    recipients: 342,
    openRate: 52.8,
    clickRate: 34.1,
    conversions: 78,
    tags: ["Automation", "Onboarding"],
    subject: "Welcome to Our Platform - Getting Started Guide",
    createdBy: "You"
  }
];

// Sample data for templates
const templates = [
  {
    id: 1,
    name: "Welcome Email",
    category: "Onboarding",
    lastUsed: "Apr 01, 2025",
    performance: "High",
    createdBy: "You"
  },
  {
    id: 2,
    name: "Monthly Newsletter",
    category: "Newsletter",
    lastUsed: "Mar 05, 2025",
    performance: "Medium",
    createdBy: "Sarah Johnson"
  },
  {
    id: 3,
    name: "Product Announcement",
    category: "Marketing",
    lastUsed: "Mar 22, 2025",
    performance: "High",
    createdBy: "You"
  },
  {
    id: 4,
    name: "Follow-up Email",
    category: "Sales",
    lastUsed: "Feb 18, 2025",
    performance: "Medium",
    createdBy: "Mark Taylor"
  },
  {
    id: 5,
    name: "Feedback Request",
    category: "Customer Service",
    lastUsed: "Jan 30, 2025",
    performance: "Low",
    createdBy: "Jennifer Lee"
  }
];

// Sample data for audiences
const audiences = [
  {
    id: 1,
    name: "All Customers",
    count: 3842,
    lastUpdated: "Today",
    description: "All active customers in the database",
    createdBy: "You"
  },
  {
    id: 2,
    name: "Enterprise Clients",
    count: 124,
    lastUpdated: "Yesterday",
    description: "Customers on enterprise plans",
    createdBy: "Sarah Johnson"
  },
  {
    id: 3,
    name: "New Signups (30 days)",
    count: 267,
    lastUpdated: "Today",
    description: "Users who signed up in the last 30 days",
    createdBy: "You"
  },
  {
    id: 4,
    name: "Inactive Users",
    count: 583,
    lastUpdated: "Yesterday",
    description: "Users who haven't logged in for 60+ days",
    createdBy: "Mark Taylor"
  },
  {
    id: 5,
    name: "Product A Users",
    count: 1257,
    lastUpdated: "3 days ago",
    description: "Users who have purchased Product A",
    createdBy: "Jennifer Lee"
  }
];

// Helper components
const EmailCampaignMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Sent</p>
              <p className="text-2xl font-bold">12,384</p>
            </div>
            <Mail className="h-8 w-8 text-blue-500 opacity-80" />
          </div>
          <p className="text-xs text-green-600 mt-1">↑ 8.2% from last month</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Open Rate</p>
              <p className="text-2xl font-bold">32.6%</p>
            </div>
            <BarChart4 className="h-8 w-8 text-indigo-500 opacity-80" />
          </div>
          <p className="text-xs text-green-600 mt-1">↑ 3.4% from last month</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Click Rate</p>
              <p className="text-2xl font-bold">18.2%</p>
            </div>
            <PieChart className="h-8 w-8 text-purple-500 opacity-80" />
          </div>
          <p className="text-xs text-green-600 mt-1">↑ 2.1% from last month</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Conversions</p>
              <p className="text-2xl font-bold">267</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500 opacity-80" />
          </div>
          <p className="text-xs text-green-600 mt-1">↑ 12.4% from last month</p>
        </CardContent>
      </Card>
    </div>
  );
};

const EmailCampaignPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("campaigns");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Sent":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Active":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "High":
        return "text-green-600";
      case "Medium":
        return "text-amber-600";
      case "Low":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Email Campaigns</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="default">
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      </div>

      <EmailCampaignMetrics />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Search campaigns, templates or audiences..." 
            className="pl-10 pr-3 py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full md:w-auto">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="active">Active</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      <Tabs defaultValue="campaigns" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="audiences">Audiences</TabsTrigger>
        </TabsList>
        
        {/* Campaigns Tab */}
        <TabsContent value="campaigns">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Email Campaigns</CardTitle>
              <CardDescription>Manage your email marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent Date</TableHead>
                    <TableHead className="hidden md:table-cell">Recipients</TableHead>
                    <TableHead className="hidden lg:table-cell">Performance</TableHead>
                    <TableHead className="hidden lg:table-cell">Tags</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div className="font-medium">{campaign.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {campaign.subject}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{campaign.sentDate}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {campaign.recipients.toLocaleString()}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {campaign.status === "Sent" || campaign.status === "Active" ? (
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500 w-20">Open Rate</span>
                              <Progress value={campaign.openRate} className="h-2" />
                              <span className="text-xs font-medium">{campaign.openRate}%</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-gray-500 w-20">Click Rate</span>
                              <Progress value={campaign.clickRate} className="h-2" />
                              <span className="text-xs font-medium">{campaign.clickRate}%</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Not available</span>
                        )}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {campaign.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <BarChart4 className="mr-2 h-4 w-4" />
                              View Analytics
                            </DropdownMenuItem>
                            {campaign.status === "Draft" && (
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Campaign
                              </DropdownMenuItem>
                            )}
                            {campaign.status === "Active" && (
                              <DropdownMenuItem>
                                <PauseCircle className="mr-2 h-4 w-4" />
                                Pause Campaign
                              </DropdownMenuItem>
                            )}
                            {campaign.status === "Scheduled" && (
                              <>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Campaign
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Reschedule
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            {campaign.status !== "Sent" && (
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Templates Tab */}
        <TabsContent value="templates">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Create and manage reusable email templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <Card className="border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                      <Plus className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">Create New Template</h3>
                    <p className="text-sm text-gray-500">Start from scratch or import HTML</p>
                  </CardContent>
                </Card>

                {templates.map((template) => (
                  <Card key={template.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-4 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <CardContent className="p-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{template.name}</h3>
                          <Badge variant="outline" className="mt-1">
                            {template.category}
                          </Badge>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Template
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MailPlus className="mr-2 h-4 w-4" />
                              Create Campaign
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ClipboardType className="mr-2 h-4 w-4" />
                              Export HTML
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="mt-4 flex justify-between text-sm">
                        <span className="text-gray-500">Last used: {template.lastUsed}</span>
                        <span className={`font-medium ${getPerformanceColor(template.performance)}`}>
                          {template.performance} performance
                        </span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-xs text-gray-500">Created by {template.createdBy}</span>
                        <Button variant="outline" size="sm">Preview</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Audiences Tab */}
        <TabsContent value="audiences">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Audience Segments</CardTitle>
              <CardDescription>Create and manage audience segments for targeted campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Segment
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Segment Name</TableHead>
                    <TableHead>Contacts</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead className="hidden md:table-cell">Created By</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {audiences.map((audience) => (
                    <TableRow key={audience.id}>
                      <TableCell className="font-medium">
                        {audience.name}
                      </TableCell>
                      <TableCell>
                        {audience.count.toLocaleString()}
                      </TableCell>
                      <TableCell>{audience.lastUpdated}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate">
                        {audience.description}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {audience.createdBy}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              View Contacts
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Segment
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MailPlus className="mr-2 h-4 w-4" />
                              Create Campaign
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailCampaignPage;
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
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Clock,
  DollarSign,
  User,
  CheckCircle2,
  XCircle,
  CalendarDays
} from "lucide-react";
import { RECENT_DEALS } from "@/lib/constants";

// Extended mock data for deals with more information
const deals = [
  {
    id: 1,
    name: "Enterprise Software License",
    value: "$125,000",
    rawValue: 125000,
    stage: "Negotiation",
    probability: 75,
    company: "Acme Corp",
    contact: "John Smith",
    closeDate: "Apr 30, 2025",
    activities: 12,
    lastActivity: "2 days ago",
    description: "Annual enterprise license for cloud software platform with premium support.",
    tags: ["Enterprise", "Software", "High Value"]
  },
  {
    id: 2,
    name: "Cloud Migration Project",
    value: "$84,500",
    rawValue: 84500,
    stage: "Proposal",
    probability: 60,
    company: "TechGiant Inc",
    contact: "Lisa Wong",
    closeDate: "May 15, 2025",
    activities: 8,
    lastActivity: "Yesterday",
    description: "Complete migration from on-premise to cloud infrastructure with training.",
    tags: ["Mid-Market", "Services", "Cloud"]
  },
  {
    id: 3,
    name: "Annual Support Contract",
    value: "$36,000",
    rawValue: 36000,
    stage: "Closed Won",
    probability: 100,
    company: "Globex Systems",
    contact: "Michael Johnson",
    closeDate: "Closed",
    activities: 15,
    lastActivity: "5 days ago",
    description: "24/7 premium support package with dedicated account manager.",
    tags: ["Enterprise", "Support", "Recurring"]
  },
  {
    id: 4,
    name: "Security Assessment",
    value: "$18,750",
    rawValue: 18750,
    stage: "Discovery",
    probability: 30,
    company: "Initech LLC",
    contact: "Robert Chen",
    closeDate: "Jun 10, 2025",
    activities: 5,
    lastActivity: "1 week ago",
    description: "Comprehensive security assessment with penetration testing and recommendations.",
    tags: ["SMB", "Security", "Services"]
  },
  {
    id: 5,
    name: "Data Analytics Platform",
    value: "$67,200",
    rawValue: 67200,
    stage: "Closed Won",
    probability: 100,
    company: "Hooli Tech",
    contact: "Sarah Williams",
    closeDate: "Closed",
    activities: 18,
    lastActivity: "3 days ago",
    description: "Custom analytics dashboard with ML-powered insights and integrations.",
    tags: ["Enterprise", "Data", "Software"]
  },
  {
    id: 6,
    name: "Developer Tools Package",
    value: "$42,800",
    rawValue: 42800,
    stage: "Negotiation",
    probability: 80,
    company: "Dev Innovations",
    contact: "Alex Turner",
    closeDate: "May 5, 2025",
    activities: 9,
    lastActivity: "4 days ago",
    description: "Enterprise developer tools package with CI/CD pipeline support.",
    tags: ["Mid-Market", "Software", "Developer"]
  },
  {
    id: 7,
    name: "IT Infrastructure Upgrade",
    value: "$156,000",
    rawValue: 156000,
    stage: "Discovery",
    probability: 40,
    company: "Massive Industries",
    contact: "Jennifer Lee",
    closeDate: "Jul 22, 2025",
    activities: 6,
    lastActivity: "Today",
    description: "Complete hardware and software infrastructure upgrade for headquarters.",
    tags: ["Enterprise", "Hardware", "Services"]
  },
  {
    id: 8,
    name: "Consulting Services",
    value: "$28,500",
    rawValue: 28500,
    stage: "Qualification",
    probability: 20,
    company: "New Ventures Co",
    contact: "David Miller",
    closeDate: "Aug 15, 2025",
    activities: 3,
    lastActivity: "3 days ago",
    description: "Digital transformation strategy consulting for 3 months.",
    tags: ["SMB", "Consulting", "Services"]
  },
  {
    id: 9,
    name: "E-commerce Integration",
    value: "$53,600",
    rawValue: 53600,
    stage: "Proposal",
    probability: 65,
    company: "Retail Group Inc",
    contact: "Michelle Garcia",
    closeDate: "May 25, 2025",
    activities: 7,
    lastActivity: "Yesterday",
    description: "E-commerce platform integration with inventory and CRM systems.",
    tags: ["Mid-Market", "Retail", "Integration"]
  },
  {
    id: 10,
    name: "Mobile App Development",
    value: "$94,200",
    rawValue: 94200,
    stage: "Closed Lost",
    probability: 0,
    company: "FinApp Corporation",
    contact: "Brian Wilson",
    closeDate: "Lost",
    activities: 14,
    lastActivity: "1 week ago",
    description: "Custom mobile banking application development with security features.",
    tags: ["Enterprise", "Mobile", "Development"]
  }
];

// Pipeline stages with associated data
const pipelineStages = [
  { id: "qualification", name: "Qualification", count: 1, value: "$28,500", color: "bg-purple-500" },
  { id: "discovery", name: "Discovery", count: 2, value: "$174,750", color: "bg-blue-500" },
  { id: "proposal", name: "Proposal", count: 2, value: "$138,100", color: "bg-indigo-500" },
  { id: "negotiation", name: "Negotiation", count: 2, value: "$167,800", color: "bg-amber-500" },
  { id: "closed-won", name: "Closed Won", count: 2, value: "$103,200", color: "bg-green-500" },
  { id: "closed-lost", name: "Closed Lost", count: 1, value: "$94,200", color: "bg-red-500" }
];

const PipelinePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState("pipeline");

  const getDealsForStage = (stage: string) => {
    const normalizedStage = stage === "closed-won" ? "Closed Won" : 
                           stage === "closed-lost" ? "Closed Lost" : 
                           stage.charAt(0).toUpperCase() + stage.slice(1);
    
    return deals.filter(deal => deal.stage === normalizedStage);
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return "text-green-600";
    if (probability >= 40) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sales Pipeline</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setActiveView(activeView === "pipeline" ? "list" : "pipeline")}>
            {activeView === "pipeline" ? "List View" : "Pipeline View"}
          </Button>
          <Button variant="default">
            <Plus className="h-4 w-4 mr-2" />
            New Deal
          </Button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Search deals, companies or contacts..." 
            className="pl-10 pr-3 py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Pipeline Metrics */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Pipeline Metrics</CardTitle>
          <CardDescription>Current sales pipeline value and metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Pipeline Value</h3>
              <p className="text-2xl font-bold">$706,550</p>
              <p className="text-xs text-green-600 mt-1">↑ 12.4% from last month</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Average Deal Size</h3>
              <p className="text-2xl font-bold">$70,655</p>
              <p className="text-xs text-green-600 mt-1">↑ 5.2% from last month</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Win Rate</h3>
              <p className="text-2xl font-bold">38%</p>
              <p className="text-xs text-red-600 mt-1">↓ 2.1% from last month</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Sales Cycle</h3>
              <p className="text-2xl font-bold">42 days</p>
              <p className="text-xs text-green-600 mt-1">↑ 3 days faster than last month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {activeView === "pipeline" ? (
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          {pipelineStages.map((stage) => (
            <Card key={stage.id} className="h-full">
              <CardHeader className={`pb-2 ${stage.color} text-white rounded-t-lg`}>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium">{stage.name}</CardTitle>
                  <Badge variant="outline" className="bg-white/20 text-white">
                    {stage.count}
                  </Badge>
                </div>
                <CardDescription className="text-white/90">{stage.value}</CardDescription>
              </CardHeader>
              <CardContent className="p-2 overflow-y-auto max-h-[calc(100vh-300px)]">
                {getDealsForStage(stage.id).map((deal) => (
                  <div 
                    key={deal.id}
                    className="bg-white p-3 rounded-md shadow-sm border border-gray-100 mb-2 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-sm">{deal.name}</h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Deal</DropdownMenuItem>
                          <DropdownMenuItem>Move to Next Stage</DropdownMenuItem>
                          <DropdownMenuItem>Create Task</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{deal.company}</div>
                    <div className="flex items-center mt-2">
                      <DollarSign className="h-3 w-3 text-gray-400 mr-1" />
                      <span className="text-sm font-medium">{deal.value}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <User className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">{deal.contact}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">{deal.lastActivity}</span>
                      </div>
                    </div>
                    {deal.stage !== "Closed Won" && deal.stage !== "Closed Lost" && (
                      <div className="flex items-center mt-2">
                        <CalendarDays className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">Close: {deal.closeDate}</span>
                      </div>
                    )}
                    <div className="mt-2">
                      {deal.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="mr-1 text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {deal.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{deal.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
                <Button variant="ghost" className="w-full mt-2 border border-dashed border-gray-300 text-gray-500">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Deal
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>All Deals</CardTitle>
            <CardDescription>View and manage all deals in your pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probability</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Close Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {deals.map((deal) => (
                    <tr key={deal.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{deal.name}</div>
                        <div className="text-sm text-gray-500">{deal.lastActivity}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">{deal.company}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${deal.stage === 'Closed Won' ? 'bg-green-100 text-green-800' : 
                            deal.stage === 'Closed Lost' ? 'bg-red-100 text-red-800' : 
                            deal.stage === 'Negotiation' ? 'bg-amber-100 text-amber-800' :
                            deal.stage === 'Proposal' ? 'bg-indigo-100 text-indigo-800' :
                            deal.stage === 'Discovery' ? 'bg-blue-100 text-blue-800' :
                            'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {deal.stage}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-medium">{deal.value}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className={`font-medium ${getProbabilityColor(deal.probability)}`}>
                          {deal.probability}%
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {deal.closeDate}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">{deal.contact}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Deal</DropdownMenuItem>
                            <DropdownMenuItem>Move to Next Stage</DropdownMenuItem>
                            <DropdownMenuItem>Create Task</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PipelinePage;
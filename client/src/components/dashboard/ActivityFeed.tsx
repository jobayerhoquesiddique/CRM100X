import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  UserPlus, 
  Mail, 
  Phone, 
  FileText, 
  DollarSign, 
  CheckCircle,
  UserX,
  Calendar,
  Filter,
  X
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, ScaleIn } from "@/components/ui/motion";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Activity {
  id: string;
  type: 'user_added' | 'email_sent' | 'call_made' | 'document_created' | 'deal_closed' | 'task_completed' | 'user_removed' | 'meeting_scheduled';
  title: string;
  description: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  timestamp: string;
  time: string;
}

// All activities view component
const AllActivitiesDialog: React.FC<{ activities: Activity[] }> = ({ activities }) => {
  const [activeFilter, setActiveFilter] = useState<Activity['type'] | 'all'>('all');
  const { toast } = useToast();
  
  // Filter activities by type
  const filteredActivities = activeFilter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === activeFilter);
  
  // Get badge color for filter type
  const getFilterBadgeStyle = (type: Activity['type'] | 'all') => {
    if (type === activeFilter) {
      return "bg-primary text-white";
    }
    
    switch (type) {
      case 'all':
        return "bg-gray-100 text-gray-600 hover:bg-gray-200";
      case 'user_added':
        return "bg-blue-100 text-blue-600 hover:bg-blue-200";
      case 'email_sent':
        return "bg-indigo-100 text-indigo-600 hover:bg-indigo-200";
      case 'call_made':
        return "bg-purple-100 text-purple-600 hover:bg-purple-200";
      case 'document_created':
        return "bg-amber-100 text-amber-600 hover:bg-amber-200";
      case 'deal_closed':
        return "bg-green-100 text-green-600 hover:bg-green-200";
      case 'task_completed':
        return "bg-emerald-100 text-emerald-600 hover:bg-emerald-200";
      case 'user_removed':
        return "bg-red-100 text-red-600 hover:bg-red-200";
      case 'meeting_scheduled':
        return "bg-cyan-100 text-cyan-600 hover:bg-cyan-200";
      default:
        return "bg-gray-100 text-gray-600 hover:bg-gray-200";
    }
  };
  
  // Get activity icon based on type
  const getActivityIcon = (type: Activity['type']) => {
    const iconClasses = "h-5 w-5";
    switch (type) {
      case 'user_added':
        return <UserPlus className={iconClasses} />;
      case 'email_sent':
        return <Mail className={iconClasses} />;
      case 'call_made':
        return <Phone className={iconClasses} />;
      case 'document_created':
        return <FileText className={iconClasses} />;
      case 'deal_closed':
        return <DollarSign className={iconClasses} />;
      case 'task_completed':
        return <CheckCircle className={iconClasses} />;
      case 'user_removed':
        return <UserX className={iconClasses} />;
      case 'meeting_scheduled':
        return <Calendar className={iconClasses} />;
      default:
        return <CheckCircle className={iconClasses} />;
    }
  };
  
  // Get activity icon background color based on type
  const getActivityIconBackground = (type: Activity['type']) => {
    switch (type) {
      case 'user_added':
        return "bg-blue-100 text-blue-600";
      case 'email_sent':
        return "bg-indigo-100 text-indigo-600";
      case 'call_made':
        return "bg-purple-100 text-purple-600";
      case 'document_created':
        return "bg-amber-100 text-amber-600";
      case 'deal_closed':
        return "bg-green-100 text-green-600";
      case 'task_completed':
        return "bg-emerald-100 text-emerald-600";
      case 'user_removed':
        return "bg-red-100 text-red-600";
      case 'meeting_scheduled':
        return "bg-cyan-100 text-cyan-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  
  return (
    <div className="space-y-4">
      {/* Filter badges */}
      <div className="flex flex-wrap gap-2 pb-4 border-b">
        <Badge 
          className={`cursor-pointer ${getFilterBadgeStyle('all')}`}
          onClick={() => setActiveFilter('all')}
        >
          All Activities
        </Badge>
        <Badge 
          className={`cursor-pointer ${getFilterBadgeStyle('user_added')}`}
          onClick={() => setActiveFilter('user_added')}
        >
          Users
        </Badge>
        <Badge 
          className={`cursor-pointer ${getFilterBadgeStyle('email_sent')}`}
          onClick={() => setActiveFilter('email_sent')}
        >
          Emails
        </Badge>
        <Badge 
          className={`cursor-pointer ${getFilterBadgeStyle('call_made')}`}
          onClick={() => setActiveFilter('call_made')}
        >
          Calls
        </Badge>
        <Badge 
          className={`cursor-pointer ${getFilterBadgeStyle('document_created')}`}
          onClick={() => setActiveFilter('document_created')}
        >
          Documents
        </Badge>
        <Badge 
          className={`cursor-pointer ${getFilterBadgeStyle('deal_closed')}`}
          onClick={() => setActiveFilter('deal_closed')}
        >
          Deals
        </Badge>
        <Badge 
          className={`cursor-pointer ${getFilterBadgeStyle('task_completed')}`}
          onClick={() => setActiveFilter('task_completed')}
        >
          Tasks
        </Badge>
        <Badge 
          className={`cursor-pointer ${getFilterBadgeStyle('meeting_scheduled')}`}
          onClick={() => setActiveFilter('meeting_scheduled')}
        >
          Meetings
        </Badge>
      </div>
      
      {/* Activity list */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {filteredActivities.map((activity, index) => (
          <div key={activity.id} className="flex items-start p-3 border rounded-md hover:bg-gray-50">
            <div className={`p-2 rounded-full mr-4 ${getActivityIconBackground(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{activity.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>{activity.timestamp}</p>
                  <p>{activity.time}</p>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <Avatar className="h-6 w-6 mr-2">
                  {activity.user.avatar && <AvatarImage src={activity.user.avatar} alt={activity.user.name} />}
                  <AvatarFallback className="text-xs">{activity.user.initials}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">{activity.user.name}</span>
              </div>
              <div className="flex justify-end mt-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Activity Details",
                      description: `Viewing details for: ${activity.title}`,
                    });
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ActivityFeed: React.FC = () => {
  const { toast } = useToast();
  const activities: Activity[] = [
    {
      id: '1',
      type: 'user_added',
      title: 'New user added',
      description: 'Sarah Johnson was added as a Manager',
      user: {
        name: 'John Doe',
        initials: 'JD'
      },
      timestamp: 'Today',
      time: '09:42 AM'
    },
    {
      id: '2',
      type: 'email_sent',
      title: 'Email campaign sent',
      description: 'Quarterly newsletter was sent to 842 subscribers',
      user: {
        name: 'Emily Smith',
        initials: 'ES'
      },
      timestamp: 'Today',
      time: '08:15 AM'
    },
    {
      id: '3',
      type: 'deal_closed',
      title: 'Deal closed',
      description: 'Enterprise software license deal worth $125K was closed with Acme Corp',
      user: {
        name: 'Michael Brown',
        initials: 'MB'
      },
      timestamp: 'Yesterday',
      time: '05:30 PM'
    },
    {
      id: '4',
      type: 'call_made',
      title: 'Call completed',
      description: 'Sales call with TechGiant stakeholders',
      user: {
        name: 'Robert Chen',
        initials: 'RC'
      },
      timestamp: 'Yesterday',
      time: '02:15 PM'
    },
    {
      id: '5',
      type: 'task_completed',
      title: 'Task completed',
      description: 'Quarterly review preparation was completed',
      user: {
        name: 'Lisa Wong',
        initials: 'LW'
      },
      timestamp: '2 days ago',
      time: '11:30 AM'
    },
    {
      id: '6',
      type: 'document_created',
      title: 'Document created',
      description: 'New proposal document for Cloud Migration Project',
      user: {
        name: 'Alex Turner',
        initials: 'AT'
      },
      timestamp: '2 days ago',
      time: '10:45 AM'
    },
    {
      id: '7',
      type: 'meeting_scheduled',
      title: 'Meeting scheduled',
      description: 'Demo meeting with Globex Systems',
      user: {
        name: 'Jennifer Lee',
        initials: 'JL'
      },
      timestamp: '3 days ago',
      time: '04:00 PM'
    }
  ];

  // Get activity icon based on type
  const getActivityIcon = (type: Activity['type']) => {
    const iconClasses = "h-5 w-5";
    switch (type) {
      case 'user_added':
        return <UserPlus className={iconClasses} />;
      case 'email_sent':
        return <Mail className={iconClasses} />;
      case 'call_made':
        return <Phone className={iconClasses} />;
      case 'document_created':
        return <FileText className={iconClasses} />;
      case 'deal_closed':
        return <DollarSign className={iconClasses} />;
      case 'task_completed':
        return <CheckCircle className={iconClasses} />;
      case 'user_removed':
        return <UserX className={iconClasses} />;
      case 'meeting_scheduled':
        return <Calendar className={iconClasses} />;
      default:
        return <CheckCircle className={iconClasses} />;
    }
  };

  // Get activity icon background color based on type
  const getActivityIconBackground = (type: Activity['type']) => {
    switch (type) {
      case 'user_added':
        return "bg-blue-100 text-blue-600";
      case 'email_sent':
        return "bg-indigo-100 text-indigo-600";
      case 'call_made':
        return "bg-purple-100 text-purple-600";
      case 'document_created':
        return "bg-amber-100 text-amber-600";
      case 'deal_closed':
        return "bg-green-100 text-green-600";
      case 'task_completed':
        return "bg-emerald-100 text-emerald-600";
      case 'user_removed':
        return "bg-red-100 text-red-600";
      case 'meeting_scheduled':
        return "bg-cyan-100 text-cyan-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <Card>
      <CardHeader className="px-6 pt-6 pb-4 flex justify-between items-center">
        <CardTitle className="text-lg font-semibold text-gray-800">Recent Activities</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>All Activities</DialogTitle>
              <DialogDescription>
                View and filter all recent activities in your CRM system.
              </DialogDescription>
            </DialogHeader>
            <AllActivitiesDialog activities={activities} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <StaggerContainer className="space-y-4">
          {activities.map((activity, index) => (
            <ScaleIn key={activity.id} delay={index * 0.05}>
              <div className="flex items-start">
                <div className={`p-2 rounded-full mr-4 ${getActivityIconBackground(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{activity.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>{activity.timestamp}</p>
                      <p>{activity.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <Avatar className="h-6 w-6 mr-2">
                      {activity.user.avatar && <AvatarImage src={activity.user.avatar} alt={activity.user.name} />}
                      <AvatarFallback className="text-xs">{activity.user.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">{activity.user.name}</span>
                  </div>
                </div>
              </div>
            </ScaleIn>
          ))}
        </StaggerContainer>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
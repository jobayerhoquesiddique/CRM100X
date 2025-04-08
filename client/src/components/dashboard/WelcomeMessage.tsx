import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  ArrowRight, 
  Bell, 
  Calendar, 
  Mail, 
  FileText 
} from "lucide-react";
import { FadeIn } from "@/components/ui/motion";
import { ADMIN_USER } from "@/lib/constants";
import { assets } from "@/lib/assets";

const WelcomeMessage: React.FC = () => {
  // Get the current time of day
  const getCurrentTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Get the current date
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Quick actions
  const quickActions = [
    { 
      label: "Add Contact", 
      icon: <PlusCircle className="h-4 w-4 mr-2" />, 
      color: "text-blue-600" 
    },
    { 
      label: "Schedule Meeting", 
      icon: <Calendar className="h-4 w-4 mr-2" />, 
      color: "text-purple-600" 
    },
    { 
      label: "Send Email", 
      icon: <Mail className="h-4 w-4 mr-2" />, 
      color: "text-amber-600" 
    },
    { 
      label: "Create Document", 
      icon: <FileText className="h-4 w-4 mr-2" />, 
      color: "text-green-600" 
    }
  ];

  return (
    <FadeIn>
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="mr-4 h-16 w-16 rounded-full overflow-hidden border-4 border-white shadow-sm">
                <img 
                  src={assets.profile.admin} 
                  alt={ADMIN_USER.name} 
                  className="h-full w-full object-cover" 
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {getCurrentTimeGreeting()}, {ADMIN_USER.name.split(' ')[0]}!
                </h1>
                <p className="text-gray-600">
                  {getCurrentDate()}
                </p>
                <div className="flex items-center mt-1.5">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-none">
                    <Bell className="h-3 w-3 mr-1" />
                    8 notifications
                  </Badge>
                  <span className="mx-2 text-gray-300">•</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-none">
                    <Calendar className="h-3 w-3 mr-1" />
                    5 tasks today
                  </Badge>
                </div>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <div className="grid grid-cols-2 gap-2 w-full md:flex md:space-x-2">
                {quickActions.map((action, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm" 
                    className={`bg-white ${action.color} border-gray-200 hover:bg-gray-50`}
                  >
                    {action.icon}
                    <span className="hidden md:inline">{action.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Dashboard summary */}
          <div className="mt-6 bg-white rounded-lg border p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-800">Today's Summary</h3>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                Detailed Report
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-3 bg-green-50 rounded-md">
                <div className="flex items-center text-green-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-medium">2 Meetings</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Next: 11:30 AM - TechGiant</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-md">
                <div className="flex items-center text-blue-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="font-medium">12 Unread Emails</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Latest: Proposal feedback</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-md">
                <div className="flex items-center text-amber-600">
                  <FileText className="h-4 w-4 mr-2" />
                  <span className="font-medium">3 Tasks Due</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Next: Send contract draft</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-md">
                <div className="flex items-center text-purple-600">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  <span className="font-medium">4 New Leads</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Latest: InnoTech Solutions</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
};

export default WelcomeMessage;
import React from "react";
import { ArrowDown, ArrowUp, Users, UserPlus, DollarSign, FolderOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Stat } from "@shared/schema";

interface StatCardProps {
  stat: Stat;
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const getIcon = () => {
    switch (stat.icon) {
      case 'users':
        return <Users className="h-6 w-6" />;
      case 'user-plus':
        return <UserPlus className="h-6 w-6" />;
      case 'dollar-sign':
        return <DollarSign className="h-6 w-6" />;
      case 'folder':
        return <FolderOpen className="h-6 w-6" />;
      default:
        return <Users className="h-6 w-6" />;
    }
  };

  const getIconBackground = () => {
    switch (stat.iconBg) {
      case 'blue':
        return "bg-blue-100 text-blue-500";
      case 'purple':
        return "bg-purple-100 text-purple-500";
      case 'green':
        return "bg-green-100 text-green-500";
      case 'yellow':
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-blue-100 text-blue-500";
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
            <p className="text-2xl font-semibold text-gray-800 mt-1">{stat.value}</p>
            <p className={`text-sm ${stat.direction === 'up' ? 'text-green-600' : 'text-red-600'} mt-2 flex items-center`}>
              {stat.direction === 'up' ? (
                <ArrowUp className="mr-1 h-4 w-4" />
              ) : (
                <ArrowDown className="mr-1 h-4 w-4" />
              )}
              {stat.change} <span className="text-gray-500 ml-1">from last month</span>
            </p>
          </div>
          <div className={`rounded-full h-12 w-12 flex items-center justify-center ${getIconBackground()}`}>
            {getIcon()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;

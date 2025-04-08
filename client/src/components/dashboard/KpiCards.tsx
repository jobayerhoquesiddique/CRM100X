import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StaggerContainer, ScaleIn } from "@/components/ui/motion";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  UserPlus, 
  DollarSign, 
  BarChart4, 
  Percent, 
  Clock, 
  Phone 
} from "lucide-react";
import { CRM_STATS } from "@/lib/constants";

interface KpiCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: JSX.Element;
  bgColor: string;
  textColor: string;
}

const KpiCards: React.FC = () => {
  const kpis: KpiCard[] = [
    {
      title: CRM_STATS[0].title,
      value: CRM_STATS[0].value,
      change: CRM_STATS[0].change,
      trend: CRM_STATS[0].trend as 'up' | 'down',
      icon: <Users className="h-6 w-6" />,
      bgColor: "bg-blue-500",
      textColor: "text-blue-500"
    },
    {
      title: CRM_STATS[1].title,
      value: CRM_STATS[1].value,
      change: CRM_STATS[1].change,
      trend: CRM_STATS[1].trend as 'up' | 'down',
      icon: <UserPlus className="h-6 w-6" />,
      bgColor: "bg-purple-500",
      textColor: "text-purple-500"
    },
    {
      title: CRM_STATS[2].title,
      value: CRM_STATS[2].value,
      change: CRM_STATS[2].change,
      trend: CRM_STATS[2].trend as 'up' | 'down',
      icon: <DollarSign className="h-6 w-6" />,
      bgColor: "bg-green-500",
      textColor: "text-green-500"
    },
    {
      title: CRM_STATS[3].title,
      value: CRM_STATS[3].value,
      change: CRM_STATS[3].change,
      trend: CRM_STATS[3].trend as 'up' | 'down',
      icon: <Percent className="h-6 w-6" />,
      bgColor: "bg-amber-500",
      textColor: "text-amber-500"
    },
    // Additional KPIs
    {
      title: "Avg. Response Time",
      value: "3.2h",
      change: "-15%",
      trend: "up",
      icon: <Clock className="h-6 w-6" />,
      bgColor: "bg-cyan-500",
      textColor: "text-cyan-500"
    },
    {
      title: "Calls Per Day",
      value: "42",
      change: "+8%",
      trend: "up",
      icon: <Phone className="h-6 w-6" />,
      bgColor: "bg-indigo-500",
      textColor: "text-indigo-500"
    },
    {
      title: "Customer Satisfaction",
      value: "96%",
      change: "+2%",
      trend: "up",
      icon: <BarChart4 className="h-6 w-6" />,
      bgColor: "bg-rose-500",
      textColor: "text-rose-500"
    },
    {
      title: "Sales Velocity",
      value: "12.5d",
      change: "-8%",
      trend: "up",
      icon: <TrendingUp className="h-6 w-6" />,
      bgColor: "bg-emerald-500",
      textColor: "text-emerald-500"
    }
  ];

  return (
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => (
        <ScaleIn key={kpi.title} delay={index * 0.05}>
          <Card className="border-t-4" style={{ borderTopColor: kpi.bgColor.replace('bg-', 'var(--') + ')' }}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
                  <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                  <div className={`flex items-center mt-2 ${
                    kpi.trend === 'up' 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {kpi.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    <span className="text-sm font-medium">{kpi.change}</span>
                  </div>
                </div>
                <div 
                  className={`flex items-center justify-center h-10 w-10 rounded-md text-white ${kpi.bgColor}`}
                >
                  {kpi.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        </ScaleIn>
      ))}
    </StaggerContainer>
  );
};

export default KpiCards;
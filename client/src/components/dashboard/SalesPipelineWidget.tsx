import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RECENT_DEALS } from "@/lib/constants";
import { ArrowRight, ExternalLink } from "lucide-react";

interface PipelineStage {
  name: string;
  count: number;
  value: number;
  color: string;
}

const SalesPipelineWidget: React.FC = () => {
  // Pipeline stages with summary stats
  const pipelineStages: PipelineStage[] = [
    { name: "Discovery", count: 15, value: 185000, color: "bg-blue-500" },
    { name: "Proposal", count: 8, value: 320000, color: "bg-indigo-500" },
    { name: "Negotiation", count: 5, value: 410000, color: "bg-purple-500" },
    { name: "Closed Won", count: 7, value: 295000, color: "bg-green-500" }
  ];

  // Calculate total pipeline value
  const totalPipelineValue = pipelineStages.reduce((sum, stage) => sum + stage.value, 0);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Get stage percentage of total pipeline
  const getStagePercentage = (value: number) => {
    return Math.round((value / totalPipelineValue) * 100);
  };

  // Get status color for deals
  const getStatusColor = (stage: string) => {
    switch (stage) {
      case "Discovery":
        return "bg-blue-100 text-blue-800";
      case "Proposal":
        return "bg-indigo-100 text-indigo-800";
      case "Negotiation":
        return "bg-purple-100 text-purple-800";
      case "Closed Won":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader className="px-6 pt-6 pb-0">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800">Sales Pipeline</CardTitle>
            <CardDescription className="text-gray-500">
              Total pipeline value: {formatCurrency(totalPipelineValue)}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <span>View Pipeline</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-6 pt-4 pb-6">
        {/* Pipeline Stages Overview */}
        <div className="space-y-4 mb-6">
          {pipelineStages.map((stage) => (
            <div key={stage.name} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                  <span className="font-medium text-sm">{stage.name}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {stage.count} deals · {formatCurrency(stage.value)}
                </div>
              </div>
              <Progress value={getStagePercentage(stage.value)} className="h-2" />
            </div>
          ))}
        </div>

        {/* Recent Deals */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Deals</h3>
          <div className="space-y-3">
            {RECENT_DEALS.slice(0, 3).map((deal) => (
              <div key={deal.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-sm">{deal.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{deal.company}</p>
                  </div>
                  <Badge variant="outline" className={`${getStatusColor(deal.stage)} border-0`}>
                    {deal.stage}
                  </Badge>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium">{deal.value}</span>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesPipelineWidget;
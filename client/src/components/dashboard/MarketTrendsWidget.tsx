import React, { useState, useEffect, useRef } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  LineChart,
  BarChart,
  PieChart,
  ArrowRight
} from "lucide-react";
import Chart from "chart.js/auto";
import { ChartData } from "@/types";

const MarketTrendsWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("industry");
  const lineChartRef = useRef<HTMLCanvasElement>(null);
  const lineChartInstance = useRef<Chart | null>(null);
  const barChartRef = useRef<HTMLCanvasElement>(null);
  const barChartInstance = useRef<Chart | null>(null);

  // Industry trends data
  const industryTrendsData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Technology',
        data: [45, 47, 52, 58, 60, 65, 70, 68, 72, 78, 82, 85],
        backgroundColor: '#3b82f6',
        borderWidth: 2,
      },
      {
        label: 'Finance',
        data: [60, 58, 55, 57, 56, 58, 62, 65, 68, 70, 72, 74],
        backgroundColor: '#8b5cf6',
        borderWidth: 2,
      },
      {
        label: 'Healthcare',
        data: [40, 38, 42, 45, 48, 50, 52, 55, 58, 62, 65, 67],
        backgroundColor: '#10b981',
        borderWidth: 2,
      }
    ]
  };

  // Competitor analysis data
  const competitorData: ChartData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Your Company',
        data: [45, 52, 58, 65],
        backgroundColor: '#3b82f6',
        borderWidth: 0,
        borderRadius: 4,
      },
      {
        label: 'Competitor 1',
        data: [40, 45, 50, 55],
        backgroundColor: '#8b5cf6',
        borderWidth: 0,
        borderRadius: 4,
      },
      {
        label: 'Competitor 2',
        data: [30, 35, 38, 42],
        backgroundColor: '#10b981',
        borderWidth: 0,
        borderRadius: 4,
      }
    ]
  };

  // Market insights
  const marketInsights = [
    {
      title: "SaaS Adoption Rate",
      value: "+24%",
      trend: "up",
      description: "YoY increase in SaaS adoption across mid-market"
    },
    {
      title: "AI Integration",
      value: "+52%",
      trend: "up",
      description: "Growth in AI-powered CRM implementations"
    },
    {
      title: "Remote Sales Teams",
      value: "+37%",
      trend: "up",
      description: "More sales teams operating remotely"
    },
    {
      title: "Traditional CRMs",
      value: "-18%",
      trend: "down",
      description: "Decline in legacy CRM usage"
    }
  ];

  // Initialize charts
  useEffect(() => {
    if (activeTab === "industry" && lineChartRef.current) {
      // Destroy previous chart instance if it exists
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }

      // Create line chart
      const ctx = lineChartRef.current.getContext('2d');
      if (ctx) {
        lineChartInstance.current = new Chart(ctx, {
          type: 'line',
          data: industryTrendsData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
              },
            },
            scales: {
              y: {
                beginAtZero: false,
                ticks: {
                  callback: function(value) {
                    return value + '%';
                  }
                }
              }
            }
          }
        });
      }
    } else if (activeTab === "competitor" && barChartRef.current) {
      // Destroy previous chart instance if it exists
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }

      // Create bar chart
      const ctx = barChartRef.current.getContext('2d');
      if (ctx) {
        barChartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: competitorData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function(value) {
                    return value + '%';
                  }
                }
              }
            }
          }
        });
      }
    }

    // Cleanup function
    return () => {
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
    };
  }, [activeTab]);

  return (
    <Card>
      <CardHeader className="px-6 pt-6 pb-0 flex justify-between items-center">
        <CardTitle className="text-lg font-semibold text-gray-800">Market Trends</CardTitle>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[300px]">
          <TabsList>
            <TabsTrigger value="industry">Industry</TabsTrigger>
            <TabsTrigger value="competitor">Competitors</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="px-6 pt-4 pb-6">
        <TabsContent value="industry" className="mt-0">
          <div className="space-y-4">
            <div className="h-60">
              <canvas ref={lineChartRef} />
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">
                Industry growth trends over the past year
              </p>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <span>Detailed Report</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="competitor" className="mt-0">
          <div className="space-y-4">
            <div className="h-60">
              <canvas ref={barChartRef} />
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">
                Market share comparison with top competitors
              </p>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <span>Competitor Analysis</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="mt-0">
          <div className="grid grid-cols-2 gap-4">
            {marketInsights.map((insight, index) => (
              <div key={index} className="p-4 rounded-lg border">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-700">{insight.title}</h3>
                  <div className={`flex items-center ${
                    insight.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <span className="text-lg font-bold">{insight.value}</span>
                    {insight.trend === 'up' ? (
                      <TrendingUp className="ml-1 h-4 w-4" />
                    ) : (
                      <TrendingDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{insight.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
            <div className="flex">
              <LineChart className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm text-blue-800">
                Complete market analysis report available
              </span>
            </div>
            <Button size="sm" className="bg-blue-600">View Report</Button>
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  );
};

export default MarketTrendsWidget;
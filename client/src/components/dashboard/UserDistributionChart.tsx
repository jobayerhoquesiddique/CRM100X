import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartData, UserDistributionItem } from "@/types";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import Chart from "chart.js/auto";

const UserDistributionChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const userDistribution: UserDistributionItem[] = [
    { role: "Administrators", percentage: 15, color: "#3b82f6" },
    { role: "Managers", percentage: 22, color: "#8b5cf6" },
    { role: "Employees", percentage: 38, color: "#f59e0b" },
    { role: "Guests", percentage: 25, color: "#10b981" },
  ];

  const chartData: ChartData = {
    labels: userDistribution.map(item => item.role),
    datasets: [{
      data: userDistribution.map(item => item.percentage),
      backgroundColor: userDistribution.map(item => item.color),
      borderWidth: 0,
    }]
  };

  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new chart
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'doughnut',
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            cutout: '70%'
          }
        });
      }
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <Card>
      <CardHeader className="px-6 pt-6 pb-0 flex justify-between items-center">
        <CardTitle className="text-lg font-semibold text-gray-800">User Distribution</CardTitle>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5 text-gray-400" />
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-60 flex items-center justify-center">
          <canvas ref={chartRef} />
        </div>
        <div className="mt-4 space-y-2">
          {userDistribution.map((item) => (
            <div key={item.role} className="flex items-center">
              <span 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="text-sm text-gray-600">
                {item.role} ({item.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDistributionChart;

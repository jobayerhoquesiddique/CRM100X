import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartData } from "@/types";
import Chart from "chart.js/auto";

const RevenueChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const chartData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Revenue',
      data: [12000, 19000, 15000, 22000, 30000, 25000, 28000, 32000, 34000, 38000, 35000, 42000],
      backgroundColor: '#3b82f6',
      borderWidth: 0,
      borderRadius: 4,
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
          type: 'bar',
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function(value) {
                    return '$' + value.toLocaleString();
                  }
                }
              }
            },
            plugins: {
              legend: {
                display: false
              }
            }
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
        <CardTitle className="text-lg font-semibold text-gray-800">Revenue Overview</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-sm text-gray-600 hover:text-gray-900">Weekly</Button>
          <Button variant="ghost" size="sm" className="text-sm text-gray-600 hover:text-gray-900">Monthly</Button>
          <Button variant="ghost" size="sm" className="text-sm text-blue-600 font-medium">Yearly</Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-80">
          <canvas ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;

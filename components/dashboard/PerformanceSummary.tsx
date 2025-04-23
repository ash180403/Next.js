"use client";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "next-themes";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";

const chartData = [
  { name: "Jan", score: 70 },
  { name: "Feb", score: 65 },
  { name: "Mar", score: 78 },
  { name: "Apr", score: 72 },
  { name: "May", score: 80 },
  { name: "Jun", score: 82 },
  { name: "Jul", score: 90 },
];

export default function PerformanceSummary() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const areaColor = theme === "dark" ? "hsl(var(--chart-1))" : "hsl(var(--chart-1))";
  const gradientStart = theme === "dark" ? "#3366FF20" : "#3366FF10";
  const gradientEnd = theme === "dark" ? "#3366FF05" : "#3366FF01";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Performance Summary</h2>
        <p className="text-muted-foreground text-sm">Your recent test results analysis</p>
      </div>
      
      <div className="flex flex-col items-center justify-center py-4 space-y-8">
        <div className="flex items-center justify-center w-full relative">
          <div className="w-32 h-32 rounded-full border-8 border-muted flex items-center justify-center bg-muted/30">
            <div className="text-center">
              <div className="text-3xl font-bold">75%</div>
              <div className="text-xs text-muted-foreground mt-1">Overall Score</div>
            </div>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-44 h-44 -rotate-90">
              <circle
                cx="88"
                cy="88"
                r="70"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="12"
                strokeDasharray="439.6"
                strokeDashoffset="0"
              />
              <circle
                cx="88"
                cy="88"
                r="70"
                fill="none"
                stroke="hsl(var(--chart-1))"
                strokeWidth="12"
                strokeDasharray="439.6"
                strokeDashoffset="110"
                strokeLinecap="round"
                className="transition-all duration-1000 ease-in-out"
              />
            </svg>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 w-full">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">Percentile</div>
              <Badge className="bg-chart-2 hover:bg-chart-2/90">85th</Badge>
            </div>
            <Progress value={85} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">Accuracy</div>
              <Badge className="bg-chart-3 hover:bg-chart-3/90">68%</Badge>
            </div>
            <Progress value={68} className="h-2" />
          </div>
        </div>
      </div>
      
      <div className="h-24 mt-6">
        <div className="text-sm font-medium mb-2">Trend</div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={areaColor} stopOpacity={0.2} />
                <stop offset="100%" stopColor={areaColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="score"
              stroke={areaColor}
              fill="url(#scoreGradient)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
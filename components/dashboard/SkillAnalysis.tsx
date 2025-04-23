"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { cn } from "@/lib/utils";

const skillData = [
  { name: "Problem Solving", score: 82, maxScore: 100 },
  { name: "Critical Thinking", score: 75, maxScore: 100 },
  { name: "Data Analysis", score: 68, maxScore: 100 },
  { name: "Algorithms", score: 90, maxScore: 100 },
  { name: "Communication", score: 72, maxScore: 100 },
];

export default function SkillAnalysis() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const barColors = {
    light: [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
    ],
    dark: [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
    ],
  };

  const getBarColor = (index: number) => {
    const colorSet = theme === "dark" ? barColors.dark : barColors.light;
    return colorSet[index % colorSet.length];
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border rounded-md shadow-sm">
          <p className="text-sm font-medium">{`${payload[0].payload.name}`}</p>
          <p className="text-sm text-muted-foreground">{`Score: ${payload[0].value}/${payload[0].payload.maxScore}`}</p>
        </div>
      );
    }
    return null;
  };

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-1">Skill-wise Analysis</h2>
        <p className="text-muted-foreground text-sm">Your proficiency across different skills</p>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={skillData}
            margin={{ top: 10, right: 30, left: 25, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              type="number" 
              domain={[0, 100]} 
              tick={{ fontSize: 12 }} 
              axisLine={false} 
              tickLine={false}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              width={120}
              axisLine={false}
              tickLine={false}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Bar 
              dataKey="score" 
              radius={[0, 4, 4, 0]}
              animationDuration={1500}
            >
              {skillData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getBarColor(index)} 
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.5}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap gap-3 justify-center pt-2">
        {skillData.map((skill, index) => (
          <div 
            key={index}
            className={cn(
              "text-xs font-medium px-3 py-1 rounded-full",
              activeIndex === index ? "bg-background border-2" : "bg-muted border",
            )}
            style={{ borderColor: getBarColor(index) }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {skill.name}
          </div>
        ))}
      </div>
    </div>
  );
}
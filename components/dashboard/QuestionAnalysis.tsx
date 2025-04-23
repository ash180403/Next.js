"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import { cn } from "@/lib/utils";

const questionData = [
  { name: "Correct", value: 24, color: "chart-2" },
  { name: "Incorrect", value: 12, color: "chart-1" },
  { name: "Skipped", value: 8, color: "chart-3" },
  { name: "Attempted", value: 36, color: "chart-4" },
];

// Custom active shape for the pie chart
const renderActiveShape = (props: any) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value
  } = props;

  return (
    <g>
      <text x={cx} y={cy - 15} dy={8} textAnchor="middle" fill={fill} className="text-lg font-bold">
        {payload.name}
      </text>
      <text x={cx} y={cy + 15} dy={8} textAnchor="middle" fill={fill} className="text-sm">
        {`${value} questions (${(percent * 100).toFixed(0)}%)`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export default function QuestionAnalysis() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-1">Question Analysis</h2>
        <p className="text-muted-foreground text-sm">
          Breakdown of all questions by status
        </p>
      </div>
      
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={questionData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
              onMouseEnter={onPieEnter}
              animationDuration={1000}
              animationEasing="ease-out"
            >
              {questionData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`hsl(var(--${entry.color}))`}
                  stroke="hsl(var(--background))"
                  strokeWidth={2}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3 pt-2">
        {questionData.map((entry, index) => (
          <div
            key={`legend-${index}`}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer",
              "transition-colors duration-200 text-sm",
              activeIndex === index ? "bg-background border shadow-sm" : "bg-muted/50"
            )}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{ background: `hsl(var(--${entry.color}))` }}
            />
            <span className="font-medium">{entry.name}</span>
            <span className="text-muted-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
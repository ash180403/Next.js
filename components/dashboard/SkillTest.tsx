"use client";

import { Button } from "@/components/ui/button";
import { PieLabelRenderProps } from 'recharts';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const syllabusData = [
  { name: "HTML Tools, Forms, History", score: 80, color: "#4CAF50" },
  { name: "Tags & References in HTML", score: 60, color: "#FF9800" },
  { name: "Tables & References in HTML", score: 24, color: "#f44336" },
  { name: "Tables & CSS Basics", score: 96, color: "#2196f3" },
];

const questionAnalysisData = [ 
  { name: "Correct", value: 10, color: "#4CAF50" },
  { name: "Incorrect", value: 3, color: "#f44336" },
  { name: "Skipped", value: 2, color: "#ff9800" },
];

const comparisonData = [
  { name: "Your Score", value: 67, color: "#2196f3" },
  { name: "Average Score", value: 72, color: "#9c27b0" },
];

export default function SkillTest() {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [rank, setRank] = useState("1");
  const [percentile, setPercentile] = useState("30");
  const [score, setScore] = useState("10");
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  const { theme } = useTheme();

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx = 0,
    cy = 0,
    midAngle = 0,
    innerRadius = 0,
    outerRadius = 0,
    percent = 0,
  }: PieLabelRenderProps) => {
    const RADIAN = Math.PI / 180;
    const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
    const x = Number(cx) + radius * Math.cos(-Number(midAngle) * RADIAN);
    const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN);
  
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > Number(cx) ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(Number(percent) * 100).toFixed(0)}%`}
      </text>
    );
  };
  

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-6">
        <img src="/html5.svg" alt="HTML5" className="w-16 h-16" />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold">Hyper Text Markup Language</h2>
              <p className="text-muted-foreground mt-1">
                Questions: 08 | Duration: 15 mins | Submitted on 5 June 2021
              </p>
            </div>
            <Button variant="default" className="bg-[#1e2875] hover:bg-[#1e2875]/90" onClick={() => setIsUpdateOpen(true)}>
              Update
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-yellow-100 rounded-full">
            <span className="text-yellow-600 text-xl">🏆</span>
          </div>
          <div>
            <div className="text-2xl font-semibold">{rank}</div>
            <div className="text-sm text-muted-foreground">YOUR RANK</div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="p-4 bg-blue-100 rounded-full">
            <span className="text-blue-600 text-xl">📊</span>
          </div>
          <div>
            <div className="text-2xl font-semibold">{percentile}%</div>
            <div className="text-sm text-muted-foreground">PERCENTILE</div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="p-4 bg-green-100 rounded-full">
            <span className="text-green-600 text-xl">✅</span>
          </div>
          <div>
            <div className="text-2xl font-semibold">{score} / 15</div>
            <div className="text-sm text-muted-foreground">CORRECT ANSWERS</div>
          </div>
        </div>
      </div>

      <Card className="p-6">
  <h3 className="text-lg font-semibold mb-6">Syllabus Wise Analysis</h3>
  <div className="space-y-6">
    {syllabusData.map((item, index) => (
      <div
        key={index}
        className={cn(
          "p-4 rounded-lg transition-transform duration-300 transform-gpu",
          activeSkill === index
            ? "bg-background shadow-lg scale-105"
            : "hover:bg-accent/50"
        )}
        onMouseEnter={() => setActiveSkill(index)}
        onMouseLeave={() => setActiveSkill(null)}
        style={{
          willChange: "transform, box-shadow", // Optimize rendering
          position: "relative", // Prevent layout shifts
        }}
      >
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="font-medium text-base">{item.name}</span>
          </div>
          <span
            className="text-sm font-semibold"
            style={{ color: item.color }}
          >
            {item.score}%
          </span>
        </div>
        <div className="relative h-3 rounded-full bg-muted overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
            style={{
              width: `${item.score}%`,
              backgroundColor: item.color,
              opacity: activeSkill === index ? 1 : 0.8,
            }}
          />
        </div>
        {activeSkill === index && (
          <div className="mt-3 text-sm text-muted-foreground bg-muted/10 p-2 rounded-md shadow-inner">
            {item.score >= 80 ? (
              <span className="text-green-600 font-medium">
                Excellent performance! 🎉
              </span>
            ) : item.score >= 60 ? (
              <span className="text-yellow-600 font-medium">
                Good progress, keep improving! 💪
              </span>
            ) : (
              <span className="text-red-600 font-medium">
                Needs more practice. 📚
              </span>
            )}
          </div>
        )}
      </div>
    ))}
  </div>
</Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Question Analysis</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={questionAnalysisData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {questionAnalysisData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-muted-foreground text-center mt-4">
            You scored {score} questions correct out of 15. However, it still needs some improvements.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Score Comparison</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={comparisonData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {comparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-muted-foreground text-center mt-4">
            Your score is slightly below the average percentile of 72%.
          </p>
        </Card>
      </div>

      <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <img src="/html5.svg" alt="HTML5" className="w-8 h-8" />
              Update scores
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-4">
              <div className="flex-none w-8 h-8 rounded-full bg-[#1e2875] text-white flex items-center justify-center">1</div>
              <div className="flex-1">
                <label className="text-sm font-medium">Update your Rank</label>
                <Input value={rank} onChange={(e) => setRank(e.target.value)} className="mt-1" />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex-none w-8 h-8 rounded-full bg-[#1e2875] text-white flex items-center justify-center">2</div>
              <div className="flex-1">
                <label className="text-sm font-medium">Update your Percentile</label>
                <Input value={percentile} onChange={(e) => setPercentile(e.target.value)} className="mt-1" />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex-none w-8 h-8 rounded-full bg-[#1e2875] text-white flex items-center justify-center">3</div>
              <div className="flex-1">
                <label className="text-sm font-medium">Update your Current Score (out of 15)</label>
                <Input value={score} onChange={(e) => setScore(e.target.value)} className="mt-1" />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsUpdateOpen(false)}>
                cancel
              </Button>
              <Button className="bg-[#1e2875] hover:bg-[#1e2875]/90" onClick={() => setIsUpdateOpen(false)}>
                save →
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

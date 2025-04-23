"use client";

import { Card } from "@/components/ui/card";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SkillTest from "@/components/dashboard/SkillTest";
import { useTheme } from "next-themes";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-background pb-8">
      <DashboardHeader />
      
      <div className="container mx-auto px-4 pt-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Skill Test</h1>
        </div>

        <Card className="p-6">
          <SkillTest />
        </Card>
      </div>
    </main>
  );
}
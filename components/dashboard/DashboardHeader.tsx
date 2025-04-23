"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, LayoutDashboard } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export default function DashboardHeader() {
  const [open, setOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
              <img src="/assets/logo.png" alt="WhatBytes Logo" className="h-12 w-12" />
              <span className="font-bold text-3xl">WhatBytes</span>
          </div>

          </a>
        </div>
        
        <nav className="flex items-center gap-2">
  <a
    href="#"
    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-dark hover:text-primary hover:scale-105 hover:bg-accent/30 hover:border-muted-foreground rounded-md transition-all shadow-sm border border-transparent"
  >
    <LayoutDashboard className="h-4 w-4" />
    Dashboard
  </a>
  <a
    href="#"
    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-dark hover:text-primary hover:scale-105 hover:bg-accent/30 hover:border-muted-foreground rounded-md transition-all shadow-sm border border-transparent"
  >
    <FileText className="h-4 w-4" />
    Skill Test
  </a>
</nav>

        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" />
                  <AvatarFallback>RS</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Emilia Martina</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Droplets,
  Heart,
  AlertTriangle,
  Router,
  FileBarChart,
  Shield,
  Waves,
  Brain,
  Upload,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "AI/ML Insights", url: "/ai-ml", icon: Brain },
  { title: "IoT Devices", url : "/iot-devices", icon :  Settings},
  { title: "Reports", url : "/REPORTS-NEW", icon :  FileBarChart},
  { title: "Alerts & Action", url: "/alerts", icon: AlertTriangle },
  { title: "Upload Data", url: "/upload-data", icon: Upload }, // ✅ fixed here
  { title: "Setting", url : "/setting", icon :  Settings},
  // { title: "Water Quality", url: "/waterquality", icon: Droplets },
  // { title: "Health Reports", url: "/healthreports", icon: Heart },
  // { title: "Devices", url: "/devices", icon: Router },
  // { title: "Reports", url: "/reports", icon: FileBarChart },

  
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-blue-50 to-teal-50">
        {/* Sidebar */}
        <Sidebar className="w-56 border-r border-blue-100 bg-white/90 backdrop-blur">
          {/* Logo / App Title */}
          <SidebarHeader className="flex items-center gap-3 border-b border-blue-100 px-4 py-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 shadow">
              <Waves className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">AAROGYA JAL</h2>
              <p className="text-[11px] text-gray-600">Health Surveillance</p>
            </div>
          </SidebarHeader>

          {/* Navigation */}
          <SidebarContent className="p-2">
            <SidebarGroup>
              <SidebarGroupLabel className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                          pathname === item.url
                            ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow"
                            : "hover:bg-blue-50 hover:text-blue-700"
                        }`}
                      >
                        <Link href={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* System Status */}
            <SidebarGroup className="mt-5">
              <SidebarGroupLabel className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                System Status
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="space-y-2 px-3 py-1 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                    <span className="text-gray-600">System Online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-teal-500" />
                    <span className="text-gray-600">All Secure</span>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          {/* Footer */}
          <SidebarFooter className="border-t border-blue-100 px-4 py-3 text-center">
            <p className="text-[11px] text-gray-500">Protecting Communities</p>
            <p className="mt-1 text-[11px] font-semibold text-gray-700">
              Smart Water Monitoring
            </p>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <main className="flex flex-1 flex-col">
          {/* Mobile header */}
          <header className="flex items-center gap-3 border-b border-blue-100 bg-white/80 px-4 py-3 backdrop-blur md:hidden">
            <SidebarTrigger className="rounded-lg p-2 hover:bg-blue-100" />
            <h1 className="text-base font-bold text-gray-900">AAROGYA JAL</h1>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto p-3">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}

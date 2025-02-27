import * as React from "react";
import {
  CalendarRange,
  ChartNoAxesCombined,
  House,
  LayoutDashboard,
  Share2,
} from "lucide-react";

import { SidebarNav } from "@/shared/ui/sidebar-nav";
import { SidebarUser } from "@/shared/ui/sidebar-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/shared/ui/sidebar";
import { useGetProfile } from "@/shared/api";
import { ROUTES_TITLE, RoutesEnum } from "@/app/constants/core";

const navItems = {
  home: [
    {
      title: ROUTES_TITLE[RoutesEnum.Home],
      url: RoutesEnum.Home,
      icon: House,
    },
  ],
  goals: [
    {
      title: ROUTES_TITLE[RoutesEnum.GoalsDashboard],
      url: RoutesEnum.GoalsDashboard,
      icon: LayoutDashboard,
    },
    {
      title: ROUTES_TITLE[RoutesEnum.GoalsCalendar],
      url: RoutesEnum.GoalsCalendar,
      icon: CalendarRange,
    },
    {
      title: ROUTES_TITLE[RoutesEnum.GoalsPublic],
      url: RoutesEnum.GoalsPublic,
      icon: Share2,
    },
    {
      title: ROUTES_TITLE[RoutesEnum.GoalsStatistics],
      url: RoutesEnum.GoalsStatistics,
      icon: ChartNoAxesCombined,
    },
  ],
};

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: user, isLoading: isUserLoading } = useGetProfile();

  return (
    <Sidebar collapsible="icon" aria-describedby="radix-ui" {...props}>
      <SidebarHeader>
        <div className="flex gap-x-3 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-zinc-800 text-sidebar-primary-foreground">
            <img src="/icon-512.png" alt="Achievly Logo" className="size-6" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Achievly</span>
            <span className="truncate text-xs">Управляй задачами</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav items={navItems.home} />
        <SidebarNav items={navItems.goals} label="Цели" />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser user={user} isUserLoading={isUserLoading} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export { AppSidebar };

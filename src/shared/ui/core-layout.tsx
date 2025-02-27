import { AppSidebar } from "@/shared/ui/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/ui/sidebar";
import { Separator } from "@/shared/ui/separator";
import { Outlet, useLocation } from "react-router-dom";
import { ROUTES_TITLE } from "@/app/constants/core";
import { GoalCreate } from "@/widgets/goal-create";

export function CoreLayout() {
  const { pathname } = useLocation();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <span className="text-sm font-medium">
              {ROUTES_TITLE[pathname]}
            </span>
          </div>
          <GoalCreate />
        </header>
        <main className="flex max-h-[calc(100%-64px)] flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

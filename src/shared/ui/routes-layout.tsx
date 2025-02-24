import { Outlet, useLocation } from "react-router-dom";

import { PAGE_TITLE } from "@/app/constants/core";
import { Navigation } from "@/features/navigation";
import { CoreLayout } from "@/shared/ui";

export function RoutesLayout() {
  const location = useLocation();

  return (
    <CoreLayout className="justify-between">
      <header className="flex items-center justify-center py-6">
        <span className="text-xl font-bold">
          {PAGE_TITLE[location.pathname]}
        </span>
      </header>
      <main
        className="h-full max-h-full grow overflow-x-hidden"
        style={{ scrollbarWidth: "none" }}
      >
        <Outlet />
      </main>
      <Navigation />
    </CoreLayout>
  );
}

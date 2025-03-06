import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ThemeProvider from "@/app/providers/theme";
import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/app/constants/core";
import QueryProvider from "@/app/providers/query";
import { RouterProvider } from "react-router-dom";
import { routes } from "@/app/routes";
import { Toaster } from "@/shared/ui";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme={DEFAULT_THEME} storageKey={THEME_STORAGE_KEY}>
      <QueryProvider>
        <RouterProvider router={routes} />
        <Toaster />
      </QueryProvider>
    </ThemeProvider>
  </StrictMode>,
);

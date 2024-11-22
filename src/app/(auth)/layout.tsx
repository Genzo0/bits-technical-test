// app/layout.tsx
import { ReactNode } from "react";
import { checkAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const isAuthenticated = await checkAuth();

  if (isAuthenticated) {
    redirect("/");
  }

  return <>{children}</>;
}

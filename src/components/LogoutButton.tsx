"use client";

import { logout } from "@/lib/authClient";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <div className="flex" onClick={() => logout()}>
      <LogOut className="mr-2 size-5 text-red-500" />
      <p className="text-sm text-red-500">Logout</p>
    </div>
  );
}

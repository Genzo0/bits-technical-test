import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Ellipsis } from "lucide-react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "@/components/LogoutButton";

async function getChecklist() {
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) {
    redirect("/login");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/checklist`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );

  const { data } = await response.json();

  return data;
}

export default async function Page() {
  const checklist = await getChecklist();

  return (
    <MaxWidthWrapper className="space-y-6 py-16">
      <div className="flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis className="size-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </MaxWidthWrapper>
  );
}

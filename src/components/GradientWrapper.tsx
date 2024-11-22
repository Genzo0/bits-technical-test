import { cn } from "@/lib/utils";

interface GradientWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function GradientWrapper({
  children,
  className = "",
}: GradientWrapperProps) {
  return (
    <div
      className={cn("relative min-h-screen overflow-x-hidden p-4", className)}
    >
      {children}
    </div>
  );
}

import { cn } from "@/lib/utils";

interface MaxWidthWidthWrapperProps {
  className?: string;
  children: React.ReactNode;
}

export default function MaxWidthWrapper({
  className = "",
  children,
}: MaxWidthWidthWrapperProps) {
  return (
    <div className={cn("mx-auto max-w-7xl px-4 xl:px-10", className)}>
      {children}
    </div>
  );
}

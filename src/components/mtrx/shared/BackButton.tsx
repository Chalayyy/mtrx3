import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BackButtonProps {
  href?: string;
  children?: React.ReactNode;
  size?: "sm" | "default" | "lg";
}

export function BackButton({
  href = "/mtrcs",
  children = "Back to Mtrcs",
  size = "default"
}: BackButtonProps) {
  return (
    <Button size={size} asChild>
      <Link href={href}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {children}
      </Link>
    </Button>
  );
}

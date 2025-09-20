import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

interface HomeButtonProps {
  size?: "sm" | "default" | "lg";
  variant?: "outline" | "default" | "secondary" | "destructive" | "ghost" | "link";
}

export function HomeButton({
  size = "sm",
  variant = "outline"
}: HomeButtonProps) {
  return (
    <Button variant={variant} size={size} asChild>
      <Link href="/">
        <Home className="h-4 w-4 mr-2" />
        Home
      </Link>
    </Button>
  );
}

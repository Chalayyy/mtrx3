import { Home } from "lucide-react";
import Link from "next/link";

interface HomeButtonProps {
  // Optional: allow overriding the default positioning for special cases
  disablePositioning?: boolean;
}

export function HomeButton({
  disablePositioning = false
}: HomeButtonProps) {
  const buttonElement = (
    <Link
      href="/"
      className="inline-flex items-center justify-center bg-white/95 backdrop-blur-sm border rounded-md p-2.5 shadow-sm hover:bg-white transition-colors w-10 h-10"
    >
      <Home className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
    </Link>
  );

  // If positioning is disabled, return just the button
  if (disablePositioning) {
    return buttonElement;
  }

  // Default: return button with top-left positioning
  return (
    <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-10">
      {buttonElement}
    </div>
  );
}

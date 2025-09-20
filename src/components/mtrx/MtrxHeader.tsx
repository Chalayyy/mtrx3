import { Calendar } from "lucide-react";

interface MtrxHeaderProps {
  theme: string;
  date: string;
}

export function MtrxHeader({ theme, date }: MtrxHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8 text-center px-4">
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 leading-tight">{theme}</h1>
      <p className="text-muted-foreground flex items-center justify-center gap-1 text-sm sm:text-base">
        <Calendar className="h-4 w-4" />
        {date}
      </p>
    </div>
  );
}

import { Calendar } from "lucide-react";
import { BackButton } from "./shared/BackButton";

interface MtrxHeaderProps {
  theme: string;
  date: string;
}

export function MtrxHeader({ theme, date }: MtrxHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <BackButton size="sm" />
      <div className="h-6 w-px bg-border" />
      <div className='flex gap-2'>
        <h1 className="text-3xl font-bold">{theme}</h1>
        <p className="text-muted-foreground flex items-center gap-1 mt-1">
          <Calendar className="h-4 w-4" />
          {date}
        </p>
      </div>
    </div>
  );
}

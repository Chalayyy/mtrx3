import { BackButton } from "./shared/BackButton";
import { HomeButton } from "./shared/HomeButton";

interface FooterProps {
  mtrxDate: string;
}

export function Footer({ mtrxDate }: FooterProps) {
  return (
    <div className="mt-8 pt-8 border-t">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <BackButton/>
          <HomeButton size="default" />
        </div>
        <div className="text-sm text-muted-foreground">
          Mtrx ID: {mtrxDate}
        </div>
      </div>
    </div>
  );
}

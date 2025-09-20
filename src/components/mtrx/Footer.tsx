import { BackButton } from "./shared/BackButton";

interface FooterProps {
  mtrxDate: string;
}

export function Footer({ mtrxDate }: FooterProps) {
  return (
    <div className="mt-8 pt-8 border-t">
      <div className="flex justify-between items-center">
        <BackButton>Back to All Mtrcs</BackButton>
        <div className="text-sm text-muted-foreground">
          Mtrx ID: {mtrxDate}
        </div>
      </div>
    </div>
  );
}

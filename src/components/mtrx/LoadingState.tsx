import { Loader2 } from "lucide-react";
import { PageContainer } from "./shared/PageContainer";

export function LoadingState() {
  return (
    <PageContainer>
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    </PageContainer>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { PageContainer } from "./shared/PageContainer";
import { BackButton } from "./shared/BackButton";

interface ErrorStateProps {
  error: string;
}

export function ErrorState({ error }: ErrorStateProps) {
  return (
    <PageContainer>
      <Card className="text-center py-12 border-red-200 bg-red-50">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="text-xl text-red-900">
            {error}
          </CardTitle>
          <CardDescription className="text-red-700">
            The requested mtrx could not be found or loaded.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BackButton />
        </CardContent>
      </Card>
    </PageContainer>
  );
}

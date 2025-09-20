'use client';

import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useMtrx, useAnswerChecking, useWindowDimensions } from '@/hooks';
import {
  LoadingState,
  ErrorState,
  MtrxHeader,
  ClueRow,
  ResultsSummary,
  Footer,
  ConfettiWrapper
} from '@/components/mtrx';

export default function MtrxDetailPage() {
  const params = useParams();
  const date = params.date as string;

  const { mtrx, loading, error } = useMtrx(date);
  const windowDimensions = useWindowDimensions();

  const {
    answers,
    checkResults,
    hasChecked,
    attemptHistory,
    showConfetti,
    showHistory,
    handleAnswerChange,
    checkAnswers,
  } = useAnswerChecking(mtrx?.rows.length || 0);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !mtrx) {
    return <ErrorState error={error || 'Mtrx not found'} />;
  }

  return (
    <div className="container mx-auto p-4 sm:p-8 max-w-4xl">
      <ConfettiWrapper
        show={showConfetti}
        width={windowDimensions.width}
        height={windowDimensions.height}
      />

      <MtrxHeader theme={mtrx.theme} date={mtrx.date} />

      <Card className="mb-8">
        <CardContent className="space-y-3">
          {mtrx.rows.map((row, index) => (
            <div key={index}>
              <ClueRow
                clue={row.clue}
                answer={answers[index] || ''}
                onAnswerChange={(value) => handleAnswerChange(index, value)}
                hasChecked={hasChecked}
                isCorrect={checkResults[index]}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-center mb-8 px-4">
        <Button
          onClick={() => checkAnswers(mtrx.rows)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold w-full sm:w-auto"
          size="lg"
        >
          <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Check Answers
        </Button>
      </div>

      {hasChecked && (
        <ResultsSummary
          checkResults={checkResults}
          attemptHistory={attemptHistory}
          showHistory={showHistory}
          numQuestions={mtrx.rows.length}
        />
      )}

      <Footer mtrxDate={mtrx.date} />
    </div>
  );
}

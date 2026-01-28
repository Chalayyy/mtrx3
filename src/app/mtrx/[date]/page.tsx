'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle, Zap, Shield } from "lucide-react";
import { useMtrx, useAnswerChecking, useWindowDimensions } from '@/hooks';
import {
  LoadingState,
  ErrorState,
  MtrxHeader,
  ClueRow,
  ResultsSummary,
  Footer,
  ConfettiWrapper,
  HomeButton
} from '@/components/mtrx';

export default function MtrxDetailPage() {
  const params = useParams();
  const date = params.date as string;
  const [hardMode, setHardMode] = useState(false);

  const { mtrx, loading, error } = useMtrx(date);
  const windowDimensions = useWindowDimensions();

  // Set page title when mtrx data is loaded
  useEffect(() => {
    if (mtrx) {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      const isToday = mtrx.date === today;
      const title = isToday ? "Today's puzzle - MTRX" : `${mtrx.theme} - MTRX`;
      document.title = title;
    }
  }, [mtrx]);

  const {
    answers,
    checkResults,
    hasChecked,
    attemptHistory,
    showConfetti,
    showHistory,
    handleAnswerChange,
    checkAnswers,
  } = useAnswerChecking(mtrx?.rows.length || 0, hardMode);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !mtrx) {
    return <ErrorState error={error || 'Mtrx not found'} />;
  }

  return (
    <div className="container mx-auto p-4 sm:p-8 max-w-4xl relative">
      <ConfettiWrapper
        show={showConfetti}
        width={windowDimensions.width}
        height={windowDimensions.height}
      />

      <HomeButton />

      {/* Mode Toggle - Top Right */}
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10">
        <div className="bg-white/95 backdrop-blur-sm border rounded-md p-1 shadow-sm">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setHardMode(false)}
              className={`flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-xs transition-colors ${
                !hardMode
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-muted-foreground hover:bg-blue-50'
              }`}
            >
              <Shield className="h-2.5 w-2.5" />
              Std
            </button>
            <button
              onClick={() => setHardMode(true)}
              className={`flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-xs transition-colors ${
                hardMode
                  ? 'bg-orange-100 text-orange-700'
                  : 'text-muted-foreground hover:bg-orange-50'
              }`}
            >
              <Zap className="h-2.5 w-2.5" />
              Hard
            </button>
          </div>
        </div>
      </div>

      <MtrxHeader theme={mtrx.theme} date={mtrx.date} />

      <Card className="mb-8 mt-6">
        <CardContent className="space-y-3">
          {mtrx.rows.map((row, index) => (
            <div key={index}>
              <ClueRow
                clue={row.clue}
                answer={answers[index] || ''}
                onAnswerChange={(value) => handleAnswerChange(index, value)}
                hasChecked={hasChecked}
                isCorrect={checkResults[index]}
                hardMode={hardMode}
                prefix={row.prefix}
                suffix={row.suffix}
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
          hardMode={hardMode}
        />
      )}

      <Footer mtrxDate={mtrx.date} />
    </div>
  );
}

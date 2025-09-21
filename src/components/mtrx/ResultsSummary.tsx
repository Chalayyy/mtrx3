import { AttemptHistory } from './AttemptHistory';
import { AttemptRecord } from './shared/types';

interface ResultsSummaryProps {
  checkResults: boolean[];
  attemptHistory: AttemptRecord[];
  showHistory: boolean;
  numQuestions: number;
  hardMode?: boolean;
}

export function ResultsSummary({
  checkResults,
  attemptHistory,
  showHistory,
  numQuestions,
  hardMode = false
}: ResultsSummaryProps) {
  const correctCount = checkResults.filter(result => result).length;
  const isPerfect = checkResults.every(result => result);

  if (hardMode) {
    return (
      <div className="text-center mb-8">
        {isPerfect ? (
          <div>
            <p className="text-green-600 font-bold text-lg">🎉 Perfect! All answers are correct!</p>
            <p className="text-sm text-muted-foreground mt-1">Hard mode completed successfully!</p>

            {showHistory && attemptHistory.length > 0 && (
              <AttemptHistory
                attemptHistory={attemptHistory}
                numQuestions={numQuestions}
              />
            )}
          </div>
        ) : (
          <div>
            <p className="text-red-600 font-bold text-lg">❌ Not all answers are correct</p>
            <p className="text-sm text-muted-foreground mt-1">Keep trying! In hard mode, you only know if everything is right or wrong.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="text-center mb-8">
      <p className="text-lg font-medium">
        Score: {correctCount} / {checkResults.length}
      </p>
      {isPerfect && (
        <div>
          <p className="text-green-600 font-bold mt-2">🎉 Perfect! All answers are correct!</p>

          {showHistory && attemptHistory.length > 0 && (
            <AttemptHistory
              attemptHistory={attemptHistory}
              numQuestions={numQuestions}
            />
          )}
        </div>
      )}
    </div>
  );
}

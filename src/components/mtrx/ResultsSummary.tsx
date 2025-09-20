import { AttemptHistory } from './AttemptHistory';
import { AttemptRecord } from './shared/types';

interface ResultsSummaryProps {
  checkResults: boolean[];
  attemptHistory: AttemptRecord[];
  showHistory: boolean;
  numQuestions: number;
}

export function ResultsSummary({
  checkResults,
  attemptHistory,
  showHistory,
  numQuestions
}: ResultsSummaryProps) {
  const correctCount = checkResults.filter(result => result).length;
  const isPerfect = checkResults.every(result => result);

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

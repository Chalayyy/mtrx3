import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { AttemptRecord } from "./shared/types";
import { getResultColor } from "./shared/utils";

interface AttemptHistoryProps {
  attemptHistory: AttemptRecord[];
  numQuestions: number;
}

export function AttemptHistory({ attemptHistory, numQuestions }: AttemptHistoryProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyHistoryToClipboard = async () => {
    if (attemptHistory.length === 0) return;

    // Generate the text grid
    const textGrid = Array.from({ length: numQuestions }, (_, questionIndex) =>
      attemptHistory.map(attempt =>
        attempt.results[questionIndex] ? '🟩' : '🟥'
      ).join('')
    ).join('\n');

    try {
      await navigator.clipboard.writeText(textGrid);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div className="mt-4 flex flex-col items-center gap-3">
      <div className="inline-flex flex-col gap-1">
        {Array.from({ length: numQuestions }, (_, questionIndex) => (
          <div key={questionIndex} className="flex gap-1">
            {attemptHistory.map((attempt, attemptIndex) => (
              <div
                key={attemptIndex}
                className={`w-4 h-4 rounded-sm ${getResultColor(attempt.results[questionIndex])}`}
              />
            ))}
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={copyHistoryToClipboard}
        className="text-xs"
      >
        <Copy className="mr-1 h-3 w-3" />
        {copySuccess ? 'Copied!' : 'Copy'}
      </Button>
    </div>
  );
}

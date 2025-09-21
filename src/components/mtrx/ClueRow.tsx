import { Input } from "@/components/ui/input";
import { getInputStateClasses } from "./shared/utils";

interface ClueRowProps {
  clue: string;
  answer: string;
  onAnswerChange: (value: string) => void;
  hasChecked: boolean;
  isCorrect: boolean;
  hardMode?: boolean;
}

export function ClueRow({ clue, answer, onAnswerChange, hasChecked, isCorrect, hardMode = false }: ClueRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
      <p className="text-lg font-medium flex-1">
        {clue}
      </p>
      <div className="sm:w-64 sm:flex-shrink-0">
        <Input
          type="text"
          placeholder="Enter your answer..."
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          className={`w-full ${hardMode ? '' : getInputStateClasses(hasChecked, isCorrect)}`}
        />
      </div>

    </div>
  );
}

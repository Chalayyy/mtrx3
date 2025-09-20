import { Input } from "@/components/ui/input";
import { getInputStateClasses } from "./shared/utils";

interface ClueRowProps {
  clue: string;
  answer: string;
  onAnswerChange: (value: string) => void;
  hasChecked: boolean;
  isCorrect: boolean;
}

export function ClueRow({ clue, answer, onAnswerChange, hasChecked, isCorrect }: ClueRowProps) {
  return (
    <div className="flex items-center gap-40">
      <Input
        type="text"
        placeholder="Enter your answer..."
        value={answer}
        onChange={(e) => onAnswerChange(e.target.value)}
        className={`w-64 ${getInputStateClasses(hasChecked, isCorrect)}`}
      />
      <p className="text-lg font-medium flex-1">
        {clue}
      </p>
    </div>
  );
}

import { useRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { getInputStateClasses } from "./shared/utils";

interface ClueRowProps {
  clue: string;
  answer: string;
  onAnswerChange: (value: string) => void;
  hasChecked: boolean;
  isCorrect: boolean;
  hardMode?: boolean;
  prefix?: string;
  suffix?: string;
}

export function ClueRow({ clue, answer, onAnswerChange, hasChecked, isCorrect, hardMode = false, prefix, suffix }: ClueRowProps) {
  const measureRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState<number | null>(null);
  const hasAffixes = prefix || suffix;

  useEffect(() => {
    if (measureRef.current && hasAffixes && answer) {
      const textWidth = measureRef.current.offsetWidth;
      // Add padding (px-2 = 8px each side = 16px) plus extra buffer for letter rendering
      setInputWidth(Math.max(50, Math.min(220, textWidth + 24)));
    } else if (hasAffixes && !answer) {
      // Reset to full size when empty
      setInputWidth(null);
    }
  }, [answer, hasAffixes]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
      <p className="text-lg font-medium flex-1">
        {clue}
      </p>
      <div className="sm:flex-shrink-0 flex items-center">
        {/* Hidden span to measure text width */}
        {hasAffixes && (
          <span
            ref={measureRef}
            className="absolute invisible whitespace-pre text-base md:text-sm"
            aria-hidden="true"
          >
            {answer}
          </span>
        )}

        {prefix && (
          <span className="text-base md:text-sm text-foreground">{prefix}</span>
        )}
        <Input
          type="text"
          placeholder="Enter your answer..."
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          style={hasAffixes && inputWidth ? { width: `${inputWidth}px` } : undefined}
          className={`px-2 ${hasAffixes && inputWidth ? 'text-center' : 'w-full sm:w-48'} ${hardMode ? '' : getInputStateClasses(hasChecked, isCorrect)}`}
        />
        {suffix && (
          <span className="text-base md:text-sm text-foreground">{suffix}</span>
        )}
      </div>
    </div>
  );
}

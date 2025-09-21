'use client';

import { useState } from 'react';
import { AttemptRecord, MtrxRow } from '@/components/mtrx/shared/types';

interface UseAnswerCheckingReturn {
  answers: string[];
  checkResults: boolean[];
  hasChecked: boolean;
  attemptHistory: AttemptRecord[];
  showConfetti: boolean;
  showHistory: boolean;
  handleAnswerChange: (index: number, value: string) => void;
  checkAnswers: (rows: MtrxRow[]) => void;
  stopConfetti: () => void;
}

export function useAnswerChecking(numQuestions: number, hardMode: boolean = false): UseAnswerCheckingReturn {
  const [answers, setAnswers] = useState<string[]>(new Array(numQuestions).fill(''));
  const [checkResults, setCheckResults] = useState<boolean[]>([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [attemptHistory, setAttemptHistory] = useState<AttemptRecord[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const checkAnswers = (rows: MtrxRow[]) => {
    const results = rows.map((row, index) => {
      const userAnswer = answers[index]?.trim().toLowerCase() || '';
      const correctAnswer = row.solution.trim().toLowerCase();
      return userAnswer === correctAnswer;
    });

    // Save attempt to history
    const newAttempt: AttemptRecord = {
      attempt: attemptHistory.length + 1,
      results: [...results],
      answers: [...answers],
      timestamp: new Date(),
    };
    setAttemptHistory(prev => [...prev, newAttempt]);

    // In hard mode, don't show individual results until all are correct
    if (hardMode) {
      const allCorrect = results.every(result => result);
      setCheckResults(allCorrect ? results : new Array(results.length).fill(false));
    } else {
      setCheckResults(results);
    }

    setHasChecked(true);

    // Trigger confetti and show history if all answers are correct
    if (results.every(result => result)) {
      setShowConfetti(true);
      setShowHistory(true);
      // Stop confetti after 6 seconds
      setTimeout(() => setShowConfetti(false), 6000);
    }
  };

  const stopConfetti = () => {
    setShowConfetti(false);
  };

  return {
    answers,
    checkResults,
    hasChecked,
    attemptHistory,
    showConfetti,
    showHistory,
    handleAnswerChange,
    checkAnswers,
    stopConfetti,
  };
}

export const getInputStateClasses = (hasChecked: boolean, isCorrect: boolean) => {
  if (!hasChecked) return '';
  return isCorrect
    ? 'border-green-500 bg-green-50'
    : 'border-red-500 bg-red-50';
};

export const getResultColor = (isCorrect: boolean) => {
  return isCorrect ? 'bg-green-500' : 'bg-red-500';
};

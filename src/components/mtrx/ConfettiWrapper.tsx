import Confetti from 'react-confetti';

interface ConfettiWrapperProps {
  show: boolean;
  width: number;
  height: number;
}

export function ConfettiWrapper({ show, width, height }: ConfettiWrapperProps) {
  if (!show) return null;

  return (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      gravity={0.4}
      numberOfPieces={4000}
    />
  );
}

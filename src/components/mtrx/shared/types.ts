export interface AttemptRecord {
  attempt: number;
  results: boolean[];
  answers: string[];
  timestamp: Date;
}

export interface MtrxRow {
  clue: string;
  solution: string;
}

export interface Mtrx {
  date: string;
  theme: string;
  rows: MtrxRow[];
}

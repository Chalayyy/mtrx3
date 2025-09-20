'use client';

import { useState, useEffect } from 'react';
import { Mtrx } from '@/components/mtrx/shared/types';

interface UseMtrxReturn {
  mtrx: Mtrx | null;
  loading: boolean;
  error: string | null;
}

export function useMtrx(date: string): UseMtrxReturn {
  const [mtrx, setMtrx] = useState<Mtrx | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMtrx = async () => {
      try {
        const response = await fetch(`/api/mtrcs/${encodeURIComponent(date)}`);

        if (response.ok) {
          const data = await response.json();
          setMtrx(data);
        } else if (response.status === 404) {
          setError('Mtrx not found');
        } else {
          setError('Failed to load mtrx');
        }
      } catch {
        setError('Failed to load mtrx');
      } finally {
        setLoading(false);
      }
    };

    if (date) {
      fetchMtrx();
    }
  }, [date]);

  return { mtrx, loading, error };
}

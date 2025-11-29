import { useState, useCallback } from 'react';
import { generateHash, verifyHash, HashAlgorithm, HashResult, VerificationResult } from '@/lib/hashUtils';

export interface UseHashGeneratorState {
  input: string;
  selectedAlgorithm: HashAlgorithm;
  hashResult: HashResult | null;
  verificationResult: VerificationResult | null;
  isLoading: boolean;
  error: string | null;
}

export interface UseHashGeneratorActions {
  setInput: (input: string) => void;
  setSelectedAlgorithm: (algorithm: HashAlgorithm) => void;
  generateCurrentHash: () => Promise<void>;
  verifyCurrentHash: (providedHash: string) => Promise<void>;
  clearResults: () => void;
  clearError: () => void;
}

export function useHashGenerator(initialAlgorithm: HashAlgorithm = 'SHA-256'): UseHashGeneratorState & UseHashGeneratorActions {
  const [input, setInput] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<HashAlgorithm>(initialAlgorithm);
  const [hashResult, setHashResult] = useState<HashResult | null>(null);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateCurrentHash = useCallback(async () => {
    if (!input.trim()) {
      setError('Please enter text to hash');
      return;
    }

    setIsLoading(true);
    setError(null);
    setVerificationResult(null);

    try {
      const result = await generateHash(input, selectedAlgorithm);
      setHashResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate hash');
      setHashResult(null);
    } finally {
      setIsLoading(false);
    }
  }, [input, selectedAlgorithm]);

  const verifyCurrentHash = useCallback(async (providedHash: string) => {
    if (!input.trim()) {
      setError('Please enter text to verify');
      return;
    }

    if (!providedHash.trim()) {
      setError('Please enter a hash to verify');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await verifyHash(input, providedHash, selectedAlgorithm);
      setVerificationResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify hash');
      setVerificationResult(null);
    } finally {
      setIsLoading(false);
    }
  }, [input, selectedAlgorithm]);

  const clearResults = useCallback(() => {
    setHashResult(null);
    setVerificationResult(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    input,
    selectedAlgorithm,
    hashResult,
    verificationResult,
    isLoading,
    error,
    setInput,
    setSelectedAlgorithm,
    generateCurrentHash,
    verifyCurrentHash,
    clearResults,
    clearError,
  };
}

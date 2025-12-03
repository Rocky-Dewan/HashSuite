/**
 * Hash utilities for generating and verifying cryptographic hashes
 * All operations are performed client-side using Web Crypto API and crypto-js
 */

import SHA3 from "crypto-js/sha3";
import encHex from "crypto-js/enc-hex";
import { blake2b } from "blakejs";


export type HashAlgorithm = 'SHA-256' | 'SHA-512' | 'SHA3-256' | 'BLAKE2b';

export interface HashResult {
  algorithm: HashAlgorithm;
  hash: string;
  input: string;
  timestamp: number;
}

export interface VerificationResult {
  algorithm: HashAlgorithm;
  isMatch: boolean;
  input: string;
  providedHash: string;
  computedHash: string;
  timestamp: number;
}

/**
 * Convert ArrayBuffer to hexadecimal string
 */
function bufferToHex(buffer: ArrayBuffer): string {
  const hashArray = Array.from(new Uint8Array(buffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Generate SHA-256 hash using Web Crypto API
 */
async function generateSHA256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return bufferToHex(hashBuffer);
}

/**
 * Generate SHA-512 hash using Web Crypto API
 */
async function generateSHA512(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-512', data);
  return bufferToHex(hashBuffer);
}

/**
 * Generate SHA3-256 hash using crypto-js
 */
function generateSHA3256(input: string): string {
  try {
    const hash = SHA3(input, { outputLength: 256 });
    return hash.toString(encHex);
  } catch (error) {
    throw new Error(
      `Failed to generate SHA3-256 hash: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Generate BLAKE2b hash using blakejs (browser-safe)
 */
function generateBLAKE2b(input: string): string {
  try {
    const encoded = new TextEncoder().encode(input);
    const hash = blake2b(encoded, null, 64); // 64 bytes = 512-bit
    return Array.from(hash)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch (error) {
    throw new Error(
      `Failed to generate BLAKE2b hash: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Generate hash for the specified algorithm
 */
export async function generateHash(input: string, algorithm: HashAlgorithm): Promise<HashResult> {
  let hash: string;

  switch (algorithm) {
    case 'SHA-256':
      hash = await generateSHA256(input);
      break;
    case 'SHA-512':
      hash = await generateSHA512(input);
      break;
    case 'SHA3-256':
      hash = generateSHA3256(input);
      break;
    case 'BLAKE2b':
      hash = generateBLAKE2b(input);
      break;
    default:
      throw new Error(`Unknown algorithm: ${algorithm}`);
  }

  return {
    algorithm,
    hash,
    input,
    timestamp: Date.now(),
  };
}

/**
 * Verify if a provided hash matches the computed hash of the input
 */
export async function verifyHash(
  input: string,
  providedHash: string,
  algorithm: HashAlgorithm
): Promise<VerificationResult> {
  const result = await generateHash(input, algorithm);
  const computedHash = result.hash.toLowerCase();
  const normalizedProvidedHash = providedHash.toLowerCase().trim();

  return {
    algorithm,
    isMatch: computedHash === normalizedProvidedHash,
    input,
    providedHash: normalizedProvidedHash,
    computedHash,
    timestamp: Date.now(),
  };
}

/**
 * Get algorithm information and security details
 */
export interface AlgorithmInfo {
  name: HashAlgorithm;
  displayName: string;
  description: string;
  outputLength: number;
  securityLevel: 'High' | 'Very High' | 'Excellent';
  useCase: string;
  color: string;
  icon: string;
}

export const ALGORITHM_INFO: Record<HashAlgorithm, AlgorithmInfo> = {
  'SHA-256': {
    name: 'SHA-256',
    displayName: 'SHA-256',
    description: 'Secure Hash Algorithm 2 (256-bit). Industry standard widely adopted for digital signatures and certificates.',
    outputLength: 256,
    securityLevel: 'Very High',
    useCase: 'Digital signatures, SSL/TLS certificates, blockchain (Bitcoin)',
    color: 'blue',
    icon: '🔐',
  },
  'SHA-512': {
    name: 'SHA-512',
    displayName: 'SHA-512',
    description: 'Secure Hash Algorithm 2 (512-bit). Enhanced security with larger output size, suitable for long-term security.',
    outputLength: 512,
    securityLevel: 'Excellent',
    useCase: 'Long-term archival, high-security applications, password hashing',
    color: 'purple',
    icon: '🛡️',
  },
  'SHA3-256': {
    name: 'SHA3-256',
    displayName: 'SHA3-256',
    description: 'SHA-3 (256-bit). Newer algorithm with different design, resistant to potential future attacks on SHA-2.',
    outputLength: 256,
    securityLevel: 'Excellent',
    useCase: 'Modern cryptographic applications, quantum-resistant hashing, NIST standard',
    color: 'green',
    icon: '🔏',
  },
  'BLAKE2b': {
    name: 'BLAKE2b',
    displayName: 'BLAKE2b',
    description: 'BLAKE2b (512-bit). High-performance secure algorithm, faster than MD5, SHA-2, and SHA-3 while being at least as secure as SHA-3.',
    outputLength: 512,
    securityLevel: 'Excellent',
    useCase: 'High-performance hashing, file integrity, password hashing, real-time applications',
    color: 'orange',
    icon: '🔒',
  },
};

export const ALGORITHMS: HashAlgorithm[] = ['SHA-256', 'SHA-512', 'SHA3-256', 'BLAKE2b'];

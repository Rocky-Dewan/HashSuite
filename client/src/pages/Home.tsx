import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HashCard } from '@/components/HashCard';
import { useHashGenerator } from '@/hooks/useHashGenerator';
import { ALGORITHM_INFO, ALGORITHMS, HashAlgorithm } from '@/lib/hashUtils';
import { Shield, Info } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<HashAlgorithm>('SHA-256');

  // Create a separate hook for each algorithm to manage independent state
  const sha256 = useHashGenerator('SHA-256');
  const sha512 = useHashGenerator('SHA-512');
  const sha3256 = useHashGenerator('SHA3-256');
  const blake2b = useHashGenerator('BLAKE2b');

  const hookMap = {
    'SHA-256': sha256,
    'SHA-512': sha512,
    'SHA3-256': sha3256,
    'BLAKE2b': blake2b,
  };

  const currentHook = hookMap[activeTab];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-10">
        <div className="container py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">HashSuite</h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Professional hash generation and verification tool. All processing happens in your browser—your data never leaves your device.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* Security Notice */}
        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg flex gap-3">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900 dark:text-blue-100">
            <p className="font-semibold mb-1">🔒 Security & Privacy</p>
            <p>
              HashSuite uses industry-standard cryptographic algorithms to generate and verify hashes. All processing is done entirely in your browser using the Web Crypto API. No data is sent to any server, ensuring complete privacy and security.
            </p>
          </div>
        </div>

        {/* Algorithm Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as HashAlgorithm)} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            {ALGORITHMS.map((algo) => (
              <TabsTrigger key={algo} value={algo} className="text-sm">
                {algo}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Contents */}
          {ALGORITHMS.map((algo) => (
            <TabsContent key={algo} value={algo} className="space-y-6">
              <HashCard
                algorithm={algo}
                algorithmInfo={ALGORITHM_INFO[algo]}
                input={hookMap[algo].input}
                onInputChange={hookMap[algo].setInput}
                onGenerate={hookMap[algo].generateCurrentHash}
                onVerify={hookMap[algo].verifyCurrentHash}
                hashResult={hookMap[algo].hashResult?.hash || null}
                verificationResult={
                  hookMap[algo].verificationResult
                    ? {
                      isMatch: hookMap[algo].verificationResult!.isMatch,
                      computedHash: hookMap[algo].verificationResult!.computedHash,
                    }
                    : null
                }
                isLoading={hookMap[algo].isLoading}
                error={hookMap[algo].error}
              />
            </TabsContent>
          ))}
        </Tabs>

        {/* Algorithm Comparison */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ALGORITHMS.map((algo) => {
            const info = ALGORITHM_INFO[algo];
            const colorClasses = {
              blue: 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950',
              purple: 'border-purple-200 bg-purple-50 dark:border-purple-900 dark:bg-purple-950',
              green: 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950',
              orange: 'border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950',
            };

            return (
              <div
                key={algo}
                className={`p-4 rounded-lg border-2 ${colorClasses[info.color as keyof typeof colorClasses]}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{info.icon}</span>
                  <h3 className="font-semibold">{info.displayName}</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Output</p>
                    <p className="font-mono">{info.outputLength} bits</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Security</p>
                    <p className="font-semibold">{info.securityLevel}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Information */}
        <div className="mt-12 p-6 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-semibold mb-4">Algorithm Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span>🔐</span> SHA-256 & SHA-512
              </h3>
              <p className="text-muted-foreground">
                Part of the SHA-2 family, these are the industry standard for digital signatures, SSL/TLS certificates, and blockchain applications. SHA-512 provides enhanced security with a larger output.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span>✨</span> SHA3-256
              </h3>
              <p className="text-muted-foreground">
                The newest member of the SHA family, approved by NIST as a standard. Offers different design principles and is considered resistant to potential future attacks on SHA-2.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span>⚡</span> BLAKE2b
              </h3>
              <p className="text-muted-foreground">
                A high-performance cryptographic hash function that is faster than MD5, SHA-2, and SHA-3 while being at least as secure as SHA-3. Ideal for performance-critical applications.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span>🛡️</span> Why These Algorithms?
              </h3>
              <p className="text-muted-foreground">
                We selected only the most secure and widely adopted algorithms. SHA-1 and MD5 are excluded as they are cryptographically broken and should not be used for further use.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      {/* Footer */}
      <footer className="mt-12">
        <div
          className="container py-6 text-center text-sm 
               bg-blue/10 backdrop-blur-md 
               border-t border-gray-200 
               text-gray-800 shadow-lg"
        >
          <p>HashSuite © 2025 • All processing happens in your browser • No data is sent to any server</p>
          <p>
            Developed by
            <a href="https://github.com/Rocky-Dewan" className="text-blue-600 hover:text-blue-800 underline ml-1">
              Rocky Dewan
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

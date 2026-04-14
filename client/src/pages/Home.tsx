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
            Hash generation and verification tool.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">

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
      </main>

      <footer className="mt-12 glass-footer">
        <div className="container py-6 text-center text-sm text-gray-800">
          <p>HashSuite © 2026 • All processing happens in your browser • No data is sent to any server</p>
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

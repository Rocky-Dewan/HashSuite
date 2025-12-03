import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { AlertCircle, CheckCircle, XCircle, Copy, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { HashAlgorithm, AlgorithmInfo } from '@/lib/hashUtils';

interface HashCardProps {
  algorithm: HashAlgorithm;
  algorithmInfo: AlgorithmInfo;
  input: string;
  onInputChange: (value: string) => void;
  onGenerate: () => Promise<void>;
  onVerify: (hash: string) => Promise<void>;
  hashResult: string | null;
  verificationResult: { isMatch: boolean; computedHash: string } | null;
  isLoading: boolean;
  error: string | null;
}

export function HashCard({
  algorithm,
  algorithmInfo,
  input,
  onInputChange,
  onGenerate,
  onVerify,
  hashResult,
  verificationResult,
  isLoading,
  error,
}: HashCardProps) {
  const [verifyInput, setVerifyInput] = useState('');
  const [mode, setMode] = useState<'generate' | 'verify'>('generate');

  const colorClasses = {
    blue: 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950',
    purple: 'border-purple-200 bg-purple-50 dark:border-purple-900 dark:bg-purple-950',
    green: 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950',
    orange: 'border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950',
  };

  const buttonColorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700 text-white',
    purple: 'bg-purple-600 hover:bg-purple-700 text-white',
    green: 'bg-green-600 hover:bg-green-700 text-white',
    orange: 'bg-orange-600 hover:bg-orange-700 text-white',
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const handleVerify = async () => {
    await onVerify(verifyInput);
  };

  return (
    <Card className={`border-2 ${colorClasses[algorithmInfo.color as keyof typeof colorClasses]}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span>{algorithmInfo.icon}</span>
              {algorithmInfo.displayName}
            </CardTitle>
            <CardDescription className="mt-2">{algorithmInfo.description}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Algorithm Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Output Length</p>
            <p className="font-semibold">{algorithmInfo.outputLength} bits</p>
          </div>
          <div>
            <p className="text-muted-foreground">Security Level</p>
            <p className="font-semibold">{algorithmInfo.securityLevel}</p>
          </div>
          <div className="col-span-2">
            <p className="text-muted-foreground">Use Case</p>
            <p className="font-semibold text-xs">{algorithmInfo.useCase}</p>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2">
          <Button
            variant={mode === 'generate' ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setMode('generate');
              setVerifyInput('');
            }}
            className={mode === 'generate' ? buttonColorClasses[algorithmInfo.color as keyof typeof buttonColorClasses] : ''}
          >
            Generate
          </Button>
          <Button
            variant={mode === 'verify' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('verify')}
            className={mode === 'verify' ? buttonColorClasses[algorithmInfo.color as keyof typeof buttonColorClasses] : ''}
          >
            Verify
          </Button>
        </div>

        {/* Input Textarea */}
        <div>
          <label className="text-sm font-medium mb-2 block">Text Input</label>
          <Textarea
            placeholder="Enter text to hash..."
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            className="min-h-24 resize-none"
            disabled={isLoading}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 rounded-md">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Generate Mode */}
        {mode === 'generate' && (
          <>
            <Button
              onClick={onGenerate}
              disabled={isLoading || !input.trim()}
              className={`w-full ${buttonColorClasses[algorithmInfo.color as keyof typeof buttonColorClasses]}`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Hash'
              )}
            </Button>

            {hashResult && (
              <div className="space-y-2">
                <label className="text-sm font-medium block">Generated Hash</label>
                <div className="flex gap-2">
                  <Input
                    value={hashResult}
                    readOnly
                    className="font-mono text-xs"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(hashResult, 'Hash')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Verify Mode */}
        {mode === 'verify' && (
          <>
            <div>
              <label className="text-sm font-medium mb-2 block">Hash to Verify</label>
              <Textarea
                placeholder="Enter the hash to verify..."
                value={verifyInput}
                onChange={(e) => setVerifyInput(e.target.value)}
                className="min-h-20 resize-none font-mono text-xs"
                disabled={isLoading}
              />
            </div>

            <Button
              onClick={handleVerify}
              disabled={isLoading || !input.trim() || !verifyInput.trim()}
              className={`w-full ${buttonColorClasses[algorithmInfo.color as keyof typeof buttonColorClasses]}`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify Hash'
              )}
            </Button>

            {verificationResult && (
              <div className={`p-4 rounded-md border-2 ${verificationResult.isMatch ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900' : 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-900'}`}>
                <div className="flex items-start gap-2">
                  {verificationResult.isMatch ? (
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className={`font-semibold ${verificationResult.isMatch ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                      {verificationResult.isMatch ? 'Hash Match!' : 'Hash Mismatch'}
                    </p>
                    <p className={`text-sm mt-1 ${verificationResult.isMatch ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {verificationResult.isMatch
                        ? 'The provided hash matches the computed hash of the input text.'
                        : 'The provided hash does not match the computed hash of the input text.'}
                    </p>
                    <div className="mt-3 space-y-1">
                      <div className="flex gap-2">
                        <span className="text-xs text-muted-foreground">Computed:</span>
                        <code className="text-xs font-mono flex-1 break-all">{verificationResult.computedHash}</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

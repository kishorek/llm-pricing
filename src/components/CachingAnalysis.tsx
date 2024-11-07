import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export function CachingAnalysis() {
  const [requestCount, setRequestCount] = useState(1000);
  const [cacheHitRate, setCacheHitRate] = useState(70);
  const [averageTokens, setAverageTokens] = useState(1000);
  const [selectedModel, setSelectedModel] = useState('gpt-4-1106-preview');

  const modelPrices = {
    'gpt-4-1106-preview': { input: 0.01, output: 0.03 },
    'gpt-4': { input: 0.03, output: 0.06 },
    'gpt-3.5-turbo-1106': { input: 0.001, output: 0.002 },
    'claude-2.1': { input: 0.008, output: 0.024 },
  };

  const calculateSavings = () => {
    const price = modelPrices[selectedModel as keyof typeof modelPrices];
    const tokensPerRequest = averageTokens * 2;
    const totalRequests = requestCount;
    const cachedRequests = Math.floor((requestCount * cacheHitRate) / 100);
    const uncachedRequests = totalRequests - cachedRequests;

    const costWithoutCache =
      ((price.input + price.output) * tokensPerRequest * totalRequests) / 1000;
    const costWithCache =
      ((price.input + price.output) * tokensPerRequest * uncachedRequests) / 1000;

    return {
      withoutCache: costWithoutCache,
      withCache: costWithCache,
      savings: costWithoutCache - costWithCache,
      requestsSaved: cachedRequests,
    };
  };

  const savings = calculateSavings();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-300">Total Requests</span>
            <input
              type="number"
              min="0"
              value={requestCount}
              onChange={(e) => setRequestCount(Math.max(0, Number(e.target.value)))}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white p-2"
            />
          </label>
          <label className="block">
            <span className="text-gray-300">Cache Hit Rate (%)</span>
            <input
              type="number"
              min="0"
              max="100"
              value={cacheHitRate}
              onChange={(e) => setCacheHitRate(Math.min(100, Math.max(0, Number(e.target.value))))}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white p-2"
            />
          </label>
        </div>
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-300">Average Tokens per Request</span>
            <input
              type="number"
              min="0"
              value={averageTokens}
              onChange={(e) => setAverageTokens(Math.max(0, Number(e.target.value)))}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white p-2"
            />
          </label>
          <label className="block">
            <span className="text-gray-300">Model</span>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white p-2"
            >
              <option value="gpt-4-1106-preview">GPT-4 Turbo</option>
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-3.5-turbo-1106">GPT-3.5 Turbo</option>
              <option value="claude-2.1">Claude 2.1</option>
            </select>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Cost Without Cache</h3>
          <p className="text-2xl font-bold text-red-400">
            ${savings.withoutCache.toFixed(2)}
          </p>
        </div>
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Cost With Cache</h3>
          <p className="text-2xl font-bold text-green-400">
            ${savings.withCache.toFixed(2)}
          </p>
        </div>
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Total Savings</h3>
          <p className="text-2xl font-bold text-blue-400">
            ${savings.savings.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-gray-700 rounded-lg p-4">
        <div className="flex items-center mb-4">
          <RefreshCw className="h-5 w-5 mr-2 text-blue-400" />
          <h3 className="text-lg font-medium">Caching Impact</h3>
        </div>
        <div className="space-y-2 text-gray-300">
          <p>• Requests Saved: {savings.requestsSaved.toLocaleString()}</p>
          <p>
            • Cost Reduction:{' '}
            {((savings.savings / savings.withoutCache) * 100).toFixed(1)}%
          </p>
          <p>
            • Monthly Savings: ${(savings.savings * 30).toFixed(2)} (projected)
          </p>
        </div>
      </div>
    </div>
  );
}
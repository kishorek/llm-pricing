import React from 'react';

interface TokenInputsProps {
  tokenCount: number;
  setTokenCount: (count: number) => void;
  occurrences: number;
  setOccurrences: (count: number) => void;
}

export function TokenInputs({
  tokenCount,
  setTokenCount,
  occurrences,
  setOccurrences,
}: TokenInputsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <label htmlFor="tokenCount" className="block text-sm font-medium text-gray-300">
          Token Count
        </label>
        <input
          id="tokenCount"
          type="number"
          min="1"
          value={tokenCount}
          onChange={(e) => setTokenCount(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
        />
        <p className="text-xs text-gray-400">Number of tokens per request</p>
      </div>
      <div className="space-y-2">
        <label htmlFor="occurrences" className="block text-sm font-medium text-gray-300">
          Monthly Requests
        </label>
        <input
          id="occurrences"
          type="number"
          min="1"
          value={occurrences}
          onChange={(e) => setOccurrences(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
        />
        <p className="text-xs text-gray-400">Number of requests per month</p>
      </div>
    </div>
  );
}
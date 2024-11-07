import React, { useState } from 'react';

export function TokenCalculator() {
  const [text, setText] = useState('');

  const estimateTokens = (text: string) => {
    return Math.ceil(text.length / 4);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-300 mb-2">Enter text to analyze</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-40 rounded-lg bg-gray-700 border-gray-600 text-white p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your text here..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Estimated Tokens</h3>
          <p className="text-2xl font-bold text-blue-400">
            {estimateTokens(text).toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Character Count</h3>
          <p className="text-2xl font-bold text-blue-400">
            {text.length.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Word Count</h3>
          <p className="text-2xl font-bold text-blue-400">
            {text.trim() ? text.trim().split(/\s+/).length.toLocaleString() : '0'}
          </p>
        </div>
      </div>

      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-2">Token Calculation Notes</h3>
        <ul className="space-y-2 text-gray-300">
          <li>• This is an estimation - actual tokens may vary by model</li>
          <li>• Special tokens and non-English characters may affect count</li>
          <li>• GPT models typically use byte-pair encoding</li>
          <li>• Different models may tokenize text differently</li>
        </ul>
      </div>
    </div>
  );
}
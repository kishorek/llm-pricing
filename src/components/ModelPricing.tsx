import React, { useState, useEffect } from 'react';
import { ModelPrice } from '../types/models';
import { PricingTable } from './PricingTable';
import { TokenInputs } from './TokenInputs';
import { CostSavingTips } from './CostSavingTips';
import { AlertCircle } from 'lucide-react';

// Sample pricing data as fallback
const FALLBACK_DATA: Record<string, ModelPrice> = {
  'gpt-4': { input: 0.03, output: 0.06, context_window: 8192 },
  'gpt-4-32k': { input: 0.06, output: 0.12, context_window: 32768 },
  'gpt-3.5-turbo': { input: 0.0015, output: 0.002, context_window: 4096 },
  'claude-2': { input: 0.008, output: 0.024, context_window: 100000 },
};

export function ModelPricing() {
  const [models, setModels] =
    useState<Record<string, ModelPrice>>(FALLBACK_DATA);
  const [tokenCount, setTokenCount] = useState(1000);
  const [occurrences, setOccurrences] = useState(1000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/BerriAI/litellm/main/model_prices_and_context_window.json'
        );
        if (!response.ok) throw new Error('Failed to fetch model prices');

        const data = await response.json();
        console.log(data);
        const content = JSON.parse(atob(data.content));

        const processedModels: Record<string, ModelPrice> = {};
        Object.entries(content).forEach(([key, value]: [string, any]) => {
          if (value && typeof value === 'object') {
            const input = parseFloat(value.input);
            const output = parseFloat(value.output);
            const context_window = value.context_window
              ? parseInt(value.context_window)
              : undefined;

            if (!isNaN(input) && !isNaN(output)) {
              processedModels[key] = {
                input,
                output,
                context_window: !isNaN(context_window)
                  ? context_window
                  : undefined,
              };
            }
          }
        });

        if (Object.keys(processedModels).length > 0) {
          setModels(processedModels);
        }
      } catch (err) {
        console.error('Error fetching model prices:', err);
        // Using fallback data instead of showing error
        setModels(FALLBACK_DATA);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">LLM Model Pricing Calculator</h1>
          <p className="text-gray-400">
            Compare pricing across different language models and estimate your
            costs
          </p>
        </div>

        <div className="space-y-8">
          <TokenInputs
            tokenCount={tokenCount}
            setTokenCount={setTokenCount}
            occurrences={occurrences}
            setOccurrences={setOccurrences}
          />

          <PricingTable
            models={models}
            tokenCount={tokenCount}
            occurrences={occurrences}
          />

          <CostSavingTips />
        </div>
      </div>
    </div>
  );
}

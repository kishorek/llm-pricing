import React from 'react';
import { ModelPrice } from '../types/models';

interface PricingTableProps {
  models: Record<string, ModelPrice>;
  tokenCount: number;
  occurrences: number;
}

export function PricingTable({ models, tokenCount, occurrences }: PricingTableProps) {
  const calculateCost = (inputPrice: number, outputPrice: number) => {
    const inputCost = (tokenCount * inputPrice * occurrences) / 1000;
    const outputCost = (tokenCount * outputPrice * occurrences) / 1000;
    return { inputCost, outputCost, total: inputCost + outputCost };
  };

  const sortedModels = Object.entries(models).sort(([aName], [bName]) => aName.localeCompare(bName));

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Model
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Context Window
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Input Cost (per 1K tokens)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Output Cost (per 1K tokens)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Total Cost
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-700">
          {sortedModels.map(([modelName, model]) => {
            const costs = calculateCost(model.input, model.output);
            return (
              <tr key={modelName} className="hover:bg-gray-800 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {modelName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {model.context_window?.toLocaleString() || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  ${model.input.toFixed(4)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  ${model.output.toFixed(4)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  ${costs.total.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
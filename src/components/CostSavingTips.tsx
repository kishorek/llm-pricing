import React from 'react';
import { Lightbulb } from 'lucide-react';

export function CostSavingTips() {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-2 text-yellow-400">
        <Lightbulb className="h-5 w-5" />
        <h3 className="font-semibold">Cost Saving Tips</h3>
      </div>
      <ul className="space-y-2 text-gray-300 text-sm">
        <li>• Enable prompt caching to avoid redundant API calls</li>
        <li>• Use shorter, more focused prompts to reduce token count</li>
        <li>• Implement rate limiting to prevent accidental overuse</li>
        <li>• Consider batching similar requests together</li>
        <li>• Monitor and optimize prompt length regularly</li>
      </ul>
    </div>
  );
}
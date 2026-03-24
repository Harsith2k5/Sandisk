import { Brain, Lightbulb } from 'lucide-react';

interface AIInsightsProps {
  insights: string[];
}

export default function AIInsights({ insights }: AIInsightsProps) {
  return (
    <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="w-5 h-5 text-[#E60023]" />
        <h2 className="text-lg font-semibold text-white">AI Insights & Recommendations</h2>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="flex gap-4 p-4 bg-gradient-to-r from-[#1A1A1A] to-transparent rounded-xl border border-[#2A2A2A] hover:border-[#3A3A3A] transition-all group"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-[#E60023]/10 rounded-lg flex items-center justify-center group-hover:bg-[#E60023]/20 transition-colors">
              <Lightbulb className="w-4 h-4 text-[#E60023]" />
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{insight}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-[#2A2A2A]">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">Powered by Neural Pattern Recognition v3.2</p>
          <button className="text-xs text-[#E60023] hover:text-[#CC0020] font-medium transition-colors">
            View Detailed Analysis
          </button>
        </div>
      </div>
    </div>
  );
}

import { AlertCircle, ChevronRight } from 'lucide-react';
import { RootCause } from '../types';

interface RootCauseAnalysisProps {
  rootCause: RootCause | null;
}

export default function RootCauseAnalysis({ rootCause }: RootCauseAnalysisProps) {
  if (!rootCause) {
    return (
      <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-[#E60023]" />
          <h2 className="text-lg font-semibold text-white">Root Cause Analysis</h2>
        </div>
        <p className="text-sm text-gray-400">Awaiting analysis...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <AlertCircle className="w-5 h-5 text-[#E60023]" />
        <h2 className="text-lg font-semibold text-white">Root Cause Analysis</h2>
      </div>

      <div className="bg-gradient-to-br from-[#E60023]/10 to-transparent border border-[#E60023]/20 rounded-xl p-5 mb-4">
        <p className="text-xs text-gray-400 mb-2">Primary Cause</p>
        <h3 className="text-lg font-semibold text-white mb-3">{rootCause.primary.cause}</h3>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-[#0A0A0A] rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-[#E60023] rounded-full"
              style={{ width: `${rootCause.primary.confidence * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium text-[#E60023]">
            {(rootCause.primary.confidence * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      <div>
        <p className="text-xs text-gray-400 mb-3">Alternative Causes</p>
        <div className="space-y-2">
          {rootCause.alternatives.map((alt, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-[#1A1A1A] hover:bg-[#1A1A1A]/80 rounded-lg border border-[#2A2A2A] transition-all cursor-pointer group"
            >
              <div className="flex-1">
                <p className="text-sm text-gray-300">{alt.cause}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">
                  {(alt.confidence * 100).toFixed(0)}%
                </span>
                <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

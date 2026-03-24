import { DollarSign, TrendingDown } from 'lucide-react';
import { YieldData } from '../types';

interface YieldImpactProps {
  yieldData: YieldData | null;
}

export default function YieldImpact({ yieldData }: YieldImpactProps) {
  if (!yieldData) {
    return (
      <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown className="w-5 h-5 text-[#E60023]" />
          <h2 className="text-lg font-semibold text-white">Yield Impact</h2>
        </div>
        <p className="text-sm text-gray-400">Awaiting analysis...</p>
      </div>
    );
  }

  const yieldPercentage = ((yieldData.totalDies - yieldData.failedDies) / yieldData.totalDies) * 100;

  return (
    <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingDown className="w-5 h-5 text-[#E60023]" />
        <h2 className="text-lg font-semibold text-white">Yield Impact</h2>
      </div>

      <div className="space-y-4">
        <div className="bg-[#1A1A1A] rounded-xl p-5 border border-[#2A2A2A]">
          <p className="text-xs text-gray-400 mb-2">Failed Dies</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{yieldData.failedDies}</span>
            <span className="text-sm text-gray-500">/ {yieldData.totalDies} total</span>
          </div>
          <div className="mt-3 w-full bg-[#0A0A0A] rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#E60023] to-[#FFD166] rounded-full"
              style={{ width: `${(yieldData.failedDies / yieldData.totalDies) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#E60023]/10 to-transparent border border-[#E60023]/20 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-[#E60023]" />
            <p className="text-xs text-gray-400">Estimated Revenue Loss</p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-[#E60023]">
              ${(yieldData.revenueLoss / 1000).toFixed(1)}K
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1A1A1A] rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-1">Current Yield</p>
            <p className="text-xl font-bold text-white">{yieldPercentage.toFixed(1)}%</p>
          </div>
          <div className="bg-[#1A1A1A] rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-1">Target Yield</p>
            <p className="text-xl font-bold text-[#00E5A8]">95.0%</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[#2A2A2A]">
        <p className="text-xs text-gray-400 mb-2">Cost per Die: $8.50</p>
      </div>
    </div>
  );
}

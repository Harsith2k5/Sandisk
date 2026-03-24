import { BarChart3, AlertTriangle } from 'lucide-react';
import { BatchTrend } from '../types';

interface BatchAnalysisProps {
  trends: BatchTrend[];
}

export default function BatchAnalysis({ trends }: BatchAnalysisProps) {
  const maxDefectRate = Math.max(...trends.map((t) => t.defectRate));

  return (
    <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#E60023]" />
          <h2 className="text-lg font-semibold text-white">Batch Analysis</h2>
        </div>
        <button className="text-xs text-gray-400 hover:text-white transition-colors">
          Last 24 hours
        </button>
      </div>

      <div className="h-48 flex items-end gap-2 mb-6">
        {trends.map((trend, index) => {
          const height = (trend.defectRate / maxDefectRate) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col justify-end h-40">
                <div
                  className={`w-full rounded-t-lg transition-all hover:opacity-80 cursor-pointer ${
                    trend.isAnomaly
                      ? 'bg-gradient-to-t from-[#E60023] to-[#FFD166]'
                      : 'bg-gradient-to-t from-[#00E5A8]/40 to-[#00E5A8]/20'
                  }`}
                  style={{ height: `${height}%` }}
                >
                  {trend.isAnomaly && (
                    <div className="flex justify-center pt-1">
                      <AlertTriangle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
              <span className="text-[10px] text-gray-600">{index + 1}</span>
            </div>
          );
        })}
      </div>

      <div className="bg-[#1A1A1A] rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-gray-400">Anomaly Detection</p>
          <span className="px-2 py-1 bg-[#E60023]/20 text-[#E60023] text-xs rounded font-medium">
            {trends.filter((t) => t.isAnomaly).length} anomalies
          </span>
        </div>
        <div className="space-y-2">
          {trends
            .filter((t) => t.isAnomaly)
            .slice(0, 3)
            .map((trend, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-[#0A0A0A] rounded-lg"
              >
                <span className="text-sm text-gray-300">{trend.waferId}</span>
                <span className="text-xs text-[#E60023] font-medium">
                  {trend.defectRate.toFixed(2)}%
                </span>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-1">Avg Defect Rate</p>
          <p className="text-sm font-semibold text-white">
            {(trends.reduce((sum, t) => sum + t.defectRate, 0) / trends.length).toFixed(2)}%
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-1">Peak Rate</p>
          <p className="text-sm font-semibold text-[#E60023]">{maxDefectRate.toFixed(2)}%</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-1">Total Wafers</p>
          <p className="text-sm font-semibold text-white">{trends.length}</p>
        </div>
      </div>
    </div>
  );
}

import { BarChart3, AlertTriangle, TrendingUp, Zap } from 'lucide-react';
import { BatchTrend } from '../types';

interface BatchAnalysisProps {
  trends: BatchTrend[];
}

export default function BatchAnalysis({ trends }: BatchAnalysisProps) {
  if (!trends || trends.length === 0) return null;

  const maxDefectRate = Math.max(...trends.map((t) => t.defectRate));
  const avgDefectRate = trends.reduce((sum, t) => sum + t.defectRate, 0) / trends.length;
  const anomalyCount  = trends.filter((t) => t.isAnomaly).length;

  // ── Escalation detection — ADDED ────────────────────────────────
  // Escalating = last 4 wafers trend is rising by >30%
  const isEscalating =
    trends.length >= 4 &&
    trends[trends.length - 1].defectRate > trends[trends.length - 4].defectRate * 1.3;

  // Spike detection — ADDED
  // Spike = latest wafer is 1.8× above batch average
  const latestSpike =
    trends.length > 1 &&
    trends[trends.length - 1].defectRate > avgDefectRate * 1.8;

  return (
    <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#E60023]" />
          <h2 className="text-lg font-semibold text-white">Batch Analysis</h2>
        </div>
        <div className="flex items-center gap-2">
          {/* Escalation badge — ADDED */}
          {isEscalating && (
            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#E60023]/10 border border-[#E60023]/30 rounded-lg">
              <TrendingUp className="w-3 h-3 text-[#E60023]" />
              <span className="text-[10px] font-bold text-[#E60023] tracking-widest">ESCALATING</span>
            </div>
          )}
          {/* Spike badge — ADDED */}
          {latestSpike && (
            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#FF6B00]/10 border border-[#FF6B00]/30 rounded-lg">
              <Zap className="w-3 h-3 text-[#FF6B00]" />
              <span className="text-[10px] font-bold text-[#FF6B00] tracking-widest">SPIKE</span>
            </div>
          )}
          <button className="text-xs text-gray-400 hover:text-white transition-colors">
            Last 24 hours
          </button>
        </div>
      </div>

      {/* ── Bar chart — existing, kept as-is ── */}
      <div className="h-48 flex items-end gap-2 mb-6">
        {trends.map((trend, index) => {
          const height = (trend.defectRate / maxDefectRate) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col justify-end h-40">
                <div
                  title={`${trend.waferId}: ${trend.defectRate.toFixed(2)}%`}
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

      {/* ── Anomaly list — existing ── */}
      <div className="bg-[#1A1A1A] rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-gray-400">Anomaly Detection</p>
          <span className="px-2 py-1 bg-[#E60023]/20 text-[#E60023] text-xs rounded font-medium">
            {anomalyCount} anomalies
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

      {/* ── Stats row — existing ── */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-1">Avg Defect Rate</p>
          <p className="text-sm font-semibold text-white">{avgDefectRate.toFixed(2)}%</p>
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

      {/* ── Alert messages — ADDED ── */}
      {(isEscalating || latestSpike) && (
        <div className="mt-4 space-y-3">

          {isEscalating && (
            <div className="flex items-start gap-3 p-3 bg-[#E60023]/5 border border-[#E60023]/20 rounded-xl">
              <TrendingUp className="w-4 h-4 text-[#E60023] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#E60023] tracking-wide mb-1">
                  DEFECT ESCALATION DETECTED
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Defect rate increased by &gt;30% over last 4 wafers.
                  Equipment inspection recommended immediately.
                </p>
              </div>
            </div>
          )}

          {latestSpike && (
            <div className="flex items-start gap-3 p-3 bg-[#FF6B00]/5 border border-[#FF6B00]/20 rounded-xl">
              <Zap className="w-4 h-4 text-[#FF6B00] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#FF6B00] tracking-wide mb-1">
                  ABNORMAL PATTERN SPIKE
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Latest wafer defect rate is 1.8× above batch average.
                  Possible sudden contamination or process drift event.
                </p>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
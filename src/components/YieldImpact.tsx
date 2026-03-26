import { useState } from 'react';
import { DollarSign, TrendingDown, AlertTriangle, ChevronUp } from 'lucide-react';
import { YieldData } from '../types';
 
interface YieldImpactProps {
  yieldData: YieldData | null;
}
 
export default function YieldImpact({ yieldData }: YieldImpactProps) {
  const [costPerDie, setCostPerDie] = useState<number>(8.50);
 
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
 
  // ── Derived values ───────────────────────────────────────────────
  const yieldPercentage = ((yieldData.totalDies - yieldData.failedDies) / yieldData.totalDies) * 100;
  const atRiskDies      = Math.round(yieldData.failedDies * 0.34);
  const estimatedLoss   = yieldData.failedDies * costPerDie;
  const projectedLoss   = estimatedLoss * 8;          // projected over 8 wafers if unresolved
  const defectRate      = (yieldData.failedDies / yieldData.totalDies) * 100;
  const isEscalating    = defectRate > 10;
 
  return (
    <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-6">
 
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-[#E60023]" />
          <h2 className="text-lg font-semibold text-white">Yield Impact</h2>
        </div>
        {isEscalating && (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-[#E60023]/10 border border-[#E60023]/30 rounded-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E60023] animate-pulse" />
            <span className="text-[10px] font-bold text-[#E60023] tracking-widest">HIGH RISK</span>
          </div>
        )}
      </div>
 
      <div className="space-y-4">
 
        {/* ── Failed Dies + At-Risk Dies ── */}
        <div className="grid grid-cols-2 gap-3">
 
          {/* Failed dies — existing */}
          <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2A2A2A]">
            <p className="text-xs text-gray-400 mb-2">Failed Dies</p>
            <span className="text-3xl font-bold text-white">{yieldData.failedDies}</span>
            <p className="text-xs text-gray-600 mt-1">of {yieldData.totalDies} total</p>
            <div className="mt-3 w-full bg-[#0A0A0A] rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#E60023] to-[#FFD166] rounded-full"
                style={{ width: `${(yieldData.failedDies / yieldData.totalDies) * 100}%` }}
              />
            </div>
          </div>
 
          {/* At-risk dies — ADDED */}
          <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#FFD166]/20">
            <p className="text-xs text-gray-400 mb-2">At-Risk Dies</p>
            <span className="text-3xl font-bold text-[#FFD166]">{atRiskDies}</span>
            <p className="text-xs text-gray-600 mt-1">marginal performance</p>
            <div className="mt-3 w-full bg-[#0A0A0A] rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FFD166]/60 to-[#FFD166]/30 rounded-full"
                style={{ width: `${(atRiskDies / yieldData.totalDies) * 100}%` }}
              />
            </div>
          </div>
 
        </div>
 
        {/* ── Current Yield vs Target — existing ── */}
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
 
        {/* ── Cost per Die — user adjustable — ADDED ── */}
        <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2A2A2A]">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">Cost per Die</p>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500">$</span>
              <input
                type="number"
                value={costPerDie}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val) && val > 0) setCostPerDie(val);
                }}
                aria-label="Cost per die in dollars"
                placeholder="8.50"
                className="w-16 bg-[#0A0A0A] border border-[#333] rounded-md px-2 py-1 text-sm font-bold text-white text-right focus:outline-none focus:border-[#E60023]/50"
                min={0.01}
                step={0.01}
              />
              <span className="text-[10px] text-gray-600">✎</span>
            </div>
          </div>
          <p className="text-[10px] text-gray-600 mt-1">Adjust to match die value — all figures update live</p>
        </div>
 
        {/* ── Formula block — ADDED ── */}
        <div className="bg-[#0d1a0d] border border-[#1a3a1a] rounded-xl p-4">
          <p className="text-[10px] text-green-900 font-mono tracking-widest mb-3">LOSS FORMULA</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-mono font-semibold text-[#E60023]">
              {yieldData.failedDies} dies
            </span>
            <span className="text-xs font-mono text-gray-600">×</span>
            <span className="text-sm font-mono font-semibold text-white">
              ${costPerDie.toFixed(2)}/die
            </span>
            <span className="text-xs font-mono text-gray-600">=</span>
            <span className="text-sm font-mono font-bold text-[#00E5A8]">
              ${estimatedLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
 
        {/* ── Estimated loss + Projected loss — ADDED ── */}
        <div className="grid grid-cols-2 gap-3">
 
          {/* Estimated revenue loss — enhanced from existing */}
          <div className="bg-gradient-to-br from-[#E60023]/10 to-transparent border border-[#E60023]/20 rounded-xl p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <DollarSign className="w-3.5 h-3.5 text-[#E60023]" />
              <p className="text-xs text-gray-400">This Wafer</p>
            </div>
            <p className="text-2xl font-bold text-[#E60023]">
              ${(estimatedLoss / 1000).toFixed(1)}K
            </p>
            <p className="text-[10px] text-gray-600 mt-1">estimated loss</p>
          </div>
 
          {/* Projected loss if unresolved — ADDED */}
          <div className="bg-gradient-to-br from-[#FF6B00]/10 to-transparent border border-[#FF6B00]/20 rounded-xl p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <ChevronUp className="w-3.5 h-3.5 text-[#FF6B00]" />
              <p className="text-xs text-gray-400">If Unresolved</p>
            </div>
            <p className="text-2xl font-bold text-[#FF6B00]">
              ${(projectedLoss / 1000).toFixed(1)}K
            </p>
            <p className="text-[10px] text-gray-600 mt-1">projected × 8 wafers</p>
          </div>
 
        </div>
 
        {/* ── Defect escalation alert — ADDED ── */}
        {isEscalating && (
          <div className="flex items-start gap-3 p-3 bg-[#E60023]/5 border border-[#E60023]/20 rounded-xl">
            <AlertTriangle className="w-4 h-4 text-[#E60023] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#E60023] tracking-wide mb-1">
                DEFECT ESCALATION RISK
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Defect rate {defectRate.toFixed(1)}% exceeds 10% threshold.
                Immediate corrective action recommended to prevent further yield loss.
              </p>
            </div>
          </div>
        )}
 
      </div>
    </div>
  );
}
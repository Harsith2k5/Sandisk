import { FileText, Download } from 'lucide-react';
import { FMEAData } from '../types';

interface FMEAReportProps {
  fmeaData: FMEAData | null;
}

export default function FMEAReport({ fmeaData }: FMEAReportProps) {
  if (!fmeaData) {
    return (
      <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-[#E60023]" />
          <h2 className="text-lg font-semibold text-white">Auto FMEA Report</h2>
        </div>
        <p className="text-sm text-gray-400">Awaiting analysis...</p>
      </div>
    );
  }

  const getRPNColor = (rpn: number) => {
    if (rpn >= 200) return 'text-[#E60023]';
    if (rpn >= 100) return 'text-[#FFD166]';
    return 'text-[#00E5A8]';
  };

  const getRPNLabel = (rpn: number) => {
    if (rpn >= 200) return 'Critical';
    if (rpn >= 100) return 'High';
    return 'Moderate';
  };

  return (
    <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#E60023]" />
          <h2 className="text-lg font-semibold text-white">Auto FMEA Report</h2>
        </div>
        <button className="p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors">
          <Download className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-[#1A1A1A] rounded-lg p-4 border border-[#2A2A2A]">
          <p className="text-xs text-gray-400 mb-2">Severity (S)</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">{fmeaData.severity}</span>
            <span className="text-xs text-gray-500">/ 10</span>
          </div>
          <div className="mt-2 w-full bg-[#0A0A0A] rounded-full h-1 overflow-hidden">
            <div
              className="h-full bg-[#E60023] rounded-full"
              style={{ width: `${(fmeaData.severity / 10) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-[#1A1A1A] rounded-lg p-4 border border-[#2A2A2A]">
          <p className="text-xs text-gray-400 mb-2">Occurrence (O)</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">{fmeaData.occurrence}</span>
            <span className="text-xs text-gray-500">/ 10</span>
          </div>
          <div className="mt-2 w-full bg-[#0A0A0A] rounded-full h-1 overflow-hidden">
            <div
              className="h-full bg-[#FFD166] rounded-full"
              style={{ width: `${(fmeaData.occurrence / 10) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-[#1A1A1A] rounded-lg p-4 border border-[#2A2A2A]">
          <p className="text-xs text-gray-400 mb-2">Detection (D)</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">{fmeaData.detection}</span>
            <span className="text-xs text-gray-500">/ 10</span>
          </div>
          <div className="mt-2 w-full bg-[#0A0A0A] rounded-full h-1 overflow-hidden">
            <div
              className="h-full bg-[#00E5A8] rounded-full"
              style={{ width: `${(fmeaData.detection / 10) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded-xl p-6 border border-[#2A2A2A] mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-400 mb-2">Risk Priority Number</p>
            <div className="flex items-center gap-3">
              <span className={`text-4xl font-bold ${getRPNColor(fmeaData.rpn)}`}>
                {fmeaData.rpn}
              </span>
              <span className="px-2 py-1 bg-[#0A0A0A] text-xs text-gray-400 rounded">
                {getRPNLabel(fmeaData.rpn)}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 mb-2">Formula</p>
            <div className="font-mono text-sm text-gray-300 bg-[#0A0A0A] px-3 py-2 rounded">
              RPN = S × O × D
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          {fmeaData.severity} × {fmeaData.occurrence} × {fmeaData.detection} = {fmeaData.rpn}
        </div>
      </div>

      <div className="bg-[#1A1A1A] rounded-xl p-5 border border-[#2A2A2A]">
        <p className="text-xs text-gray-400 mb-3">Recommended Action</p>
        <p className="text-sm text-white leading-relaxed">{fmeaData.recommendedAction}</p>
      </div>

      <button className="mt-4 w-full py-3 bg-[#E60023] hover:bg-[#CC0020] text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
        <Download className="w-4 h-4" />
        Generate Full Report
      </button>
    </div>
  );
}

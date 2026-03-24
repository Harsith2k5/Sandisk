import { ArrowRight, Lightbulb, TrendingUp, DollarSign } from 'lucide-react';

export default function PredictiveSimulation() {
  return (
    <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="w-5 h-5 text-[#3B82F6]" />
        <h2 className="text-lg font-semibold text-white">Action Simulation</h2>
      </div>

      <div className="space-y-6">
        {/* Before / After Visualization */}
        <div>
          <p className="text-sm text-gray-400 mb-3">Projected Impact (Before vs After)</p>
          <div className="flex items-center justify-between bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A]">
            <div className="text-center w-1/3">
              <span className="text-2xl font-bold text-[#E60023]">11.6%</span>
              <p className="text-xs text-gray-500 mt-1">Current Defect Rate</p>
            </div>
            
            <ArrowRight className="w-5 h-5 text-gray-600" />
            
            <div className="text-center w-1/3">
              <span className="text-2xl font-bold text-[#00E5A8]">1.2%</span>
              <p className="text-xs text-gray-500 mt-1">Projected Rate</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A]">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-[#00E5A8]" />
              <span className="text-xs text-gray-400">Yield Recovery</span>
            </div>
            <span className="text-xl font-bold text-white">+89.5%</span>
          </div>
          
          <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A]">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-[#00E5A8]" />
              <span className="text-xs text-gray-400">Cost Savings</span>
            </div>
            <span className="text-xl font-bold text-white">$142k</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center italic">
          *Projections based on immediate CMP tool recalibration and bearing replacement.
        </p>
      </div>
    </div>
  );
}
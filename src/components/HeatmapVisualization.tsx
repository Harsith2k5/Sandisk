import { Microscope } from 'lucide-react';

interface HeatmapVisualizationProps {
  isAnalyzing: boolean;
}

export default function HeatmapVisualization({ isAnalyzing }: HeatmapVisualizationProps) {
  const generateHeatmapGradient = () => {
    const gradients = [];
    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 12; j++) {
        const intensity = Math.random();
        const color =
          intensity > 0.7
            ? '#E60023'
            : intensity > 0.4
            ? '#FFD166'
            : intensity > 0.2
            ? '#00E5A8'
            : '#1A1A1A';
        gradients.push(
          <div
            key={`${i}-${j}`}
            className="aspect-square rounded-sm transition-all duration-300 hover:scale-110"
            style={{ backgroundColor: color, opacity: 0.3 + intensity * 0.7 }}
          />
        );
      }
    }
    return gradients;
  };

  return (
    <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-8">
      <div className="flex items-center gap-2 mb-8">
        <Microscope className="w-5 h-5 text-[#E60023]" />
        <h2 className="text-lg font-semibold text-white">Defect Heatmap</h2>
      </div>

      {isAnalyzing ? (
        <div className="flex items-center justify-center py-16">
          <p className="text-gray-400">Generating heatmap...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-400 mb-3">Original Wafer</p>
            <div className="aspect-square bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded-xl border border-[#2A2A2A] p-4 flex items-center justify-center">
              <div className="w-full h-full rounded-full border-2 border-[#2A2A2A] bg-[#0A0A0A] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-transparent" />
                <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-[#E60023]/30 rounded-full blur-md" />
                <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-[#E60023]/30 rounded-full blur-md" />
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-3">AI-Enhanced Defect Map</p>
            <div className="aspect-square bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded-xl border border-[#2A2A2A] p-4">
              <div className="w-full h-full rounded-full border-2 border-[#2A2A2A] bg-[#0A0A0A] p-2 overflow-hidden">
                <div className="w-full h-full rounded-full grid grid-cols-12 gap-0.5 p-1">
                  {generateHeatmapGradient()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between p-4 bg-[#1A1A1A] rounded-xl">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#00E5A8] rounded" />
            <span className="text-xs text-gray-400">Low Defect</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#FFD166] rounded" />
            <span className="text-xs text-gray-400">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#E60023] rounded" />
            <span className="text-xs text-gray-400">Critical</span>
          </div>
        </div>
        <button className="text-xs text-[#E60023] hover:text-[#CC0020] font-medium transition-colors">
          View Full Resolution
        </button>
      </div>
    </div>
  );
}

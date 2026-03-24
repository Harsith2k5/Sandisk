import { useState } from 'react';
import Navbar from './components/Navbar';
import UploadWafer from './components/UploadWafer';
import PredictionDisplay from './components/PredictionDisplay';
import HeatmapVisualization from './components/HeatmapVisualization';
import RootCauseAnalysis from './components/RootCauseAnalysis';
import YieldImpact from './components/YieldImpact';
import BatchAnalysis from './components/BatchAnalysis';
import FMEAReport from './components/FMEAReport';
import AIInsights from './components/AIInsights';
import PredictiveSimulation from './components/PredictiveSimulation'; 
import { Prediction, RootCause, YieldData, FMEAData, BatchTrend } from './types';

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const mockPredictions: Prediction[] = [
    { pattern: 'Radial Scratch Pattern', confidence: 0.94, timestamp: new Date() },
    { pattern: 'Edge Exclusion Defect', confidence: 0.78, timestamp: new Date() },
    { pattern: 'Center Delamination', confidence: 0.65, timestamp: new Date() },
  ];

  const mockRootCause: RootCause = {
    primary: { cause: 'CMP polishing head misalignment', confidence: 0.91 },
    alternatives: [
      { cause: 'Slurry contamination - particle size >2μm', confidence: 0.72 },
      { cause: 'Carrier film delamination', confidence: 0.58 },
      { cause: 'Temperature gradient during processing', confidence: 0.43 },
    ],
  };

  const mockYieldData: YieldData = {
    failedDies: 127,
    totalDies: 845,
    revenueLoss: 10795,
  };

  const mockFMEAData: FMEAData = {
    severity: 8,
    occurrence: 7,
    detection: 4,
    rpn: 224,
    recommendedAction: 'Immediate recalibration of CMP tool required. Implement real-time monitoring of polishing head alignment. Schedule preventive maintenance check for carrier mechanism.',
  };

  const mockBatchTrends: BatchTrend[] = Array.from({ length: 20 }, (_, i) => ({
    waferId: `W${String(i + 1).padStart(3, '0')}`,
    timestamp: new Date(),
    defectRate: Math.random() * 15,
    isAnomaly: Math.random() > 0.75,
  }));

  const mockInsights = [
    'Pattern correlation detected with Lot #3847 from previous shift. Similar CMP tool degradation signature observed.',
    'Historical data suggests 23% higher defect probability during first hour of shift changeover. Current timestamp matches this window.',
    'Recommended immediate inspection of polishing pad condition. Predicted remaining useful life: 47 hours at current degradation rate.',
    'Cross-fab analysis indicates similar defect pattern at Arizona facility (Tool ID: CMP-08) resolved via bearing replacement.',
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
    }, 2000);
  };

  return (
    <div className="h-screen bg-[#0A0A0A] flex flex-col overflow-hidden font-sans">
      <Navbar />

      {/* Global style injection for sleek, dark-mode scrollbars */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2A2A2A;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3A3A3A;
        }
      `}</style>

      <main className="flex-1 p-4 md:p-6 min-h-0 overflow-hidden">
        {/* 3-Column Layout: 3 cols / 6 cols / 3 cols */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          
          {/* LEFT PILLAR: Input & Insights (col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-6 h-full overflow-y-auto custom-scrollbar pr-2 pb-8">
            <UploadWafer onAnalyze={handleAnalyze} />
            {hasAnalyzed && <AIInsights insights={mockInsights} />}
          </div>

          {/* MIDDLE PILLAR: Core Intelligence & Visuals (col-span-6) */}
          <div className="lg:col-span-6 flex flex-col gap-6 h-full overflow-y-auto custom-scrollbar pr-2 pb-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <PredictionDisplay predictions={hasAnalyzed ? mockPredictions : []} isAnalyzing={isAnalyzing} />
              <HeatmapVisualization isAnalyzing={isAnalyzing} />
            </div>
            <BatchAnalysis trends={mockBatchTrends} />
          </div>

          {/* RIGHT PILLAR: Business Impact & Actions (col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-6 h-full overflow-y-auto custom-scrollbar pr-2 pb-8">
            <RootCauseAnalysis rootCause={hasAnalyzed ? mockRootCause : null} />
            <YieldImpact yieldData={hasAnalyzed ? mockYieldData : null} />
            {hasAnalyzed && (
              <>
                <PredictiveSimulation />
                <FMEAReport fmeaData={mockFMEAData} />
              </>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
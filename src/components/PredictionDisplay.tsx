import { TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';
import { Prediction } from '../types';

interface PredictionDisplayProps {
  predictions: Prediction[];
  isAnalyzing: boolean;
}

export default function PredictionDisplay({ predictions, isAnalyzing }: PredictionDisplayProps) {
  // Use optional chaining just in case predictions is undefined
  const topPrediction = predictions?.[0];

  return (
    <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-8">
      <div className="flex items-center gap-2 mb-8">
        <TrendingUp className="w-5 h-5 text-[#E60023]" />
        <h2 className="text-lg font-semibold text-white">AI Prediction</h2>
      </div>

      {isAnalyzing ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 border-4 border-[#2A2A2A] border-t-[#E60023] rounded-full animate-spin mb-4" />
          <p className="text-gray-400">Analyzing wafer patterns...</p>
        </div>
      ) : topPrediction ? ( 
        /* 👇 Only render this block if topPrediction exists */
        <>
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded-2xl p-8 border border-[#2A2A2A] mb-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-sm text-gray-400 mb-2">Detected Pattern</p>
                <h3 className="text-3xl font-bold text-white mb-2">{topPrediction.pattern}</h3>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 mb-2">Confidence</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-[#00E5A8]">
                    {(topPrediction.confidence * 100).toFixed(1)}
                  </span>
                  <span className="text-xl text-gray-400">%</span>
                </div>
              </div>
            </div>

            <div className="w-full bg-[#0A0A0A] rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#E60023] to-[#00E5A8] rounded-full transition-all duration-1000"
                style={{ width: `${topPrediction.confidence * 100}%` }}
              />
            </div>

            <div className="mt-4 flex items-center gap-2">
              {topPrediction.confidence > 0.9 ? (
                <CheckCircle className="w-4 h-4 text-[#00E5A8]" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-[#FFD166]" />
              )}
              <span className="text-xs text-gray-400">
                {topPrediction.confidence > 0.9
                  ? 'High confidence - immediate action recommended'
                  : 'Moderate confidence - verify with additional analysis'}
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-4">Top 3 Predictions</p>
            <div className="space-y-3">
              {/* Ensure we only map if predictions exists */}
              {predictions?.slice(0, 3).map((prediction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A]">
                      <span className="text-sm font-semibold text-gray-400">{index + 1}</span>
                    </div>
                    <span className="text-sm text-gray-300">{prediction.pattern}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-[#0A0A0A] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-[#E60023] rounded-full"
                        style={{ width: `${prediction.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-white w-12 text-right">
                      {(prediction.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* 👇 Fallback UI when neither analyzing nor having predictions */
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-gray-400">No predictions to display yet. Upload a wafer to begin.</p>
        </div>
      )}
    </div>
  );
}

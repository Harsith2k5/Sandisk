import { Upload, FileImage, Zap } from 'lucide-react';
import { useState } from 'react';

interface UploadWaferProps {
  onAnalyze: () => void;
}

export default function UploadWafer({ onAnalyze }: UploadWaferProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  return (
    <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <FileImage className="w-5 h-5 text-[#E60023]" />
        <h2 className="text-lg font-semibold text-white">Wafer Upload</h2>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all ${
          isDragging
            ? 'border-[#E60023] bg-[#E60023]/5'
            : 'border-[#2A2A2A] hover:border-[#3A3A3A]'
        }`}
      >
        <Upload className={`w-12 h-12 mb-4 ${isDragging ? 'text-[#E60023]' : 'text-gray-500'}`} />
        <p className="text-sm text-gray-400 mb-2">Drop wafer image here</p>
        <p className="text-xs text-gray-600 mb-4">or click to browse</p>
        <button className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#222222] text-sm text-gray-300 rounded-lg transition-colors">
          Browse Files
        </button>
      </div>

      {uploadedFile && (
        <div className="mt-4 p-3 bg-[#1A1A1A] rounded-lg">
          <p className="text-xs text-gray-400 mb-1">Selected File</p>
          <p className="text-sm text-white font-medium">{uploadedFile}</p>
        </div>
      )}

      <div className="mt-6 space-y-3">
        <button
          onClick={onAnalyze}
          disabled={!uploadedFile}
          className="w-full py-3 bg-[#E60023] hover:bg-[#CC0020] disabled:bg-[#2A2A2A] disabled:text-gray-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group"
        >
          <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Analyze Wafer
        </button>
        <button className="w-full py-3 bg-[#1A1A1A] hover:bg-[#222222] text-gray-300 font-medium rounded-lg transition-colors">
          Batch Upload
        </button>
      </div>

      <div className="mt-6 pt-4 border-t border-[#2A2A2A]">
        <p className="text-xs text-gray-600 mb-2">Supported Formats</p>
        <div className="flex gap-2 flex-wrap">
          {['TIFF', 'PNG', 'JPEG', 'BMP'].map((format) => (
            <span key={format} className="px-2 py-1 bg-[#1A1A1A] text-xs text-gray-400 rounded">
              {format}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

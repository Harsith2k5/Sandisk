import { Activity, Bell, Settings, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-[#121212] border-b border-[#2A2A2A] px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#E60023] rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                SanDisk Wafer Intelligence
              </h1>
              <p className="text-xs text-gray-400">Manufacturing AI System v3.2</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#00E5A8] rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">System Operational</span>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#E60023] rounded-full" />
            </button>
            <button className="p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors">
              <User className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

import React from 'react';
import { ShieldCheck, Plus, Lightbulb, ChevronDown } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNewIncident: () => void;
  userPoints: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onNewIncident,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#e2e8f0] shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-8">
          <div 
            onClick={() => setActiveTab('submit')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-[#004ac6] flex items-center justify-center text-white shadow-sm ring-2 ring-blue-100 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5 text-white stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[17px] font-bold tracking-tight text-[#0f172a] leading-tight font-display">
                TrustPoint
              </span>
              <span className="text-[9.5px] font-semibold tracking-wider text-[#64748b] uppercase leading-none mt-0.5">
                SAFETY & FEEDBACK
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('submit')}
              className={`px-3.5 py-1.5 text-[13.5px] font-medium rounded-md transition-all ${
                activeTab === 'submit'
                  ? 'bg-[#eff4ff] text-[#004ac6] font-semibold'
                  : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f8f9ff]'
              }`}
            >
              ส่งรายงาน / ข้อเสนอแนะ
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3.5 py-1.5 text-[13.5px] font-medium rounded-md transition-all ${
                activeTab === 'analytics'
                  ? 'bg-[#eff4ff] text-[#004ac6] font-semibold'
                  : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f8f9ff]'
              }`}
            >
              กระดานผู้นำ &amp; สถิติความปลอดภัย
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3.5 py-1.5 text-[13.5px] font-medium rounded-md transition-all ${
                activeTab === 'admin'
                  ? 'bg-[#eff4ff] text-[#004ac6] font-semibold'
                  : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f8f9ff]'
              }`}
            >
              คิวตรวจสอบสำหรับผู้ดูแล
            </button>
            <button
              onClick={() => setActiveTab('directory')}
              className={`px-3.5 py-1.5 text-[13.5px] font-medium rounded-md transition-all ${
                activeTab === 'directory'
                  ? 'bg-[#eff4ff] text-[#004ac6] font-semibold'
                  : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f8f9ff]'
              }`}
            >
              ทำเนียบเจ้าหน้าที่ความปลอดภัย
            </button>
          </nav>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* New Incident Button */}
          <button
            onClick={onNewIncident}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#004ac6] hover:bg-[#003ea8] text-white text-[13px] font-semibold rounded-md shadow-sm transition-all hover:shadow active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>แจ้งเหตุใหม่ / ข้อเสนอแนะ</span>
          </button>

          {/* Quick Idea / Lightbulb button */}
          <button 
            title="ข้อเสนอแนะความปลอดภัย & เคล็ดลับ"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors border border-transparent hover:border-[#e2e8f0]"
          >
            <Lightbulb className="w-4 h-4" />
          </button>

          {/* Compliance Admin Badge */}
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#e2e8f0]">
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-bold text-[#64748b] tracking-wider uppercase">
                ฝ่ายกำกับดูแล
              </span>
              <span className="text-[12px] font-semibold text-[#0f172a] leading-none">
                ผู้ดูแลระบบ
              </span>
            </div>
            
            {/* User Profile Avatar with Online Status */}
            <div className="relative group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80"
                alt="Elena Vance"
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover border border-[#cbd5e1] group-hover:ring-2 group-hover:ring-blue-200 transition-all"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbBarProps {
  onResetView?: () => void;
}

export const BreadcrumbBar: React.FC<BreadcrumbBarProps> = ({ onResetView }) => {
  return (
    <div className="bg-white border-b border-[#e2e8f0] py-2.5">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[12px]">
        {/* Left Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[#64748b] font-medium flex-wrap">
          <span 
            onClick={onResetView}
            className="hover:text-[#004ac6] cursor-pointer transition-colors"
          >
            พอร์ทัล TrustPoint
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#94a3b8]" />
          <span 
            onClick={onResetView}
            className="hover:text-[#004ac6] cursor-pointer transition-colors"
          >
            ความปลอดภัยและธรรมาภิบาลในที่ทำงาน
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#94a3b8]" />
          <span className="text-[#0f172a] font-semibold">
            ระบบรับแจ้งเหตุและข้อเสนอแนะ
          </span>
        </div>

        {/* Right Status Badges */}
        <div className="flex items-center gap-4 text-[#475569] font-medium flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-700 font-semibold text-[11.5px]">
              มาตรฐาน OSHA / ISO 45001 เปิดใช้งาน
            </span>
          </div>
          <div className="hidden sm:block w-px h-3.5 bg-[#e2e8f0]"></div>
          <div className="text-[11.5px] text-[#64748b]">
            คำนำหน้ารหัสตั๋วงาน:{' '}
            <span className="font-semibold text-[#0f172a] font-mono">#SAF-2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

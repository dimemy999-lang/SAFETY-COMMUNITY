import React from 'react';
import { CheckCircle2, Trophy, Clock, ArrowRight, X } from 'lucide-react';
import { RecentReport } from '../types';

interface SubmitSuccessModalProps {
  report: RecentReport | null;
  onClose: () => void;
  onNewReport: () => void;
}

export const SubmitSuccessModal: React.FC<SubmitSuccessModalProps> = ({
  report,
  onClose,
  onNewReport,
}) => {
  if (!report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl border border-[#cbd5e1] shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Top Celebration Header */}
        <div className="bg-[#004ac6] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white ring-4 ring-white/20">
              <CheckCircle2 className="w-7 h-7 text-emerald-400 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-blue-200">
                ตรวจสอบและบันทึกข้อมูลเรียบร้อยแล้ว
              </span>
              <h2 className="text-xl font-bold font-display text-white mt-0.5">
                ส่งรายงานความปลอดภัยสำเร็จ
              </h2>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {/* Ticket ID & Points pill */}
          <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#eff4ff] border border-[#d3e4fe]">
            <div>
              <span className="text-[11px] text-[#64748b] block font-medium">หมายเลขอ้างอิงตั๋วงาน</span>
              <span className="text-base font-bold font-mono text-[#004ac6]">
                {report.ticketId}
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#004ac6] text-white shadow-xs">
              <Trophy className="w-4 h-4 text-amber-300" />
              <span className="text-[12.5px] font-bold">+50 แต้มสะสมแล้ว</span>
            </div>
          </div>

          {/* Details Box */}
          <div className="space-y-2 text-[13px] text-[#334155]">
            <p className="font-semibold text-[#0f172a] text-[14px]">
              "{report.title}"
            </p>
            <div className="flex items-center gap-2 text-[12px] text-[#64748b]">
              <Clock className="w-3.5 h-3.5 text-[#004ac6]" />
              <span>เริ่มนับเวลา SLA: รับประกันการคัดกรอง <strong>&lt; ภายใน 4 ชั่วโมง</strong></span>
            </div>
            <p className="text-[12px] text-[#64748b] leading-relaxed pt-1">
              ผู้ประสานงานความปลอดภัย (EHS) ประจำโรงงานของคุณได้รับการแจ้งเตือนผ่านระบบความปลอดภัยแล้ว คุณจะได้รับการแจ้งเตือนความคืบหน้าเมื่อมีการตรวจสอบ มอบหมายงาน ดำเนินการแก้ไข และตรวจรับงาน
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e2e8f0]">
            <button
              onClick={onNewReport}
              className="px-4 py-2 rounded-md border border-[#cbd5e1] text-[#0f172a] text-[13px] font-semibold hover:bg-[#f8f9ff] transition-colors cursor-pointer"
            >
              เขียนรายงานเหตุการณ์อื่น
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-[#004ac6] text-white text-[13px] font-semibold hover:bg-[#003ea8] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>กลับสู่หน้าหลัก</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

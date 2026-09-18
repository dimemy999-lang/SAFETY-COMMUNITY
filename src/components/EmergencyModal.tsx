import React from 'react';
import { Siren, PhoneCall, AlertTriangle, X, ShieldAlert } from 'lucide-react';

interface EmergencyModalProps {
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl border border-rose-300 shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-[#e11d48] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Siren className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-rose-200">
                ขั้นตอนความปลอดภัยต่อชีวิตเร่งด่วน
              </span>
              <h3 className="text-lg font-bold font-display">
                สายด่วนฉุกเฉิน &amp; หน่วยเผชิญเหตุ
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-900 text-[12.5px] flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <p>
              หากเกิดเพลิงไหม้สารเคมีที่ไม่สามารถควบคุมได้, ไอระเหยสารพิษรั่วไหล, ท่อแรงดันสูงระเบิด หรือมีผู้หมดสติ <strong>กรุณาโทรแจ้งทันที</strong> อย่ารอการส่งแบบฟอร์มเว็บไซต์
            </p>
          </div>

          {/* Quick Call Numbers */}
          <div className="space-y-2.5">
            <a
              href="tel:191"
              className="flex items-center justify-between p-3.5 rounded-lg border border-rose-300 bg-rose-50/50 hover:bg-rose-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <PhoneCall className="w-5 h-5 text-rose-600" />
                <div>
                  <h4 className="text-[13.5px] font-bold text-[#0f172a]">
                    หน่วยบริการฉุกเฉินภายนอก
                  </h4>
                  <p className="text-[11px] text-[#64748b]">ตำรวจ / ดับเพลิง / กู้ชีพฉุกเฉิน</p>
                </div>
              </div>
              <span className="text-base font-bold text-rose-700 font-mono">191 / 1669</span>
            </a>

            <div className="flex items-center justify-between p-3.5 rounded-lg border border-[#e2e8f0] bg-[#f8f9ff]">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-[#004ac6]" />
                <div>
                  <h4 className="text-[13.5px] font-bold text-[#0f172a]">
                    ศูนย์ควบคุมโรงงาน (Control Center)
                  </h4>
                  <p className="text-[11px] text-[#64748b]">ทีมความปลอดภัย EHS และชุดเผชิญเหตุเบื้องต้นในพื้นที่</p>
                </div>
              </div>
              <span className="text-base font-bold text-[#004ac6] font-mono">ต่อ 4499</span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-lg border border-[#e2e8f0] bg-[#f8f9ff]">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-emerald-600" />
                <div>
                  <h4 className="text-[13.5px] font-bold text-[#0f172a]">
                    หน่วยตอบโต้สารเคมีรั่วไหล (HAZMAT)
                  </h4>
                  <p className="text-[11px] text-[#64748b]">ทีมควบคุมและจำกัดการแพร่กระจายสารเคมีเร่งด่วน</p>
                </div>
              </div>
              <span className="text-base font-bold text-emerald-700 font-mono">ต่อ 4410</span>
            </div>
          </div>

          <div className="pt-2 text-right">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-[#0f172a] text-white text-[12.5px] font-semibold hover:bg-black transition-colors cursor-pointer"
            >
              กลับสู่แบบฟอร์ม
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

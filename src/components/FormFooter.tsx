import React from 'react';
import { Lock, Send, Check, ShieldCheck, Award, Sparkles } from 'lucide-react';

interface FormFooterProps {
  onSaveDraft: () => void;
  onSubmit: () => void;
  isDraftSaved: boolean;
  isSubmitting: boolean;
}

export const FormFooter: React.FC<FormFooterProps> = ({
  onSaveDraft,
  onSubmit,
  isDraftSaved,
  isSubmitting,
}) => {
  return (
    <div className="corporate-card rounded-xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm border border-[#e2e8f0] bg-gradient-to-r from-white via-[#fcfdff] to-[#f8faff]">
      {/* Left Compliance Notice */}
      <div className="flex items-center gap-3 text-[#475569] text-[12.5px]">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200 shadow-2xs">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0b1c30]">
              ระบบคุ้มครองผู้แจ้งเหตุตามระเบียบองค์กร &amp; มาตรฐาน ISO 45001
            </span>
            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
              มาตรา 109
            </span>
          </div>
          <p className="text-[11.5px] text-[#64748b] mt-0.5">
            ข้อมูลจะถูกส่งตรงถึงคณะกรรมการความปลอดภัยและอาชีวอนามัย (คปอ.) โดยไม่ผ่านสายการบังคับบัญชา
          </p>
        </div>
      </div>

      {/* Right Buttons */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        {/* Save as Draft */}
        <button
          type="button"
          onClick={onSaveDraft}
          disabled={isDraftSaved}
          className="h-11 px-4 rounded-xl border border-[#cbd5e1] bg-white hover:bg-[#f8f9ff] text-[#0f172a] text-[13px] font-bold transition-all hover:border-[#94a3b8] active:scale-[0.98] flex items-center gap-2 cursor-pointer shadow-2xs"
        >
          {isDraftSaved ? (
            <>
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span className="text-emerald-800">บันทึกแบบร่างแล้ว</span>
            </>
          ) : (
            <span>บันทึกแบบร่าง</span>
          )}
        </button>

        {/* Submit Report & Earn +50 Pts */}
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="h-11 px-5 rounded-xl bg-gradient-to-r from-[#004ac6] to-[#003896] hover:from-[#003896] hover:to-[#002870] text-white text-[13.5px] font-bold transition-all shadow-sm hover:shadow-md active:scale-[0.98] flex items-center gap-2.5 cursor-pointer"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
              กำลังส่งข้อมูลเข้าระบบ...
            </span>
          ) : (
            <>
              <Send className="w-4 h-4 stroke-[2.5]" />
              <span>ส่งรายงานเข้าระบบความปลอดภัย</span>
              <span className="inline-flex items-center gap-1 bg-white/20 text-white px-2 py-0.5 rounded-full text-[11px] font-bold">
                <Award className="w-3 h-3" />
                +50 แต้ม
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};


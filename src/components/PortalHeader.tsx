import React from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle2, TrendingUp, Clock, Award, Sparkles } from 'lucide-react';
import { ReportFormData } from '../types';

interface PortalHeaderProps {
  formData?: ReportFormData;
}

export const PortalHeader: React.FC<PortalHeaderProps> = ({ formData }) => {
  // Calculate form completion progress
  const calculateProgress = () => {
    if (!formData) return 80;
    let score = 0;
    // Step 1: Reporter
    if (formData.anonymous || (formData.firstName && formData.workEmail)) score += 20;
    // Step 2: Avatar / Evidence
    if (formData.avatarUrl) score += 15; else score += 10;
    // Step 3: Classification
    if (formData.category && formData.severity) score += 25;
    // Step 4: Narrative
    if (formData.headline && formData.narrative) score += 30;
    else if (formData.headline || formData.narrative) score += 15;
    // Step 5: Attachments
    if (formData.attachments && formData.attachments.length > 0) score += 10; else score += 5;
    return Math.min(100, Math.max(score, 20));
  };

  const progressPercent = calculateProgress();

  const scrollToStep = (stepId: string) => {
    const el = document.getElementById(stepId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="pt-6 pb-6 space-y-5">
      {/* Top Corporate Status Strip */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-xl bg-gradient-to-r from-[#0b1c30] via-[#0f2a4a] to-[#003ea8] text-white shadow-md relative overflow-hidden">
        {/* Subtle decorative background graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none" />
        <div className="absolute -right-8 -bottom-10 w-40 h-40 rounded-full bg-blue-400/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-[11px] font-semibold tracking-wider uppercase mb-2.5 backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>ระบบความปลอดภัยองค์กร • ISO 45001 &amp; OSHA Compliant</span>
            <span className="text-blue-300">•</span>
            <span>Ver. 2026.1</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-white tracking-tight font-display leading-tight">
            พอร์ทัลความปลอดภัย &amp; การพัฒนาองค์กร
          </h1>
          <p className="mt-2 text-[13.5px] text-slate-200 leading-relaxed max-w-xl">
            ช่องทางรับแจ้งเหตุการณ์ จุดเสี่ยงอันตรายในสถานที่ทำงาน และข้อเสนอแนะพัฒนาองค์กร 
            พร้อมระบบคุ้มครองพยานและผู้แจ้งเบาะแส <span className="text-emerald-300 font-medium">AES-256 GCM</span> ดำเนินการคัดกรองทุกรายงานภายใน 4 ชั่วโมง
          </p>
        </div>

        {/* Executive Safety Snapshot Cards */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-2 gap-2.5 shrink-0 self-stretch sm:self-auto lg:w-72">
          <div className="p-3 rounded-lg bg-white/10 border border-white/15 backdrop-blur-xs">
            <div className="flex items-center gap-1.5 text-blue-200 text-[11px] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>ไร้อุบัติเหตุสะสม</span>
            </div>
            <div className="text-xl font-bold font-display text-white mt-0.5">
              142 <span className="text-xs font-normal text-slate-300">วัน</span>
            </div>
            <span className="text-[10px] text-emerald-300 font-medium">● ปฏิบัติการปลอดภัย</span>
          </div>

          <div className="p-3 rounded-lg bg-white/10 border border-white/15 backdrop-blur-xs">
            <div className="flex items-center gap-1.5 text-blue-200 text-[11px] font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>เวลาคัดกรอง SLA</span>
            </div>
            <div className="text-xl font-bold font-display text-white mt-0.5">
              &lt; 1.8 <span className="text-xs font-normal text-slate-300">ชม.</span>
            </div>
            <span className="text-[10px] text-blue-200 font-medium">รับประกัน &lt; 4 ชม.</span>
          </div>

          <div className="p-3 rounded-lg bg-white/10 border border-white/15 backdrop-blur-xs">
            <div className="flex items-center gap-1.5 text-blue-200 text-[11px] font-medium">
              <TrendingUp className="w-3.5 h-3.5 text-sky-300" />
              <span>อัตราแก้ไขสำเร็จ</span>
            </div>
            <div className="text-xl font-bold font-display text-white mt-0.5">
              96.4%
            </div>
            <span className="text-[10px] text-emerald-300 font-medium">348/361 รายการ</span>
          </div>

          <div className="p-3 rounded-lg bg-white/10 border border-white/15 backdrop-blur-xs">
            <div className="flex items-center gap-1.5 text-blue-200 text-[11px] font-medium">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>รางวัลผู้รายงาน</span>
            </div>
            <div className="text-xl font-bold font-display text-amber-300 mt-0.5">
              +50 <span className="text-xs font-normal text-slate-300">แต้ม</span>
            </div>
            <span className="text-[10px] text-slate-300 font-medium">สะสมแลกรางวัล</span>
          </div>
        </div>
      </div>

      {/* Interactive Form Steps Progress Bar */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#004ac6]" />
            <span className="text-[13px] font-bold text-[#0b1c30]">
              ความคืบหน้าการกรอกรายงานความปลอดภัย
            </span>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#004ac6] text-[11px] font-bold border border-blue-100">
              {progressPercent}% สมบูรณ์
            </span>
          </div>
          <span className="text-[11.5px] text-[#64748b]">
            กรอกข้อมูลครบถ้วนช่วยให้ทีม EHS แก้ไขปัญหาได้รวดเร็วขึ้น 2 เท่า
          </span>
        </div>

        {/* Progress bar visual */}
        <div className="w-full h-2 rounded-full bg-[#f1f5f9] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#004ac6] to-emerald-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 5-Step Quick Nav Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-3 pt-3 border-t border-[#f1f5f9] text-[11.5px]">
          <button
            type="button"
            onClick={() => scrollToStep('step-1-reporter')}
            className="flex items-center gap-1.5 p-1.5 rounded hover:bg-[#f8f9ff] text-[#475569] hover:text-[#004ac6] transition-colors text-left cursor-pointer"
          >
            <span className="w-5 h-5 rounded-full bg-blue-100 text-[#004ac6] font-bold text-[10px] flex items-center justify-center shrink-0">
              1
            </span>
            <span className="truncate font-medium">ข้อมูลผู้รายงาน</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToStep('step-2-avatar')}
            className="flex items-center gap-1.5 p-1.5 rounded hover:bg-[#f8f9ff] text-[#475569] hover:text-[#004ac6] transition-colors text-left cursor-pointer"
          >
            <span className="w-5 h-5 rounded-full bg-blue-100 text-[#004ac6] font-bold text-[10px] flex items-center justify-center shrink-0">
              2
            </span>
            <span className="truncate font-medium">ภาพหลักฐาน</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToStep('step-3-classification')}
            className="flex items-center gap-1.5 p-1.5 rounded hover:bg-[#f8f9ff] text-[#475569] hover:text-[#004ac6] transition-colors text-left cursor-pointer"
          >
            <span className="w-5 h-5 rounded-full bg-blue-100 text-[#004ac6] font-bold text-[10px] flex items-center justify-center shrink-0">
              3
            </span>
            <span className="truncate font-medium">หมวดหมู่ &amp; ความรุนแรง</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToStep('step-4-narrative')}
            className="flex items-center gap-1.5 p-1.5 rounded hover:bg-[#f8f9ff] text-[#475569] hover:text-[#004ac6] transition-colors text-left cursor-pointer"
          >
            <span className="w-5 h-5 rounded-full bg-blue-100 text-[#004ac6] font-bold text-[10px] flex items-center justify-center shrink-0">
              4
            </span>
            <span className="truncate font-medium">รายละเอียด &amp; ข้อเท็จจริง</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToStep('step-5-attachments')}
            className="flex items-center gap-1.5 p-1.5 rounded hover:bg-[#f8f9ff] text-[#475569] hover:text-[#004ac6] transition-colors text-left cursor-pointer"
          >
            <span className="w-5 h-5 rounded-full bg-blue-100 text-[#004ac6] font-bold text-[10px] flex items-center justify-center shrink-0">
              5
            </span>
            <span className="truncate font-medium">เอกสารแนบ (URL)</span>
          </button>
        </div>
      </div>
    </div>
  );
};


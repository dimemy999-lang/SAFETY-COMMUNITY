import React from 'react';
import {
  Wrench,
  AlertTriangle,
  GitFork,
  Droplets,
  ShieldCheck,
  Lightbulb,
  Calendar,
  Clock,
  MapPin,
  Flame,
  Check,
} from 'lucide-react';
import { ReportFormData, IncidentCategory, SeverityLevel } from '../types';

interface Step3ClassificationProps {
  formData: ReportFormData;
  updateFormData: (fields: Partial<ReportFormData>) => void;
}

interface CategoryOption {
  id: IncidentCategory;
  title: string;
  subtitle: string;
  sla: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORIES: CategoryOption[] = [
  {
    id: 'physical_safety',
    title: 'ความปลอดภัยทางกายภาพและการยศาสตร์',
    subtitle: 'อันตรายสะดุดล้ม อุปกรณ์ยกของ ท่าทางการทำงาน',
    sla: 'SLA ภายใน 24 ชม.',
    icon: Wrench,
  },
  {
    id: 'facility_hazard',
    title: 'อันตรายจากสถานที่ / อุปกรณ์เครื่องจักร',
    subtitle: 'เครื่องจักรกล โครงสร้างชำรุด ระบบไฟฟ้า',
    sla: 'SLA ภายใน 12 ชม.',
    icon: AlertTriangle,
  },
  {
    id: 'process_safety',
    title: 'ความปลอดภัยในกระบวนการและการปฏิบัติการ',
    subtitle: 'การฝ่าฝืน SOP ข้อบกพร่องในการฝึกอบรม',
    sla: 'SLA ภายใน 24 ชม.',
    icon: GitFork,
  },
  {
    id: 'environmental',
    title: 'สิ่งแวดล้อมและสุขอนามัย',
    subtitle: 'สารเคมี คุณภาพอากาศ สารเคมีรั่วไหล',
    sla: 'SLA ภายใน 8 ชม.',
    icon: Droplets,
  },
  {
    id: 'cybersecurity',
    title: 'ความปลอดภัยทางไซเบอร์และความโปร่งใส',
    subtitle: 'การคัดลอกบัตรผ่าน ข้อมูลรั่วไหล สิทธิ์เข้าถึง',
    sla: 'SLA ภายใน 4 ชม.',
    icon: ShieldCheck,
  },
  {
    id: 'workplace_suggestion',
    title: 'ข้อเสนอแนะทั่วไปในการปรับปรุงที่ทำงาน',
    subtitle: 'วัฒนธรรมองค์กร สิ่งอำนวยความสะดวก เวิร์กโฟลว์',
    sla: 'SLA ภายใน 48 ชม.',
    icon: Lightbulb,
  },
];

interface SeverityOption {
  id: SeverityLevel;
  title: string;
  subtitle: string;
  slaBadge: string;
  colorClass: string;
  borderClass: string;
}

const SEVERITIES: SeverityOption[] = [
  {
    id: 'low',
    title: 'ระดับต่ำ / เรื่องทั่วไป',
    subtitle: 'ความไม่สะดวกเล็กน้อย หรือข้อเสนอแนะเชิงรุก',
    slaBadge: 'SLA 48 ชม.',
    colorClass: 'bg-slate-500',
    borderClass: 'border-slate-300',
  },
  {
    id: 'moderate',
    title: 'ความเสี่ยงปานกลาง',
    subtitle: 'ต้องได้รับการตรวจสอบแก้ไขตามรอบเวรปกติ',
    slaBadge: 'SLA 24 ชม.',
    colorClass: 'bg-[#004ac6]',
    borderClass: 'border-[#004ac6]',
  },
  {
    id: 'high',
    title: 'ความสำคัญสูง',
    subtitle: 'อาจเกิดการบาดเจ็บหรือเกิดความเสียหายต่อสายการผลิต',
    slaBadge: 'SLA 6 ชม.',
    colorClass: 'bg-amber-500',
    borderClass: 'border-amber-400',
  },
  {
    id: 'critical',
    title: 'วิกฤต / เร่งด่วนสูงสุด',
    subtitle: 'อันตรายต่อชีวิต หรือต้องสั่งหยุดสายการผลิตทันที',
    slaBadge: 'เร่งด่วน < 1 ชม.',
    colorClass: 'bg-rose-600',
    borderClass: 'border-rose-500',
  },
];

const SAMPLE_ZONES = [
  'อาคารฝ่ายผลิต สายการประกอบ A-2',
  'คลังพัสดุและจัดส่ง โซน B-Bay 4',
  'ห้องปฏิบัติการควบคุมคุณภาพ QC',
  'ทางเดินเชื่อมระหว่างอาคาร 3-4',
  'ลานจอดรถพนักงาน ชั้นใต้ดิน B1',
];

export const Step3Classification: React.FC<Step3ClassificationProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div id="step-3-classification" className="corporate-card rounded-xl p-5 sm:p-6 shadow-xs border border-[#e2e8f0]">
      {/* Header */}
      <div className="flex items-start gap-3 pb-5 border-b border-[#f1f5f9]">
        <div className="w-8 h-8 rounded-lg bg-[#eff4ff] text-[#004ac6] font-bold text-[14px] flex items-center justify-center shrink-0 mt-0.5 border border-[#d3e4fe] shadow-xs">
          3
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-[16px] font-bold text-[#0b1c30] tracking-tight font-display">
              การจำแนกหมวดหมู่ &amp; ระดับความรุนแรง
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#004ac6] border border-blue-200">
              ขั้นตอนที่ 3 / 5
            </span>
          </div>
          <p className="text-[12.5px] text-[#64748b] mt-0.5">
            เลือกประเภทเหตุการณ์หลัก และประเมินระดับความเร่งด่วนในการตอบสนองตามมาตรฐาน SLA ขององค์กร
          </p>
        </div>
      </div>

      {/* Primary Incident / Topic Category */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-2.5">
          <label className="block text-[13px] font-bold text-[#0f172a]">
            หมวดหมู่หลักของเหตุการณ์ / หัวข้อข้อเสนอแนะ
          </label>
          <span className="text-[11.5px] text-[#64748b]">คลิกเลือก 1 หมวดหมู่</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = formData.category === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => updateFormData({ category: cat.id })}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between relative ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#004ac6] to-[#003896] border-[#004ac6] text-white shadow-md ring-2 ring-blue-200'
                    : 'bg-white border-[#e2e8f0] text-[#0f172a] hover:border-[#004ac6] hover:bg-[#f8faff]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 shadow-2xs ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-blue-50 text-[#004ac6]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 pr-4">
                    <h4
                      className={`text-[13px] font-bold leading-snug font-display ${
                        isSelected ? 'text-white' : 'text-[#0f172a]'
                      }`}
                    >
                      {cat.title}
                    </h4>
                    <p
                      className={`text-[11px] mt-1 line-clamp-2 ${
                        isSelected ? 'text-blue-100' : 'text-[#64748b]'
                      }`}
                    >
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-[10.5px]">
                  <span className={`font-semibold ${isSelected ? 'text-blue-200' : 'text-[#64748b]'}`}>
                    {cat.sla}
                  </span>
                  {isSelected && (
                    <span className="inline-flex items-center gap-1 font-bold bg-white text-[#004ac6] px-1.5 py-0.5 rounded text-[10px]">
                      <Check className="w-3 h-3 stroke-[3]" /> เลือกแล้ว
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Assessed Severity Rating */}
      <div className="mt-6 pt-5 border-t border-[#f1f5f9]">
        <div className="flex items-center justify-between mb-2.5">
          <label className="block text-[13px] font-bold text-[#0f172a] flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>การประเมินระดับความรุนแรงและผลกระทบ (Severity &amp; Impact)</span>
          </label>
          <span className="text-[11.5px] text-[#64748b]">เชื่อมโยงเวิร์กโฟลว์แจ้งเตือนอัตโนมัติ</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SEVERITIES.map((sev) => {
            const isSelected = formData.severity === sev.id;

            return (
              <div
                key={sev.id}
                onClick={() => updateFormData({ severity: sev.id })}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? sev.id === 'critical'
                      ? 'bg-rose-50/90 border-rose-500 ring-2 ring-rose-200 shadow-xs'
                      : sev.id === 'high'
                      ? 'bg-amber-50/90 border-amber-500 ring-2 ring-amber-200 shadow-xs'
                      : 'bg-blue-50/90 border-[#004ac6] ring-2 ring-blue-200 shadow-xs'
                    : 'bg-white border-[#e2e8f0] hover:border-slate-400 hover:bg-[#f8faff]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span
                      className={`text-[12.5px] font-bold ${
                        isSelected
                          ? sev.id === 'critical'
                            ? 'text-rose-700'
                            : sev.id === 'high'
                            ? 'text-amber-800'
                            : 'text-[#004ac6]'
                          : 'text-[#0f172a]'
                      }`}
                    >
                      {sev.title}
                    </span>
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${sev.colorClass} ${
                        sev.id === 'critical' ? 'animate-pulse' : ''
                      }`}
                    />
                  </div>
                  <p className="text-[11.5px] text-[#64748b] leading-relaxed">
                    {sev.subtitle}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#e2e8f0]/80 flex items-center justify-between text-[10.5px]">
                  <span
                    className={`font-semibold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? sev.id === 'critical'
                          ? 'bg-rose-200 text-rose-800'
                          : sev.id === 'high'
                          ? 'bg-amber-200 text-amber-800'
                          : 'bg-blue-200 text-blue-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {sev.slaBadge}
                  </span>
                  {isSelected && (
                    <span className="text-[11px] font-bold text-[#004ac6]">
                      ✓ ปัจจุบัน
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Date, Time, Location Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-5 border-t border-[#f1f5f9]">
        {/* Observation Date */}
        <div>
          <label className="block text-[12px] font-bold text-[#334155] mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#64748b]" />
            <span>วันที่พบเหตุการณ์ (Observation Date)</span>
          </label>
          <div className="relative">
            <input
              type="date"
              value={formData.observationDate}
              onChange={(e) => updateFormData({ observationDate: e.target.value })}
              className="w-full h-10 px-3 pr-8 text-[13px] rounded-lg border border-[#cbd5e1] bg-white text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#004ac6] cursor-pointer"
            />
          </div>
        </div>

        {/* Time Observed (Local) */}
        <div>
          <label className="block text-[12px] font-bold text-[#334155] mb-1.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#64748b]" />
            <span>เวลาที่พบ (เวลาท้องถิ่น)</span>
          </label>
          <div className="relative">
            <input
              type="time"
              value={formData.observationTime}
              onChange={(e) => updateFormData({ observationTime: e.target.value })}
              className="w-full h-10 px-3 pr-8 text-[13px] rounded-lg border border-[#cbd5e1] bg-white text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#004ac6] cursor-pointer"
            />
          </div>
        </div>

        {/* Zone / Room / Bay No. */}
        <div>
          <label className="block text-[12px] font-bold text-[#334155] mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#64748b]" />
            <span>โซน / ห้อง / ช่องปฏิบัติงาน</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.zoneLocation}
              onChange={(e) => updateFormData({ zoneLocation: e.target.value })}
              placeholder="เช่น ชั้นประกอบการผลิตที่ 2, ทางเดิน C-W"
              className="w-full h-10 px-3 pr-8 text-[13px] rounded-lg border border-[#cbd5e1] bg-white text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#004ac6]"
            />
          </div>
        </div>
      </div>

      {/* Quick Zone Chips */}
      <div className="mt-3 flex items-center gap-1.5 flex-wrap">
        <span className="text-[11px] font-semibold text-[#64748b]">ระบุจุดพบบ่อย:</span>
        {SAMPLE_ZONES.map((zone) => (
          <button
            key={zone}
            type="button"
            onClick={() => updateFormData({ zoneLocation: zone })}
            className="px-2 py-0.5 rounded text-[11px] bg-[#f1f5f9] hover:bg-blue-50 text-[#334155] hover:text-[#004ac6] transition-colors border border-[#e2e8f0] cursor-pointer"
          >
            {zone}
          </button>
        ))}
      </div>
    </div>
  );
};


import React from 'react';
import { Info, ShieldAlert, User, Mail, Hash, Building2, MapPin, Lock, CheckCircle2, RotateCcw } from 'lucide-react';
import { ReportFormData } from '../types';
import { DEPARTMENTS, FACILITY_SITES } from '../data/mockData';

interface Step1ReporterProps {
  formData: ReportFormData;
  updateFormData: (fields: Partial<ReportFormData>) => void;
}

export const Step1Reporter: React.FC<Step1ReporterProps> = ({
  formData,
  updateFormData,
}) => {
  const handleLoadElenaProfile = () => {
    updateFormData({
      anonymous: false,
      firstName: 'Elena',
      lastName: 'Vance',
      workEmail: 'elena.vance@trustpoint.internal',
      department: 'Operations & Logistics',
      employeeId: 'EMP-89241',
      facilitySite: 'Austin Plant - Building 4',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      avatarTitle: 'Elena Vance • Logistics Specialist',
    });
  };

  return (
    <div id="step-1-reporter" className="corporate-card rounded-xl p-5 sm:p-6 shadow-xs border border-[#e2e8f0]">
      {/* Header with Title and Anonymous Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#f1f5f9]">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#eff4ff] text-[#004ac6] font-bold text-[14px] flex items-center justify-center shrink-0 mt-0.5 border border-[#d3e4fe] shadow-xs">
            1
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[16px] font-bold text-[#0b1c30] tracking-tight font-display">
                ข้อมูลประจำตัวและสังกัดของผู้รายงาน
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#004ac6] border border-blue-200">
                ขั้นตอนที่ 1 / 5
              </span>
            </div>
            <p className="text-[12.5px] text-[#64748b] mt-0.5">
              ยืนยันข้อมูลตัวตนของคุณ หรือเลือกเปิดใช้งานโหมดไม่ระบุตัวตนเพื่อความปลอดภัยสูงสุด
            </p>
          </div>
        </div>

        {/* Anonymous Toggle Switch */}
        <div className="flex items-center gap-3 self-start sm:self-center bg-[#f8f9ff] hover:bg-blue-50/50 transition-colors px-3.5 py-2 rounded-xl border border-[#e2e8f0]">
          <div className="flex flex-col text-right">
            <div className="flex items-center gap-1.5 justify-end">
              <Lock className={`w-3.5 h-3.5 ${formData.anonymous ? 'text-[#004ac6]' : 'text-[#94a3b8]'}`} />
              <span className="text-[12px] font-bold text-[#0f172a]">
                โหมดไม่ระบุตัวตน
              </span>
              <span 
                title="ตัวตนและข้อมูลส่วนตัวของคุณจะถูกตัดออกและเข้ารหัสก่อนถึงผู้ตรวจสอบ"
                className="cursor-pointer text-[#94a3b8] hover:text-[#004ac6]"
              >
                <Info className="w-3.5 h-3.5" />
              </span>
            </div>
            <span className="text-[10.5px] text-[#64748b]">
              {formData.anonymous ? 'กำลังเข้ารหัส AES-256' : 'คลิกเพื่อเปิดระบบคุ้มครอง'}
            </span>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={formData.anonymous}
            onClick={() => updateFormData({ anonymous: !formData.anonymous })}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#004ac6] focus:ring-offset-2 ${
              formData.anonymous ? 'bg-[#004ac6]' : 'bg-[#cbd5e1]'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                formData.anonymous ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Anonymous Alert Banner if enabled */}
      {formData.anonymous ? (
        <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-r from-[#eff4ff] to-[#f0f9ff] border border-[#bed3ff] flex items-start sm:items-center justify-between gap-3 text-[#004ac6] shadow-xs">
          <div className="flex items-start sm:items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#004ac6] text-white flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[12.5px] font-bold text-[#0b1c30]">
                โหมดคุ้มครองพยานและผู้แจ้งเบาะแส (Whistleblower Shield) เปิดใช้งาน
              </h4>
              <p className="text-[11.5px] text-[#475569] mt-0.5">
                ชื่อ, รหัสพนักงาน, และอีเมลจะถูกสุ่มสร้างเป็นโทเค็นนิรนาม <code className="px-1.5 py-0.5 rounded bg-blue-100 text-[#004ac6] font-mono text-[10.5px]">TOKEN-SEC-89241</code> ปราศจากการเปิดเผยสู่บุคคลภายนอก
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => updateFormData({ anonymous: false })}
            className="text-[11.5px] font-bold text-[#004ac6] hover:underline shrink-0 cursor-pointer"
          >
            ยกเลิกโหมดนิรนาม
          </button>
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-[12px] text-[#64748b]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>เข้าสู่ระบบในชื่อ <strong className="text-[#0f172a]">{formData.firstName} {formData.lastName}</strong> ({formData.department})</span>
          </div>
          <button
            type="button"
            onClick={handleLoadElenaProfile}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#004ac6] hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            รีเซ็ตเป็นข้อมูลเริ่มต้น
          </button>
        </div>
      )}

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {/* First Name */}
        <div>
          <label className="block text-[12px] font-bold text-[#334155] mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#64748b]" />
            <span>ชื่อจริง (First Name)</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.anonymous ? 'ข้อมูลได้รับการปกป้อง (ไม่ระบุตัวตน)' : formData.firstName}
              onChange={(e) => updateFormData({ firstName: e.target.value })}
              disabled={formData.anonymous}
              placeholder="ระบุชื่อจริง..."
              className={`w-full h-10 px-3 text-[13px] rounded-lg border transition-all ${
                formData.anonymous
                  ? 'bg-[#f1f5f9] text-[#94a3b8] border-[#e2e8f0] cursor-not-allowed font-mono text-[12px]'
                  : 'bg-white text-[#0f172a] border-[#cbd5e1] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#004ac6]'
              }`}
            />
          </div>
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-[12px] font-bold text-[#334155] mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#64748b]" />
            <span>นามสกุล (Last Name)</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.anonymous ? 'พยานผู้แจ้งเหตุ (Protected)' : formData.lastName}
              onChange={(e) => updateFormData({ lastName: e.target.value })}
              disabled={formData.anonymous}
              placeholder="ระบุนามสกุล..."
              className={`w-full h-10 px-3 text-[13px] rounded-lg border transition-all ${
                formData.anonymous
                  ? 'bg-[#f1f5f9] text-[#94a3b8] border-[#e2e8f0] cursor-not-allowed font-mono text-[12px]'
                  : 'bg-white text-[#0f172a] border-[#cbd5e1] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#004ac6]'
              }`}
            />
          </div>
        </div>

        {/* Work Email */}
        <div>
          <label className="block text-[12px] font-bold text-[#334155] mb-1.5 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#64748b]" />
            <span>อีเมลที่ทำงาน (Work Email)</span>
          </label>
          <div className="relative">
            <input
              type="email"
              value={formData.anonymous ? 'shield-relay-89241@trustpoint.internal' : formData.workEmail}
              onChange={(e) => updateFormData({ workEmail: e.target.value })}
              disabled={formData.anonymous}
              placeholder="name@company.com"
              className={`w-full h-10 px-3 text-[13px] rounded-lg border transition-all ${
                formData.anonymous
                  ? 'bg-[#f1f5f9] text-[#94a3b8] border-[#e2e8f0] cursor-not-allowed font-mono text-[12px]'
                  : 'bg-white text-[#0f172a] border-[#cbd5e1] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#004ac6]'
              }`}
            />
          </div>
        </div>

        {/* Department Dropdown */}
        <div>
          <label className="block text-[12px] font-bold text-[#334155] mb-1.5 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#64748b]" />
            <span>แผนก / ฝ่ายงาน (Department)</span>
          </label>
          <div className="relative">
            <select
              value={formData.department}
              onChange={(e) => updateFormData({ department: e.target.value })}
              className="w-full h-10 px-3 pr-8 text-[13px] rounded-lg border border-[#cbd5e1] bg-white text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#004ac6] appearance-none cursor-pointer"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#64748b]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Employee ID */}
        <div>
          <label className="block text-[12px] font-bold text-[#334155] mb-1.5 flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-[#64748b]" />
            <span>รหัสประจำตัวพนักงาน (Employee ID)</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.anonymous ? 'ANON-TOKEN-SECURED' : formData.employeeId}
              onChange={(e) => updateFormData({ employeeId: e.target.value })}
              disabled={formData.anonymous}
              placeholder="EMP-XXXXX"
              className={`w-full h-10 px-3 text-[13px] rounded-lg border transition-all ${
                formData.anonymous
                  ? 'bg-[#f1f5f9] text-[#94a3b8] border-[#e2e8f0] cursor-not-allowed font-mono text-[12px]'
                  : 'bg-white text-[#0f172a] border-[#cbd5e1] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#004ac6]'
              }`}
            />
          </div>
        </div>

        {/* Facility Site / Campus */}
        <div>
          <label className="block text-[12px] font-bold text-[#334155] mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#64748b]" />
            <span>สถานที่ตั้ง / โรงงาน / แคมปัส (Facility Site)</span>
          </label>
          <div className="relative">
            <select
              value={formData.facilitySite}
              onChange={(e) => updateFormData({ facilitySite: e.target.value })}
              className="w-full h-10 px-3 pr-8 text-[13px] rounded-lg border border-[#cbd5e1] bg-white text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#004ac6] appearance-none cursor-pointer"
            >
              {FACILITY_SITES.map((site) => (
                <option key={site} value={site}>
                  {site}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#64748b]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


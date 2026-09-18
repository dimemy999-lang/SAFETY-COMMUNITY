import React from 'react';
import {
  Siren,
  PhoneCall,
  CheckCircle2,
  Trophy,
  Award,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
  Flame,
  Clock,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { RecentReport } from '../types';

interface SidebarWidgetsProps {
  userPoints: number;
  recentReports: RecentReport[];
  onViewAllReports: () => void;
  onOpenEmergencyModal: () => void;
  onSelectReport: (report: RecentReport) => void;
}

export const SidebarWidgets: React.FC<SidebarWidgetsProps> = ({
  userPoints,
  recentReports,
  onViewAllReports,
  onOpenEmergencyModal,
  onSelectReport,
}) => {
  return (
    <aside className="space-y-5">
      {/* 1. Critical Immediate Danger Banner */}
      <div className="corporate-card bg-gradient-to-br from-[#fff1f2] via-[#ffe4e6] to-[#fecdd3] border border-rose-300 rounded-xl p-5 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-2 -mr-2 w-20 h-20 bg-rose-500/10 rounded-full blur-xl pointer-events-none"></div>
        
        <div className="flex items-start gap-3 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-[#e11d48] text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse">
            <Siren className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
              <h3 className="text-[13px] font-bold text-[#9f1239] tracking-wider uppercase font-display">
                เกิดเหตุฉุกเฉินวิกฤตหรือไม่?
              </h3>
            </div>
            <p className="text-[12px] text-[#881337] mt-1 leading-snug">
              อย่ารอการคัดกรองผ่านแบบฟอร์ม หากเกิดเพลิงไหม้ สารเคมีพิษรั่วไหล ไฟฟ้าลัดวงจร หรือมีผู้บาดเจ็บสาหัส
            </p>
            <button
              type="button"
              onClick={onOpenEmergencyModal}
              className="mt-3.5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[12px] font-bold transition-all shadow-xs active:scale-[0.98] cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>โทรด่วนสายตรง 4499 (ศูนย์ควบคุม 24 ชม.)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Intake Guidelines */}
      <div className="corporate-card bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-[#f1f5f9]">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#004ac6]" />
            <h3 className="text-[14px] font-bold text-[#0b1c30] font-display">
              แนวทางการรายงานเหตุการณ์
            </h3>
          </div>
          <span className="text-[10.5px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#004ac6] border border-blue-200">
            SOP-EHS-09
          </span>
        </div>

        <ul className="mt-3.5 space-y-3">
          <li className="flex items-start gap-2.5 text-[12px] text-[#475569] leading-snug">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong className="text-[#0f172a]">ระบุข้อมูลเฉพาะเจาะจง:</strong> ระบุหมายเลขเครื่องจักร รหัสสายการผลิต หรือโซนจุดเกิดเหตุให้ชัดเจน
            </span>
          </li>
          <li className="flex items-start gap-2.5 text-[12px] text-[#475569] leading-snug">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong className="text-[#0f172a]">จำกัดบริเวณหากปลอดภัย:</strong> หากผ่านการอบรม ให้วางกรวยเตือนภัยหรือแผ่นซับสารเคมีเพื่อลดความเสี่ยงทันที
            </span>
          </li>
          <li className="flex items-start gap-2.5 text-[12px] text-[#475569] leading-snug">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong className="text-[#0f172a]">คุ้มครองผู้รายงาน 100%:</strong> นโยบายบริษัทและระเบียบกฎหมายห้ามมิให้ดำเนินการเชิงลบต่อผู้รายงานข้อเท็จจริง
            </span>
          </li>
          <li className="flex items-start gap-2.5 text-[12px] text-[#475569] leading-snug">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong className="text-[#0f172a]">แจ้งเตือนสถานะโปร่งใส:</strong> รับข้อความยืนยันการรับเรื่อง ตรวจสอบ และภาพถ่ายหลังการแก้ไขเรียบร้อย
            </span>
          </li>
        </ul>

        <div className="mt-4 pt-3.5 border-t border-[#f1f5f9] flex items-center justify-between text-[11.5px]">
          <span className="text-[#64748b] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            ข้อตกลงระดับบริการ (SLA):
          </span>
          <span className="font-bold text-[#004ac6] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
            คัดกรองภายใน 4 ชั่วโมง
          </span>
        </div>
      </div>

      {/* 3. Points & Badges */}
      <div className="corporate-card bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200 shadow-2xs">
              <Trophy className="w-4 h-4" />
            </div>
            <h3 className="text-[14px] font-bold text-[#0b1c30] font-display">
              แต้มสะสม &amp; เหรียญเกียรติยศ
            </h3>
          </div>
          <span className="text-[17px] font-bold text-[#004ac6] font-display">
            {userPoints.toLocaleString()} แต้ม
          </span>
        </div>

        <p className="text-[12px] text-[#64748b] mt-2 leading-snug">
          ผู้มีส่วนร่วมด้านความปลอดภัยคือพลังสู่อุบัติเหตุเป็นศูนย์ (Zero Accident) แต้มสะสมสามารถแลกอุปกรณ์นิรภัยและรางวัลเกียรติยศ
        </p>

        {/* Incentive Pills */}
        <div className="mt-3.5 space-y-2">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f8faff] border border-[#eff4ff]">
            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#004ac6]">
              <span className="px-1.5 py-0.5 rounded bg-[#dbe1ff] text-[#00174b] text-[10.5px] font-bold">
                +50
              </span>
              แจ้งจุดอันตรายที่ผ่านการตรวจสอบ
            </span>
            <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100">คุณค่าสูง</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f8faff] border border-[#eff4ff]">
            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#004ac6]">
              <span className="px-1.5 py-0.5 rounded bg-[#dbe1ff] text-[#00174b] text-[10.5px] font-bold">
                +25
              </span>
              ข้อเสนอแนะปรับปรุงที่นำไปปฏิบัติจริง
            </span>
            <span className="text-[11px] font-medium text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100">พัฒนาต่อเนื่อง</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f8faff] border border-[#eff4ff]">
            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#004ac6]">
              <span className="px-1.5 py-0.5 rounded bg-[#dbe1ff] text-[#00174b] text-[10.5px] font-bold">
                +10
              </span>
              รายงานเหตุการณ์เกือบเกิดอุบัติเหตุ (Near-miss)
            </span>
            <span className="text-[11px] font-medium text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded border border-purple-100">การแจ้งเชิงรุก</span>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mt-4 pt-3.5 border-t border-[#f1f5f9]">
          <div className="flex items-center justify-between text-[11.5px] font-medium mb-1.5">
            <span className="text-[#0f172a] font-bold flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#004ac6]" />
              ระดับ 4: ผู้พิทักษ์ความปลอดภัยอาวุโส
            </span>
            <span className="text-[#64748b]">ขาดอีก 80 แต้มสู่ระดับ 5</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-[#e2e8f0] overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#004ac6] to-blue-500 rounded-full transition-all duration-500 shadow-2xs"
              style={{ width: '84%' }}
            />
          </div>
        </div>
      </div>

      {/* 4. My Recent Reports */}
      <div className="corporate-card bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-[#f1f5f9]">
          <h3 className="text-[14px] font-bold text-[#0b1c30] font-display">
            รายงานล่าสุดของฉัน
          </h3>
          <button
            type="button"
            onClick={onViewAllReports}
            className="text-[11.5px] font-bold text-[#004ac6] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>ดูทั้งหมด ({recentReports.length > 3 ? `${recentReports.length}` : '14'})</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="mt-3.5 space-y-2.5">
          {recentReports.slice(0, 3).map((report) => {
            const isResolved = report.status === 'Resolved';
            const isReview = report.status === 'Under Review';

            const statusThai = isResolved 
              ? 'แก้ไขเสร็จสิ้น' 
              : isReview 
              ? 'กำลังตรวจสอบ' 
              : report.status === 'Action Scheduled'
              ? 'กำหนดการแก้ไขแล้ว'
              : 'รอการคัดกรอง';

            return (
              <div
                key={report.id}
                onClick={() => onSelectReport(report)}
                className="p-3.5 rounded-xl border border-[#e2e8f0] hover:border-[#004ac6] hover:shadow-2xs cursor-pointer transition-all bg-white hover:bg-[#f8faff] group"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] font-mono font-bold text-[#004ac6] group-hover:underline">
                    {report.ticketId}
                  </span>

                  <span
                    className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full border ${
                      isResolved
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : isReview
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {isResolved && report.pointsBadge ? `${statusThai} • ${report.pointsBadge}` : statusThai}
                  </span>
                </div>

                <h4 className="text-[12.5px] font-bold text-[#0f172a] mt-1.5 line-clamp-1 group-hover:text-[#004ac6] transition-colors">
                  {report.title}
                </h4>

                <p className="text-[11px] text-[#64748b] mt-1 flex items-center justify-between">
                  <span>{report.meta}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#004ac6] group-hover:translate-x-0.5 transition-all" />
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};


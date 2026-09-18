import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Clock, CheckCircle2, UserCheck, ArrowLeft } from 'lucide-react';
import { RecentReport } from '../types';

interface AdminViewProps {
  onBackToSubmit: () => void;
  reports: RecentReport[];
  onUpdateStatus: (id: string, newStatus: RecentReport['status']) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  onBackToSubmit,
  reports,
  onUpdateStatus,
}) => {
  const [filterSeverity, setFilterSeverity] = useState('all');

  return (
    <div className="space-y-6">
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between pb-2 border-b border-[#e2e8f0]">
        <div>
          <button
            onClick={onBackToSubmit}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#004ac6] hover:underline mb-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            กลับสู่แบบฟอร์มรายงานความปลอดภัย
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-[#0b1c30] font-display">
              ระบบวิเคราะห์ &amp; คิวคัดกรองสำหรับผู้ดูแล (Admin)
            </h2>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold">
              โหมดผู้ตรวจสอบมาตรฐาน (COMPLIANCE AUDITOR)
            </span>
          </div>
          <p className="text-[13.5px] text-[#64748b]">
            ตรวจสอบรายงานเหตุการณ์ที่เข้ามา มอบหมายวิศวกรผู้รับผิดชอบ และตรวจทานความสอดคล้องตามมาตรฐาน OSHA
          </p>
        </div>
      </div>

      {/* Triage Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-white border border-[#e2e8f0] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#64748b] uppercase">คิวคัดกรองที่กำลังดำเนินการ</span>
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          </div>
          <div className="text-2xl font-bold text-[#0f172a] font-display mt-1">3 ตั๋วงาน</div>
          <p className="text-[11.5px] text-[#64748b] mt-0.5">อยู่ภายในกรอบเวลา SLA 4 ชั่วโมง</p>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#e2e8f0] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#64748b] uppercase">มอบหมายช่างซ่อมบำรุงแล้ว</span>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          </div>
          <div className="text-2xl font-bold text-[#0f172a] font-display mt-1">7 ใบสั่งงาน</div>
          <p className="text-[11.5px] text-[#64748b] mt-0.5">ระบบไฮดรอลิก ไฟฟ้า และปรับอากาศ HVAC</p>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#e2e8f0] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#64748b] uppercase">เกราะคุ้มครองผู้แจ้งเบาะแส</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-700 font-display mt-1">เข้ารหัส AES-256</div>
          <p className="text-[11.5px] text-[#64748b] mt-0.5">ประวัติการรั่วไหลของข้อมูลเป็น 0</p>
        </div>
      </div>

      {/* Reports Queue */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] overflow-hidden shadow-xs">
        <div className="p-4 border-b border-[#e2e8f0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-[15px] font-bold text-[#0f172a]">
            รายงานเหตุการณ์ที่รอการตรวจสอบ
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[#64748b]">ระดับความรุนแรง:</span>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="text-[12px] h-8 px-2 rounded border border-[#cbd5e1] bg-white text-[#0f172a]"
            >
              <option value="all">ทุกระดับความรุนแรง</option>
              <option value="critical">ระดับวิกฤต / ด่วนที่สุด</option>
              <option value="high">ระดับสูง (High Priority)</option>
              <option value="moderate">ระดับปานกลาง (Moderate Risk)</option>
              <option value="low">ระดับต่ำ / งานทั่วไป</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-[#f1f5f9]">
          {reports
            .filter((r) => filterSeverity === 'all' || r.severity === filterSeverity)
            .map((report) => {
              const severityThai = 
                report.severity === 'critical' ? 'วิกฤต' :
                report.severity === 'high' ? 'สูง' :
                report.severity === 'moderate' ? 'ปานกลาง' : 'ต่ำ';

              return (
                <div key={report.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#f8f9ff] transition-colors">
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-bold text-[12.5px] text-[#004ac6]">
                        {report.ticketId}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        report.severity === 'critical' ? 'bg-rose-100 text-rose-800' :
                        report.severity === 'high' ? 'bg-blue-100 text-blue-800' :
                        report.severity === 'moderate' ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {severityThai}
                      </span>
                      <span className="text-[11px] text-[#64748b]">{report.category}</span>
                      <span className="text-[11px] text-[#64748b]">• {report.date}</span>
                    </div>
                    <h4 className="text-[14px] font-bold text-[#0f172a]">
                      {report.title}
                    </h4>
                    <p className="text-[12px] text-[#64748b]">
                      {report.meta}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={report.status}
                      onChange={(e) => onUpdateStatus(report.id, e.target.value as any)}
                      className="h-8 px-2.5 text-[12px] font-medium rounded border border-[#cbd5e1] bg-white text-[#0f172a] focus:outline-none focus:ring-1 focus:ring-[#004ac6]"
                    >
                      <option value="In Triage">รอการคัดกรอง</option>
                      <option value="Under Review">กำลังตรวจสอบ</option>
                      <option value="Action Scheduled">กำหนดการแก้ไขแล้ว</option>
                      <option value="Resolved">แก้ไขเสร็จสิ้น</option>
                    </select>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

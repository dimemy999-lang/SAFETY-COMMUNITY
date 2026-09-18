import React, { useState } from 'react';
import { X, Search, Filter, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { RecentReport } from '../types';

interface ViewAllReportsModalProps {
  reports: RecentReport[];
  selectedReport?: RecentReport | null;
  onClose: () => void;
}

export const ViewAllReportsModal: React.FC<ViewAllReportsModalProps> = ({
  reports,
  selectedReport,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredReports = reports.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl border border-[#cbd5e1] shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#e2e8f0] flex items-center justify-between bg-[#f8f9ff]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#eff4ff] text-[#004ac6] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0f172a] font-display">
                รายงานความปลอดภัยและการปรับปรุงทั้งหมด
              </h3>
              <p className="text-[12px] text-[#64748b]">
                ติดตามขั้นตอนการคัดกรองแบบเรียลไทม์ ความสอดคล้องตามมาตรฐาน SLA และบันทึกการแก้ไข
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md flex items-center justify-center text-[#64748b] hover:text-[#0f172a] hover:bg-[#e2e8f0] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 border-b border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between gap-3 bg-white">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#94a3b8] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="ค้นหาเลขตั๋ว, หัวข้อ หรือหมวดหมู่..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 h-9 text-[12.5px] rounded-md border border-[#cbd5e1] bg-white text-[#0f172a] focus:outline-none focus:ring-1 focus:ring-[#004ac6]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-[#64748b]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 px-3 text-[12.5px] rounded-md border border-[#cbd5e1] bg-white text-[#0f172a] focus:outline-none focus:ring-1 focus:ring-[#004ac6]"
            >
              <option value="all">สถานะทั้งหมด</option>
              <option value="Resolved">แก้ไขเสร็จสิ้น</option>
              <option value="Under Review">กำลังตรวจสอบ</option>
              <option value="In Triage">รอการคัดกรอง</option>
            </select>
          </div>
        </div>

        {/* Reports Table List */}
        <div className="overflow-y-auto flex-1 p-4 space-y-3">
          {filteredReports.map((report) => {
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
                className="p-4 rounded-lg border border-[#e2e8f0] hover:border-[#cbd5e1] hover:bg-[#f8f9ff] transition-all bg-white"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-mono font-bold text-[13px] text-[#004ac6]">
                      {report.ticketId}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-[#f1f5f9] text-[#475569] font-medium">
                      {report.category}
                    </span>
                    <span className="text-[11px] text-[#64748b]">
                      ตรวจพบเมื่อ: {report.date}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border self-start sm:self-auto ${
                      isResolved
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : isReview
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {isResolved && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                    {isResolved && report.pointsBadge ? `${statusThai} • ${report.pointsBadge}` : statusThai}
                  </span>
                </div>

                <h4 className="text-[14px] font-bold text-[#0f172a] mt-2">
                  {report.title}
                </h4>

                <p className="text-[12px] text-[#64748b] mt-1">
                  {report.meta}
                </p>
              </div>
            );
          })}

          {filteredReports.length === 0 && (
            <div className="py-12 text-center text-[#64748b]">
              <AlertCircle className="w-8 h-8 mx-auto text-[#94a3b8] mb-2" />
              <p className="text-[13px] font-medium">ไม่พบรายงานที่ตรงกับคำค้นหา</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#e2e8f0] bg-[#f8f9ff] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-white border border-[#cbd5e1] text-[#0f172a] text-[13px] font-semibold hover:bg-[#f1f5f9] transition-colors cursor-pointer"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};

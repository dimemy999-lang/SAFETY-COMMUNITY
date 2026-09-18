import React from 'react';
import { Trophy, TrendingUp, ShieldCheck, Award, ArrowLeft } from 'lucide-react';
import { LEADERBOARD_MEMBERS } from '../data/mockData';

interface AnalyticsViewProps {
  onBackToSubmit: () => void;
  userPoints: number;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  onBackToSubmit,
  userPoints,
}) => {
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
          <h2 className="text-2xl font-bold text-[#0b1c30] font-display">
            อันดับผู้นำความปลอดภัย &amp; สถิติภาพรวมองค์กร
          </h2>
          <p className="text-[13.5px] text-[#64748b]">
            ติดตามสถิติอุบัติเหตุเป็นศูนย์ ความเร็วในการจัดการจุดอันตราย และเหรียญเกียรติยศประจำไตรมาส
          </p>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-white border border-[#e2e8f0] shadow-xs">
          <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
            แต้มสะสมทั้งหมด
          </span>
          <div className="text-2xl font-bold text-[#004ac6] font-display mt-1">
            {userPoints.toLocaleString()} แต้ม
          </div>
          <p className="text-[11.5px] text-emerald-600 font-semibold mt-1">
            อันดับที่ 1 ในฝ่ายปฏิบัติการ
          </p>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#e2e8f0] shadow-xs">
          <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
            จำนวนวันไร้อุบัติเหตุ (Zero-Incident)
          </span>
          <div className="text-2xl font-bold text-[#0b1c30] font-display mt-1">
            142 วันต่อเนื่อง
          </div>
          <p className="text-[11.5px] text-emerald-600 font-semibold mt-1">
            เกินเป้าหมายโรงงาน +38 วัน
          </p>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#e2e8f0] shadow-xs">
          <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
            เวลาคัดกรองเฉลี่ย (Average Triage)
          </span>
          <div className="text-2xl font-bold text-[#0b1c30] font-display mt-1">
            1.8 ชั่วโมง
          </div>
          <p className="text-[11.5px] text-emerald-600 font-semibold mt-1">
            ผ่านมาตรฐาน SLA (&lt; 4 ชม.)
          </p>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#e2e8f0] shadow-xs">
          <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
            อัตราการแก้ไขเสร็จสิ้น
          </span>
          <div className="text-2xl font-bold text-[#0b1c30] font-display mt-1">
            96.4%
          </div>
          <p className="text-[11.5px] text-emerald-600 font-semibold mt-1">
            แก้ไขแล้ว 348 จาก 361 รายการ
          </p>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] overflow-hidden shadow-xs">
        <div className="p-4 border-b border-[#e2e8f0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <h3 className="text-[15px] font-bold text-[#0f172a]">
              สุดยอดผู้พิทักษ์ความปลอดภัย: ประจำไตรมาส 2 / 2025
            </h3>
          </div>
          <span className="text-[11.5px] text-[#64748b]">
            อัปเดตทุกชั่วโมง • โรงงานหลัก (Austin Plant)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#f8f9ff] text-[#64748b] text-[11px] font-semibold uppercase tracking-wider border-b border-[#e2e8f0]">
              <tr>
                <th className="py-2.5 px-4 w-12 text-center">อันดับ</th>
                <th className="py-2.5 px-4">ผู้ร่วมรายงาน</th>
                <th className="py-2.5 px-4">แผนก/ส่วนงาน</th>
                <th className="py-2.5 px-4 text-center">จำนวนรายงาน</th>
                <th className="py-2.5 px-4">เหรียญเกียรติยศที่ได้รับ</th>
                <th className="py-2.5 px-4 text-right">แต้มสะสม</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {LEADERBOARD_MEMBERS.map((member) => (
                <tr
                  key={member.rank}
                  className={`hover:bg-[#f8f9ff] transition-colors ${
                    member.rank === 1 ? 'bg-[#eff4ff]/40 font-medium' : ''
                  }`}
                >
                  <td className="py-3 px-4 text-center font-bold text-[#0f172a]">
                    {member.rank === 1 ? '🥇' : member.rank === 2 ? '🥈' : member.rank === 3 ? '🥉' : `#${member.rank}`}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover border border-[#cbd5e1]"
                      />
                      <div>
                        <div className="font-bold text-[#0f172a]">{member.name}</div>
                        <div className="text-[11px] text-[#64748b]">{member.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#475569]">{member.department}</td>
                  <td className="py-3 px-4 text-center font-mono font-semibold text-[#0f172a]">
                    {member.reportsSubmitted}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {member.badges.map((b) => (
                        <span
                          key={b}
                          className="px-2 py-0.5 rounded text-[10.5px] font-medium bg-[#eff4ff] text-[#004ac6] border border-[#dbe1ff]"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-[#004ac6]">
                    {member.points.toLocaleString()} แต้ม
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

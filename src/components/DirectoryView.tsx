import React, { useState } from 'react';
import { Users, Search, Mail, Phone, Building, ArrowLeft, Shield } from 'lucide-react';
import { LEADERBOARD_MEMBERS, DEPARTMENTS } from '../data/mockData';

interface DirectoryViewProps {
  onBackToSubmit: () => void;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({ onBackToSubmit }) => {
  const [search, setSearch] = useState('');

  const members = [
    ...LEADERBOARD_MEMBERS,
    {
      rank: 6,
      name: 'Chen Wei',
      role: 'EHS Safety Supervisor & Auditor',
      department: 'Operations & Field Logistics',
      points: 790,
      reportsSubmitted: 14,
      badges: ['Certified OSHA Trainer'],
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    },
    {
      rank: 7,
      name: 'Sarah Jenkins',
      role: 'Chemical Hygiene Officer',
      department: 'Chemical Processing & Labs',
      points: 720,
      reportsSubmitted: 12,
      badges: ['Biohazard Shield'],
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
    },
  ];

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase()) ||
      m.department.toLowerCase().includes(search.toLowerCase())
  );

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
            ทำเนียบเจ้าหน้าที่ความปลอดภัย &amp; บุคลากรประจำโรงงาน
          </h2>
          <p className="text-[13.5px] text-[#64748b]">
            ช่องทางติดต่อโดยตรงสำหรับผู้ตรวจการความปลอดภัยประจำพื้นที่ เจ้าหน้าที่ป้องกันอัคคีภัย และหัวหน้าแผนก EHS
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="max-w-md relative">
        <Search className="w-4 h-4 text-[#94a3b8] absolute left-3 top-2.5" />
        <input
          type="text"
          placeholder="ค้นหาตามชื่อ, ตำแหน่ง หรือแผนก..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 h-9 text-[13px] rounded-md border border-[#cbd5e1] bg-white text-[#0f172a] focus:outline-none focus:ring-1 focus:ring-[#004ac6]"
        />
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((member) => (
          <div
            key={member.name}
            className="p-4 rounded-lg bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between"
          >
            <div className="flex items-start gap-3">
              <img
                src={member.avatarUrl}
                alt={member.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover border border-[#cbd5e1] shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-[14px] font-bold text-[#0f172a] truncate">
                  {member.name}
                </h4>
                <p className="text-[12px] text-[#004ac6] font-medium truncate">
                  {member.role}
                </p>
                <p className="text-[11px] text-[#64748b] truncate mt-0.5">
                  {member.department}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#f1f5f9] flex items-center justify-between text-[11px] text-[#64748b]">
              <span className="inline-flex items-center gap-1 font-medium text-[#004ac6]">
                <Shield className="w-3.5 h-3.5" />
                {member.points} แต้มความปลอดภัย
              </span>
              <span className="font-semibold px-2 py-0.5 rounded bg-[#f1f5f9] text-[#334155]">
                {member.reportsSubmitted} รายงานที่ส่ง
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

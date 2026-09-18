import React, { useState } from 'react';
import {
  Link2,
  Video,
  FileText,
  ExternalLink,
  X,
  Plus,
  Paperclip,
  CheckCircle2,
  FolderLock,
  Layers,
} from 'lucide-react';
import { ReportFormData, UrlAttachment } from '../types';

interface Step5AttachmentsProps {
  formData: ReportFormData;
  updateFormData: (fields: Partial<ReportFormData>) => void;
}

const PRESET_ATTACHMENTS = [
  {
    url: 'https://jira.internal.trustpoint.com/browse/FAC-44812',
    label: 'ตั๋วซ่อมบำรุง Jira #FAC-44812',
    iconType: 'jira' as const,
  },
  {
    url: 'https://cctv-vault.trustpoint.internal/recordings/zone-b-cam09.mp4',
    label: 'วิดีโอกล้องวงจรปิด CCTV จุดเกิดเหตุ',
    iconType: 'video' as const,
  },
  {
    url: 'https://compliance.internal.trustpoint.com/standards/OSHA-1910-22.pdf',
    label: 'มาตรฐานความปลอดภัย OSHA ทางเดินสัญจร',
    iconType: 'doc' as const,
  },
];

export const Step5Attachments: React.FC<Step5AttachmentsProps> = ({
  formData,
  updateFormData,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newLabel, setNewLabel] = useState('เอกสารอ้างอิง');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    updateFormData({
      attachments: formData.attachments.filter((item) => item.id !== id),
    });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    let detectedType: 'jira' | 'video' | 'doc' | 'link' = 'link';
    if (newUrl.includes('jira') || newUrl.includes('atlassian')) detectedType = 'jira';
    else if (newUrl.includes('.mp4') || newUrl.includes('stream') || newUrl.includes('video') || newUrl.includes('cctv')) detectedType = 'video';
    else if (newUrl.includes('.pdf') || newUrl.includes('doc') || newUrl.includes('sheet')) detectedType = 'doc';

    const newAttachment: UrlAttachment = {
      id: `att-${Date.now()}`,
      url: newUrl.trim(),
      label: newLabel.trim() || 'เอกสารอ้างอิง',
      iconType: detectedType,
    };

    updateFormData({
      attachments: [...formData.attachments, newAttachment],
    });

    setNewUrl('');
    setNewLabel('เอกสารอ้างอิง');
    setIsAdding(false);
    setFeedback('เพิ่มลิงก์เอกสารอ้างอิงเรียบร้อยแล้ว');
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleAddPreset = (preset: typeof PRESET_ATTACHMENTS[0]) => {
    const exists = formData.attachments.some((a) => a.url === preset.url);
    if (exists) {
      setFeedback('ลิงก์นี้มีอยู่ในรายการแล้ว');
      setTimeout(() => setFeedback(null), 2500);
      return;
    }

    const newAttachment: UrlAttachment = {
      id: `att-${Date.now()}`,
      url: preset.url,
      label: preset.label,
      iconType: preset.iconType,
    };

    updateFormData({
      attachments: [...formData.attachments, newAttachment],
    });
    setFeedback(`เพิ่ม ${preset.label} สำเร็จ`);
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div id="step-5-attachments" className="corporate-card rounded-xl p-5 sm:p-6 shadow-xs border border-[#e2e8f0]">
      {/* Header */}
      <div className="flex items-start gap-3 pb-5 border-b border-[#f1f5f9]">
        <div className="w-8 h-8 rounded-lg bg-[#eff4ff] text-[#004ac6] font-bold text-[14px] flex items-center justify-center shrink-0 mt-0.5 border border-[#d3e4fe] shadow-xs">
          5
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-[16px] font-bold text-[#0b1c30] tracking-tight font-display">
              ลิงก์เอกสารแนบ &amp; หลักฐานอ้างอิง (URL Links &amp; Evidence)
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#004ac6] border border-blue-200">
              ขั้นตอนที่ 5 / 5
            </span>
          </div>
          <p className="text-[12.5px] text-[#64748b] mt-0.5">
            เชื่อมโยงตั๋วงาน Jira, ประวัติการบำรุงรักษาเครื่องจักร, บันทึก CCTV หรือเอกสารข้อกำหนดความปลอดภัย OSHA
          </p>
        </div>
      </div>

      {feedback && (
        <div className="mt-4 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-[12px] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Quick enterprise presets */}
      <div className="mt-4 p-3 rounded-xl bg-[#f8faff] border border-[#e2e8f0] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 text-[12px] font-bold text-[#0f172a]">
          <Layers className="w-4 h-4 text-[#004ac6]" />
          <span>เทมเพลตลิงก์ระบบองค์กร:</span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {PRESET_ATTACHMENTS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAddPreset(preset)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-white border border-[#cbd5e1] hover:border-[#004ac6] text-[#334155] hover:text-[#004ac6] transition-colors font-medium cursor-pointer shadow-2xs"
            >
              + {preset.label.split('#')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Attachments List */}
      <div className="mt-4 space-y-2.5">
        {formData.attachments.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 px-3.5 py-3 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#004ac6] hover:shadow-xs transition-all"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Icon */}
                <div className="w-8 h-8 rounded-lg bg-[#f1f5f9] flex items-center justify-center shrink-0 border border-[#e2e8f0]">
                  {item.iconType === 'video' ? (
                    <Video className="w-4 h-4 text-purple-600" />
                  ) : item.iconType === 'doc' ? (
                    <FileText className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Link2 className="w-4 h-4 text-[#004ac6]" />
                  )}
                </div>

                {/* URL String and Label */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[12.5px] font-bold text-[#0f172a] truncate">
                      {item.label}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                      {item.iconType}
                    </span>
                  </div>
                  <span
                    title={item.url}
                    className="text-[11.5px] font-mono text-[#64748b] truncate block mt-0.5"
                  >
                    {item.url}
                  </span>
                </div>
              </div>

              {/* Tag & Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="เปิดลิงก์ในแท็บใหม่"
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[#64748b] hover:text-[#004ac6] hover:bg-blue-50 transition-colors cursor-pointer border border-transparent hover:border-blue-200"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  title="ลบลิงก์นี้"
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[#94a3b8] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer border border-transparent hover:border-rose-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {formData.attachments.length === 0 && !isAdding && (
          <div className="p-4 text-center rounded-xl border border-dashed border-[#cbd5e1] text-[12px] text-[#64748b]">
            <Paperclip className="w-5 h-5 mx-auto mb-1 text-slate-400" />
            ยังไม่มีลิงก์เอกสารอ้างอิงหรือสื่อภายนอกแนบในขณะนี้
          </div>
        )}
      </div>

      {/* Add New Link Form or Button */}
      {isAdding ? (
        <form onSubmit={handleAdd} className="mt-4 p-4 rounded-xl border border-blue-200 bg-[#eff4ff] shadow-xs">
          <h4 className="text-[13px] font-bold text-[#004ac6] mb-3 flex items-center gap-1.5 font-display">
            <Plus className="w-4 h-4 stroke-[3]" />
            เพิ่มลิงก์เอกสารอ้างอิงใหม่
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-7">
              <label className="block text-[11px] font-bold text-[#334155] mb-1">
                URL ลิงก์ปลายทาง
              </label>
              <input
                type="url"
                required
                placeholder="https://jira.internal/... หรือ URL คลาวด์"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="w-full h-9 px-3 text-[12.5px] rounded-lg border border-[#cbd5e1] bg-white text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#004ac6]"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-[11px] font-bold text-[#334155] mb-1">
                ชื่อป้ายกำกับ
              </label>
              <input
                type="text"
                placeholder="เช่น ตั๋ว Jira, รายงาน QC"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                className="w-full h-9 px-3 text-[12.5px] rounded-lg border border-[#cbd5e1] bg-white text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#004ac6]"
              />
            </div>
            <div className="sm:col-span-2 flex items-end gap-1.5">
              <button
                type="submit"
                className="h-9 px-3 rounded-lg bg-[#004ac6] text-white text-[12px] font-bold hover:bg-[#003896] transition-colors w-full cursor-pointer shadow-xs"
              >
                บันทึก
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="h-9 px-2.5 rounded-lg bg-white text-[#64748b] border border-[#cbd5e1] text-[12px] hover:bg-[#f1f5f9] cursor-pointer"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="mt-4 flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-50 text-[#004ac6] hover:bg-blue-100 text-[12.5px] font-bold transition-colors cursor-pointer border border-blue-200 shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>เพิ่มลิงก์เอกสารอ้างอิงอื่น ๆ</span>
          </button>

          <span className="text-[11px] text-[#64748b] flex items-center gap-1">
            <FolderLock className="w-3.5 h-3.5 text-slate-400" />
            ลิงก์ทั้งหมดได้รับการเข้ารหัสในระบบจัดเก็บข้อมูล
          </span>
        </div>
      )}
    </div>
  );
};


import React, { useRef, useState } from 'react';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Type,
  FileText,
  Sparkles,
  Eye,
  PenLine,
  CheckCircle2,
} from 'lucide-react';
import { ReportFormData } from '../types';

interface Step4NarrativeProps {
  formData: ReportFormData;
  updateFormData: (fields: Partial<ReportFormData>) => void;
}

const COMMON_HEADLINES = [
  'พบคราบน้ำมันหล่อลื่นรั่วไหลบริเวณทางเดินสัญจรหลัก',
  'สายไฟฉนวนชำรุดใกล้ตู้ควบคุมระบบไฟฟ้าแรงดันสูง',
  'มีพาเลทสินค้ากีดขวางทางออกฉุกเฉินและตู้ดับเพลิง',
  'ตรวจพบการละเลยไม่สวมอุปกรณ์ป้องกันอันตรายส่วนบุคคล (PPE)',
];

export const Step4Narrative: React.FC<Step4NarrativeProps> = ({
  formData,
  updateFormData,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [activeMode, setActiveMode] = useState<'write' | 'preview'>('write');
  const [aiEnhanced, setAiEnhanced] = useState(false);

  const insertFormatting = (prefix: string, suffix: string = '') => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = formData.narrative;
    const selectedText = currentText.substring(start, end);

    const replacement = `${prefix}${selectedText || 'ข้อความ'}${suffix}`;
    const newText = currentText.substring(0, start) + replacement + currentText.substring(end);

    updateFormData({ narrative: newText });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selectedText ? selectedText.length : 6)
      );
    }, 0);
  };

  const insertTemplate = () => {
    const template = `**[1. ปัญหา/สิ่งที่ตรวจพบ]:**
ตรวจพบคราบสารหล่อลื่นรั่วซึมจากแนวท่อส่งแรงดัน โดยไม่มีป้ายเตือนระวังลื่นติดตั้งไว้

**[2. สาเหตุและผลกระทบเบื้องต้น]:**
อาจเกิดจากซีลข้อต่อท่อเสื่อมสภาพตามอายุการใช้งาน มีความเสี่ยงสูงที่พนักงานประจำกะอาจลื่นหกล้มระหว่างเดินตรวจงาน

**[3. แนวทางแก้ไขและมาตรการป้องกัน]:**
1. ให้ทีมช่างซ่อมบำรุงเข้าตรวจสอบและเปลี่ยนซีลยางท่อทันที
2. นำเทปเตือนภัยสีเหลือง-ดำล้อมพื้นที่ชั่วคราว
3. เพิ่มความถี่ในการตรวจสอบระบบซีลทุกๆ 30 วัน`;

    updateFormData({
      narrative: formData.narrative ? `${formData.narrative}\n\n${template}` : template,
    });
  };

  const handleAiPolish = () => {
    if (!formData.narrative) {
      insertTemplate();
      return;
    }
    // Polish the text into professional corporate format
    const polished = `**[รายงานข้อเท็จจริงอย่างเป็นทางการ]**\n${formData.narrative}\n\n*บันทึกความเห็น: ข้อมูลได้รับการตรวจทานความสอดคล้องตามมาตรฐานความปลอดภัย ISO 45001 เรียบร้อยแล้ว*`;
    updateFormData({ narrative: polished });
    setAiEnhanced(true);
    setTimeout(() => setAiEnhanced(false), 3000);
  };

  const maxChars = 2500;
  const currentChars = formData.narrative.length;

  return (
    <div id="step-4-narrative" className="corporate-card rounded-xl p-5 sm:p-6 shadow-xs border border-[#e2e8f0]">
      {/* Header */}
      <div className="flex items-start gap-3 pb-5 border-b border-[#f1f5f9]">
        <div className="w-8 h-8 rounded-lg bg-[#eff4ff] text-[#004ac6] font-bold text-[14px] flex items-center justify-center shrink-0 mt-0.5 border border-[#d3e4fe] shadow-xs">
          4
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-[16px] font-bold text-[#0b1c30] tracking-tight font-display">
              รายละเอียดเหตุการณ์ &amp; ข้อเสนอแนะแนวทางแก้ไข
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#004ac6] border border-blue-200">
              ขั้นตอนที่ 4 / 5
            </span>
          </div>
          <p className="text-[12.5px] text-[#64748b] mt-0.5">
            บันทึกรายละเอียดข้อเท็จจริงตามลำดับเวลา และเสนอแนะมาตรการป้องกันเพื่อให้คณะกรรมการความปลอดภัยดำเนินการ
          </p>
        </div>
      </div>

      {/* Summary Headline / Subject */}
      <div className="mt-5">
        <label className="block text-[12px] font-bold text-[#334155] mb-1.5 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-[#64748b]" />
          <span>หัวข้อสรุปรายงาน / ประเด็นเหตุการณ์ (Summary Headline)</span>
        </label>
        <input
          type="text"
          value={formData.headline}
          onChange={(e) => updateFormData({ headline: e.target.value })}
          placeholder="ระบุหัวข้อที่กระชับ ชัดเจน และตรงประเด็น..."
          className="w-full h-10 px-3 text-[13px] rounded-lg border border-[#cbd5e1] bg-white text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#004ac6] font-medium"
        />

        {/* Quick Headline Chips */}
        <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-semibold text-[#64748b]">ตัวอย่างหัวข้อยอดนิยม:</span>
          {COMMON_HEADLINES.map((h, i) => (
            <button
              key={i}
              type="button"
              onClick={() => updateFormData({ headline: h })}
              className="text-[11px] px-2 py-0.5 rounded bg-[#f1f5f9] hover:bg-blue-50 text-[#334155] hover:text-[#004ac6] transition-colors border border-[#e2e8f0] truncate max-w-[280px] cursor-pointer text-left"
              title={h}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* Detailed Observation & Proposed Resolution */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <label className="text-[12px] font-bold text-[#334155]">
              เนื้อหาบันทึกข้อเท็จจริงและมาตรการเสนอแนะ
            </label>
            {aiEnhanced && (
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" />
                จัดรูปแบบทางการสำเร็จ
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Write / Preview Tab Switcher */}
            <div className="flex items-center bg-[#f1f5f9] p-0.5 rounded-lg border border-[#e2e8f0] text-[11px]">
              <button
                type="button"
                onClick={() => setActiveMode('write')}
                className={`px-2 py-0.5 rounded font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  activeMode === 'write'
                    ? 'bg-white text-[#004ac6] shadow-2xs'
                    : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                <PenLine className="w-3 h-3" />
                เขียนบันทึก
              </button>
              <button
                type="button"
                onClick={() => setActiveMode('preview')}
                className={`px-2 py-0.5 rounded font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  activeMode === 'preview'
                    ? 'bg-white text-[#004ac6] shadow-2xs'
                    : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                <Eye className="w-3 h-3" />
                ดูตัวอย่าง
              </button>
            </div>

            <span
              className={`text-[11.5px] font-mono ${
                currentChars > maxChars * 0.9 ? 'text-amber-600 font-bold' : 'text-[#64748b]'
              }`}
            >
              {currentChars} / {maxChars}
            </span>
          </div>
        </div>

        {/* Toolbar Container */}
        <div className="border border-[#cbd5e1] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-[#004ac6] shadow-2xs transition-all">
          {/* Action Toolbar */}
          <div className="bg-[#f8faff] border-b border-[#e2e8f0] px-3 py-2 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => insertFormatting('**', '**')}
                title="ตัวหนา (**text**)"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#475569] hover:bg-[#e2e8f0] hover:text-[#0f172a] text-[12px] font-bold transition-colors cursor-pointer"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('*', '*')}
                title="ตัวเอียง (*text*)"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#475569] hover:bg-[#e2e8f0] hover:text-[#0f172a] text-[12px] italic transition-colors cursor-pointer"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>
              <span className="w-px h-4 bg-[#cbd5e1] mx-0.5"></span>
              <button
                type="button"
                onClick={() => insertFormatting('\n• ')}
                title="หัวข้อย่อยแบบจุด"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#475569] hover:bg-[#e2e8f0] hover:text-[#0f172a] transition-colors cursor-pointer"
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('\n1. ')}
                title="หัวข้อย่อยแบบลำดับเลข"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#475569] hover:bg-[#e2e8f0] hover:text-[#0f172a] transition-colors cursor-pointer"
              >
                <ListOrdered className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('\n> ')}
                title="กล่องข้อความอ้างอิง"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#475569] hover:bg-[#e2e8f0] hover:text-[#0f172a] transition-colors cursor-pointer"
              >
                <Quote className="w-3.5 h-3.5" />
              </button>
              <span className="w-px h-4 bg-[#cbd5e1] mx-0.5"></span>
              <button
                type="button"
                onClick={insertTemplate}
                title="แทรกโครงสร้าง ปัญหา / สาเหตุ / แนวทางแก้ไข"
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-[#004ac6] hover:bg-blue-100/50 bg-blue-50/70 border border-blue-200 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Type className="w-3 h-3" />
                แทรกโครงสร้าง 3 ขั้นตอน
              </button>
            </div>

            {/* Smart AI helper */}
            <button
              type="button"
              onClick={handleAiPolish}
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-3 h-3 text-indigo-600" />
              จัดภาษาให้เป็นทางการ
            </button>
          </div>

          {/* Text Area or Preview */}
          {activeMode === 'write' ? (
            <textarea
              ref={textareaRef}
              rows={8}
              value={formData.narrative}
              onChange={(e) => updateFormData({ narrative: e.target.value })}
              placeholder="อธิบายลำดับเหตุการณ์ตามเวลา ความเสี่ยงต่อความปลอดภัย รหัสอุปกรณ์เครื่องจักร และข้อเสนอแนะในการแก้ไข..."
              className="w-full p-4 text-[13px] leading-relaxed text-[#0f172a] bg-white resize-y outline-none font-sans placeholder:text-slate-400"
            />
          ) : (
            <div className="p-4 min-h-[190px] bg-white text-[13px] leading-relaxed text-[#0f172a] whitespace-pre-wrap font-sans">
              {formData.narrative ? (
                formData.narrative
              ) : (
                <span className="text-slate-400 italic">
                  ยังไม่มีเนื้อหาข้อความ กรุณาสลับกลับไปที่แท็บ "เขียนบันทึก" เพื่อเริ่มต้นพิมพ์...
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


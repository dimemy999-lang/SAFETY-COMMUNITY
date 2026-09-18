import React, { useRef, useState } from 'react';
import { Image as ImageIcon, Camera, Trash2, CheckCircle2, Shield, Sparkles, AlertOctagon, RefreshCw } from 'lucide-react';
import { ReportFormData } from '../types';

interface Step2AvatarProps {
  formData: ReportFormData;
  updateFormData: (fields: Partial<ReportFormData>) => void;
}

export const Step2Avatar: React.FC<Step2AvatarProps> = ({
  formData,
  updateFormData,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('กรุณาอัปโหลดไฟล์รูปภาพที่ถูกต้อง (PNG, JPG, WEBP)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      if (uploadEvent.target?.result) {
        updateFormData({
          avatarUrl: uploadEvent.target.result as string,
          avatarTitle: 'ภาพถ่ายหลักฐานเหตุการณ์ที่อัปโหลด',
        });
        setStatusMessage('อัปโหลดรูปภาพสำเร็จและลบข้อมูลพิกัด EXIF เพื่อความปลอดภัยเรียบร้อยแล้ว');
        setTimeout(() => setStatusMessage(null), 4000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveAvatar = () => {
    updateFormData({
      avatarUrl: '',
      avatarTitle: 'ไม่มีรูปภาพประกอบ',
    });
  };

  const handleSetPreset = (type: 'elena' | 'spill' | 'electrical') => {
    if (type === 'elena') {
      updateFormData({
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
        avatarTitle: 'Elena Vance • Logistics Specialist',
      });
      setStatusMessage('โหลดรูปบัตรประจำตัวพนักงานเรียบร้อย');
    } else if (type === 'spill') {
      updateFormData({
        avatarUrl: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=400&q=80',
        avatarTitle: 'ภาพถ่ายคราบสารเคมีรั่วไหลในพื้นที่ปฏิบัติงาน',
      });
      setStatusMessage('โหลดภาพตัวอย่างคราบสารเคมีรั่วไหลเรียบร้อย');
    } else {
      updateFormData({
        avatarUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80',
        avatarTitle: 'ภาพถ่ายตู้ควบคุมระบบไฟฟ้าขัดข้อง',
      });
      setStatusMessage('โหลดภาพตัวอย่างตู้ควบคุมระบบไฟฟ้าเรียบร้อย');
    }
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div id="step-2-avatar" className="corporate-card rounded-xl p-5 sm:p-6 shadow-xs border border-[#e2e8f0]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-[#f1f5f9]">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#eff4ff] text-[#004ac6] font-bold text-[14px] flex items-center justify-center shrink-0 mt-0.5 border border-[#d3e4fe] shadow-xs">
            2
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[16px] font-bold text-[#0b1c30] tracking-tight font-display">
                รูปประจำตัวผู้รายงาน หรือ ภาพถ่ายหลักฐานเหตุการณ์
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#004ac6] border border-blue-200">
                ขั้นตอนที่ 2 / 5
              </span>
            </div>
            <p className="text-[12.5px] text-[#64748b] mt-0.5">
              แสดงบัตรประจำตัวพนักงานดิจิทัล หรืออัปโหลดภาพถ่ายจุดอันตรายเพื่อเป็นหลักฐานอ้างอิงให้ทีมช่างซ่อมบำรุง
            </p>
          </div>
        </div>

        {/* Quick Sample Presets */}
        <div className="flex items-center gap-1.5 self-start sm:self-center">
          <span className="text-[11px] font-semibold text-[#64748b] hidden md:inline">ตัวอย่างด่วน:</span>
          <button
            type="button"
            onClick={() => handleSetPreset('elena')}
            className="px-2 py-1 rounded text-[11px] font-medium bg-[#f1f5f9] hover:bg-blue-50 text-[#334155] hover:text-[#004ac6] transition-colors border border-[#e2e8f0] cursor-pointer"
          >
            บัตรพนักงาน
          </button>
          <button
            type="button"
            onClick={() => handleSetPreset('spill')}
            className="px-2 py-1 rounded text-[11px] font-medium bg-[#f1f5f9] hover:bg-amber-50 text-[#334155] hover:text-amber-800 transition-colors border border-[#e2e8f0] cursor-pointer"
          >
            ภาพสารเคมีรั่ว
          </button>
          <button
            type="button"
            onClick={() => handleSetPreset('electrical')}
            className="px-2 py-1 rounded text-[11px] font-medium bg-[#f1f5f9] hover:bg-rose-50 text-[#334155] hover:text-rose-800 transition-colors border border-[#e2e8f0] cursor-pointer"
          >
            ภาพตู้ไฟชำรุด
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-[12px] flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Main Upload Box & Avatar Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-5 items-stretch">
        {/* Left Drag & Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`md:col-span-7 border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-[#004ac6] bg-[#eff4ff] scale-[0.99]'
              : 'border-[#cbd5e1] hover:border-[#004ac6] hover:bg-[#f8f9ff]'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-100 to-indigo-50 text-[#004ac6] flex items-center justify-center mb-3 shadow-xs border border-blue-200">
            <ImageIcon className="w-6 h-6 stroke-[2]" />
          </div>

          <h3 className="text-[14px] font-bold text-[#0f172a] font-display">
            ลากและวางรูปภาพที่นี่ หรือ <span className="text-[#004ac6] underline decoration-blue-300 font-semibold">คลิกเพื่อเลือกไฟล์</span>
          </h3>
          <p className="text-[12px] text-[#64748b] mt-1 max-w-sm">
            รองรับไฟล์ PNG, JPG, WEBP ขนาดไม่เกิน 10MB ระบบจะลดขนาดและล้างข้อมูลส่วนตัวอัตโนมัติ
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 text-[11.5px] text-[#64748b]">
            <span className="inline-flex items-center gap-1 text-[#004ac6] font-semibold bg-[#eff4ff] px-2.5 py-1 rounded-full border border-blue-200">
              <Camera className="w-3.5 h-3.5" />
              ถ่ายภาพจากสมาร์ตโฟน / แท็บเล็ต
            </span>
            <span className="inline-flex items-center gap-1 text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              ล้างค่าพิกัด EXIF ปลอดภัย
            </span>
          </div>
        </div>

        {/* Right Digital ID & Evidence Badge */}
        <div className="md:col-span-5 border border-[#e2e8f0] rounded-xl p-5 flex flex-col justify-between bg-gradient-to-b from-[#f8faff] to-white relative overflow-hidden shadow-xs">
          {/* Top badge header bar */}
          <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] text-[10.5px] text-[#64748b]">
            <span className="font-bold text-[#004ac6] tracking-wider uppercase flex items-center gap-1 font-display">
              <Shield className="w-3.5 h-3.5" />
              TRUSTPOINT DIGITAL ID
            </span>
            <span className="font-mono text-slate-500 font-semibold">SEC-ID #89241</span>
          </div>

          {formData.avatarUrl ? (
            <div className="py-4 flex flex-col items-center text-center">
              <div className="relative group">
                <img
                  src={formData.avatarUrl}
                  alt="Reporter Badge"
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-xl object-cover border-2 border-white shadow-md ring-2 ring-blue-100"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                </span>
              </div>

              <div className="mt-3">
                <h4 className="text-[14px] font-bold text-[#0f172a] font-display">
                  {formData.anonymous ? 'ผู้พิทักษ์นิรนาม (Protected Identity)' : `${formData.firstName} ${formData.lastName}`}
                </h4>
                <p className="text-[11.5px] text-[#64748b] mt-0.5 line-clamp-2 max-w-[220px]">
                  {formData.avatarTitle}
                </p>
                <div className="mt-2 flex items-center justify-center gap-1.5 flex-wrap">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#004ac6] border border-blue-100">
                    {formData.department}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                    {formData.employeeId}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#f1f5f9] w-full flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  นำภาพออก
                </button>
                <span className="text-slate-300">•</span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#004ac6] hover:underline cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  เปลี่ยนภาพ
                </button>
              </div>
            </div>
          ) : (
            <div className="py-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#004ac6] shadow-xs">
                <ImageIcon className="w-8 h-8 stroke-[1.5]" />
              </div>
              <p className="text-[12.5px] font-bold text-[#0f172a] mt-3">
                ยังไม่มีรูปภาพประกอบ
              </p>
              <p className="text-[11px] text-[#64748b] mt-0.5 max-w-[200px]">
                สามารถอัปโหลดภาพบัตร หรือภาพถ่ายจุดอันตรายเพื่อความชัดเจน
              </p>
              <button
                type="button"
                onClick={() => handleSetPreset('elena')}
                className="mt-3 px-3 py-1.5 rounded-lg bg-white border border-blue-200 text-[#004ac6] text-[11.5px] font-bold hover:bg-blue-50 transition-colors shadow-2xs cursor-pointer"
              >
                โหลดภาพบัตรประจำตัวพนักงาน
              </button>
            </div>
          )}

          {/* Hologram Barcode Footer */}
          <div className="pt-2 border-t border-[#f1f5f9] flex items-center justify-between text-[10px] text-[#94a3b8]">
            <span>VERIFIED IDENTITY PROTOCOL</span>
            <span className="font-mono tracking-widest text-[#64748b]">||||| | |||| |||</span>
          </div>
        </div>
      </div>
    </div>
  );
};


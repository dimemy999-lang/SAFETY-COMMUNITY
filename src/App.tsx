import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BreadcrumbBar } from './components/BreadcrumbBar';
import { PortalHeader } from './components/PortalHeader';
import { Step1Reporter } from './components/Step1Reporter';
import { Step2Avatar } from './components/Step2Avatar';
import { Step3Classification } from './components/Step3Classification';
import { Step4Narrative } from './components/Step4Narrative';
import { Step5Attachments } from './components/Step5Attachments';
import { FormFooter } from './components/FormFooter';
import { SidebarWidgets } from './components/SidebarWidgets';
import { SubmitSuccessModal } from './components/SubmitSuccessModal';
import { ViewAllReportsModal } from './components/ViewAllReportsModal';
import { EmergencyModal } from './components/EmergencyModal';
import { AnalyticsView } from './components/AnalyticsView';
import { AdminView } from './components/AdminView';
import { DirectoryView } from './components/DirectoryView';
import { INITIAL_FORM_DATA, INITIAL_RECENT_REPORTS } from './data/mockData';
import { ReportFormData, RecentReport } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('submit');
  const [formData, setFormData] = useState<ReportFormData>(INITIAL_FORM_DATA);
  const [recentReports, setRecentReports] = useState<RecentReport[]>(INITIAL_RECENT_REPORTS);
  const [userPoints, setUserPoints] = useState<number>(1420);
  const [isDraftSaved, setIsDraftSaved] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedModalReport, setSubmittedModalReport] = useState<RecentReport | null>(null);
  const [showAllReportsModal, setShowAllReportsModal] = useState<boolean>(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState<boolean>(false);
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastNotification(message);
    setTimeout(() => {
      setToastNotification(null);
    }, 3500);
  };

  const updateFormData = (fields: Partial<ReportFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    setIsDraftSaved(false);
  };

  const handleSaveDraft = () => {
    setIsDraftSaved(true);
    showToast('บันทึกแบบร่างลงในเซสชันที่เข้ารหัสเรียบร้อยแล้ว');
  };

  const handleSubmit = () => {
    if (!formData.headline.trim()) {
      showToast('กรุณาระบุหัวข้อสรุปรายงานก่อนส่ง');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const newIdNumber = 813 + recentReports.length - INITIAL_RECENT_REPORTS.length;
      const newTicketId = `#SAF-2025-0${newIdNumber}`;

      const newReport: RecentReport = {
        id: `rep-${Date.now()}`,
        ticketId: newTicketId,
        title: formData.headline,
        status: 'In Triage',
        pointsBadge: '+50 แต้ม',
        meta: `ส่งรายงานเมื่อสักครู่ • มอบหมายผู้ประสานงาน EHS แล้ว`,
        category:
          formData.category === 'physical_safety'
            ? 'ความปลอดภัยทางกายภาพและสรีรศาสตร์'
            : formData.category === 'facility_hazard'
            ? 'อันตรายจากสถานที่ / เครื่องจักร'
            : formData.category === 'process_safety'
            ? 'ความปลอดภัยในกระบวนการทำงาน'
            : formData.category === 'environmental'
            ? 'สิ่งแวดล้อมและอาชีวอนามัย'
            : formData.category === 'cybersecurity'
            ? 'ความปลอดภัยไซเบอร์และข้อมูล'
            : 'ข้อเสนอแนะปรับปรุงสถานที่ทำงานทั่วไป',
        date: new Date().toISOString().split('T')[0],
        severity: formData.severity,
      };

      setRecentReports([newReport, ...recentReports]);
      setUserPoints((prev) => prev + 50);
      setSubmittedModalReport(newReport);
    }, 600);
  };

  const handleStartNewReport = () => {
    setFormData({
      ...INITIAL_FORM_DATA,
      headline: '',
      narrative: '',
      attachments: [],
    });
    setSubmittedModalReport(null);
    setActiveTab('submit');
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans">
      {/* 1. Main Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewIncident={() => {
          setActiveTab('submit');
          handleStartNewReport();
        }}
        userPoints={userPoints}
      />

      {/* 2. Breadcrumb & Status Sub-header */}
      <BreadcrumbBar onResetView={() => setActiveTab('submit')} />

      {/* Toast Notification */}
      {toastNotification && (
        <div className="fixed top-20 right-6 z-50 bg-[#0f172a] text-white px-4 py-2.5 rounded-lg shadow-xl text-[12.5px] font-medium flex items-center gap-2 border border-slate-700 animate-in slide-in-from-top-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastNotification}</span>
        </div>
      )}

      {/* Main Page Body Container */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {activeTab === 'submit' && (
          <>
            {/* Header with Title, Tag, and Encryption Badge */}
            <PortalHeader formData={formData} />

            {/* 2-Column Responsive Layout matching the screenshot */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-2">
              {/* Left Column: Form Steps 1 to 5 + Footer */}
              <div className="lg:col-span-8 space-y-5">
                <Step1Reporter
                  formData={formData}
                  updateFormData={updateFormData}
                />

                <Step2Avatar
                  formData={formData}
                  updateFormData={updateFormData}
                />

                <Step3Classification
                  formData={formData}
                  updateFormData={updateFormData}
                />

                <Step4Narrative
                  formData={formData}
                  updateFormData={updateFormData}
                />

                <Step5Attachments
                  formData={formData}
                  updateFormData={updateFormData}
                />

                <FormFooter
                  onSaveDraft={handleSaveDraft}
                  onSubmit={handleSubmit}
                  isDraftSaved={isDraftSaved}
                  isSubmitting={isSubmitting}
                />
              </div>

              {/* Right Column: Widgets (Urgent Danger, Guidelines, Points, Recent Reports) */}
              <div className="lg:col-span-4">
                <SidebarWidgets
                  userPoints={userPoints}
                  recentReports={recentReports}
                  onViewAllReports={() => setShowAllReportsModal(true)}
                  onOpenEmergencyModal={() => setShowEmergencyModal(true)}
                  onSelectReport={() => setShowAllReportsModal(true)}
                />
              </div>
            </div>
          </>
        )}

        {/* Tab 2: Leaderboard & Analytics */}
        {activeTab === 'analytics' && (
          <div className="pt-6">
            <AnalyticsView
              onBackToSubmit={() => setActiveTab('submit')}
              userPoints={userPoints}
            />
          </div>
        )}

        {/* Tab 3: Admin Intelligence */}
        {activeTab === 'admin' && (
          <div className="pt-6">
            <AdminView
              onBackToSubmit={() => setActiveTab('submit')}
              reports={recentReports}
              onUpdateStatus={(id, newStatus) => {
                setRecentReports((prev) =>
                  prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
                );
                showToast(`Report updated to "${newStatus}"`);
              }}
            />
          </div>
        )}

        {/* Tab 4: Member Directory */}
        {activeTab === 'directory' && (
          <div className="pt-6">
            <DirectoryView onBackToSubmit={() => setActiveTab('submit')} />
          </div>
        )}
      </main>

      {/* Modals */}
      {submittedModalReport && (
        <SubmitSuccessModal
          report={submittedModalReport}
          onClose={() => setSubmittedModalReport(null)}
          onNewReport={handleStartNewReport}
        />
      )}

      {showAllReportsModal && (
        <ViewAllReportsModal
          reports={recentReports}
          onClose={() => setShowAllReportsModal(false)}
        />
      )}

      {showEmergencyModal && (
        <EmergencyModal onClose={() => setShowEmergencyModal(false)} />
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { ScreenId } from '../types';
import { WORKER_RAVI } from '../mockData';

interface WorkerProfileScreenProps {
  setCurrentScreen: (screen: ScreenId) => void;
  onOpenChat: (partnerName: string) => void;
  onBookWorker: () => void;
}

export const WorkerProfileScreen: React.FC<WorkerProfileScreenProps> = ({
  setCurrentScreen,
  onOpenChat,
  onBookWorker,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'reviews' | 'coop'>('overview');

  return (
    <div className="min-h-screen bg-[#fafaf5] text-[#1a1c19] py-6 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={() => setCurrentScreen('customer-home')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#707975] hover:text-[#00342b] py-2 px-3.5 rounded-xl border border-[#e3e3de] bg-white hover:bg-slate-50 transition-colors self-start"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Back to Dashboard</span>
          </button>

          <button
            onClick={() => alert('Profile link copied: https://trustworkers.coop/p/ravi-kumar')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00342b] py-2 px-3.5 rounded-xl border border-[#e3e3de] bg-white hover:bg-slate-50 transition-colors"
          >
            <span className="material-symbols-outlined text-base">share</span>
            <span>Share Member Credential</span>
          </button>
        </div>

        {/* 2-Column Website Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Worker Bio & Verifications (5 cols, sticky) */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-20">
            {/* Profile Hero Card */}
            <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 shadow-2xs text-center relative overflow-hidden space-y-4">
              <div className="absolute top-4 right-4 bg-[#ffddb5] text-[#835500] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Member Owner #TW-9482
              </div>

              <div className="relative inline-block mx-auto mt-2">
                <img
                  src={WORKER_RAVI.avatarUrl}
                  alt={WORKER_RAVI.name}
                  className="w-24 h-24 rounded-3xl object-cover border-2 border-emerald-600 shadow-sm mx-auto"
                />
                <span className="material-symbols-outlined absolute -bottom-1 -right-1 bg-emerald-600 text-white text-lg p-1 rounded-full shadow">
                  verified
                </span>
              </div>

              <div>
                <h1 className="text-xl font-bold font-display text-[#1a1c19]">
                  {WORKER_RAVI.name}
                </h1>
                <p className="text-xs text-[#707975] mt-0.5">{WORKER_RAVI.title}</p>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#835500]">
                <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                  <span className="material-symbols-outlined text-base">star</span>
                  <span className="font-bold">{WORKER_RAVI.rating}</span>
                  <span className="text-slate-400 font-normal">({WORKER_RAVI.reviewsCount})</span>
                </div>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600">{WORKER_RAVI.experienceYears} Years Experience</span>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-700 font-bold">{WORKER_RAVI.jobsCompleted} Completed</span>
              </div>

              <div className="text-xs text-[#707975] flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-base text-[#835500]">location_on</span>
                <span>{WORKER_RAVI.cluster || WORKER_RAVI.mandal} (15 km operating radius)</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 grid grid-cols-3 gap-2">
                <button
                  onClick={() => alert(`Dialing Ravi Kumar: ${WORKER_RAVI.phone}`)}
                  className="py-3 rounded-xl border border-emerald-600/40 bg-emerald-50 text-emerald-900 font-bold text-xs flex flex-col items-center gap-1 hover:bg-emerald-100 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">call</span>
                  <span>Call Worker</span>
                </button>

                <button
                  onClick={() => onOpenChat(WORKER_RAVI.name)}
                  className="py-3 rounded-xl border border-slate-200 bg-white text-[#1a1c19] font-bold text-xs flex flex-col items-center gap-1 hover:bg-slate-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  <span>Direct Chat</span>
                </button>

                <button
                  onClick={onBookWorker}
                  className="py-3 rounded-xl bg-[#00342b] text-white font-bold text-xs flex flex-col items-center gap-1 shadow-sm hover:bg-[#004d40] transition-colors"
                >
                  <span className="material-symbols-outlined text-base">calendar_month</span>
                  <span>Book Service</span>
                </button>
              </div>
            </div>

            {/* Statutory Cooperative Verification Card */}
            <div className="bg-emerald-50/60 rounded-3xl border border-emerald-200 p-5 space-y-3 text-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">verified_user</span>
                <span>Statutory Cooperative Verification Audit</span>
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-2xl border border-emerald-100 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-emerald-700 text-xl">school</span>
                  <div>
                    <span className="font-bold text-[#1a1c19] block text-xs">10th Pass (SSC)</span>
                    <span className="text-[10px] text-slate-400 font-mono">SSC-2015-84920</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-2xl border border-emerald-100 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-emerald-700 text-xl">badge</span>
                  <div>
                    <span className="font-bold text-[#1a1c19] block text-xs">Police Cleared</span>
                    <span className="text-[10px] text-slate-400">West Godavari SP</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-2xl border border-emerald-100 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-emerald-700 text-xl">hardware</span>
                  <div>
                    <span className="font-bold text-[#1a1c19] block text-xs">ITI Certified</span>
                    <span className="text-[10px] text-slate-400">Electrical & Wiring</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-2xl border border-emerald-100 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-emerald-700 text-xl">security</span>
                  <div>
                    <span className="font-bold text-[#1a1c19] block text-xs">Co-op Insured</span>
                    <span className="text-[10px] text-slate-400">₹5 Lakhs Shield</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Tabs & Content (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Tab Selection */}
            <div className="flex items-center gap-2 bg-[#eeeee9] p-1.5 rounded-2xl text-xs">
              {[
                { id: 'overview', label: 'Rate Card & Bio' },
                { id: 'skills', label: 'Verified Skills & Tools' },
                { id: 'reviews', label: 'Verified Reviews' },
                { id: 'coop', label: 'Co-op Equity Share' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-center transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-[#00342b] shadow-xs'
                      : 'text-[#707975] hover:text-[#1a1c19]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-5">
                {/* Transparent Rates Card */}
                <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 shadow-2xs space-y-3 text-xs">
                  <h3 className="font-bold text-base text-[#1a1c19] pb-2 border-b border-slate-100">
                    Transparent Cooperative Base Rates (0% Middleman Surge)
                  </h3>
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <div>
                      <span className="font-bold text-[#1a1c19] block text-sm">Standard Hourly Craft Labor</span>
                      <span className="text-slate-400">General electrical wiring, fan, motor, switch repairs</span>
                    </div>
                    <span className="font-bold text-sm text-[#1a1c19]">₹250 / hour</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <div>
                      <span className="font-bold text-[#1a1c19] block text-sm">Emergency / Late Night Response</span>
                      <span className="text-slate-400">Services dispatched between 9 PM and 6 AM</span>
                    </div>
                    <span className="font-bold text-sm text-[#1a1c19]">₹350 / hour</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <div>
                      <span className="font-bold text-[#1a1c19] block text-sm">Diagnostic On-Site Inspection</span>
                      <span className="text-slate-400">Applied only if no service work is executed</span>
                    </div>
                    <span className="font-bold text-sm text-emerald-700">₹150 (Waived on repair)</span>
                  </div>
                </div>

                {/* Bio Card */}
                <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 shadow-2xs text-xs space-y-3">
                  <h3 className="font-bold text-base text-[#1a1c19]">Professional Background & Mandal Roots</h3>
                  <p className="text-[#3f4945] leading-relaxed text-sm">
                    7 years of verified on-ground electrical and sanitary plumbing experience across Undi, Bhimavaram, and neighboring mandals. Specializing in 3-phase agricultural pump wiring, home inverter configurations, submersible motor rewinding, and domestic pipeline leak diagnostics.
                  </p>
                  <p className="text-[#3f4945] leading-relaxed text-sm">
                    Ravi has been an active voting equity partner in the West Godavari Technicians Cooperative since 2021, upholding the co-op's ethical consumer service charter.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 shadow-2xs space-y-4 text-xs">
                <h3 className="font-bold text-base text-[#1a1c19]">Cooperative Certified Trade Proficiencies</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Single & 3-Phase Domestic Wiring',
                    'Submersible Motor Rewinding',
                    'Inverter & Tubular Battery Setup',
                    'Modular Switchboard Replacement',
                    'Acoustic Leak Detection & PVC Fitting',
                    'Instant Geyser & Water Heater Maintenance',
                    'MCB Earthing & Neutral Resistance Check',
                  ].map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 bg-[#fafaf5] text-[#1a1c19] font-semibold rounded-xl text-xs border border-[#e3e3de]"
                    >
                      ✓ {s}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <h4 className="font-bold text-sm text-[#1a1c19]">ISI Tool Kit & Safety Equipment</h4>
                  <p className="text-[#707975] text-xs leading-relaxed">
                    Technician operates with fully calibrated equipment: True-RMS digital multimeter, Megger insulation tester, Bosch rotary hammer drill, insulated VDE 1000V screwdrivers, and ISI safety harness.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 shadow-2xs space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-base text-[#1a1c19]">Verified Customer Feedback</h3>
                    <p className="text-xs text-slate-400">All reviews are tied to confirmed on-chain co-op jobs</p>
                  </div>
                  <span className="font-extrabold text-base text-[#835500]">★ 4.92 / 5.0 Rating</span>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#fafaf5] border border-[#e3e3de] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1a1c19] text-xs">Kishore M. • Undi</span>
                      <span className="text-amber-500 font-bold">★★★★★</span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      "Fixed the MCB tripping problem within 30 minutes. Extremely courteous, did not charge any hidden fees, and explained the fuse load clearly."
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#fafaf5] border border-[#e3e3de] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1a1c19] text-xs">Anitha P. • Green Park</span>
                      <span className="text-amber-500 font-bold">★★★★★</span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      "Arrived on time on his TVS bike. Brought genuine spare parts with printed vendor bill. Love that 100% of the money went directly to Ravi!"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'coop' && (
              <div className="bg-[#fffbeb] rounded-3xl border border-[#ffaa14]/50 p-6 shadow-2xs space-y-3 text-xs text-[#694300]">
                <h3 className="font-bold text-base text-[#2a1800]">Cooperative Equity & Governance Share</h3>
                <p className="text-xs leading-relaxed">
                  Ravi Kumar holds 12 voting shares in the TrustWorkers Cooperative Society Ltd. (Registration No. AP-COOP-2023-904).
                </p>
                <div className="bg-white/90 p-4 rounded-2xl border border-amber-200 space-y-2 text-xs">
                  <div><strong>Annual Dividend Payout:</strong> ₹14,200 (FY 2023-24)</div>
                  <div><strong>Pension & Accident Pool:</strong> Fully vested under Co-op Social Shield</div>
                  <div><strong>Democratic Board:</strong> Elected Undi Mandal Cluster Representative</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ScreenId, TeamMember, AvailabilityStatus } from '../types';
import { WORKER_RAVI, COOPERATIVE_TEAM_RAVI, INITIAL_TEAM_MEMBERS } from '../mockData';

interface WorkerHomeScreenProps {
  setCurrentScreen: (screen: ScreenId) => void;
  onOpenChat: (partnerName: string) => void;
}

export const WorkerHomeScreen: React.FC<WorkerHomeScreenProps> = ({
  setCurrentScreen,
  onOpenChat,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'team'>('profile');
  const [isOnDuty, setIsOnDuty] = useState(true);
  const [hasNewJob, setHasNewJob] = useState(true);
  const [jobAccepted, setJobAccepted] = useState(false);
  const [startOtpInput, setStartOtpInput] = useState('');
  const [jobStarted, setJobStarted] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(INITIAL_TEAM_MEMBERS);

  const availableCount = teamMembers.filter((m) => m.availability === 'Available').length;

  const handleToggleMemberAvailability = (memberId: string) => {
    setTeamMembers((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          const nextStatus: AvailabilityStatus =
            m.availability === 'Available'
              ? 'On Job'
              : m.availability === 'On Job'
              ? 'Off Duty'
              : 'Available';
          return { ...m, availability: nextStatus };
        }
        return m;
      })
    );
  };

  const handleAcceptBroadcast = () => {
    setJobAccepted(true);
    setHasNewJob(false);
  };

  const handleVerifyOtp = () => {
    if (startOtpInput === '4892') {
      setJobStarted(true);
      alert('OTP Verified! Job session started. Co-op timer active.');
    } else {
      alert('Invalid OTP. Please ask the customer for the 4-digit verification code.');
    }
  };

  const renderAvailabilityPill = (status: AvailabilityStatus, memberId: string) => {
    switch (status) {
      case 'Available':
        return (
          <button
            type="button"
            onClick={() => handleToggleMemberAvailability(memberId)}
            title="Click to update status"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 transition-colors shadow-2xs cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Available</span>
          </button>
        );
      case 'On Job':
        return (
          <button
            type="button"
            onClick={() => handleToggleMemberAvailability(memberId)}
            title="Click to update status"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-[#835500] border border-amber-300 hover:bg-amber-100 transition-colors shadow-2xs cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>On Job</span>
          </button>
        );
      case 'Off Duty':
      default:
        return (
          <button
            type="button"
            onClick={() => handleToggleMemberAvailability(memberId)}
            title="Click to update status"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-300 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            <span>Off Duty</span>
          </button>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf5] text-[#1a1c19] py-6 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Worker Control Header */}
        <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={WORKER_RAVI.avatarUrl}
              alt={WORKER_RAVI.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-600 shadow-2xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg text-[#1a1c19]">{WORKER_RAVI.name}</h1>
                <span className="material-symbols-outlined text-emerald-600 text-lg">verified</span>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
                  Lead Certified Partner
                </span>
              </div>
              <p className="text-xs text-[#707975] flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-sm text-[#835500]">location_on</span>
                <span>Undi Mandal Cooperative Cluster • West Godavari</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            {/* On/Off Duty Switch */}
            <button
              onClick={() => setIsOnDuty(!isOnDuty)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                isOnDuty
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs'
                  : 'bg-slate-100 text-slate-500 border border-slate-300'
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isOnDuty ? 'bg-emerald-600 animate-pulse' : 'bg-slate-400'
                }`}
              ></span>
              <span>{isOnDuty ? 'ON DUTY (BROADCASTS ACTIVE)' : 'OFF DUTY'}</span>
            </button>

            <button
              onClick={() => setCurrentScreen('worker-profile')}
              className="px-3 py-2 bg-[#fafaf5] hover:bg-slate-100 border border-[#e3e3de] rounded-xl text-xs font-bold text-[#00342b] transition-colors"
            >
              Partner Profile
            </button>
          </div>
        </div>

        {/* Dashboard View Toggle: My Profile vs My Team (Only visible if worker is Team Lead) */}
        {WORKER_RAVI.isTeamLead && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-2 bg-[#eeeee9] p-1.5 rounded-2xl text-xs w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-2.5 rounded-xl font-bold text-center transition-all ${
                  activeTab === 'profile'
                    ? 'bg-white text-[#00342b] shadow-xs'
                    : 'text-[#707975] hover:text-[#1a1c19]'
                }`}
              >
                My Profile
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('team')}
                className={`px-6 py-2.5 rounded-xl font-bold text-center transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'team'
                    ? 'bg-white text-[#00342b] shadow-xs'
                    : 'text-[#707975] hover:text-[#1a1c19]'
                }`}
              >
                <span>My Team</span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    activeTab === 'team'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-[#e0e0da] text-[#707975]'
                  }`}
                >
                  {availableCount}/{teamMembers.length} Available
                </span>
              </button>
            </div>

            {activeTab === 'team' && (
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs text-[#707975]">Co-op Team Guild:</span>
                <span className="text-xs font-bold text-[#00342b] bg-white border border-[#e3e3de] px-3 py-1.5 rounded-xl shadow-2xs">
                  {COOPERATIVE_TEAM_RAVI.teamName}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Tab 1: Existing Individual View (My Profile) */}
        {activeTab === 'profile' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Column: Metrics, Broadcasts & Active Job (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Daily Metrics Dashboard */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Today's Direct Payout */}
                <div className="bg-white rounded-3xl border border-[#e3e3de] p-5 shadow-2xs space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#707975] uppercase font-bold">
                    <span className="material-symbols-outlined text-emerald-700 text-base">payments</span>
                    <span>Today's Direct Pay</span>
                  </div>
                  <div className="text-2xl font-black text-[#00342b]">₹1,450</div>
                  <span className="text-xs text-emerald-700 font-semibold block">
                    100% Payout • ₹0 Comm. Deducted
                  </span>
                </div>

                {/* Jobs Completed */}
                <div className="bg-white rounded-3xl border border-[#e3e3de] p-5 shadow-2xs space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#707975] uppercase font-bold">
                    <span className="material-symbols-outlined text-[#835500] text-base">task_alt</span>
                    <span>Jobs Completed</span>
                  </div>
                  <div className="text-2xl font-black text-[#1a1c19]">3 Done</div>
                  <span className="text-xs text-[#835500] font-semibold block">
                    ★ 5.0 Rating Across All Jobs
                  </span>
                </div>

                {/* Welfare Pool Balance */}
                <div className="bg-white rounded-3xl border border-[#e3e3de] p-5 shadow-2xs space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#707975] uppercase font-bold">
                    <span className="material-symbols-outlined text-blue-700 text-base">security</span>
                    <span>Co-op Welfare Pool</span>
                  </div>
                  <div className="text-2xl font-black text-blue-900">₹320</div>
                  <span className="text-xs text-blue-700 font-semibold block">
                    Accident & Pension Protection
                  </span>
                </div>
              </div>

              {/* Incoming Job Broadcast Radar */}
              {hasNewJob && (
                <div className="bg-[#fffbeb] rounded-3xl border-2 border-[#ffaa14] p-6 shadow-sm space-y-4 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping"></span>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#835500]">
                        Live Job Broadcast • Undi Mandal
                      </span>
                    </div>
                    <span className="text-xs bg-amber-200/80 text-[#694300] font-bold px-3 py-1 rounded-full">
                      Broadcast expires in 42s
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h2 className="font-bold text-lg text-[#1a1c19]">
                      Emergency MCB Tripping & Switchboard Short Circuit
                    </h2>
                    <p className="text-xs text-[#707975]">
                      Customer: <strong>Venkateswara Rao</strong> • 1.2 km away in Sri Ram Nagar, Undi
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs bg-white/90 p-4 rounded-2xl border border-amber-200">
                    <div>
                      <span className="text-slate-500 block">Statutory Regulated Base Rate:</span>
                      <strong className="text-base text-[#00342b]">₹350 (First hour base) + Parts</strong>
                    </div>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg">
                      100% Direct Payout to You
                    </span>
                  </div>

                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setHasNewJob(false)}
                      className="flex-1 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
                    >
                      Decline Broadcast
                    </button>
                    <button
                      type="button"
                      onClick={handleAcceptBroadcast}
                      className="flex-1 py-3 rounded-xl bg-[#00342b] hover:bg-[#004d40] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">check</span>
                      <span>Accept Job (100% Payout Guaranteed)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Current Active Assignment Card */}
              <div className="bg-white rounded-3xl border-2 border-emerald-600/40 p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider bg-[#afefdd]/60 text-[#004d40] px-3 py-1 rounded-full">
                    {jobStarted ? 'Job In Progress (Timer Active)' : 'Active Assignment • En Route'}
                  </span>
                  <span className="text-sm font-bold text-[#835500]">₹500 Locked Base Rate</span>
                </div>

                <div className="space-y-1.5">
                  <h2 className="font-bold text-lg text-[#1a1c19]">
                    Dual Plumbing & Switchboard Repair
                  </h2>
                  <p className="text-xs text-[#707975]">
                    Customer: <strong>Ram</strong> (+91 98765 43210)
                  </p>
                  <p className="text-xs text-[#707975]">
                    Address: 42 Cooperative Way, Block B, Flat 302, Green Park, Undi
                  </p>
                  <p className="text-xs text-[#835500] font-semibold mt-1">
                    Dual Co-op Partner Assigned: <strong>Suresh Varma</strong> (Plumbing Specialist)
                  </p>
                </div>

                {/* OTP Start Verification Input */}
                {!jobStarted ? (
                  <div className="bg-[#fafaf5] p-4 rounded-2xl border border-slate-200 space-y-2.5">
                    <span className="text-xs font-bold text-[#1a1c19] block">
                      Enter Customer Doorstep OTP (Verification Code) to Begin Job
                    </span>
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <input
                        type="text"
                        maxLength={4}
                        value={startOtpInput}
                        onChange={(e) => setStartOtpInput(e.target.value)}
                        placeholder="e.g. 4892"
                        className="w-full sm:w-40 py-2.5 px-4 rounded-xl border border-slate-300 text-center font-mono font-bold text-base bg-white focus:outline-none focus:border-[#00342b]"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        className="flex-1 py-2.5 px-4 bg-[#00342b] text-white rounded-xl text-xs font-bold hover:bg-[#004d40] transition-colors shadow-xs"
                      >
                        Verify Code & Start Statutory Timer
                      </button>
                    </div>
                    <span className="text-[11px] text-slate-500 block">
                      Ask Ram for the 4-digit verification OTP on their phone screen.
                    </span>
                  </div>
                ) : (
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-emerald-700 text-2xl">timer</span>
                      <div>
                        <span className="font-bold text-emerald-900 block text-sm">Work Session in Progress</span>
                        <span className="text-xs text-emerald-700">Started at 2:05 PM • Standard Rate ₹250/hr</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentScreen('payment-confirm')}
                      className="px-4 py-2.5 bg-emerald-700 text-white rounded-xl font-bold text-xs hover:bg-emerald-800 transition-colors shadow-xs"
                    >
                      Complete & Issue Invoice
                    </button>
                  </div>
                )}

                {/* Worker Actions */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => alert('Launching Google Maps navigation to 42 Cooperative Way, Undi...')}
                    className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1a1c19] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base text-emerald-800">directions</span>
                    <span>Turn-by-Turn GPS</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenChat('Ram')}
                    className="py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#1a1c19] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                    <span>Direct Chat with Customer</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Worker Tools & Co-op Shield (4 cols, sticky) */}
            <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-20">
              {/* Worker Partner Tools */}
              <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 shadow-2xs space-y-4">
                <h3 className="font-bold text-xs text-[#1a1c19] uppercase tracking-wider">
                  Technician Member Tools
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => alert('Co-op UPI QR Code: ravi.electrician@oksbi displayed.')}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-600 bg-white text-left text-xs transition-colors group"
                  >
                    <span className="material-symbols-outlined text-emerald-800 text-2xl block mb-1 group-hover:scale-110 transition-transform">
                      qr_code
                    </span>
                    <span className="font-bold text-[#1a1c19] block">My UPI QR</span>
                    <span className="text-[10px] text-slate-500">Instant scan payments</span>
                  </button>

                  <button
                    onClick={() => alert('Dispute Assistance: Co-op Mandal Ombudsperson reachable at 1800-425-COOP.')}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-600 bg-white text-left text-xs transition-colors group"
                  >
                    <span className="material-symbols-outlined text-[#835500] text-2xl block mb-1 group-hover:scale-110 transition-transform">
                      gavel
                    </span>
                    <span className="font-bold text-[#1a1c19] block">Fair Trade</span>
                    <span className="text-[10px] text-slate-500">Mandal disputes board</span>
                  </button>

                  <button
                    onClick={() => alert('Welfare Fund: You have ₹320 in accident insurance and child education support.')}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-600 bg-white text-left text-xs transition-colors group"
                  >
                    <span className="material-symbols-outlined text-blue-700 text-2xl block mb-1 group-hover:scale-110 transition-transform">
                      health_and_safety
                    </span>
                    <span className="font-bold text-[#1a1c19] block">Welfare Fund</span>
                    <span className="text-[10px] text-slate-500">Insurance & claims</span>
                  </button>

                  <button
                    onClick={() => alert('Co-op Tool Subsidy: Eligible for ₹5,000 power drill loan at 0% interest.')}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-600 bg-white text-left text-xs transition-colors group"
                  >
                    <span className="material-symbols-outlined text-purple-700 text-2xl block mb-1 group-hover:scale-110 transition-transform">
                      handyman
                    </span>
                    <span className="font-bold text-[#1a1c19] block">Tool Loans</span>
                    <span className="text-[10px] text-slate-500">0% Interest advance</span>
                  </button>
                </div>
              </div>

              {/* Cooperative Charter Note */}
              <div className="bg-gradient-to-br from-[#00342b] to-[#004d40] rounded-3xl p-6 text-white shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                  <span className="material-symbols-outlined text-base">handshake</span>
                  <span>Democratic Co-op Ownership</span>
                </div>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  You are an equal shareholder in the TrustWorkers Cooperative. Unlike private app aggregators, all platform surpluses are redistributed to worker member dividend accounts annually.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Tab 2: New Team View (My Team) - Only visible to Team Lead */
          <div className="space-y-6">
            {/* Team Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-3xl border border-[#e3e3de] p-5 shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[#707975] uppercase font-bold">
                  <span className="material-symbols-outlined text-emerald-700 text-base">groups</span>
                  <span>Guild Roster</span>
                </div>
                <div className="text-2xl font-black text-[#00342b]">{teamMembers.length} Members</div>
                <span className="text-xs text-emerald-700 font-semibold block">
                  All SSC/ITI Verified Partners
                </span>
              </div>

              <div className="bg-white rounded-3xl border border-[#e3e3de] p-5 shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[#707975] uppercase font-bold">
                  <span className="material-symbols-outlined text-emerald-700 text-base">check_circle</span>
                  <span>Available Now</span>
                </div>
                <div className="text-2xl font-black text-emerald-700">
                  {availableCount} of {teamMembers.length} Ready
                </div>
                <span className="text-xs text-slate-500 font-semibold block">
                  Eligible for instant multi-person dispatch
                </span>
              </div>

              <div className="bg-white rounded-3xl border border-[#e3e3de] p-5 shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[#707975] uppercase font-bold">
                  <span className="material-symbols-outlined text-[#835500] text-base">star</span>
                  <span>Team Rating</span>
                </div>
                <div className="text-2xl font-black text-[#835500]">
                  ★ {COOPERATIVE_TEAM_RAVI.rating}
                </div>
                <span className="text-xs text-[#835500] font-semibold block">
                  Across 520 collective jobs
                </span>
              </div>

              <div className="bg-white rounded-3xl border border-[#e3e3de] p-5 shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[#707975] uppercase font-bold">
                  <span className="material-symbols-outlined text-blue-700 text-base">account_balance</span>
                  <span>Co-op Team Base Rate</span>
                </div>
                <div className="text-2xl font-black text-blue-950">₹{COOPERATIVE_TEAM_RAVI.hourlyRate}/hr</div>
                <span className="text-xs text-blue-700 font-semibold block">
                  100% Settled directly to crew members
                </span>
              </div>
            </div>

            {/* Team Members List (Rows with Availability Status Pills) */}
            <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 sm:p-8 shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold font-display text-[#1a1c19]">
                    {COOPERATIVE_TEAM_RAVI.teamName}
                  </h2>
                  <p className="text-xs text-[#707975] mt-0.5">
                    Lead: <strong>{WORKER_RAVI.name}</strong> • Undi Multi-Trade Guild Roster • Click any status pill to cycle availability
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => alert('Notification broadcast sent to all 5 team members to review their duty status.')}
                    className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">notifications</span>
                    <span>Ping Available Crew</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => alert('New member onboarding: Direct prospective technicians to the Undi Mandal Co-op Desk with Aadhaar & ITI certificate.')}
                    className="px-4 py-2 bg-[#00342b] hover:bg-[#004d40] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">person_add</span>
                    <span>Add Member</span>
                  </button>
                </div>
              </div>

              {/* Members as Rows */}
              <div className="divide-y divide-slate-100">
                {teamMembers.map((member) => {
                  const isLead = member.name === WORKER_RAVI.name;
                  return (
                    <div
                      key={member.id}
                      className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 p-3 rounded-2xl transition-colors"
                    >
                      {/* Left: Avatar, Name & Trade */}
                      <div className="flex items-center gap-4 min-w-[280px]">
                        <div className="relative shrink-0">
                          <img
                            src={member.avatarUrl}
                            alt={member.name}
                            className="w-12 h-12 rounded-2xl object-cover border border-[#e3e3de] shadow-2xs"
                          />
                          {isLead && (
                            <span
                              title="Team Lead"
                              className="material-symbols-outlined absolute -bottom-1 -right-1 bg-emerald-600 text-white text-xs p-0.5 rounded-full ring-2 ring-white"
                            >
                              shield_person
                            </span>
                          )}
                        </div>

                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-sm text-[#1a1c19]">{member.name}</span>
                            {isLead ? (
                              <span className="text-[10px] font-extrabold uppercase tracking-wide bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded-md">
                                Team Lead
                              </span>
                            ) : (
                              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                                {member.trade.split('&')[0]}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#707975]">{member.role}</p>
                          <p className="text-[11px] text-slate-400">{member.qualification}</p>
                        </div>
                      </div>

                      {/* Middle: Rating, Experience & Jobs */}
                      <div className="flex items-center gap-4 sm:gap-6 text-xs text-[#707975]">
                        <div className="flex items-center gap-1 font-bold text-[#835500]">
                          <span className="material-symbols-outlined text-sm">star</span>
                          <span>{member.rating.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="font-bold text-[#1a1c19]">{member.experienceYears} Years</span>
                          <span className="text-[11px] text-slate-400 block">Experience</span>
                        </div>
                        <div>
                          <span className="font-bold text-emerald-800">{member.jobsCompleted}</span>
                          <span className="text-[11px] text-slate-400 block">Jobs Done</span>
                        </div>
                      </div>

                      {/* Right: Availability Status Pill & Lead Actions */}
                      <div className="flex items-center gap-3 self-end md:self-center">
                        {/* Availability status pill */}
                        {renderAvailabilityPill(member.availability, member.id)}

                        {/* Contact Actions */}
                        {!isLead && (
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => alert(`Calling ${member.name} (${member.phone})...`)}
                              className="w-8 h-8 rounded-xl border border-slate-200 hover:border-emerald-600 text-slate-600 hover:text-emerald-800 flex items-center justify-center transition-colors"
                              title={`Call ${member.name}`}
                            >
                              <span className="material-symbols-outlined text-base">call</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => onOpenChat(member.name)}
                              className="w-8 h-8 rounded-xl border border-slate-200 hover:border-emerald-600 text-slate-600 hover:text-emerald-800 flex items-center justify-center transition-colors"
                              title={`Message ${member.name}`}
                            >
                              <span className="material-symbols-outlined text-base">chat</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cooperative Team Policy Note */}
              <div className="bg-[#fafaf5] p-4 rounded-2xl border border-[#e3e3de] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#707975]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-700 text-lg">balance</span>
                  <span>
                    <strong>Cooperative Labor Standard:</strong> Multi-worker team bookings are billed at uniform hourly rates with 100% direct settlement split equally among attending technicians.
                  </span>
                </div>
                <span className="font-mono text-[11px] text-slate-400 shrink-0">
                  Cluster ID: WG-UNDI-A1
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

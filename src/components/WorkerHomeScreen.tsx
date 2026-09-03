import React, { useState } from 'react';
import { ScreenId } from '../types';
import { WORKER_RAVI } from '../mockData';

interface WorkerHomeScreenProps {
  setCurrentScreen: (screen: ScreenId) => void;
  onOpenChat: (partnerName: string) => void;
}

export const WorkerHomeScreen: React.FC<WorkerHomeScreenProps> = ({
  setCurrentScreen,
  onOpenChat,
}) => {
  const [isOnDuty, setIsOnDuty] = useState(true);
  const [hasNewJob, setHasNewJob] = useState(true);
  const [jobAccepted, setJobAccepted] = useState(false);
  const [startOtpInput, setStartOtpInput] = useState('');
  const [jobStarted, setJobStarted] = useState(false);

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

        {/* 2-Column Desktop Grid Layout */}
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
                  Customer: <strong>Harsha Vardhan</strong> (+91 98765 43210)
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
                    Ask Harsha Vardhan for the 4-digit verification OTP on their phone screen.
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
                  onClick={() => onOpenChat('Harsha Vardhan')}
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
      </div>
    </div>
  );
};

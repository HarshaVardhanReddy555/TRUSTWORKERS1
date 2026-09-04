import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';
import { WORKER_RAVI, WORKER_SURESH, COOPERATIVE_TEAM_RAVI } from '../mockData';

interface LiveTrackingScreenProps {
  setCurrentScreen: (screen: ScreenId) => void;
  onOpenChat: (partnerName: string) => void;
}

export const LiveTrackingScreen: React.FC<LiveTrackingScreenProps> = ({
  setCurrentScreen,
  onOpenChat,
}) => {
  const [etaMinutes, setEtaMinutes] = useState(12);
  const [distanceKm, setDistanceKm] = useState(2.1);
  const [copiedOtp, setCopiedOtp] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setEtaMinutes((prev) => (prev > 1 ? prev - 1 : 1));
      setDistanceKm((prev) => (prev > 0.2 ? Number((prev - 0.1).toFixed(1)) : 0.2));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyOtp = () => {
    navigator.clipboard?.writeText('4892');
    setCopiedOtp(true);
    setTimeout(() => setCopiedOtp(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#fafaf5] text-[#1a1c19] py-6 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={() => setCurrentScreen('live-dispatch')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#707975] hover:text-[#00342b] py-1.5 px-3 rounded-xl hover:bg-slate-200/50 transition-colors self-start"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Back to Dispatch Status</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>GPS Live Stream Active</span>
            </div>
            <button
              type="button"
              onClick={() => alert('Emergency SOS alert: Connected directly to Co-op Security Dispatch.')}
              className="px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded-full text-xs font-bold flex items-center gap-1 hover:bg-red-100 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">emergency</span>
              <span>Emergency SOS</span>
            </button>
          </div>
        </div>

        {/* 2-Column Website Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Interactive Map & Worker Vehicle Card (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Interactive Map Visual */}
            <div className="relative w-full h-80 sm:h-[440px] bg-[#e8ece9] rounded-3xl overflow-hidden border border-[#bfc9c4] shadow-sm">
              <svg className="w-full h-full" viewBox="0 0 600 440" preserveAspectRatio="none">
                <rect x="0" y="0" width="600" height="440" fill="#e9eee9" />
                <rect x="40" y="40" width="140" height="100" rx="8" fill="#d8e2d8" />
                <rect x="240" y="30" width="180" height="120" rx="8" fill="#d8e2d8" />
                <rect x="70" y="240" width="120" height="150" rx="8" fill="#d8e2d8" />
                <rect x="380" y="240" width="170" height="150" rx="8" fill="#d8e2d8" />

                {/* Canal / Water body */}
                <path
                  d="M0,400 Q200,370 380,410 T600,390"
                  fill="none"
                  stroke="#b2dfdb"
                  strokeWidth="24"
                />

                {/* Main Roads */}
                <line x1="0" y1="190" x2="600" y2="190" stroke="#ffffff" strokeWidth="24" />
                <line x1="0" y1="190" x2="600" y2="190" stroke="#fffae0" strokeWidth="12" strokeDasharray="10 8" />

                <line x1="220" y1="0" x2="220" y2="440" stroke="#ffffff" strokeWidth="22" />
                <line x1="220" y1="0" x2="220" y2="440" stroke="#fffae0" strokeWidth="10" strokeDasharray="10 8" />

                <line x1="360" y1="190" x2="520" y2="40" stroke="#ffffff" strokeWidth="16" />

                {/* Path Route from Worker to Customer */}
                <path
                  d="M 90,190 L 220,190 L 220,310 L 320,310"
                  fill="none"
                  stroke="#00342b"
                  strokeWidth="5"
                  strokeDasharray="8 6"
                />
              </svg>

              {/* Customer Destination Marker */}
              <div className="absolute left-[320px] top-[300px] -translate-x-1/2 -translate-y-full flex flex-col items-center">
                <span className="bg-[#00342b] text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-md whitespace-nowrap mb-1">
                  Your House (Flat 302, Undi)
                </span>
                <div className="w-10 h-10 rounded-full bg-[#00342b] text-white flex items-center justify-center shadow-lg border-2 border-white">
                  <span className="material-symbols-outlined text-lg">home</span>
                </div>
              </div>

              {/* Worker 1 (Ravi Kumar) Moving Marker */}
              <div className="absolute left-[190px] top-[180px] -translate-x-1/2 -translate-y-full flex flex-col items-center animate-bounce">
                <span className="bg-[#835500] text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-md whitespace-nowrap mb-1 flex items-center gap-1">
                  <span>Ravi K. ({etaMinutes}m)</span>
                </span>
                <div className="w-11 h-11 rounded-full bg-[#ffaa14] text-[#2a1800] flex items-center justify-center shadow-lg border-2 border-white">
                  <span className="material-symbols-outlined text-xl">two_wheeler</span>
                </div>
              </div>

              {/* Map floating status chip */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-4 py-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-xs sm:text-sm font-bold text-[#1a1c19]">
                  {distanceKm} km away • {etaMinutes} mins estimated
                </span>
              </div>

              {/* Recenter & Zoom controls */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <button
                  onClick={() => alert('Map recentered to live GPS coordinates.')}
                  className="w-10 h-10 rounded-xl bg-white shadow-md border border-slate-200 flex items-center justify-center text-[#00342b] hover:bg-slate-50 transition-colors"
                  title="Recenter"
                >
                  <span className="material-symbols-outlined text-xl">my_location</span>
                </button>
              </div>
            </div>

            {/* Live Status & Vehicle Details */}
            <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={WORKER_RAVI.avatarUrl}
                    alt={WORKER_RAVI.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-600/40"
                  />
                  <div>
                    <h2 className="font-bold text-base text-[#1a1c19]">{WORKER_RAVI.name}</h2>
                    <p className="text-xs text-[#707975]">Lead Cooperative Electrician & Plumber</p>
                    <div className="text-xs text-emerald-800 font-semibold flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      <span>10th SSC & ITI Verified • Police Cleared</span>
                    </div>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Estimated Arrival</span>
                  <span className="text-2xl font-black text-[#835500]">{etaMinutes} mins</span>
                  <span className="text-xs text-slate-500 block">Arriving approx. 2:14 PM</span>
                </div>
              </div>

              <div className="bg-[#f4f4ef] rounded-2xl p-3.5 text-xs text-[#3f4945] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-slate-600 text-xl">two_wheeler</span>
                  <div>
                    <span className="font-bold text-[#1a1c19] block">TVS Heavy Duty Super</span>
                    <span className="text-[11px] text-slate-500">Green Bike • Registration #AP37-AY-4821</span>
                  </div>
                </div>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                  Full Toolkit Equipped
                </span>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                <button
                  onClick={() => alert(`Calling ${WORKER_RAVI.name} (${WORKER_RAVI.phone})...`)}
                  className="py-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-100 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">call</span>
                  <span>Call Worker</span>
                </button>

                <button
                  onClick={() => onOpenChat(WORKER_RAVI.name)}
                  className="py-2.5 rounded-xl bg-white border border-slate-200 text-[#1a1c19] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  <span>In-App Chat</span>
                </button>

                <button
                  onClick={() => alert('Live tracking link copied! Share with family: https://trustworkers.coop/track/CWS-8495')}
                  className="py-2.5 rounded-xl bg-white border border-slate-200 text-[#1a1c19] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">share</span>
                  <span>Share Trip</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: OTP, Timeline & Settlement (5 cols, sticky) */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-20">
            {/* Secure Service Start OTP Card */}
            <div className="bg-gradient-to-br from-[#00342b] to-[#004d40] text-white rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">key</span>
                  <span>Doorstep Verification Code</span>
                </span>
                <button
                  onClick={handleCopyOtp}
                  className="text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg transition-colors"
                >
                  {copiedOtp ? 'Copied!' : 'Copy'}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-4xl font-mono font-black tracking-widest text-amber-300">
                    4 8 9 2
                  </span>
                  <p className="text-xs text-emerald-100/90 mt-2 leading-relaxed">
                    Share this 4-digit OTP with the technician only after they arrive at your door and present their verified co-op badge.
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-3xl text-amber-300">pin</span>
                </div>
              </div>
            </div>

            {/* Service Progress Timeline */}
            <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 shadow-2xs space-y-4">
              <h3 className="font-bold text-xs text-[#1a1c19] uppercase tracking-wider">
                Live Service Timeline
              </h3>

              <div className="space-y-4 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {/* Step 1: Pending */}
                <div className="relative">
                  <span className="material-symbols-outlined absolute -left-6 top-0 text-emerald-600 text-base bg-white rounded-full">
                    check_circle
                  </span>
                  <div className="text-xs">
                    <span className="font-bold text-[#1a1c19]">Pending Request Broadcasted</span>
                    <span className="text-[11px] text-slate-400 block">1:45 PM • Statutory Locked Base Fare</span>
                  </div>
                </div>

                {/* Step 2: Team Assigned (with stacked avatars) */}
                <div className="relative">
                  <span className="material-symbols-outlined absolute -left-6 top-0 text-emerald-600 text-base bg-white rounded-full">
                    check_circle
                  </span>
                  <div className="text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1a1c19]">Team Assigned</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {COOPERATIVE_TEAM_RAVI.teamName}
                      </span>
                    </div>
                    {/* Stacked avatars for assigned members */}
                    <div className="flex items-center gap-2 pt-1 pb-1">
                      <div className="flex items-center -space-x-2 overflow-hidden">
                        <img
                          src={WORKER_RAVI.avatarUrl}
                          alt="Ravi Kumar"
                          className="inline-block h-7 w-7 rounded-full ring-2 ring-emerald-600 object-cover shadow-xs"
                          title="Ravi Kumar (Team Lead)"
                        />
                        <img
                          src={WORKER_SURESH.avatarUrl}
                          alt="Suresh Varma"
                          className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover shadow-xs"
                          title="Suresh Varma"
                        />
                        <img
                          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&auto=format&fit=crop&q=80"
                          alt="Mohan Rao"
                          className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover shadow-xs"
                          title="Mohan Rao"
                        />
                      </div>
                      <span className="text-[11px] text-emerald-800 font-semibold">
                        Ravi Kumar (Lead) + 2 Specialists
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block">1:50 PM • Guild team accepted dispatch</span>
                  </div>
                </div>

                {/* Step 3: In Progress (En Route) */}
                <div className="relative">
                  <span className="inline-block w-3.5 h-3.5 rounded-full bg-amber-500 absolute -left-5 top-0.5 ring-4 ring-amber-100 animate-pulse"></span>
                  <div className="text-xs">
                    <span className="font-bold text-[#835500]">In Progress • En Route on TVS Vehicle</span>
                    <span className="text-[11px] text-slate-500 block">Current estimated arrival: {etaMinutes} mins remaining</span>
                  </div>
                </div>

                <div className="relative opacity-60">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 absolute -left-4.5 top-1"></span>
                  <div className="text-xs">
                    <span className="font-bold text-slate-700">Work Execution & Quality Inspection</span>
                    <span className="text-[11px] text-slate-400 block">Requires Doorstep OTP 4892</span>
                  </div>
                </div>

                <div className="relative opacity-60">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 absolute -left-4.5 top-1"></span>
                  <div className="text-xs">
                    <span className="font-bold text-slate-700">Direct Settlement to Workers</span>
                    <span className="text-[11px] text-slate-400 block">100% earnings to workers via UPI</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setCurrentScreen('payment-confirm')}
                className="w-full py-3.5 bg-[#00342b] hover:bg-[#004d40] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Worker Arrived • Proceed to Settlement</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

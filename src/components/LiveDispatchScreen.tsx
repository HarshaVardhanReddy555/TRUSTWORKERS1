import React, { useState, useEffect } from 'react';
import { Booking, ScreenId } from '../types';
import { WORKER_RAVI, WORKER_SURESH, COOPERATIVE_TEAM_RAVI } from '../mockData';

interface LiveDispatchScreenProps {
  booking: Booking;
  setCurrentScreen: (screen: ScreenId) => void;
  onOpenLiveTracking: () => void;
  onOpenChat: (workerName: string) => void;
}

export const LiveDispatchScreen: React.FC<LiveDispatchScreenProps> = ({
  booking,
  setCurrentScreen,
  onOpenLiveTracking,
  onOpenChat,
}) => {
  const isTeam = (booking?.workerCount || 1) > 1;
  const [partner2Assigned, setPartner2Assigned] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number>(38);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setPartner2Assigned(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafaf5] text-[#1a1c19] py-6 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Navigation & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={() => setCurrentScreen('customer-home')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#707975] hover:text-[#00342b] py-1.5 px-3 rounded-xl hover:bg-slate-200/50 transition-colors self-start"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#707975] font-medium">Booking ID: <strong className="text-[#1a1c19]">{booking.id}</strong></span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live Cooperative Dispatch</span>
            </div>
          </div>
        </div>

        {/* Dual Team Requested Header Banner */}
        <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-display text-[#00342b]">
                  {partner2Assigned ? 'Dual Worker Team Assembled & Dispatched' : 'Assembling Dual Trade Team'}
                </h1>
                <span className="bg-[#afefdd]/50 text-[#004d40] text-xs px-2.5 py-0.5 rounded-full font-bold">
                  2 Technicians
                </span>
              </div>
              <p className="text-xs text-[#707975] mt-1">
                Dispatching certified cooperative technicians for {booking.serviceName}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-[#fffbeb] text-[#835500] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#ffaa14]/30 self-start sm:self-auto">
              <span className="material-symbols-outlined text-sm">timer</span>
              <span>
                {partner2Assigned
                  ? 'Both Partners Confirmed in 00:24'
                  : `Matching Standby: 00:${countdown < 10 ? '0' : ''}${countdown}`}
              </span>
            </div>
          </div>

          {/* Progress Assembly Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-[#1a1c19]">
                {partner2Assigned ? '2 of 2 Cooperative Partners Confirmed' : '1 of 2 Cooperative Partners Confirmed'}
              </span>
              <span className="text-[#835500]">
                {partner2Assigned ? '100% Team Ready' : '50% Assembled (Pinging nearby)'}
              </span>
            </div>
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  partner2Assigned
                    ? 'w-full bg-emerald-600'
                    : 'w-1/2 bg-gradient-to-r from-emerald-600 to-[#ffaa14]'
                }`}
              ></div>
            </div>
          </div>
        </div>

        {/* 2-Column Website Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Worker / Team Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {isTeam ? (
              /* ================= TEAM CARDS (when workerCount > 1) ================= */
              <>
                {/* Team Card 1: Primary Matched Team */}
                <div className="bg-white rounded-3xl border-2 border-emerald-600/40 p-6 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider bg-[#00342b] text-white px-3 py-1 rounded-full">
                      Matched Team: {COOPERATIVE_TEAM_RAVI.teamName}
                    </span>
                    {/* Small counter: "3/5 members available" */}
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                      <span>3/5 members available</span>
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={COOPERATIVE_TEAM_RAVI.teamLead.avatarUrl}
                          alt={COOPERATIVE_TEAM_RAVI.teamLead.name}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-600/40"
                        />
                        <span className="material-symbols-outlined absolute -bottom-1 -right-1 bg-emerald-600 text-white text-xs p-1 rounded-full">
                          verified
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h2 className="font-bold text-base text-[#1a1c19]">
                            {COOPERATIVE_TEAM_RAVI.teamLead.name}
                          </h2>
                          <span className="text-[10px] font-extrabold uppercase bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                            Team Lead
                          </span>
                        </div>
                        <p className="text-xs text-[#707975]">
                          {COOPERATIVE_TEAM_RAVI.trade} • Undi Mandal
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-[#3f4945] font-semibold flex-wrap">
                          <span className="flex items-center gap-0.5 text-[#835500]">
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span>{COOPERATIVE_TEAM_RAVI.rating} ({COOPERATIVE_TEAM_RAVI.reviewsCount} reviews)</span>
                          </span>
                          <span>•</span>
                          <span>{COOPERATIVE_TEAM_RAVI.totalMembers} Members in Guild</span>
                          <span>•</span>
                          <span className="text-emerald-700 font-bold">Standard Co-op Collective Fare</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => alert(`Calling Team Lead Ravi Kumar (${COOPERATIVE_TEAM_RAVI.teamLead.phone})...`)}
                        className="flex-1 sm:flex-none py-2 px-4 rounded-xl border border-emerald-600/40 bg-[#afefdd]/30 text-[#004d40] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-emerald-100 transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">call</span>
                        <span>Call Team Lead</span>
                      </button>
                      <button
                        onClick={() => onOpenChat(COOPERATIVE_TEAM_RAVI.teamLead.name)}
                        className="flex-1 sm:flex-none py-2 px-4 rounded-xl border border-slate-200 bg-white text-[#1a1c19] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">chat</span>
                        <span>Direct Chat</span>
                      </button>
                    </div>
                  </div>

                  {/* Assigned Crew Breakdown inside card */}
                  <div className="bg-[#fafaf5] p-3.5 rounded-2xl border border-[#e3e3de] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#1a1c19] flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-emerald-700 text-sm">group</span>
                        <span>Assigned Crew ({booking.workerCount || 2} Specialists Dispatched):</span>
                      </span>
                      <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Lead & Crew Confirmed
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200">
                        <img
                          src={COOPERATIVE_TEAM_RAVI.teamLead.avatarUrl}
                          alt={COOPERATIVE_TEAM_RAVI.teamLead.name}
                          className="w-9 h-9 rounded-xl object-cover border border-emerald-600"
                        />
                        <div className="overflow-hidden min-w-0">
                          <span className="text-xs font-bold text-[#1a1c19] block truncate">
                            {COOPERATIVE_TEAM_RAVI.teamLead.name} (Lead)
                          </span>
                          <span className="text-[10px] text-emerald-700 block truncate">
                            Master Electrician & Supervisor
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200">
                        <img
                          src={WORKER_SURESH.avatarUrl}
                          alt={WORKER_SURESH.name}
                          className="w-9 h-9 rounded-xl object-cover border border-slate-300"
                        />
                        <div className="overflow-hidden min-w-0">
                          <span className="text-xs font-bold text-[#1a1c19] block truncate">
                            {WORKER_SURESH.name}
                          </span>
                          <span className="text-[10px] text-[#707975] block truncate">
                            Senior Wireman • 6 Yrs Exp
                          </span>
                        </div>
                      </div>

                      {(booking.workerCount || 1) >= 3 && (
                        <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200 sm:col-span-2">
                          <img
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&auto=format&fit=crop&q=80"
                            alt="Mohan Rao"
                            className="w-9 h-9 rounded-xl object-cover border border-slate-300"
                          />
                          <div className="overflow-hidden min-w-0">
                            <span className="text-xs font-bold text-[#1a1c19] block truncate">
                              Mohan Rao
                            </span>
                            <span className="text-[10px] text-[#707975] block truncate">
                              Sanitary & Pipe Specialist • 5 Yrs Exp
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Education & Police clearance badges */}
                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">school</span>
                      <span>All Members 10th SSC & ITI Verified</span>
                    </span>
                    <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">translate</span>
                      <span>Telugu, Hindi, English</span>
                    </span>
                    <span className="text-xs bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 border border-emerald-200">
                      <span className="material-symbols-outlined text-sm">security</span>
                      <span>Co-op ₹5L Insurance Shield</span>
                    </span>
                  </div>

                  {/* Distance & GPS Quick Launch */}
                  <div className="bg-[#f4f4ef] rounded-2xl p-3.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                        <span className="material-symbols-outlined text-lg">navigation</span>
                      </div>
                      <div>
                        <span className="font-bold text-[#1a1c19] block">2.4 km away • Dispatched on Team Vehicle</span>
                        <span className="text-[11px] text-slate-500">Departing from Undi Mandal Center with full trade gear</span>
                      </div>
                    </div>
                    <button
                      onClick={onOpenLiveTracking}
                      className="px-4 py-1.5 bg-white border border-slate-300 rounded-xl font-bold text-xs text-[#00342b] hover:border-[#00342b] shadow-2xs"
                    >
                      Live GPS
                    </button>
                  </div>
                </div>

                {/* Team Card 2: Standby Backup Cooperative Team */}
                <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                      Standby Team: Bhimavaram Delta Crew B
                    </span>
                    {/* Small counter: "4/5 members available" */}
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                      <span>4/5 members available</span>
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={WORKER_SURESH.avatarUrl}
                        alt={WORKER_SURESH.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-bold text-base text-[#1a1c19]">{WORKER_SURESH.name}</h2>
                          <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                            Standby Lead
                          </span>
                        </div>
                        <p className="text-xs text-[#707975]">Electrical & General Repairs • Bhimavaram Town</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-[#3f4945] font-semibold">
                          <span className="flex items-center gap-0.5 text-[#835500]">
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span>4.88 (380 reviews)</span>
                          </span>
                          <span>•</span>
                          <span>4.2 km away • Reserve Unit</span>
                        </div>
                      </div>
                    </div>

                    <span className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                      Standby Reserve
                    </span>
                  </div>
                </div>
              </>
            ) : (
              /* ================= INDIVIDUAL WORKER CARDS (when workerCount === 1) ================= */
              <>
                {/* Partner 1 Card (Ravi Kumar) */}
                <div className="bg-white rounded-3xl border-2 border-emerald-600/40 p-6 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider bg-[#00342b] text-white px-3 py-1 rounded-full">
                      Primary Technician • Ready
                    </span>
                    <span className="text-xs font-bold text-[#835500]">Statutory ₹250/hr</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={WORKER_RAVI.avatarUrl}
                          alt={WORKER_RAVI.name}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-600/40"
                        />
                        <span className="material-symbols-outlined absolute -bottom-1 -right-1 bg-emerald-600 text-white text-xs p-1 rounded-full">
                          verified
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h2 className="font-bold text-base text-[#1a1c19]">{WORKER_RAVI.name}</h2>
                          <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                        </div>
                        <p className="text-xs text-[#707975]">{WORKER_RAVI.title} • Undi Mandal</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-[#3f4945] font-semibold flex-wrap">
                          <span className="flex items-center gap-0.5 text-[#835500]">
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span>{WORKER_RAVI.rating} ({WORKER_RAVI.reviewsCount} reviews)</span>
                          </span>
                          <span>•</span>
                          <span>{WORKER_RAVI.experienceYears} Yrs Exp</span>
                          <span>•</span>
                          <span>{WORKER_RAVI.jobsCompleted} Jobs</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => alert(`Calling Ravi Kumar (${WORKER_RAVI.phone})...`)}
                        className="flex-1 sm:flex-none py-2 px-4 rounded-xl border border-emerald-600/40 bg-[#afefdd]/30 text-[#004d40] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-emerald-100 transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">call</span>
                        <span>Call Worker</span>
                      </button>
                      <button
                        onClick={() => onOpenChat(WORKER_RAVI.name)}
                        className="flex-1 sm:flex-none py-2 px-4 rounded-xl border border-slate-200 bg-white text-[#1a1c19] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">chat</span>
                        <span>Direct Chat</span>
                      </button>
                    </div>
                  </div>

                  {/* Education & Police clearance badges */}
                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">school</span>
                      <span>10th SSC & ITI Verified</span>
                    </span>
                    <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">translate</span>
                      <span>Telugu, Hindi, English</span>
                    </span>
                    <span className="text-xs bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 border border-emerald-200">
                      <span className="material-symbols-outlined text-sm">security</span>
                      <span>Co-op ₹5L Insurance Shield</span>
                    </span>
                  </div>

                  {/* Distance & GPS Quick Launch */}
                  <div className="bg-[#f4f4ef] rounded-2xl p-3.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                        <span className="material-symbols-outlined text-lg">navigation</span>
                      </div>
                      <div>
                        <span className="font-bold text-[#1a1c19] block">2.4 km away • Estimated 15 mins arrival</span>
                        <span className="text-[11px] text-slate-500">Departing from Undi Mandal Center with toolkit</span>
                      </div>
                    </div>
                    <button
                      onClick={onOpenLiveTracking}
                      className="px-4 py-1.5 bg-white border border-slate-300 rounded-xl font-bold text-xs text-[#00342b] hover:border-[#00342b] shadow-2xs"
                    >
                      Live GPS
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Column: Service Details & Settlement (5 cols, sticky) */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-20">
            {/* Booking Details Card */}
            <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 shadow-2xs space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-sm text-[#1a1c19]">Service Request Details</span>
                <span className="text-[10px] font-bold bg-[#afefdd]/40 text-[#004d40] px-2.5 py-1 rounded-full">
                  Verified Fare
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-slate-500 text-lg mt-0.5">build</span>
                  <div>
                    <div className="font-bold text-sm text-[#1a1c19]">{booking.serviceName}</div>
                    <p className="text-xs text-[#707975] mt-0.5">{booking.problemDescription}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[#3f4945]">
                  <span className="material-symbols-outlined text-slate-500 text-lg">schedule</span>
                  <span>{booking.dateStr} • {booking.timeWindow}</span>
                </div>

                <div className="flex items-start gap-3 text-[#3f4945]">
                  <span className="material-symbols-outlined text-slate-500 text-lg mt-0.5">location_on</span>
                  <span>{booking.address}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-[#707975]">
                  <span>Lead Technician (Ravi K.):</span>
                  <span className="font-bold text-[#1a1c19]">₹250 / hr</span>
                </div>
                <div className="flex items-center justify-between text-[#707975]">
                  <span>Partner 2 Technician:</span>
                  <span className="font-bold text-[#1a1c19]">₹250 / hr</span>
                </div>
                <div className="flex items-center justify-between text-emerald-700 font-semibold">
                  <span>Cooperative Commission:</span>
                  <span>0% (₹0)</span>
                </div>
                <div className="flex items-center justify-between text-emerald-700 font-semibold">
                  <span>Surge / Rain Surcharge:</span>
                  <span>0% (₹0)</span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Total Wage</span>
                    <div className="text-xl font-black text-[#00342b]">₹{booking.totalAmount || 500}</div>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    No Hidden Taxes
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => setCurrentScreen('payment-confirm')}
                  className="w-full py-3.5 bg-[#00342b] hover:bg-[#004d40] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <span>Review Booking & Settlement</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>

                <button
                  onClick={onOpenLiveTracking}
                  className="w-full py-3 bg-[#ffaa14] hover:bg-[#ffb955] text-[#2a1800] rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">map</span>
                  <span>Open Full Screen GPS Tracking</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Are you sure you want to cancel? Free cancellation applies before worker arrival.')) {
                      setCurrentScreen('customer-home');
                    }
                  }}
                  className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-red-600 flex items-center justify-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">cancel</span>
                  <span>Cancel Booking Request (Free Cancellation)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

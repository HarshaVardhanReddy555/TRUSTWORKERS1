import React, { useState } from 'react';
import { Booking, ScreenId } from '../types';
import { WORKER_RAVI, WORKER_SURESH, COOPERATIVE_TEAM_RAVI } from '../mockData';

interface CustomerBookingsScreenProps {
  activeBooking: Booking | null;
  setCurrentScreen: (screen: ScreenId) => void;
  onOpenLiveTracking: () => void;
}

export const CustomerBookingsScreen: React.FC<CustomerBookingsScreenProps> = ({
  activeBooking,
  setCurrentScreen,
  onOpenLiveTracking,
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  const pastBookings = [
    {
      id: 'CWS-7210',
      title: 'Ceiling Fan Installation & Regulator Fix',
      worker: 'Ramesh K. (Certified Electrician)',
      date: '12 Aug 2024',
      paid: '₹250',
      rating: 5,
      category: 'Electrical',
    },
    {
      id: 'CWS-6894',
      title: 'Kitchen Sink Drain Unclogging',
      worker: 'Suresh V. (Sanitary Specialist)',
      date: '28 Jul 2024',
      paid: '₹220',
      rating: 5,
      category: 'Plumbing',
    },
    {
      id: 'CWS-5942',
      title: 'Main MCB Safety Earthing Inspection',
      worker: 'Ravi Kumar (Lead Electrician)',
      date: '15 Jul 2024',
      paid: '₹350',
      rating: 5,
      category: 'Electrical',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafaf5] text-[#1a1c19] py-6 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-display text-[#00342b]">My Cooperative Bookings</h1>
            <p className="text-xs text-[#707975] mt-0.5">
              Track live service dispatches and view 100% direct settlement receipts
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Downloading official GST & Co-op invoice summary PDF...')}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-[#00342b] border border-[#e3e3de] rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <span className="material-symbols-outlined text-base">download</span>
              <span>Download Tax Statement</span>
            </button>
            <button
              onClick={() => setCurrentScreen('customer-home')}
              className="px-4 py-2 bg-[#00342b] hover:bg-[#004d40] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>Book New Service</span>
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'active'
                ? 'bg-[#00342b] text-white shadow-xs'
                : 'bg-white text-[#707975] border border-[#e3e3de] hover:bg-slate-50'
            }`}
          >
            Active & Scheduled ({activeBooking ? 1 : 0})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'completed'
                ? 'bg-[#00342b] text-white shadow-xs'
                : 'bg-white text-[#707975] border border-[#e3e3de] hover:bg-slate-50'
            }`}
          >
            Past Completed History ({pastBookings.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'active' ? (
          activeBooking ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Active Booking Card (8 cols) */}
              <div className="lg:col-span-8 bg-white rounded-3xl border-2 border-emerald-600/40 p-6 sm:p-8 shadow-2xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                      Confirmed • Workers En Route
                    </span>
                    <span className="text-xs text-slate-500 font-mono">#{activeBooking.id}</span>
                  </div>
                  <span className="text-sm font-extrabold text-[#835500]">
                    Statutory Locked Fare: ₹{activeBooking.totalAmount || 500}
                  </span>
                </div>

                <div className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-[#1a1c19]">
                    {activeBooking.serviceName}
                  </h2>
                  <p className="text-xs text-[#707975]">
                    Scheduled window: <strong>{activeBooking.dateStr} • {activeBooking.timeWindow}</strong>
                  </p>
                  <p className="text-xs text-[#3f4945]">
                    Assigned Master Technicians: <strong>Ravi Kumar (Lead Electrician)</strong> + <strong>Suresh Varma</strong>
                  </p>
                  <p className="text-xs text-[#707975] flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    <span>{activeBooking.address}</span>
                  </p>
                </div>

                {/* Live Progress tracker & Stepper */}
                <div className="bg-[#fafaf5] p-5 rounded-2xl border border-[#e3e3de] space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1a1c19]">Booking Progress Timeline</span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                      Status: Team Assigned & En Route
                    </span>
                  </div>

                  {/* Stepper with Pending -> Team Assigned -> In Progress -> Completed */}
                  <div className="grid grid-cols-4 gap-2 relative pt-1">
                    {/* Step 1: Pending */}
                    <div className="flex flex-col items-center text-center space-y-1.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        <span className="material-symbols-outlined text-base">check</span>
                      </div>
                      <span className="text-xs font-bold text-[#00342b]">Pending</span>
                      <span className="text-[10px] text-slate-400">Broadcasted</span>
                    </div>

                    {/* Step 2: Team Assigned (with stacked avatars) */}
                    <div className="flex flex-col items-center text-center space-y-1.5">
                      <div className="relative flex items-center justify-center h-8">
                        {/* Stacked avatars */}
                        <div className="flex items-center -space-x-2">
                          <img
                            src={WORKER_RAVI.avatarUrl}
                            alt="Ravi Kumar"
                            className="w-8 h-8 rounded-full ring-2 ring-emerald-600 object-cover shadow-xs"
                            title="Ravi Kumar (Team Lead)"
                          />
                          <img
                            src={WORKER_SURESH.avatarUrl}
                            alt="Suresh Varma"
                            className="w-8 h-8 rounded-full ring-2 ring-white object-cover shadow-xs"
                            title="Suresh Varma"
                          />
                          {(activeBooking.workerCount || 2) >= 3 && (
                            <img
                              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&auto=format&fit=crop&q=80"
                              alt="Mohan Rao"
                              className="w-8 h-8 rounded-full ring-2 ring-white object-cover shadow-xs"
                              title="Mohan Rao"
                            />
                          )}
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-800">Team Assigned</span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        {activeBooking.workerCount || 2} Specialists
                      </span>
                    </div>

                    {/* Step 3: In Progress */}
                    <div className="flex flex-col items-center text-center space-y-1.5">
                      <div className="w-8 h-8 rounded-full bg-[#ffaa14] text-[#2a1800] flex items-center justify-center font-bold text-xs animate-pulse shadow-xs">
                        <span className="material-symbols-outlined text-base">directions_bike</span>
                      </div>
                      <span className="text-xs font-bold text-[#835500]">In Progress</span>
                      <span className="text-[10px] text-amber-700">En Route (~12m)</span>
                    </div>

                    {/* Step 4: Completed */}
                    <div className="flex flex-col items-center text-center space-y-1.5 opacity-60">
                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs">
                        <span className="material-symbols-outlined text-base">task_alt</span>
                      </div>
                      <span className="text-xs font-medium text-slate-600">Completed</span>
                      <span className="text-[10px] text-slate-400">Direct Pay</span>
                    </div>
                  </div>

                  {/* Team Members Breakdown with Stacked Avatars */}
                  <div className="bg-white p-3.5 rounded-xl border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center -space-x-2.5 overflow-hidden shrink-0">
                        <img
                          src={WORKER_RAVI.avatarUrl}
                          alt="Ravi Kumar"
                          className="inline-block h-9 w-9 rounded-full ring-2 ring-emerald-500 object-cover"
                        />
                        <img
                          src={WORKER_SURESH.avatarUrl}
                          alt="Suresh Varma"
                          className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                        />
                        {(activeBooking.workerCount || 2) >= 3 && (
                          <img
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&auto=format&fit=crop&q=80"
                            alt="Mohan Rao"
                            className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <span className="font-bold text-[#1a1c19] block">
                          Assigned Team: {COOPERATIVE_TEAM_RAVI.teamName}
                        </span>
                        <span className="text-[11px] text-[#707975]">
                          Team Lead: Ravi Kumar • {activeBooking.workerCount || 2} Active Members on Assignment
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 self-start sm:self-auto">
                      ★ {COOPERATIVE_TEAM_RAVI.rating} Team Rating
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={onOpenLiveTracking}
                    className="flex-1 py-3.5 px-4 rounded-xl bg-[#00342b] hover:bg-[#004d40] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">navigation</span>
                    <span>Open Live GPS Tracking</span>
                  </button>

                  <button
                    onClick={() => setCurrentScreen('payment-confirm')}
                    className="flex-1 py-3.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-[#1a1c19] font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">receipt_long</span>
                    <span>View Direct Settlement Invoice</span>
                  </button>
                </div>
              </div>

              {/* Cooperative Guarantee Sidebar (4 cols) */}
              <div className="lg:col-span-4 bg-white rounded-3xl border border-[#e3e3de] p-6 shadow-2xs space-y-4 text-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <span className="material-symbols-outlined text-lg">verified_user</span>
                  <span>Co-op Fair Labor Shield</span>
                </div>
                <p className="text-[#707975] leading-relaxed">
                  Your technicians are verified 10th pass members of the West Godavari Technicians Guild.
                  Zero surge pricing applies regardless of rain, peak demand, or festival hours.
                </p>
                <div className="p-3 bg-[#fafaf5] rounded-xl border border-[#e3e3de] space-y-1">
                  <span className="font-bold text-[#1a1c19] block">24/7 Co-op Dispatch Desk</span>
                  <p className="text-slate-500">Call 1800-425-COOP (Toll Free) for instant escalation.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-4">
              <span className="material-symbols-outlined text-5xl text-slate-300">calendar_today</span>
              <h2 className="font-bold text-base text-[#1a1c19]">No Active Bookings Right Now</h2>
              <p className="text-xs text-[#707975] max-w-sm mx-auto">
                Schedule a certified plumber, electrician, or carpenter with guaranteed fair rates.
              </p>
              <button
                onClick={() => setCurrentScreen('customer-home')}
                className="py-3 px-6 bg-[#00342b] hover:bg-[#004d40] text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-xs"
              >
                <span>Browse Cooperative Catalog</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            </div>
          )
        ) : (
          /* Completed Bookings Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pastBookings.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-[#e3e3de] p-5 shadow-2xs space-y-4 flex flex-col justify-between hover:border-[#00342b] transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                      #{item.id} • {item.date}
                    </span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 text-xs">
                      Paid {item.paid}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-[#1a1c19]">{item.title}</h3>
                  <p className="text-xs text-[#707975]">{item.worker}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#835500] font-bold text-xs">
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span>{item.rating}.0 Verified Rating</span>
                  </div>

                  <button
                    onClick={() => {
                      alert(`Re-booking service: ${item.title}`);
                      setCurrentScreen('schedule-service');
                    }}
                    className="text-xs font-bold text-[#00342b] hover:underline flex items-center gap-1"
                  >
                    <span>Rebook</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

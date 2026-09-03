import React, { useState } from 'react';
import { Booking, ScreenId, ServiceItem } from '../types';
import { WORKER_RAVI } from '../mockData';

interface ScheduleServiceScreenProps {
  selectedService: ServiceItem;
  onConfirmSchedule: (booking: Booking) => void;
  setCurrentScreen: (screen: ScreenId) => void;
}

export const ScheduleServiceScreen: React.FC<ScheduleServiceScreenProps> = ({
  selectedService,
  onConfirmSchedule,
  setCurrentScreen,
}) => {
  const [workerCount, setWorkerCount] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string>('05 Sep');
  const [selectedWindow, setSelectedWindow] = useState<'Morning' | 'Afternoon' | 'Evening'>('Afternoon');
  const [durationHours, setDurationHours] = useState<number>(2);
  const [problemDescription, setProblemDescription] = useState(
    'Bathroom sink pipe dripping when main valve is turned on. Need washer or elbow joint replacement.'
  );
  const [attachedPhoto, setAttachedPhoto] = useState<string | null>(null);
  const [locationType, setLocationType] = useState<'home' | 'gps'>('home');
  const [landmark, setLandmark] = useState('Near Undi Panchayati Library, Gate 2');

  const baseRate = selectedService.baseRatePerHour;
  // Multi-worker rate with co-op discount for 2 workers
  const hourlyRateCalc = workerCount === 1 ? baseRate : workerCount === 2 ? Math.round(baseRate * 1.9) : baseRate * workerCount;
  const estimatedTotal = hourlyRateCalc * durationHours;

  const quickTags = [
    'Tap leaking under sink',
    'Low water pressure',
    'Pipe clogged',
    'Switchboard spark',
  ];

  const handleCreateBooking = () => {
    const newBooking: Booking = {
      id: 'CWS-8495',
      serviceId: selectedService.id,
      serviceName: workerCount > 1 ? `Dual ${selectedService.name} & Switchboard Repair` : selectedService.name,
      category: selectedService.category,
      status: 'searching',
      dateStr: selectedDate === '05 Sep' ? 'Today, 05 Sep' : selectedDate,
      timeWindow: selectedWindow === 'Morning' ? '9:00 AM - 12:00 PM' : selectedWindow === 'Afternoon' ? '2:00 PM - 4:00 PM' : '4:00 PM - 8:00 PM',
      workerCount,
      durationHours,
      assignedWorkers: [WORKER_RAVI],
      customerName: 'Harsha Vardhan',
      customerPhone: '+91 98765 43210',
      address: locationType === 'home' ? '42 Cooperative Way, Block B, Flat 302, Green Park, Undi, 534199' : 'Current GPS: Undi Main Junction (Near Post Office)',
      landmark,
      problemDescription,
      ratePerHour: baseRate,
      totalAmount: estimatedTotal,
      stepCurrent: 1,
      arrivingMinutes: 15,
    };

    onConfirmSchedule(newBooking);
    setCurrentScreen('live-dispatch');
  };

  return (
    <div className="min-h-screen bg-[#fafaf5] text-[#1a1c19] py-6 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Breadcrumbs / Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentScreen('customer-home')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#707975] hover:text-[#00342b] py-1.5 px-3 rounded-xl hover:bg-slate-200/50 transition-colors"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Back to Services</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#707975] font-medium">Step 2 of 4: Schedule & Requirements</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-700"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-700"></span>
              <span className="w-2 h-2 rounded-full bg-slate-300"></span>
              <span className="w-2 h-2 rounded-full bg-slate-300"></span>
            </div>
          </div>
        </div>

        {/* 2-Column Website Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Booking Form (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Worker Count Selection */}
            <div className="bg-white rounded-3xl border border-[#e3e3de] p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#afefdd]/50 flex items-center justify-center text-[#00342b]">
                    <span className="material-symbols-outlined text-xl">groups</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1a1c19]">Technicians Needed</h3>
                    <p className="text-xs text-[#707975]">
                      Select single or dual cooperative team for simultaneous trade tasks
                    </p>
                  </div>
                </div>

                {/* Stepper */}
                <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50">
                  <button
                    type="button"
                    onClick={() => setWorkerCount(Math.max(1, workerCount - 1))}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-700 hover:bg-white font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-[#1a1c19]">{workerCount}</span>
                  <button
                    type="button"
                    onClick={() => setWorkerCount(Math.min(4, workerCount + 1))}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-700 hover:bg-white font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1 Worker */}
                <div
                  onClick={() => setWorkerCount(1)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    workerCount === 1
                      ? 'border-[#00342b] bg-emerald-50/40 ring-2 ring-[#00342b]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#1a1c19]">1 Master Technician</span>
                    <span className="text-xs font-bold text-[#00342b]">₹{baseRate}/hr</span>
                  </div>
                  <p className="text-[11px] text-[#707975] leading-normal">Standard fixtures, single leaks, switchboard replacement</p>
                </div>

                {/* 2 Workers */}
                <div
                  onClick={() => setWorkerCount(2)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    workerCount === 2
                      ? 'border-[#00342b] bg-emerald-50/40 ring-2 ring-[#00342b]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#1a1c19]">Dual Team (2 Workers)</span>
                      <span className="text-[10px] bg-amber-100 text-[#835500] font-bold px-1.5 py-0.2 rounded">
                        Co-op Disc.
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#00342b]">
                      ₹{Math.round(baseRate * 1.9)}/hr
                    </span>
                  </div>
                  <p className="text-[11px] text-[#707975] leading-normal">Simultaneous plumbing + wiring, urgent repairs, heavy tasks</p>
                </div>
              </div>
            </div>

            {/* Date & Arrival Slot */}
            <div className="bg-white rounded-3xl border border-[#e3e3de] p-5 shadow-2xs space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#ffddb5]/60 flex items-center justify-center text-[#835500]">
                  <span className="material-symbols-outlined text-xl">calendar_month</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1a1c19]">Date & Arrival Slot</h3>
                  <p className="text-xs text-[#707975]">Guaranteed on-time arrival within 30 minutes of selected slot</p>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-[#707975] block mb-2">Select Date</span>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { date: '05 Sep', label: 'TODAY', sub: 'Fast Track' },
                    { date: '06 Sep', label: 'TOMORROW', sub: 'Flexible' },
                    { date: '07 Sep', label: 'SATURDAY', sub: 'Weekend' },
                  ].map((d) => (
                    <button
                      key={d.date}
                      type="button"
                      onClick={() => setSelectedDate(d.date)}
                      className={`py-3 px-2 rounded-2xl text-center border transition-all ${
                        selectedDate === d.date
                          ? 'bg-[#00342b] text-white border-[#00342b] shadow-xs'
                          : 'bg-white border-[#e3e3de] text-[#1a1c19] hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-80 block">
                        {d.label}
                      </span>
                      <span className="text-sm font-extrabold block my-0.5">{d.date}</span>
                      <span className="text-[10px] opacity-75 block">{d.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-[#707975] block mb-2">Arrival Time Window</span>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'Morning', time: '9 AM - 12 PM', icon: 'wb_sunny' },
                    { id: 'Afternoon', time: '2 PM - 4 PM', icon: 'sunny' },
                    { id: 'Evening', time: '4 PM - 8 PM', icon: 'nightlight' },
                  ].map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setSelectedWindow(w.id as any)}
                      className={`py-2.5 px-2 rounded-2xl text-center border flex flex-col items-center gap-1 transition-all ${
                        selectedWindow === w.id
                          ? 'border-[#00342b] bg-emerald-50/50 text-[#00342b] font-bold ring-1 ring-[#00342b]'
                          : 'border-[#e3e3de] bg-white text-[#707975] hover:bg-slate-50'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">{w.icon}</span>
                      <span className="text-xs font-bold">{w.id}</span>
                      <span className="text-[10px] text-slate-500">{w.time}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimated Duration */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-[#707975]">Estimated Service Duration</span>
                  <span className="font-bold text-[#00342b]">{durationHours} Hours</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setDurationHours(h)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        durationHours === h
                          ? 'bg-[#00342b] text-white border-[#00342b]'
                          : 'bg-white border-[#e3e3de] text-[#1a1c19] hover:bg-slate-50'
                      }`}
                    >
                      {h} {h === 1 ? 'Hour' : 'Hours'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Problem Description & Photo Attachment */}
            <div className="bg-white rounded-3xl border border-[#e3e3de] p-5 shadow-2xs space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#afefdd]/50 flex items-center justify-center text-[#00342b]">
                  <span className="material-symbols-outlined text-xl">description</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1a1c19]">Problem Description & Photos</h3>
                  <p className="text-xs text-[#707975]">Helps technicians bring exact replacement spare parts</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {quickTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setProblemDescription(tag)}
                    className="text-[11px] bg-[#eeeee9] hover:bg-slate-200 text-[#3f4945] px-2.5 py-1 rounded-full font-medium transition-colors"
                  >
                    + {tag}
                  </button>
                ))}
              </div>

              <textarea
                rows={3}
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="Describe the issue, brand of appliance, or specific parts needed..."
                className="w-full p-3 rounded-2xl border border-[#bfc9c4] text-xs text-[#1a1c19] focus:outline-none focus:border-[#00342b] resize-none"
              />

              {/* Photo Upload Zone */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setAttachedPhoto(
                      attachedPhoto
                        ? null
                        : 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80'
                    )
                  }
                  className="px-4 py-2.5 rounded-xl border border-[#bfc9c4] hover:border-[#00342b] bg-[#fafaf5] text-xs font-bold text-[#00342b] flex items-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">photo_camera</span>
                  <span>{attachedPhoto ? 'Remove Attached Photo' : 'Attach Photo of Issue'}</span>
                </button>
                {attachedPhoto && (
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-emerald-500 shadow-2xs">
                    <img src={attachedPhoto} alt="Issue preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Service Location & Instructions */}
            <div className="bg-white rounded-3xl border border-[#e3e3de] p-5 shadow-2xs space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#ffddb5]/60 flex items-center justify-center text-[#835500]">
                  <span className="material-symbols-outlined text-xl">location_on</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1a1c19]">Service Address & Entry Instructions</h3>
                  <p className="text-xs text-[#707975]">Where should the technicians arrive?</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setLocationType('home')}
                  className={`p-3.5 rounded-2xl border cursor-pointer flex items-start gap-2.5 ${
                    locationType === 'home'
                      ? 'border-[#00342b] bg-emerald-50/40 ring-1 ring-[#00342b]'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="loc"
                    checked={locationType === 'home'}
                    onChange={() => setLocationType('home')}
                    className="mt-0.5 text-[#00342b]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#1a1c19] block">Registered Home Address</span>
                    <p className="text-[11px] text-[#707975] mt-0.5">
                      42 Cooperative Way, Block B, Flat 302, Green Park, Undi
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => setLocationType('gps')}
                  className={`p-3.5 rounded-2xl border cursor-pointer flex items-start gap-2.5 ${
                    locationType === 'gps'
                      ? 'border-[#00342b] bg-emerald-50/40 ring-1 ring-[#00342b]'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="loc"
                    checked={locationType === 'gps'}
                    onChange={() => setLocationType('gps')}
                    className="mt-0.5 text-[#00342b]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#1a1c19] block">Current GPS Coordinates</span>
                    <p className="text-[11px] text-[#707975] mt-0.5">Auto-detected: Undi Main Junction</p>
                  </div>
                </div>
              </div>

              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="Gate / Landmark / Ring bell instructions..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc9c4] text-xs text-[#1a1c19] focus:outline-none focus:border-[#00342b]"
              />
            </div>
          </div>

          {/* Right Column: Order Summary & Instant Request (5 cols, sticky) */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-20">
            {/* Selected Service Card */}
            <div className="bg-white rounded-3xl border border-[#e3e3de] p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#707975]">
                  Selected Trade Service
                </span>
                <button
                  onClick={() => setCurrentScreen('customer-home')}
                  className="text-xs font-bold text-[#835500] hover:underline"
                >
                  Change
                </button>
              </div>

              <div className="flex items-center gap-3.5 pb-2">
                <div className="w-12 h-12 rounded-2xl bg-[#afefdd]/50 flex items-center justify-center text-[#00342b]">
                  <span className="material-symbols-outlined text-2xl">{selectedService.iconName}</span>
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#1a1c19]">{selectedService.name}</h3>
                  <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Statutory Rate: ₹{selectedService.baseRatePerHour}/hr
                  </span>
                </div>
              </div>

              {/* Price Calculation Card */}
              <div className="bg-[#fafaf5] rounded-2xl p-4 border border-[#e3e3de] space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-[#707975]">
                  <span>Base Rate ({workerCount} Worker{workerCount > 1 ? 's' : ''}):</span>
                  <span className="font-bold text-[#1a1c19]">₹{hourlyRateCalc}/hr</span>
                </div>
                <div className="flex items-center justify-between text-[#707975]">
                  <span>Estimated Time:</span>
                  <span className="font-bold text-[#1a1c19]">{durationHours} Hours</span>
                </div>
                <div className="flex items-center justify-between text-emerald-700 font-semibold">
                  <span>Platform Aggregator Cut:</span>
                  <span>₹0 (0% Commission)</span>
                </div>
                <div className="flex items-center justify-between text-emerald-700 font-semibold">
                  <span>Surge Pricing Surcharge:</span>
                  <span>₹0 (0% Surge)</span>
                </div>

                <div className="pt-2 border-t border-[#e3e3de] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Estimated Direct Pay</span>
                    <span className="text-xl font-black text-[#00342b]">₹{estimatedTotal}</span>
                  </div>
                  <span className="text-[10px] text-[#835500] bg-amber-50 px-2 py-1 rounded font-bold border border-amber-200">
                    Direct UPI on Completion
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleCreateBooking}
                className="w-full py-4 bg-[#ffaa14] hover:bg-[#ffb955] text-[#2a1800] rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <span>Find & Dispatch Nearby Workers</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>

            {/* Cooperative Assurances */}
            <div className="bg-white rounded-3xl border border-[#e3e3de] p-5 shadow-2xs space-y-3 text-xs">
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <span className="material-symbols-outlined text-base">verified_user</span>
                <span>Cooperative Quality Pledge</span>
              </div>
              <ul className="space-y-2 text-[#3f4945]">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-700 text-sm mt-0.5">check_circle</span>
                  <span>100% 10th Standard / SSC verified & Police cleared masters</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-700 text-sm mt-0.5">check_circle</span>
                  <span>Doorstep 4-digit OTP verification ensures safe start & settlement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-700 text-sm mt-0.5">check_circle</span>
                  <span>Backed by ₹5 Lakhs Cooperative Welfare & Damage Shield</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

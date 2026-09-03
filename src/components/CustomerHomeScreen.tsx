import React, { useState } from 'react';
import { Booking, ScreenId, ServiceItem } from '../types';

interface CustomerHomeScreenProps {
  services: ServiceItem[];
  activeBooking: Booking | null;
  onSelectService: (service: ServiceItem) => void;
  setCurrentScreen: (screen: ScreenId) => void;
  onOpenLiveTracking: () => void;
}

export const CustomerHomeScreen: React.FC<CustomerHomeScreenProps> = ({
  services,
  activeBooking,
  onSelectService,
  setCurrentScreen,
  onOpenLiveTracking,
}) => {
  const [selectedLocation, setSelectedLocation] = useState('Indiranagar, Bengaluru');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isListening, setIsListening] = useState(false);

  const categories = ['All', 'Electrical', 'Plumbing', 'Carpentry', 'Cleaning', 'Appliances'];

  const filteredServices = services.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || s.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setSearchQuery('plumber');
      setIsListening(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#fafaf5] text-[#1a1c19] py-6 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Control Bar: Location, Search, Co-op Live */}
        <div className="bg-white rounded-2xl border border-[#e3e3de] p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#707975] block">
                Your Service Location
              </span>
              <button
                onClick={() => {
                  setSelectedLocation((prev) =>
                    prev.includes('Indiranagar') ? 'Undi Mandal, West Godavari' : 'Indiranagar, Bengaluru'
                  );
                }}
                className="flex items-center gap-1 text-sm font-bold text-[#1a1c19] hover:text-[#00342b] transition-colors"
              >
                <span className="material-symbols-outlined text-[#835500] text-lg">location_on</span>
                <span>{selectedLocation}</span>
                <span className="material-symbols-outlined text-xs text-slate-400">expand_more</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300/60 text-emerald-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>18 Cooperative Partners on Duty in your Mandal</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-2 flex-1 max-w-lg">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search electrician, plumber, switchboard, carpentry..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#bfc9c4] bg-[#fafaf5] text-xs font-medium text-[#1a1c19] placeholder:text-slate-400 focus:outline-none focus:border-[#00342b] focus:bg-white focus:ring-1 focus:ring-[#00342b]"
              />
              <button
                type="button"
                onClick={handleVoiceSearch}
                className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors ${
                  isListening ? 'bg-red-500 text-white animate-bounce' : 'text-slate-400 hover:text-[#00342b]'
                }`}
                title="Voice Search"
              >
                <span className="material-symbols-outlined text-base">mic</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cooperative Hero Banner */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#00342b] via-[#004d40] to-[#00201a] text-white shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <span>100% Democratic Multi-Stakeholder Cooperative</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display leading-tight">
              0% Surge Pricing. Guaranteed Fair Wages.
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Every technician is a certified co-op member-owner with verified 10th Pass minimum education and police clearance.
              Your payment transfers directly to the worker’s account with zero intermediary commission cuts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/10 text-xs">
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">Standardized Hourly Rate</span>
              <span className="text-xl font-black text-white">₹250 - ₹350/hr</span>
              <span className="text-[10px] text-emerald-200 block mt-0.5">Fixed by Cooperative Council</span>
            </div>
            <button
              onClick={() => {
                onSelectService(services[0]);
                setCurrentScreen('schedule-service');
              }}
              className="px-5 py-3 bg-[#ffaa14] text-[#2a1800] rounded-xl font-bold text-xs hover:bg-amber-400 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-base">bolt</span>
              <span>Fast Track Dispatch</span>
            </button>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#00342b] text-white shadow-xs'
                  : 'bg-white text-[#707975] border border-[#e3e3de] hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2-Column Website Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Main Column: Services Catalog (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-bold text-xl text-[#1a1c19]">
                  Co-op Verified Trade Services
                </h2>
                <p className="text-xs text-[#707975]">
                  Statutory rates approved by the Cooperative Fair Labor Council
                </p>
              </div>
              <span className="text-xs font-semibold text-[#3f4945] bg-[#eeeee9] px-3 py-1 rounded-full">
                {filteredServices.length} Services Available
              </span>
            </div>

            {/* Services Grid (Responsive: 1 col on mobile, 2 cols on desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-[#e3e3de] p-4 flex flex-col justify-between shadow-2xs hover:border-[#00342b] hover:shadow-md transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-12 h-12 rounded-xl bg-[#eef0ea] group-hover:bg-[#afefdd]/50 flex items-center justify-center text-[#00342b] shrink-0 transition-colors">
                        <span className="material-symbols-outlined text-2xl">{service.iconName}</span>
                      </div>
                      {service.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                            service.badge === 'Fair Match'
                              ? 'bg-[#ffddb5] text-[#835500]'
                              : 'bg-[#afefdd]/50 text-[#004d40]'
                          }`}
                        >
                          ✓ {service.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-bold text-base text-[#1a1c19] group-hover:text-[#00342b] transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-xs text-[#707975] mt-1 leading-relaxed line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#707975]">
                      <div className="flex items-center gap-1 text-[#835500] font-bold">
                        <span className="material-symbols-outlined text-sm">star</span>
                        <span>{service.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{service.jobsCount}+ completed</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-medium">10th Pass Verified</span>
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Base Rate</span>
                      <span className="text-base font-bold text-[#00342b]">
                        ₹{service.baseRatePerHour} <span className="text-xs text-slate-500 font-normal">/hr</span>
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        onSelectService(service);
                        setCurrentScreen('schedule-service');
                      }}
                      className="px-4 py-2 rounded-xl bg-[#00342b] hover:bg-[#004d40] text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
                    >
                      <span>Book Service</span>
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cooperative Quality Pillars (4 boxes in 2x2 grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-white rounded-2xl p-4 border border-[#e3e3de] flex items-start gap-3 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#afefdd]/40 flex items-center justify-center text-[#00342b] shrink-0">
                  <span className="material-symbols-outlined text-xl">school</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1a1c19]">100% 10th+ Pass Verified</h4>
                  <p className="text-[11px] text-[#707975] mt-0.5 leading-relaxed">
                    Statutory secondary education verification, SP police clearance, and safety trained.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-[#e3e3de] flex items-start gap-3 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#ffddb5]/50 flex items-center justify-center text-[#835500] shrink-0">
                  <span className="material-symbols-outlined text-xl">handshake</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1a1c19]">Zero Middleman Aggregator Cuts</h4>
                  <p className="text-[11px] text-[#707975] mt-0.5 leading-relaxed">
                    Technicians receive 100% of customer pay with transparent member equity.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-[#e3e3de] flex items-start gap-3 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#afefdd]/40 flex items-center justify-center text-[#00342b] shrink-0">
                  <span className="material-symbols-outlined text-xl">payments</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1a1c19]">Standard Fixed Hourly Registry</h4>
                  <p className="text-[11px] text-[#707975] mt-0.5 leading-relaxed">
                    No inflated arbitrary quotes. Price table fixed democratically by customer-worker council.
                  </p>
                </div>
              </div>

              <div className="bg-[#fffbeb] rounded-2xl p-4 border border-[#ffaa14]/40 flex items-start justify-between gap-3 shadow-2xs">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#835500] text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">support_agent</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#2a1800]">24/7 Co-op Helpline</h4>
                    <p className="text-[11px] text-[#835500] mt-0.5">Toll-free rapid dispute resolution</p>
                  </div>
                </div>
                <button
                  onClick={() => alert('Dialing Co-op Helpline: 1800-425-COOP (24/7 Toll Free)')}
                  className="px-3 py-1.5 rounded-lg bg-[#835500] text-white text-xs font-bold hover:bg-[#694300] shrink-0"
                >
                  Call
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Active Booking Card */}
            {activeBooking ? (
              <div className="bg-white rounded-3xl border-2 border-emerald-600/30 p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Active Live Booking
                    </span>
                  </div>
                  <button
                    onClick={onOpenLiveTracking}
                    className="text-xs font-bold text-[#835500] hover:underline flex items-center gap-0.5"
                  >
                    <span>Live GPS</span>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#afefdd]/50 flex items-center justify-center text-[#00342b]">
                      <span className="material-symbols-outlined text-2xl">plumbing</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#1a1c19]">{activeBooking.serviceName}</h3>
                      <p className="text-xs text-[#707975]">
                        Technician: {activeBooking.assignedWorkers[0]?.name || 'Ravi Kumar'}
                      </p>
                    </div>
                  </div>
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-bold">
                    En Route
                  </span>
                </div>

                {/* Progress tracker */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      <span>Dispatched</span>
                    </span>
                    <span className="text-amber-700 font-bold flex items-center gap-0.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                      <span>Arriving in 12m</span>
                    </span>
                    <span className="text-slate-400">Doorstep OTP</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
                    <div className="w-1/2 bg-emerald-600"></div>
                    <div className="w-1/4 bg-amber-500"></div>
                    <div className="w-1/4 bg-slate-200"></div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-[#707975]">
                    Base Est: <strong className="text-[#1a1c19]">₹{activeBooking.totalAmount}</strong>
                  </span>
                  <button
                    onClick={() => setCurrentScreen('live-dispatch')}
                    className="font-bold text-[#00342b] hover:underline flex items-center gap-0.5"
                  >
                    <span>Dispatch Details</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-[#e3e3de] p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#707975]">
                    No Active Booking
                  </span>
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Ready to Dispatch</span>
                  </span>
                </div>
                <p className="text-xs text-[#707975] leading-relaxed">
                  Select a certified co-op service on the left to schedule an instant or planned visit.
                </p>
                <button
                  onClick={() => {
                    onSelectService(services[0]);
                    setCurrentScreen('schedule-service');
                  }}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-[#00342b] rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">add_circle</span>
                  <span>Create New Request</span>
                </button>
              </div>
            )}

            {/* Featured Technician of the Week */}
            <div className="bg-white rounded-3xl border border-[#e3e3de] p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#835500]">
                  Featured Co-op Master
                </span>
                <span className="text-[10px] bg-amber-50 text-[#835500] font-bold px-2 py-0.5 rounded border border-amber-200">
                  Top Rated
                </span>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=160&auto=format&fit=crop&q=80"
                  alt="Ravi Kumar"
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-600"
                />
                <div>
                  <h4 className="font-bold text-sm text-[#1a1c19]">Ravi Kumar</h4>
                  <p className="text-xs text-[#707975]">Master Electrician • Undi Cluster</p>
                  <div className="flex items-center gap-1 text-xs text-[#835500] font-bold mt-0.5">
                    <span className="material-symbols-outlined text-xs">star</span>
                    <span>4.9 / 5.0</span>
                    <span className="text-slate-400 font-normal">(420+ jobs)</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#fafaf5] p-3 rounded-xl border border-[#e3e3de] text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-800 font-semibold text-[11px]">
                  <span className="material-symbols-outlined text-xs">school</span>
                  <span>10th SSC (2015) Verified & ITI Certified</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600 text-[11px]">
                  <span className="material-symbols-outlined text-xs">verified</span>
                  <span>West Godavari Police Clearance #2023-882</span>
                </div>
              </div>
            </div>

            {/* Direct Empowerment Quote Card */}
            <div className="bg-[#eeeee9]/70 rounded-3xl p-5 border border-[#e3e3de] space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80"
                  alt="Manjunath S."
                  className="w-12 h-12 rounded-2xl object-cover border border-amber-600/30"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#835500] block">
                    Direct Member Impact
                  </span>
                  <h5 className="font-bold text-xs text-[#1a1c19]">Manjunath S.</h5>
                  <span className="text-[10px] text-[#707975]">Bangalore Technicians Guild</span>
                </div>
              </div>

              <p className="text-xs text-[#3f4945] italic leading-relaxed">
                "100% of my quote reaches my family. In TrustWorkers Co-op, zero middlemen take 30% cuts from our hard labor."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

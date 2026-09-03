import React from 'react';
import { ScreenId, UserRole } from '../types';

interface WelcomeScreenProps {
  setCurrentScreen: (screen: ScreenId) => void;
  setUserRole: (role: UserRole) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  setCurrentScreen,
  setUserRole,
}) => {
  return (
    <div className="min-h-screen bg-[#fafaf5] text-[#1a1c19] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Brand Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffddb5]/60 text-[#835500] text-xs font-semibold border border-[#ffaa14]/30">
            <span className="material-symbols-outlined text-sm">groups</span>
            <span>Community-Powered Multi-Stakeholder Cooperative</span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#00342b]">
            Local Skills. Fair Work. Zero Middlemen.
          </h1>

          <p className="text-sm sm:text-base text-[#3f4945] leading-relaxed max-w-2xl mx-auto">
            TrustWorkers connects verified neighborhood technicians directly with local households.
            Standardized fair hourly rates, 100% direct UPI settlement to workers, and 0% surge pricing.
          </p>

          {/* Quick Metrics Strip */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="bg-white p-3 rounded-2xl border border-[#e3e3de] shadow-2xs">
              <span className="text-xl font-extrabold text-[#00342b] block">14,200+</span>
              <span className="text-[11px] text-[#707975]">Happy Households</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-[#e3e3de] shadow-2xs">
              <span className="text-xl font-extrabold text-emerald-700 block">6,200+</span>
              <span className="text-[11px] text-[#707975]">Verified 10th+ Partners</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-[#e3e3de] shadow-2xs">
              <span className="text-xl font-extrabold text-[#835500] block">0%</span>
              <span className="text-[11px] text-[#707975]">Platform Cut / Surge</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-[#e3e3de] shadow-2xs">
              <span className="text-xl font-extrabold text-emerald-800 block">₹1.8 Cr+</span>
              <span className="text-[11px] text-[#707975]">Direct Worker Pay</span>
            </div>
          </div>
        </div>

        {/* Dual Cards: Customer vs Worker (Side by Side in Website Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Option 1: Customer Card */}
          <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[#00342b] hover:shadow-lg transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#afefdd]/50 flex items-center justify-center text-[#004d40]">
                    <span className="material-symbols-outlined text-lg">person</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#3f4945]">
                    For Individuals & Families
                  </span>
                </div>
                <span className="text-xs font-semibold bg-[#eef0ea] text-[#00342b] px-2.5 py-1 rounded-full border border-emerald-200">
                  Instant Hire
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1c19] mb-3 font-display">
                Book Verified Co-op Services
              </h2>
              <p className="text-xs sm:text-sm text-[#707975] mb-5 leading-relaxed">
                Hire certified electricians, plumbers, carpenters, and appliance experts at transparent,
                fixed cooperative rates with no surge pricing or hidden charges.
              </p>

              <div className="relative rounded-2xl overflow-hidden mb-5 h-48 sm:h-52">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80"
                  alt="Family enjoying reliable home maintenance"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                  <span className="text-xs text-white font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-emerald-400">verified</span>
                    <span>100% Background & Police Verified Local Partners</span>
                  </span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-[#3f4945]">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-700 text-base mt-0.5">check_circle</span>
                  <span><strong>Statutory 10th Pass minimum</strong> qualification & trade certification</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-700 text-base mt-0.5">check_circle</span>
                  <span><strong>Direct doorstep OTP verification</strong> & transparent hourly billing</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-700 text-base mt-0.5">check_circle</span>
                  <span><strong>0% surge pricing guarantee</strong> during rain, festivals, or night</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                setUserRole('customer');
                setCurrentScreen('register-customer');
              }}
              className="w-full py-3.5 bg-[#00342b] hover:bg-[#004d40] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>Register as Customer</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>

          {/* Option 2: Worker Partner Card */}
          <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[#835500] hover:shadow-lg transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#ffddb5]/60 flex items-center justify-center text-[#835500]">
                    <span className="material-symbols-outlined text-lg">engineering</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#3f4945]">
                    For Skilled Technicians & Guilds
                  </span>
                </div>
                <span className="text-xs font-bold bg-[#ffaa14]/20 text-[#835500] px-2.5 py-1 rounded-full border border-[#ffaa14]/30">
                  0% Commission
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1c19] mb-3 font-display">
                Work, Earn & Own Your Co-op
              </h2>
              <p className="text-xs sm:text-sm text-[#707975] mb-5 leading-relaxed">
                Retain 100% of your earnings via direct customer UPI. Benefit from cooperative health insurance,
                pension credits, tool subsidies, and voting equity.
              </p>

              <div className="relative rounded-2xl overflow-hidden mb-5 h-48 sm:h-52">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80"
                  alt="Cooperative technician electricians"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                  <span className="text-xs text-white font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-amber-400">handshake</span>
                    <span>Direct Instant UPI Credits • No Platform Deductions</span>
                  </span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-[#3f4945]">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-amber-700 text-base mt-0.5">check_circle</span>
                  <span><strong>100% direct customer payout:</strong> Zero middleman aggregation cut</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-amber-700 text-base mt-0.5">school</span>
                  <span><strong>Statutory Requirement:</strong> 10th Standard (SSC) or certified ITI pass</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-amber-700 text-base mt-0.5">health_and_safety</span>
                  <span><strong>Welfare Shield:</strong> ₹5L health cover, pension pool & guild representation</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                setUserRole('worker');
                setCurrentScreen('register-worker');
              }}
              className="w-full py-3.5 bg-[#835500] hover:bg-[#694300] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>Register as Worker Partner</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Cooperative Statutory Governance Section */}
        <div className="bg-[#f4f4ef] rounded-3xl p-6 border border-[#e3e3de] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#00342b] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">gavel</span>
            </div>
            <div>
              <div className="font-bold text-[#1a1c19] text-sm">
                Govt. Recognized Multi-Stakeholder Cooperative Framework
              </div>
              <p className="text-xs text-[#707975] mt-0.5">
                Regulated under State Self-Reliant Cooperatives Act (Registration #AP-COOP-2023-904). Democratic board, independent audit, and transparent statutory price registry.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCurrentScreen('login')}
              className="px-5 py-2.5 bg-white border border-[#bfc9c4] text-[#00342b] rounded-xl font-bold text-xs hover:bg-slate-50 transition-colors"
            >
              Already Registered? Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

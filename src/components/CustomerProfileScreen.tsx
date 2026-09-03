import React from 'react';
import { ScreenId, UserRole } from '../types';

interface CustomerProfileScreenProps {
  setCurrentScreen: (screen: ScreenId) => void;
  setUserRole: (role: UserRole) => void;
}

export const CustomerProfileScreen: React.FC<CustomerProfileScreenProps> = ({
  setCurrentScreen,
  setUserRole,
}) => {
  return (
    <div className="min-h-screen bg-[#fafaf5] text-[#1a1c19] py-6 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-display text-[#00342b]">Customer Member Profile</h1>
            <p className="text-xs text-[#707975] mt-0.5">
              Manage your cooperative citizen membership, saved addresses, and ethical consumption impact
            </p>
          </div>

          <button
            onClick={() => setCurrentScreen('customer-home')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#707975] hover:text-[#00342b] py-2 px-3.5 rounded-xl border border-[#e3e3de] bg-white hover:bg-slate-50 transition-colors self-start"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* 2-Column Website Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Profile & Cooperative Impact (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* User Profile Card */}
            <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
                  alt="Harsha Vardhan"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-600"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-base text-[#1a1c19]">Harsha Vardhan</h2>
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
                      Citizen Member
                    </span>
                  </div>
                  <p className="text-xs text-[#707975] mt-0.5">+91 98765 43210</p>
                  <p className="text-xs text-[#707975]">harsha.vardhan@example.com</p>
                </div>
              </div>

              <div className="bg-[#fafaf5] rounded-2xl p-3.5 border border-[#e3e3de] text-xs space-y-1.5">
                <div className="flex justify-between text-[#707975]">
                  <span>Member Identity:</span>
                  <span className="font-bold text-[#1a1c19]">#CM-4821</span>
                </div>
                <div className="flex justify-between text-[#707975]">
                  <span>Cooperative Cluster:</span>
                  <span className="font-bold text-[#1a1c19]">Undi Mandal, West Godavari</span>
                </div>
                <div className="flex justify-between text-[#707975]">
                  <span>Member Status:</span>
                  <span className="font-bold text-emerald-700">Active Good Standing</span>
                </div>
              </div>
            </div>

            {/* Cooperative Impact Summary Card */}
            <div className="bg-gradient-to-br from-[#00342b] to-[#004d40] text-white rounded-3xl p-6 shadow-sm space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">savings</span>
                <span>Your Cooperative Community Impact</span>
              </span>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-white/10 p-3 rounded-2xl border border-white/15">
                  <span className="text-xs text-emerald-100 block">Middleman Cuts Avoided</span>
                  <span className="text-2xl font-black text-amber-300">₹1,420</span>
                </div>
                <div className="bg-white/10 p-3 rounded-2xl border border-white/15">
                  <span className="text-xs text-emerald-100 block">Direct Worker Pay</span>
                  <span className="text-2xl font-black text-emerald-200">₹4,850</span>
                </div>
              </div>

              <p className="text-xs text-emerald-100/90 leading-relaxed pt-1">
                By ordering through TrustWorkers, 100% of your labor budget went directly to local certified tradespeople with zero predatory intermediary commission.
              </p>
            </div>

            {/* Switch to Worker Partner View */}
            <div className="bg-[#fffbeb] border border-[#ffaa14]/50 rounded-3xl p-6 text-xs space-y-3">
              <div className="font-bold text-[#835500] flex items-center gap-2 text-sm">
                <span className="material-symbols-outlined text-lg">engineering</span>
                <span>Are you a skilled tradesperson?</span>
              </div>
              <p className="text-[#694300] leading-relaxed">
                Join the TrustWorkers cooperative as a certified worker partner. Retain 100% of your standard rates with direct UPI settlements and mutual welfare benefits.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  onClick={() => {
                    setUserRole('worker');
                    setCurrentScreen('worker-home');
                  }}
                  className="flex-1 py-2.5 bg-[#835500] hover:bg-[#694300] text-white rounded-xl font-bold text-xs transition-colors"
                >
                  Switch to Worker Portal
                </button>
                <button
                  onClick={() => setCurrentScreen('register-worker')}
                  className="py-2.5 px-4 bg-white border border-[#ffaa14] text-[#835500] rounded-xl font-bold text-xs hover:bg-amber-50 transition-colors"
                >
                  Apply as Partner
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Addresses, Charter & Security (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Saved Addresses */}
            <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#1a1c19] uppercase tracking-wider">
                  Saved Service Addresses
                </h3>
                <button
                  onClick={() => alert('Add Address dialog opened.')}
                  className="text-xs font-bold text-[#835500] hover:underline flex items-center gap-0.5"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  <span>Add New Address</span>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-2xl border-2 border-emerald-600/40 bg-emerald-50/30 space-y-1">
                  <div className="flex items-center justify-between font-bold text-[#1a1c19]">
                    <span className="flex items-center gap-1.5 text-sm">
                      <span className="material-symbols-outlined text-emerald-800 text-base">home</span>
                      <span>Home Address</span>
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                      Default Dispatch
                    </span>
                  </div>
                  <p className="text-[#3f4945] leading-normal pt-1">
                    42 Cooperative Way, Block B, Flat 302, Green Park, Undi, West Godavari - 534199
                  </p>
                  <span className="text-[11px] text-slate-500 block">Landmark: Near Undi Panchayati Library, Gate 2</span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-1">
                  <div className="flex items-center justify-between font-bold text-[#1a1c19]">
                    <span className="flex items-center gap-1.5 text-sm">
                      <span className="material-symbols-outlined text-slate-500 text-base">store</span>
                      <span>Office / Shop</span>
                    </span>
                  </div>
                  <p className="text-[#707975] leading-normal pt-1">
                    Main Bazaar Road, Near State Bank of India, Undi - 534199
                  </p>
                </div>
              </div>
            </div>

            {/* Cooperative Help & Charter Links */}
            <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 shadow-2xs space-y-2 text-xs">
              <h3 className="font-bold text-sm text-[#1a1c19] uppercase tracking-wider mb-2">
                Cooperative Framework & Governance
              </h3>

              <button
                onClick={() => alert('Cooperative Fair Trade Charter: All services strictly follow regulated base rates with 0% surge.')}
                className="w-full p-3 rounded-2xl hover:bg-slate-50 flex items-center justify-between text-left transition-colors border border-transparent hover:border-slate-200"
              >
                <span className="flex items-center gap-3 text-[#1a1c19] font-medium">
                  <span className="material-symbols-outlined text-[#00342b] text-xl">gavel</span>
                  <div>
                    <span className="font-bold text-xs block">Fair Trade Consumer Charter</span>
                    <span className="text-[11px] text-slate-400">Guaranteed maximum response time & pricing caps</span>
                  </div>
                </span>
                <span className="material-symbols-outlined text-slate-400 text-base">chevron_right</span>
              </button>

              <button
                onClick={() => alert('Dialing Co-op Ombudsman: 1800-425-COOP (24/7 Toll Free)')}
                className="w-full p-3 rounded-2xl hover:bg-slate-50 flex items-center justify-between text-left transition-colors border border-transparent hover:border-slate-200"
              >
                <span className="flex items-center gap-3 text-[#1a1c19] font-medium">
                  <span className="material-symbols-outlined text-[#00342b] text-xl">support_agent</span>
                  <div>
                    <span className="font-bold text-xs block">Grievance Officer & 24/7 Helpline</span>
                    <span className="text-[11px] text-slate-400">Direct escalation to district cooperative inspector</span>
                  </div>
                </span>
                <span className="material-symbols-outlined text-slate-400 text-base">chevron_right</span>
              </button>

              <button
                onClick={() => alert('Language set to English / Telugu')}
                className="w-full p-3 rounded-2xl hover:bg-slate-50 flex items-center justify-between text-left transition-colors border border-transparent hover:border-slate-200"
              >
                <span className="flex items-center gap-3 text-[#1a1c19] font-medium">
                  <span className="material-symbols-outlined text-[#00342b] text-xl">translate</span>
                  <div>
                    <span className="font-bold text-xs block">Language: English (తెలుగు)</span>
                    <span className="text-[11px] text-slate-400">Bilingual local language support</span>
                  </div>
                </span>
                <span className="material-symbols-outlined text-slate-400 text-base">chevron_right</span>
              </button>
            </div>

            {/* Logout Action */}
            <button
              onClick={() => setCurrentScreen('welcome')}
              className="w-full py-3.5 bg-white border border-red-200 text-red-600 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-red-50 transition-colors shadow-2xs"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              <span>Sign Out of TrustWorkers Citizen Portal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

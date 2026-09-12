import React, { useState } from 'react';
import { CustomerProfile, ScreenId, UserRole } from '../types';
import { CustomerAvatar } from './CustomerAvatar';
import { AvatarUpload } from './AvatarUpload';
import { saveCustomerToSupabase } from '../lib/supabaseService';

interface CustomerProfileScreenProps {
  setCurrentScreen: (screen: ScreenId) => void;
  setUserRole: (role: UserRole) => void;
  customer?: CustomerProfile;
  onUpdateCustomer?: (customer: CustomerProfile) => void;
}

export const CustomerProfileScreen: React.FC<CustomerProfileScreenProps> = ({
  setCurrentScreen,
  setUserRole,
  customer,
  onUpdateCustomer,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(customer?.name || 'Citizen Member');
  const [phone, setPhone] = useState(customer?.phone || '+91 98765 43210');
  const [email, setEmail] = useState(customer?.email || 'member@trustworkers.coop');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAvatarUpload = async (newUrl: string) => {
    try {
      const updated = await saveCustomerToSupabase({
        id: customer?.id,
        name: name.trim() || customer?.name || 'Citizen Member',
        phone: phone.trim() || customer?.phone || '+91 98765 43210',
        email: email.trim() || customer?.email || undefined,
        avatarUrl: newUrl,
      });
      if (onUpdateCustomer) {
        onUpdateCustomer(updated);
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.warn('Error updating customer avatar:', err);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const updated = await saveCustomerToSupabase({
        id: customer?.id,
        name: name.trim() || 'Citizen Member',
        phone: phone.trim(),
        email: email.trim() || undefined,
        avatarUrl: customer?.avatarUrl,
      });
      if (onUpdateCustomer) {
        onUpdateCustomer(updated);
      }
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.warn('Error updating customer profile:', err);
    } finally {
      setIsSaving(false);
    }
  };
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
              {saveSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>Profile updated in cooperative registry!</span>
                </div>
              )}

              {!isEditing ? (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <AvatarUpload
                        currentAvatarUrl={customer?.avatarUrl}
                        name={customer?.name || name}
                        userId={customer?.id || customer?.phone || 'customer'}
                        userType="customer"
                        size="xl"
                        label=""
                        subLabel=""
                        onUploadComplete={handleAvatarUpload}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-bold text-base text-[#1a1c19]">
                            {customer?.name || name || 'Citizen Member'}
                          </h2>
                          <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
                            Citizen Member
                          </span>
                        </div>
                        <p className="text-xs text-[#707975] mt-0.5">{customer?.phone || phone}</p>
                        <p className="text-xs text-[#707975]">{customer?.email || email || 'Not provided'}</p>
                        <p className="text-[11px] text-[#00342b] font-medium mt-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">photo_camera</span>
                          <span>Click photo to update</span>
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="text-xs font-bold text-[#00342b] hover:bg-slate-100 p-2 rounded-xl transition-colors flex items-center gap-1"
                      title="Edit Profile"
                    >
                      <span className="material-symbols-outlined text-base">edit</span>
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={handleSaveProfile} className="space-y-3">
                  <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                    <CustomerAvatar name={name} avatarUrl={customer?.avatarUrl} size="lg" />
                    <div>
                      <span className="text-xs font-bold text-[#1a1c19] block">Editing Profile</span>
                      <span className="text-[10px] text-slate-500">Updates saved directly to Supabase</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#707975] mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Enter your full name"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-[#00342b]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#707975] mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-[#00342b]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#707975] mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. user@example.com"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-[#00342b]"
                    />
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex-1 py-2 bg-[#00342b] hover:bg-[#004d40] text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

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

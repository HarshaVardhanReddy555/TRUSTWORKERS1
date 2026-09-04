import React, { useState } from 'react';
import { ScreenId, UserRole } from '../types';

interface RegisterCustomerScreenProps {
  setCurrentScreen: (screen: ScreenId) => void;
  setUserRole: (role: UserRole) => void;
}

export const RegisterCustomerScreen: React.FC<RegisterCustomerScreenProps> = ({
  setCurrentScreen,
  setUserRole,
}) => {
  const [fullName, setFullName] = useState('Ram');
  const [mobile, setMobile] = useState('+91 9876543210');
  const [email, setEmail] = useState('ram@example.com');
  const [password, setPassword] = useState('securepass123');
  const [showPassword, setShowPassword] = useState(false);
  const [houseAddress, setHouseAddress] = useState('House No. 42, Block B, Green Park');
  const [villageTown, setVillageTown] = useState('Undi');
  const [pincode, setPincode] = useState('534199');
  const [district, setDistrict] = useState('West Godavari');
  const [stateName, setStateName] = useState('Andhra Pradesh');
  const [agreed, setAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setUserRole('customer');
      setCurrentScreen('customer-home');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#fafaf5] text-[#1a1c19] py-8 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentScreen('welcome')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#707975] hover:text-[#00342b] py-2 px-3.5 rounded-xl border border-[#e3e3de] bg-white hover:bg-slate-50 transition-colors"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#707975]">Already a member?</span>
            <button
              onClick={() => setCurrentScreen('login')}
              className="text-xs font-bold text-[#835500] hover:underline"
            >
              Log in here
            </button>
          </div>
        </div>

        {/* 2-Column Website Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cooperative Citizen Value Proposition (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold">
                <span className="material-symbols-outlined text-sm">handshake</span>
                <span>Citizen Member Onboarding</span>
              </span>
              <h1 className="text-3xl font-black font-display text-[#00342b] leading-tight">
                Join Your Local Trades Cooperative
              </h1>
              <p className="text-sm text-[#707975] leading-relaxed">
                Connect with verified local electricians, plumbers, and carpenters directly.
                Pay statutory, fair regulated rates with zero middleman markups.
              </p>
            </div>

            {/* Benefits List */}
            <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 shadow-2xs space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-base">verified_user</span>
                </div>
                <div>
                  <span className="font-bold text-sm text-[#1a1c19] block">10th Pass Verified Craftsmen</span>
                  <p className="text-[#707975] mt-0.5">
                    Police cleared, trade certified, and background authenticated technicians at your doorstep.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-[#835500] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-base">price_check</span>
                </div>
                <div>
                  <span className="font-bold text-sm text-[#1a1c19] block">Zero Surge Pricing Guarantee</span>
                  <p className="text-[#707975] mt-0.5">
                    Cooperative statutory base rate of ₹250/hr locked under Mandal consumer protection laws.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-base">payments</span>
                </div>
                <div>
                  <span className="font-bold text-sm text-[#1a1c19] block">100% Direct Payout</span>
                  <p className="text-[#707975] mt-0.5">
                    Every rupee reaches the worker's family without aggregator commissions.
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="bg-gradient-to-br from-[#00342b] to-[#004d40] rounded-3xl p-6 text-white shadow-sm space-y-2">
              <p className="text-xs text-emerald-100 leading-relaxed italic">
                "TrustWorkers has completely changed how our colony handles emergency repairs. The technicians are neighbors we trust, and the pricing is completely honest."
              </p>
              <div className="text-xs font-bold text-amber-300 pt-1">
                — Srinivas Rao, Green Park Residents Association, Undi
              </div>
            </div>
          </div>

          {/* Right Column: Customer Registration Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#e3e3de] p-6 sm:p-8 shadow-2xs space-y-6">
            <div>
              <h2 className="text-xl font-bold font-display text-[#1a1c19]">Create Citizen Member Account</h2>
              <p className="text-xs text-[#707975] mt-1">Fill in your address for instant service matching</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Personal Information */}
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00342b] block pb-1 border-b border-slate-100">
                  1. Contact Information
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc9c4] text-xs text-[#1a1c19] focus:outline-none focus:border-[#00342b]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">Mobile Number (for OTP)</label>
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc9c4] text-xs text-[#1a1c19] focus:outline-none focus:border-[#00342b]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc9c4] text-xs text-[#1a1c19] focus:outline-none focus:border-[#00342b]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">Account Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create secure password"
                        className="w-full px-3.5 pr-10 py-2.5 rounded-xl border border-[#bfc9c4] text-xs text-[#1a1c19] focus:outline-none focus:border-[#00342b]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                      >
                        <span className="material-symbols-outlined text-base">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div className="space-y-4 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00342b] block pb-1 border-b border-slate-100">
                  2. Home Service Location
                </span>

                <div>
                  <label className="block text-xs font-semibold text-[#1a1c19] mb-1">House Address / Flat No.</label>
                  <input
                    type="text"
                    required
                    value={houseAddress}
                    onChange={(e) => setHouseAddress(e.target.value)}
                    placeholder="House No., Building Name, Street"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc9c4] text-xs text-[#1a1c19] focus:outline-none focus:border-[#00342b]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">Village / Mandal</label>
                    <input
                      type="text"
                      required
                      value={villageTown}
                      onChange={(e) => setVillageTown(e.target.value)}
                      placeholder="e.g. Undi"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc9c4] text-xs text-[#1a1c19] focus:outline-none focus:border-[#00342b]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">Postal Pincode</label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="534199"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc9c4] text-xs text-[#1a1c19] focus:outline-none focus:border-[#00342b]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">District</label>
                    <input
                      type="text"
                      required
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="West Godavari"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc9c4] text-xs text-[#1a1c19] focus:outline-none focus:border-[#00342b]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">State</label>
                    <select
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc9c4] text-xs text-[#1a1c19] bg-white focus:outline-none focus:border-[#00342b]"
                    >
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Maharashtra">Maharashtra</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Terms & Privacy */}
              <div className="flex items-start gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#00342b] focus:ring-[#00342b] border-[#bfc9c4]"
                />
                <label htmlFor="terms" className="text-xs text-[#3f4945] select-none leading-relaxed">
                  I agree to the <span className="font-semibold text-[#00342b]">Cooperative Fair Trade Charter</span> and{' '}
                  <span className="font-semibold text-[#00342b]">Privacy Policy</span>.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#00342b] hover:bg-[#004d40] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                ) : (
                  <>
                    <span>Create Customer Account & Continue</span>
                    <span className="material-symbols-outlined text-base">person_add</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

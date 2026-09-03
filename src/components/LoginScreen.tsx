import React, { useState } from 'react';
import { ScreenId, UserRole } from '../types';

interface LoginScreenProps {
  setCurrentScreen: (screen: ScreenId) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  setCurrentScreen,
  userRole,
  setUserRole,
}) => {
  const [activeTab, setActiveTab] = useState<'customer' | 'worker'>(userRole);
  const [identifier, setIdentifier] = useState(
    userRole === 'worker' ? 'ravi.electrician.undi@gmail.com' : 'harsha@example.com'
  );
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  const handleTabChange = (role: 'customer' | 'worker') => {
    setActiveTab(role);
    setUserRole(role);
    if (role === 'worker') {
      setIdentifier('ravi.electrician.undi@gmail.com');
    } else {
      setIdentifier('harsha@example.com');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (activeTab === 'worker') {
        setCurrentScreen('worker-home');
      } else {
        setCurrentScreen('customer-home');
      }
    }, 450);
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    setOtpValue('4892');
  };

  return (
    <div className="min-h-screen bg-[#fafaf5] text-[#1a1c19] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto space-y-5">
        {/* Top Back Nav */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentScreen('welcome')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#707975] hover:text-[#00342b] py-1.5 px-3 rounded-xl hover:bg-slate-200/50 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-medium">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            <span>100% Verified Co-op Community</span>
          </div>
        </div>

        {/* Split Card for Desktop Layout */}
        <div className="bg-white rounded-3xl border border-[#e3e3de] shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Left Column: Co-op Info (5 cols) */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#00342b] to-[#00201a] text-white p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-2xl bg-[#004d40] border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                <span className="material-symbols-outlined text-2xl">hub</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl text-white tracking-tight">
                {activeTab === 'worker' ? 'Partner Dashboard' : 'TrustWorkers Portal'}
              </h2>
              <p className="text-xs text-emerald-100/85 leading-relaxed">
                {activeTab === 'worker'
                  ? 'Access live radar job broadcasts, doorstep OTP verifications, and claim 100% direct UPI settlement.'
                  : 'Book verified neighborhood technicians with standard hourly rates and zero middleman surge pricing.'}
              </p>

              <div className="pt-2 space-y-2.5 text-xs">
                <div className="flex items-center gap-2 text-emerald-300">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>100% Direct UPI Settlement</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-300">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>0% Commission Surcharge</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-300">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>Mandatory 10th Pass Police Verified</span>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="bg-white/10 rounded-2xl p-3.5 border border-white/10 text-xs">
              <div className="flex items-center gap-2.5 mb-1.5">
                <img
                  src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=120&auto=format&fit=crop&q=80"
                  alt="Ramesh K."
                  className="w-8 h-8 rounded-full object-cover border border-amber-400"
                />
                <div>
                  <span className="font-bold text-white block text-xs">Ramesh K.</span>
                  <span className="text-[10px] text-amber-300">Certified Electrician • Undi</span>
                </div>
              </div>
              <p className="text-[11px] text-emerald-100/90 italic">
                "I receive 100% of my rate on the spot. TrustWorkers protects our livelihood."
              </p>
            </div>
          </div>

          {/* Right Column: Form (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-4">
            <div>
              <h1 className="text-2xl font-bold font-display text-[#1a1c19]">Welcome Back</h1>
              <p className="text-xs text-[#707975] mt-1">
                Sign in to access verified neighborhood services or manage your trade jobs.
              </p>
            </div>

        {/* Role Tabs */}
        <div className="grid grid-cols-2 gap-2 bg-[#eeeee9] p-1 rounded-xl mb-4">
          <button
            type="button"
            onClick={() => handleTabChange('customer')}
            className={`py-2 px-3 rounded-lg text-xs font-bold flex flex-col items-center gap-0.5 transition-all ${
              activeTab === 'customer'
                ? 'bg-white text-[#00342b] shadow-xs'
                : 'text-[#707975] hover:text-[#1a1c19]'
            }`}
          >
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">person</span>
              <span>Customer</span>
            </span>
            <span className="text-[10px] font-normal text-[#3f4945]">Book Services</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('worker')}
            className={`py-2 px-3 rounded-lg text-xs font-bold flex flex-col items-center gap-0.5 transition-all ${
              activeTab === 'worker'
                ? 'bg-white text-[#835500] shadow-xs'
                : 'text-[#707975] hover:text-[#1a1c19]'
            }`}
          >
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">engineering</span>
              <span>Worker Partner</span>
            </span>
            <span className="text-[10px] font-normal text-[#835500]">Work & Earn, 0% Comm.</span>
          </button>
        </div>

        {/* Cooperative Assurance Banner */}
        <div
          className={`p-3 rounded-xl border mb-4 text-xs flex items-start gap-2.5 transition-all ${
            activeTab === 'worker'
              ? 'bg-[#fffbeb] border-[#ffaa14]/40 text-[#694300]'
              : 'bg-[#afefdd]/20 border-emerald-200 text-[#004d40]'
          }`}
        >
          <span className="material-symbols-outlined text-lg mt-0.5">verified</span>
          <div>
            <span className="font-bold block text-[11px]">Cooperative Assurance</span>
            <span className="text-[11px] leading-tight">
              {activeTab === 'worker'
                ? 'Zero commission cuts. Direct UPI payout within 2 hours of job completion.'
                : 'Fair wages for workers, reliable transparent service for households with 0% surge pricing.'}
            </span>
          </div>
        </div>

        {/* Quick Demo Pre-fill Pill Bar */}
        <div className="bg-[#f4f4ef] border border-[#e3e3de] p-2 rounded-xl mb-4 flex items-center justify-between text-[11px]">
          <span className="text-[#707975] font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-amber-600 text-sm">bolt</span>
            <span>Demo Quick Fill:</span>
          </span>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => handleTabChange('customer')}
              className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[#00342b] font-medium hover:border-emerald-500"
            >
              Harsha (Customer)
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('worker')}
              className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[#835500] font-medium hover:border-amber-500"
            >
              Ravi (Worker)
            </button>
          </div>
        </div>

        {/* Main Form Card */}
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl border border-[#e3e3de] p-4 sm:p-5 shadow-xs space-y-4 mb-4"
        >
          {/* Mobile or Email */}
          <div>
            <label className="block text-xs font-semibold text-[#1a1c19] mb-1">
              Mobile Number or Email
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#707975] text-lg">
                alternate_email
              </span>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#bfc9c4] text-xs font-medium text-[#1a1c19] focus:outline-none focus:border-[#00342b] focus:ring-1 focus:ring-[#00342b]"
                placeholder={
                  activeTab === 'worker'
                    ? 'ravi.electrician.undi@gmail.com or 9848023145'
                    : 'harsha@example.com or 9876543210'
                }
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-[#1a1c19]">Password</label>
              <button
                type="button"
                onClick={() => alert('Co-op Password reset OTP has been dispatched to your linked mobile number.')}
                className="text-[11px] font-semibold text-[#835500] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#707975] text-lg">
                lock
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-[#bfc9c4] text-xs font-medium text-[#1a1c19] focus:outline-none focus:border-[#00342b] focus:ring-1 focus:ring-[#00342b]"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#707975] hover:text-[#1a1c19] p-1"
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded text-[#00342b] focus:ring-[#00342b] border-[#bfc9c4]"
            />
            <label htmlFor="remember" className="text-xs text-[#3f4945] select-none">
              Remember this device for seamless bookings
            </label>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all ${
              activeTab === 'worker'
                ? 'bg-[#00342b] hover:bg-[#004d40]'
                : 'bg-[#00342b] hover:bg-[#004d40]'
            }`}
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>
                  {activeTab === 'worker' ? 'Login to Worker Portal' : 'Login to Book Services'}
                </span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </>
            )}
          </button>

          {/* OR Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#e3e3de] w-full"></div>
            <span className="bg-white px-2 text-[10px] uppercase font-bold tracking-wider text-[#707975] absolute">
              Or Instant Access
            </span>
          </div>

          {/* OTP Trigger */}
          {otpSent ? (
            <div className="bg-[#eef0ea] p-2.5 rounded-lg border border-[#bfc9c4]/60 space-y-2 text-xs">
              <div className="flex items-center justify-between text-[11px] text-emerald-800 font-semibold">
                <span>OTP sent to registered number</span>
                <span className="text-[10px] text-slate-500">Auto-filled: 4892</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                  placeholder="Enter 4-digit OTP"
                  className="flex-1 py-1.5 px-3 rounded border border-slate-300 bg-white text-xs font-bold text-center tracking-widest"
                />
                <button
                  type="button"
                  onClick={handleLogin}
                  className="bg-[#00342b] text-white px-3 py-1.5 rounded font-bold text-xs"
                >
                  Verify & Enter
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full py-2.5 rounded-xl border border-[#bfc9c4] hover:border-[#00342b] text-[#1a1c19] text-xs font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
            >
              <span className="material-symbols-outlined text-base text-[#707975]">sms</span>
              <span>Login via SMS OTP</span>
            </button>
          )}
        </form>

        {/* Register Redirect */}
        <div className="text-center pt-2">
          <p className="text-xs text-[#707975]">
            Don't have an account?{' '}
            <button
              onClick={() => {
                if (activeTab === 'worker') {
                  setCurrentScreen('register-worker');
                } else {
                  setCurrentScreen('register-customer');
                }
              }}
              className="text-[#835500] font-bold hover:underline cursor-pointer ml-1 inline-flex items-center gap-0.5"
            >
              <span>{activeTab === 'worker' ? 'Join as Worker Partner' : 'Register as Customer'}</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </p>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

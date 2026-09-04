import React from 'react';
import { ScreenId, UserRole } from '../types';

interface NavigationHeaderProps {
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onOpenNotifications?: () => void;
  unreadCount?: number;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentScreen,
  setCurrentScreen,
  userRole,
  setUserRole,
  unreadCount = 2,
}) => {
  const isLoggedIn = !['welcome', 'login', 'register-customer', 'register-worker'].includes(currentScreen);

  return (
    <header className="sticky top-0 z-40 bg-[#00342b] text-white shadow-md border-b border-[#065043]">
      {/* Main Top Bar matching Website size */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Left Side: Brand Logo & Navigation */}
        <div className="flex items-center gap-6">
          <div
            onClick={() => {
              if (!isLoggedIn) {
                setCurrentScreen('welcome');
              } else if (userRole === 'worker') {
                setCurrentScreen('worker-home');
              } else {
                setCurrentScreen('customer-home');
              }
            }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#004d40] border border-emerald-600/50 flex items-center justify-center text-emerald-300 group-hover:scale-105 transition-transform shadow-sm">
              <span className="material-symbols-outlined text-2xl">hub</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-lg tracking-tight text-white">TrustWorkers</span>
                {isLoggedIn ? (
                  userRole === 'worker' ? (
                    <span className="bg-amber-400 text-amber-950 font-bold text-[10px] px-1.5 py-0.5 rounded tracking-wide">
                      PARTNER
                    </span>
                  ) : (
                    <span className="text-[10px] text-emerald-300 font-medium tracking-wider uppercase">
                      PORTAL
                    </span>
                  )
                ) : (
                  <span className="bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 font-semibold text-[10px] px-1.5 py-0.5 rounded tracking-wide">
                    COOPERATIVE
                  </span>
                )}
              </div>
              <p className="text-[11px] text-emerald-200/80 -mt-0.5">Local Skills • 100% Fair Work • 0% Surge</p>
            </div>
          </div>

          {/* Desktop Navigation Links (Only shown when logged in or public links when not logged in) */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold pl-4 border-l border-emerald-800/80">
            {isLoggedIn ? (
              userRole === 'customer' ? (
                <>
                  <button
                    onClick={() => setCurrentScreen('customer-home')}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                      currentScreen === 'customer-home'
                        ? 'bg-[#004d40] text-emerald-200 shadow-xs'
                        : 'text-emerald-100 hover:text-white hover:bg-emerald-800/40'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">home</span>
                    <span>Explore Services</span>
                  </button>
                  <button
                    onClick={() => setCurrentScreen('customer-bookings')}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                      currentScreen === 'customer-bookings' || currentScreen === 'live-dispatch' || currentScreen === 'live-tracking'
                        ? 'bg-[#004d40] text-emerald-200 shadow-xs'
                        : 'text-emerald-100 hover:text-white hover:bg-emerald-800/40'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">calendar_month</span>
                    <span>My Bookings</span>
                  </button>
                  <button
                    onClick={() => setCurrentScreen('live-tracking')}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                      currentScreen === 'live-tracking'
                        ? 'bg-[#004d40] text-emerald-200 shadow-xs'
                        : 'text-emerald-100 hover:text-white hover:bg-emerald-800/40'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">navigation</span>
                    <span>Live Tracking</span>
                  </button>
                  <button
                    onClick={() => setCurrentScreen('customer-profile')}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                      currentScreen === 'customer-profile'
                        ? 'bg-[#004d40] text-emerald-200 shadow-xs'
                        : 'text-emerald-100 hover:text-white hover:bg-emerald-800/40'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">account_circle</span>
                    <span>Co-op Impact</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setCurrentScreen('worker-home')}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                      currentScreen === 'worker-home'
                        ? 'bg-[#004d40] text-emerald-200 shadow-xs'
                        : 'text-emerald-100 hover:text-white hover:bg-emerald-800/40'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">dashboard</span>
                    <span>Partner Dashboard</span>
                  </button>
                  <button
                    onClick={() => setCurrentScreen('worker-profile')}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                      currentScreen === 'worker-profile'
                        ? 'bg-[#004d40] text-emerald-200 shadow-xs'
                        : 'text-emerald-100 hover:text-white hover:bg-emerald-800/40'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">badge</span>
                    <span>Verified Credentials</span>
                  </button>
                  <button
                    onClick={() => setCurrentScreen('chat')}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                      currentScreen === 'chat'
                        ? 'bg-[#004d40] text-emerald-200 shadow-xs'
                        : 'text-emerald-100 hover:text-white hover:bg-emerald-800/40'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                    <span>Dispatch Messages</span>
                  </button>
                </>
              )
            ) : (
              <>
                <button
                  onClick={() => setCurrentScreen('welcome')}
                  className="px-3 py-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-800/40 transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">school</span>
                  <span>10th Pass Verification</span>
                </button>
                <button
                  onClick={() => setCurrentScreen('welcome')}
                  className="px-3 py-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-800/40 transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">verified</span>
                  <span>0% Middleman Surge Guarantee</span>
                </button>
              </>
            )}
          </nav>
        </div>

        {/* Right Side Controls: Only show logged-in user profile & notifications when logged in */}
        <div className="flex items-center gap-3">
          {/* Statutory Co-op Seva Badge */}
          <div className="hidden lg:flex items-center gap-1.5 bg-[#065043] px-3 py-1 rounded-full text-xs text-emerald-200 border border-emerald-600/40">
            <span className="material-symbols-outlined text-sm text-emerald-400">verified_user</span>
            <span>Statutory Co-op Seva • 0% Surge</span>
          </div>

          {/* Emergency Helpline button */}
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-amber-200 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-full">
            <span className="material-symbols-outlined text-xs text-amber-300">support_agent</span>
            <span>Helpline: 1800-425-COOP</span>
          </div>

          {isLoggedIn ? (
            <>
              {/* Notifications Icon */}
              <button
                onClick={() => {
                  if (userRole === 'worker') setCurrentScreen('worker-home');
                  else setCurrentScreen('customer-bookings');
                }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-emerald-100 hover:bg-emerald-800/60 transition-colors relative"
                title="Notifications"
              >
                <span className="material-symbols-outlined text-xl">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                )}
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500"></span>
                )}
              </button>

              {/* Profile Icon Avatar & Name Pill: displays Ram when customer or Ravi Kumar when worker */}
              <button
                onClick={() => {
                  if (userRole === 'worker') setCurrentScreen('worker-profile');
                  else setCurrentScreen('customer-profile');
                }}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-[#004d40] border border-emerald-500/50 text-emerald-100 hover:border-emerald-300 transition-colors"
                title="View Profile"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden border border-white/20">
                  {userRole === 'worker' ? (
                    <img
                      src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=120&auto=format&fit=crop&q=80"
                      alt="Ravi Kumar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                      alt="Ram"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="text-left hidden sm:block">
                  <span className="block text-xs font-bold leading-tight">
                    {userRole === 'worker' ? 'Ravi Kumar' : 'Ram'}
                  </span>
                  <span className="text-[10px] text-emerald-300 leading-none">
                    {userRole === 'worker' ? 'Master Electrician' : 'Member #CM-4821'}
                  </span>
                </div>
              </button>

              {/* Quick Logout Button */}
              <button
                onClick={() => {
                  setCurrentScreen('welcome');
                }}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-emerald-300 hover:text-white hover:bg-emerald-800/60 transition-colors"
                title="Log Out to Welcome Screen"
              >
                <span className="material-symbols-outlined text-lg">logout</span>
              </button>
            </>
          ) : (
            /* Logged Out / Public view CTAs */
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentScreen('login')}
                className="px-3.5 py-1.5 rounded-xl border border-emerald-500/40 text-emerald-100 hover:text-white hover:bg-emerald-800/50 text-xs font-bold transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setUserRole('customer');
                  setCurrentScreen('register-customer');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-white text-[#00342b] hover:bg-emerald-50 text-xs font-bold transition-colors shadow-xs"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

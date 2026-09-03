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
  const [showScreenPicker, setShowScreenPicker] = React.useState(false);

  const screenGroups: { label: string; role: 'shared' | 'customer' | 'worker'; screens: { id: ScreenId; title: string }[] }[] = [
    {
      label: 'Onboarding & Auth',
      role: 'shared',
      screens: [
        { id: 'welcome', title: '1. Welcome & Role Selection' },
        { id: 'login', title: '2. Login (Customer & Worker)' },
        { id: 'register-customer', title: '3. Customer Registration' },
        { id: 'register-worker', title: '4. Worker 10th+ Pass Registration' },
      ],
    },
    {
      label: 'Customer Experience',
      role: 'customer',
      screens: [
        { id: 'customer-home', title: '5. Customer Home (Services & Co-op Guarantee)' },
        { id: 'schedule-service', title: '6. Schedule Service (Multi-worker & Time)' },
        { id: 'live-dispatch', title: '7. Live Dispatch (Dual Team & Radar)' },
        { id: 'payment-confirm', title: '8. Worker Assigned & Payment' },
        { id: 'customer-bookings', title: '9. My Bookings (Ongoing & Completed)' },
        { id: 'customer-profile', title: '10. Customer Profile & Co-op Savings' },
      ],
    },
    {
      label: 'Worker Partner Experience',
      role: 'worker',
      screens: [
        { id: 'worker-home', title: '11. Partner Dashboard & Seva Summary' },
        { id: 'worker-active-jobs', title: '12. Active Jobs Radar & Acceptance' },
        { id: 'worker-profile', title: '13. Partner Performance & ₹34,600 Payout' },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#00342b] text-white shadow-md border-b border-[#065043]">
      {/* Quick Screen Nav & Role Switcher Bar */}
      <div className="bg-[#00201a] px-3 py-1.5 text-xs flex items-center justify-between border-b border-emerald-900/60">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-emerald-200">TrustWorkers Co-op</span>
          <span className="text-emerald-500">•</span>
          <span className="text-emerald-300 font-medium">
            {userRole === 'customer' ? 'Customer Mode' : 'Worker Partner Mode'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Role Switcher Button */}
          <button
            onClick={() => {
              if (userRole === 'customer') {
                setUserRole('worker');
                setCurrentScreen('worker-home');
              } else {
                setUserRole('customer');
                setCurrentScreen('customer-home');
              }
            }}
            className="px-2 py-0.5 rounded-full bg-[#004d40] hover:bg-emerald-700 text-emerald-100 text-[11px] font-semibold flex items-center gap-1 transition-colors border border-emerald-600/40"
            title="Toggle between Customer and Worker Partner perspective"
          >
            <span className="material-symbols-outlined text-[13px]">swap_horiz</span>
            <span>Switch to {userRole === 'customer' ? 'Worker' : 'Customer'}</span>
          </button>

          {/* Screen Picker Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowScreenPicker(!showScreenPicker)}
              className="px-2 py-0.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-semibold flex items-center gap-1 transition-colors border border-amber-500/30"
            >
              <span className="material-symbols-outlined text-[13px]">view_carousel</span>
              <span>All 13 Screens</span>
              <span className="material-symbols-outlined text-[12px]">expand_more</span>
            </button>

            {showScreenPicker && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
                  onClick={() => setShowScreenPicker(false)}
                />
                <div className="absolute right-0 top-7 z-50 w-72 max-h-[80vh] overflow-y-auto bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 p-2.5 space-y-2 text-xs animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 px-1">
                    <span className="font-bold text-slate-900 text-xs">Jump to Screen</span>
                    <button
                      onClick={() => setShowScreenPicker(false)}
                      className="text-slate-400 hover:text-slate-700 p-0.5 rounded"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>

                  {screenGroups.map((grp) => (
                    <div key={grp.label} className="space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 pt-1">
                        {grp.label}
                      </div>
                      <div className="space-y-0.5">
                        {grp.screens.map((scr) => (
                          <button
                            key={scr.id}
                            onClick={() => {
                              setCurrentScreen(scr.id);
                              if (scr.id.startsWith('worker-')) {
                                setUserRole('worker');
                              } else if (scr.id.startsWith('customer-') || scr.id === 'schedule-service' || scr.id === 'live-dispatch' || scr.id === 'payment-confirm') {
                                setUserRole('customer');
                              }
                              setShowScreenPicker(false);
                            }}
                            className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                              currentScreen === scr.id
                                ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <span>{scr.title}</span>
                            {currentScreen === scr.id && (
                              <span className="material-symbols-outlined text-emerald-700 text-xs font-bold">
                                check
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Top Bar matching Website size */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div
            onClick={() => {
              if (userRole === 'worker') setCurrentScreen('worker-home');
              else setCurrentScreen('customer-home');
            }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#004d40] border border-emerald-600/50 flex items-center justify-center text-emerald-300 group-hover:scale-105 transition-transform shadow-sm">
              <span className="material-symbols-outlined text-2xl">hub</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-lg tracking-tight text-white">TrustWorkers</span>
                {userRole === 'worker' ? (
                  <span className="bg-amber-400 text-amber-950 font-bold text-[10px] px-1.5 py-0.5 rounded tracking-wide">
                    PARTNER
                  </span>
                ) : (
                  <span className="text-[10px] text-emerald-300 font-medium tracking-wider uppercase">
                    PORTAL
                  </span>
                )}
              </div>
              <p className="text-[11px] text-emerald-200/80 -mt-0.5">Local Skills • 100% Fair Work • 0% Surge</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold pl-4 border-l border-emerald-800/80">
            {userRole === 'customer' ? (
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
            )}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Trust Seva Badge (screenshot 25 & 27) */}
          <div className="hidden lg:flex items-center gap-1.5 bg-[#065043] px-3 py-1 rounded-full text-xs text-emerald-200 border border-emerald-600/40">
            <span className="material-symbols-outlined text-sm text-emerald-400">verified_user</span>
            <span>Statutory Co-op Seva • 0% Surge</span>
          </div>

          {/* Emergency Helpline button */}
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-amber-200 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-full">
            <span className="material-symbols-outlined text-xs text-amber-300">support_agent</span>
            <span>Helpline: 1800-425-COOP</span>
          </div>

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

          {/* Profile Icon Avatar & Name Pill */}
          <button
            onClick={() => {
              if (userRole === 'worker') setCurrentScreen('worker-profile');
              else setCurrentScreen('customer-profile');
            }}
            className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-[#004d40] border border-emerald-500/50 text-emerald-100 hover:border-emerald-300 transition-colors"
            title="User Profile"
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
                  alt="Harsha Vardhan"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="text-left hidden sm:block">
              <span className="block text-xs font-bold leading-tight">
                {userRole === 'worker' ? 'Ravi Kumar' : 'Harsha V.'}
              </span>
              <span className="text-[10px] text-emerald-300 leading-none">
                {userRole === 'worker' ? 'Master Electrician' : 'Member #CM-4821'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

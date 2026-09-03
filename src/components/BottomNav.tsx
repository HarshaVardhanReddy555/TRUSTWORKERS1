import React from 'react';
import { ScreenId, UserRole } from '../types';

interface BottomNavProps {
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  userRole: UserRole;
  activeJobsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  setCurrentScreen,
  userRole,
  activeJobsCount = 3,
}) => {
  // Hide bottom nav on onboarding/auth screens
  if (
    currentScreen === 'welcome' ||
    currentScreen === 'login' ||
    currentScreen === 'register-customer' ||
    currentScreen === 'register-worker'
  ) {
    return null;
  }

  if (userRole === 'customer') {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e3e3de] shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-around py-2 px-3">
          {/* Home */}
          <button
            onClick={() => setCurrentScreen('customer-home')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentScreen === 'customer-home'
                ? 'text-[#00342b] font-bold'
                : 'text-[#707975] hover:text-[#00342b]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-2xl ${
                currentScreen === 'customer-home' ? 'font-variation-fill' : ''
              }`}
            >
              home
            </span>
            <span className="text-[11px] font-medium leading-none">Home</span>
          </button>

          {/* Bookings */}
          <button
            onClick={() => setCurrentScreen('customer-bookings')}
            className={`flex flex-col items-center gap-1 transition-colors relative ${
              currentScreen === 'customer-bookings' || currentScreen === 'live-dispatch' || currentScreen === 'payment-confirm'
                ? 'text-[#00342b] font-bold'
                : 'text-[#707975] hover:text-[#00342b]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-2xl ${
                currentScreen === 'customer-bookings' ? 'font-variation-fill' : ''
              }`}
            >
              calendar_month
            </span>
            <span className="text-[11px] font-medium leading-none">Bookings</span>
          </button>

          {/* Profile */}
          <button
            onClick={() => setCurrentScreen('customer-profile')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentScreen === 'customer-profile'
                ? 'text-[#00342b] font-bold'
                : 'text-[#707975] hover:text-[#00342b]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-2xl ${
                currentScreen === 'customer-profile' ? 'font-variation-fill' : ''
              }`}
            >
              person
            </span>
            <span className="text-[11px] font-medium leading-none">Profile</span>
          </button>
        </div>
      </nav>
    );
  }

  // Worker Partner Nav
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e3e3de] shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around py-2 px-2">
        {/* Home / Dashboard */}
        <button
          onClick={() => setCurrentScreen('worker-home')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            currentScreen === 'worker-home'
              ? 'text-[#00342b] font-bold'
              : 'text-[#707975] hover:text-[#00342b]'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">home</span>
          <span className="text-[11px] font-medium leading-none">Home</span>
        </button>

        {/* Active Jobs */}
        <button
          onClick={() => setCurrentScreen('worker-active-jobs')}
          className={`flex flex-col items-center gap-1 transition-colors relative ${
            currentScreen === 'worker-active-jobs'
              ? 'text-[#00342b] font-bold'
              : 'text-[#707975] hover:text-[#00342b]'
          }`}
        >
          <div className="relative">
            <span className="material-symbols-outlined text-2xl">work</span>
            {activeJobsCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#d97706] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {activeJobsCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium leading-none">Active Jobs</span>
        </button>

        {/* Performance & Payouts */}
        <button
          onClick={() => setCurrentScreen('worker-profile')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            currentScreen === 'worker-profile'
              ? 'text-[#00342b] font-bold'
              : 'text-[#707975] hover:text-[#00342b]'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">trending_up</span>
          <span className="text-[11px] font-medium leading-none">Performance</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => setCurrentScreen('worker-profile')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            currentScreen === 'worker-profile'
              ? 'text-[#00342b] font-bold'
              : 'text-[#707975] hover:text-[#00342b]'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">person</span>
          <span className="text-[11px] font-medium leading-none">Profile</span>
        </button>
      </div>
    </nav>
  );
};

import React, { useState } from 'react';
import { Booking, ScreenId, ServiceItem, UserRole } from './types';
import { INITIAL_SERVICES, SAMPLE_ACTIVE_BOOKING } from './mockData';
import { NavigationHeader } from './components/NavigationHeader';
import { BottomNav } from './components/BottomNav';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginScreen } from './components/LoginScreen';
import { RegisterCustomerScreen } from './components/RegisterCustomerScreen';
import { RegisterWorkerScreen } from './components/RegisterWorkerScreen';
import { CustomerHomeScreen } from './components/CustomerHomeScreen';
import { ScheduleServiceScreen } from './components/ScheduleServiceScreen';
import { LiveDispatchScreen } from './components/LiveDispatchScreen';
import { LiveTrackingScreen } from './components/LiveTrackingScreen';
import { PaymentConfirmScreen } from './components/PaymentConfirmScreen';
import { WorkerHomeScreen } from './components/WorkerHomeScreen';
import { WorkerProfileScreen } from './components/WorkerProfileScreen';
import { CustomerBookingsScreen } from './components/CustomerBookingsScreen';
import { CustomerProfileScreen } from './components/CustomerProfileScreen';
import { ChatScreen } from './components/ChatScreen';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('welcome');
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [selectedService, setSelectedService] = useState<ServiceItem>(INITIAL_SERVICES[0]);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(SAMPLE_ACTIVE_BOOKING);
  const [chatPartnerName, setChatPartnerName] = useState<string>('Ravi Kumar');

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
  };

  const handleConfirmSchedule = (booking: Booking) => {
    setActiveBooking(booking);
  };

  const handlePaymentSuccess = () => {
    if (activeBooking) {
      setActiveBooking({
        ...activeBooking,
        status: 'completed',
        stepCurrent: 5,
      });
    }
  };

  const handleOpenChat = (partnerName: string) => {
    setChatPartnerName(partnerName);
    setCurrentScreen('chat');
  };

  const isOnboardingScreen =
    currentScreen === 'welcome' ||
    currentScreen === 'login' ||
    currentScreen === 'register-customer' ||
    currentScreen === 'register-worker';

  return (
    <div className="min-h-screen bg-[#fafaf5] flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* Top Global Navigation Bar (Includes Role Switcher & Screen Jump for easy demo review) */}
      <NavigationHeader
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        userRole={userRole}
        setUserRole={setUserRole}
      />

      {/* Screen Render Container (Full Website Size) */}
      <main className="flex-1 w-full">
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            setCurrentScreen={setCurrentScreen}
            setUserRole={setUserRole}
          />
        )}

        {currentScreen === 'login' && (
          <LoginScreen
            setCurrentScreen={setCurrentScreen}
            userRole={userRole}
            setUserRole={setUserRole}
          />
        )}

        {currentScreen === 'register-customer' && (
          <RegisterCustomerScreen
            setCurrentScreen={setCurrentScreen}
            setUserRole={setUserRole}
          />
        )}

        {currentScreen === 'register-worker' && (
          <RegisterWorkerScreen
            setCurrentScreen={setCurrentScreen}
            setUserRole={setUserRole}
          />
        )}

        {currentScreen === 'customer-home' && (
          <CustomerHomeScreen
            services={services}
            activeBooking={activeBooking}
            onSelectService={handleSelectService}
            setCurrentScreen={setCurrentScreen}
            onOpenLiveTracking={() => setCurrentScreen('live-tracking')}
          />
        )}

        {currentScreen === 'schedule-service' && (
          <ScheduleServiceScreen
            selectedService={selectedService}
            onConfirmSchedule={handleConfirmSchedule}
            setCurrentScreen={setCurrentScreen}
          />
        )}

        {currentScreen === 'live-dispatch' && (
          <LiveDispatchScreen
            booking={activeBooking}
            setCurrentScreen={setCurrentScreen}
            onOpenLiveTracking={() => setCurrentScreen('live-tracking')}
            onOpenChat={handleOpenChat}
          />
        )}

        {currentScreen === 'live-tracking' && (
          <LiveTrackingScreen
            setCurrentScreen={setCurrentScreen}
            onOpenChat={handleOpenChat}
          />
        )}

        {currentScreen === 'payment-confirm' && (
          <PaymentConfirmScreen
            booking={activeBooking}
            setCurrentScreen={setCurrentScreen}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}

        {currentScreen === 'worker-home' && (
          <WorkerHomeScreen
            setCurrentScreen={setCurrentScreen}
            onOpenChat={handleOpenChat}
          />
        )}

        {currentScreen === 'worker-profile' && (
          <WorkerProfileScreen
            setCurrentScreen={setCurrentScreen}
            onOpenChat={handleOpenChat}
            onBookWorker={() => {
              setSelectedService(INITIAL_SERVICES[0]);
              setCurrentScreen('schedule-service');
            }}
          />
        )}

        {currentScreen === 'customer-bookings' && (
          <CustomerBookingsScreen
            activeBooking={activeBooking}
            setCurrentScreen={setCurrentScreen}
            onOpenLiveTracking={() => setCurrentScreen('live-tracking')}
          />
        )}

        {currentScreen === 'customer-profile' && (
          <CustomerProfileScreen
            setCurrentScreen={setCurrentScreen}
            setUserRole={setUserRole}
          />
        )}

        {currentScreen === 'chat' && (
          <ChatScreen
            partnerName={chatPartnerName}
            setCurrentScreen={setCurrentScreen}
          />
        )}
      </main>

      {/* Modern Cooperative Website Footer */}
      <footer className="bg-[#00201a] text-[#bfc9c4] border-t border-[#065043] py-10 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-[#004d40] border border-emerald-600/50 flex items-center justify-center text-emerald-300">
                <span className="material-symbols-outlined text-xl">hub</span>
              </div>
              <span className="font-display font-bold text-base tracking-tight">TrustWorkers</span>
            </div>
            <p className="text-[#a0aaa5] leading-relaxed text-xs">
              A registered worker-consumer multi-stakeholder cooperative society (AP-COOP-2023-904). Standardizing fair trade labor, 0% middleman commission, and statutory welfare.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <span>100% Direct UPI Settlement & Insured Services</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Popular Services</h4>
            <ul className="space-y-2 text-[#a0aaa5]">
              <li><button onClick={() => { setCurrentScreen('customer-home'); }} className="hover:text-emerald-300 transition-colors">Electrician & Wiring</button></li>
              <li><button onClick={() => { setCurrentScreen('customer-home'); }} className="hover:text-emerald-300 transition-colors">Plumbing & Sanitary</button></li>
              <li><button onClick={() => { setCurrentScreen('customer-home'); }} className="hover:text-emerald-300 transition-colors">Carpentry & Furniture</button></li>
              <li><button onClick={() => { setCurrentScreen('customer-home'); }} className="hover:text-emerald-300 transition-colors">Home Deep Cleaning</button></li>
              <li><button onClick={() => { setCurrentScreen('customer-home'); }} className="hover:text-emerald-300 transition-colors">Solar Inverter Setup</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Cooperative Governance</h4>
            <ul className="space-y-2 text-[#a0aaa5]">
              <li><span className="hover:text-emerald-300 cursor-pointer">10th Pass Verification Policy</span></li>
              <li><span className="hover:text-emerald-300 cursor-pointer">Police Clearance Standard</span></li>
              <li><span className="hover:text-emerald-300 cursor-pointer">Worker Social Shield & Pension</span></li>
              <li><span className="hover:text-emerald-300 cursor-pointer">Fair Price Index (0% Surge)</span></li>
              <li><span className="hover:text-emerald-300 cursor-pointer">Ombudsman & Grievance Cell</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Support & Helplines</h4>
            <div className="space-y-2 text-[#a0aaa5]">
              <p className="flex items-center gap-1.5 text-white font-semibold">
                <span className="material-symbols-outlined text-emerald-400 text-sm">call</span>
                <span>Toll-Free: 1800-425-COOP (2667)</span>
              </p>
              <p className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-emerald-400 text-sm">mail</span>
                <span>help@trustworkers.coop</span>
              </p>
              <p className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-emerald-400 text-sm">location_on</span>
                <span>Undi Central Mandal Office, West Godavari - 534199</span>
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setUserRole('worker');
                    setCurrentScreen('register-worker');
                  }}
                  className="px-3 py-1.5 bg-[#ffaa14] text-[#2a1800] rounded-lg font-bold text-xs hover:bg-amber-400 transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">handshake</span>
                  <span>Join as Certified Partner</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#707975] gap-3">
          <p>© 2024 TrustWorkers Cooperative Society Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Consumer Charter</span>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Statutory Audits</span>
            <span className="text-emerald-400">Available across Andhra Pradesh & Karnataka</span>
          </div>
        </div>
      </footer>

      {/* Bottom Sticky Navigation for Logged-in Mobile View */}
      {!isOnboardingScreen && (
        <div className="md:hidden">
          <BottomNav
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
            userRole={userRole}
          />
        </div>
      )}
    </div>
  );
}

export default App;

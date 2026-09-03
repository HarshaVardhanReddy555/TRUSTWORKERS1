import React, { useState } from 'react';
import { Booking, ScreenId } from '../types';

interface PaymentConfirmScreenProps {
  booking: Booking | null;
  setCurrentScreen: (screen: ScreenId) => void;
  onPaymentSuccess: () => void;
}

export const PaymentConfirmScreen: React.FC<PaymentConfirmScreenProps> = ({
  booking,
  setCurrentScreen,
  onPaymentSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'qr' | 'cash'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('Excellent work, on time and no hidden charges!');

  const totalAmount = booking?.totalAmount ? booking.totalAmount + 120 : 620;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
    }, 1000);
  };

  const handleFinish = () => {
    onPaymentSuccess();
    setCurrentScreen('customer-home');
  };

  return (
    <div className="min-h-screen bg-[#fafaf5] text-[#1a1c19] py-6 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={() => setCurrentScreen('live-tracking')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#707975] hover:text-[#00342b] py-1.5 px-3 rounded-xl hover:bg-slate-200/50 transition-colors self-start"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Back to Live Tracking</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <span className="material-symbols-outlined text-base">verified</span>
            <span>Zero-Commission Cooperative Settlement</span>
          </div>
        </div>

        {/* Cooperative Direct Payout Guarantee Banner */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#00342b] via-[#004d40] to-[#00201a] text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold">
              <span className="material-symbols-outlined text-sm">payments</span>
              <span>100% Direct Payout to Technicians</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display leading-tight">
              Zero Middleman Aggregator Cuts
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Your entire payment is directly disbursed to the verified cooperative partner accounts.
              TrustWorkers operates as a registered self-reliant workers co-op with 0% platform commission deductions.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/15 text-center shrink-0 min-w-[160px]">
            <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider block">Total Settlement</span>
            <span className="text-3xl font-black text-white block my-0.5">₹{totalAmount}</span>
            <span className="text-[10px] text-emerald-200">All Taxes & Parts Included</span>
          </div>
        </div>

        {/* 2-Column Website Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Itemized Invoice (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            {/* Invoice Breakdown Card */}
            <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h2 className="font-bold text-base text-[#1a1c19]">
                    {booking?.serviceName || 'Dual Plumbing & Switchboard Repair'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">Booking Reference: #{booking?.id || 'CWS-8495'}</p>
                </div>
                <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-200">
                  Co-op Rate
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-[#3f4945] py-1 border-b border-slate-50">
                  <div>
                    <span className="font-bold text-[#1a1c19] block">Ravi Kumar (Lead Electrician/Plumber)</span>
                    <span className="text-[11px] text-slate-400">2 Hours @ Statutory ₹250/hr</span>
                  </div>
                  <span className="font-bold text-sm text-[#1a1c19]">₹500</span>
                </div>

                <div className="flex justify-between text-[#3f4945] py-1 border-b border-slate-50">
                  <div>
                    <span className="font-bold text-[#1a1c19] block">Hardware Spare Parts</span>
                    <span className="text-[11px] text-slate-400">Brass washer & seal joint (Receipt attached)</span>
                  </div>
                  <span className="font-bold text-sm text-[#1a1c19]">₹120</span>
                </div>

                <div className="flex justify-between text-emerald-700 py-1 border-b border-slate-50">
                  <div>
                    <span className="font-bold block">Community Cooperative Rebate</span>
                    <span className="text-[11px] opacity-80">Mandal member welfare discount</span>
                  </div>
                  <span className="font-bold text-sm">-₹20</span>
                </div>

                <div className="flex justify-between text-[#835500] font-medium py-1">
                  <div>
                    <span className="font-bold block">Platform Aggregator Commission</span>
                    <span className="text-[11px] text-slate-400">Traditional apps take 25%-35%</span>
                  </div>
                  <span className="font-bold text-sm text-emerald-700">₹0 (0% Free)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Final Amount Payable</span>
                  <span className="text-2xl font-black text-[#00342b]">₹{totalAmount}</span>
                </div>
                <span className="text-xs font-semibold text-slate-500">Includes all GST & verified parts</span>
              </div>
            </div>

            {/* Direct Settlement Details */}
            <div className="bg-[#f4f4ef] rounded-3xl border border-[#e3e3de] p-5 space-y-3 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#707975] block">
                Direct Transparent Settlement Split
              </span>

              <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">account_balance</span>
                  </div>
                  <div>
                    <span className="font-bold text-sm text-[#1a1c19] block">Ravi Kumar</span>
                    <span className="text-xs text-slate-400 font-mono">UPI: ravi.electrician@oksbi</span>
                  </div>
                </div>
                <span className="font-bold text-emerald-800 text-sm">₹{totalAmount} (100%)</span>
              </div>

              <p className="text-[11px] text-[#707975] leading-relaxed">
                TrustWorkers provides a zero-escrow direct transfer rail under the Self-Reliant Cooperatives Act.
              </p>
            </div>
          </div>

          {/* Right Column: Payment Method & Action (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            {!isPaid ? (
              <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 shadow-2xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-sm text-[#1a1c19] uppercase tracking-wider">
                    Select Payment Method
                  </h3>
                  <span className="text-xs text-slate-400">Direct Worker Rail</span>
                </div>

                <div className="space-y-3">
                  {/* UPI */}
                  <div
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#00342b] bg-emerald-50/50 ring-2 ring-[#00342b]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-[#1a1c19] block">
                          Instant UPI Apps
                        </span>
                        <span className="text-xs text-slate-500">Google Pay, PhonePe, Paytm, BHIM, CRED</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="text-[#00342b]"
                    />
                  </div>

                  {/* QR Code */}
                  <div
                    onClick={() => setPaymentMethod('qr')}
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'qr'
                        ? 'border-[#00342b] bg-emerald-50/50 ring-2 ring-[#00342b]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#835500] flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">qr_code_2</span>
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-[#1a1c19] block">
                          Scan Worker’s Physical Co-op QR
                        </span>
                        <span className="text-xs text-slate-500">Scan technician's badge QR directly</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      checked={paymentMethod === 'qr'}
                      onChange={() => setPaymentMethod('qr')}
                      className="text-[#00342b]"
                    />
                  </div>

                  {/* Cash */}
                  <div
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'cash'
                        ? 'border-[#00342b] bg-emerald-50/50 ring-2 ring-[#00342b]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">payments</span>
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-[#1a1c19] block">
                          Direct Cash Handover
                        </span>
                        <span className="text-xs text-slate-500">Hand cash directly to worker upon signed paper receipt</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                      className="text-[#00342b]"
                    />
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="w-full py-4 bg-[#00342b] hover:bg-[#004d40] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
                >
                  {isProcessing ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-lg">
                        progress_activity
                      </span>
                      <span>Disbursing Direct UPI Settlement...</span>
                    </>
                  ) : (
                    <>
                      <span>Authorize Pay ₹{totalAmount} & Complete Job</span>
                      <span className="material-symbols-outlined text-base">lock</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              /* Payment Completed & Rating Modal Card */
              <div className="bg-white rounded-3xl border-2 border-emerald-600 p-8 text-center shadow-lg space-y-5 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Payment Successfully Settled
                  </span>
                  <h3 className="text-2xl font-black font-display text-[#1a1c19] mt-1">
                    ₹{totalAmount} Transferred Directly
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-mono">
                    Transaction Ref: UPI/COOP-9482-901 • 0% Platform Deductions
                  </p>
                </div>

                {/* Rating Card */}
                <div className="bg-[#fafaf5] rounded-2xl p-5 space-y-3 text-xs border border-[#e3e3de]">
                  <span className="font-bold text-sm text-[#1a1c19] block">
                    Rate Ravi Kumar's Craftsmanship & Conduct
                  </span>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-125 transition-transform"
                      >
                        <span
                          className={`material-symbols-outlined text-3xl ${
                            star <= rating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'
                          }`}
                        >
                          star
                        </span>
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share feedback with the cooperative council..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-center focus:outline-none focus:border-[#00342b]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => alert('Cooperative receipt downloaded: INV-CWS-8495.pdf')}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-[#00342b] rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">download</span>
                    <span>Download Official Receipt</span>
                  </button>
                  <button
                    onClick={handleFinish}
                    className="flex-1 py-3 bg-[#00342b] hover:bg-[#004d40] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>Submit & Return Home</span>
                    <span className="material-symbols-outlined text-base">done</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

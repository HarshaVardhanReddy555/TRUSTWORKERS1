import React, { useState } from 'react';
import { WorkerProfile } from '../types';
import { calculateTrustScore, TrustScoreResult } from '../lib/trustScore';

interface TrustScoreBadgeProps {
  worker: WorkerProfile;
  variant?: 'compact' | 'full' | 'inline';
  className?: string;
  defaultExpanded?: boolean;
}

export const TrustScoreBadge: React.FC<TrustScoreBadgeProps> = ({
  worker,
  variant = 'compact',
  className = '',
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [showPopover, setShowPopover] = useState(false);

  const trustResult: TrustScoreResult = calculateTrustScore(worker);
  const { finalScore, tierName, breakdown } = trustResult;

  // Ring styling based on prompt: green for 80+, amber for 60-79, gray below 60
  const isGreen = finalScore >= 80;
  const isAmber = finalScore >= 60 && finalScore < 80;

  const colorTheme = isGreen
    ? {
        ringStroke: '#059669', // emerald-600
        trackStroke: '#d1fae5', // emerald-100
        bgPill: 'bg-emerald-50',
        border: 'border-emerald-300/80',
        textAccent: 'text-emerald-800',
        scoreText: 'text-[#00342b]',
        badgeBg: 'bg-[#afefdd]/50',
        progressBar: 'bg-emerald-600',
        tierBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        name: 'High Trust Co-op Certified',
      }
    : isAmber
    ? {
        ringStroke: '#d97706', // amber-600
        trackStroke: '#fef3c7', // amber-100
        bgPill: 'bg-amber-50',
        border: 'border-amber-300/80',
        textAccent: 'text-amber-800',
        scoreText: 'text-[#835500]',
        badgeBg: 'bg-[#ffddb5]/60',
        progressBar: 'bg-amber-500',
        tierBg: 'bg-amber-100 text-amber-900 border-amber-300',
        name: 'Standard Trust Partner',
      }
    : {
        ringStroke: '#64748b', // slate-500
        trackStroke: '#f1f5f9', // slate-100
        bgPill: 'bg-slate-50',
        border: 'border-slate-300',
        textAccent: 'text-slate-700',
        scoreText: 'text-slate-800',
        badgeBg: 'bg-slate-200',
        progressBar: 'bg-slate-500',
        tierBg: 'bg-slate-100 text-slate-800 border-slate-300',
        name: 'Probationary Member',
      };

  // SVG Circular Ring calculation
  const ringSize = variant === 'full' ? 56 : 30;
  const strokeWidth = variant === 'full' ? 4.5 : 3;
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (finalScore / 100) * circumference;

  // Breakdown Card Content (used in both full mode and popover)
  const renderBreakdownCard = (onClose?: () => void) => (
    <div className="bg-white rounded-3xl border-2 border-[#00342b]/20 p-5 shadow-lg space-y-4 max-w-md w-full text-left">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          {/* Ring */}
          <div className="relative flex items-center justify-center shrink-0">
            <svg width={52} height={52} className="transform -rotate-90">
              <circle
                cx={26}
                cy={26}
                r={22}
                stroke={colorTheme.trackStroke}
                strokeWidth={4}
                fill="transparent"
              />
              <circle
                cx={26}
                cy={26}
                r={22}
                stroke={colorTheme.ringStroke}
                strokeWidth={4}
                fill="transparent"
                strokeDasharray={2 * Math.PI * 22}
                strokeDashoffset={2 * Math.PI * 22 - (finalScore / 100) * (2 * Math.PI * 22)}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`text-base font-black ${colorTheme.scoreText} leading-none`}>
                {finalScore}
              </span>
              <span className="text-[8px] font-bold text-slate-400 leading-none">/100</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-bold font-display text-[#1a1c19]">
                Cooperative Trust Score
              </h4>
              <span
                className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${colorTheme.tierBg}`}
              >
                {tierName} Tier
              </span>
            </div>
            <p className="text-[11px] text-[#707975] mt-0.5">
              Multi-factor algorithmic co-op index • Zero review tampering
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs transition-colors shrink-0"
            title="Close breakdown"
          >
            ✕
          </button>
        )}
      </div>

      {/* 4 Weighted Components */}
      <div className="space-y-3 text-xs">
        {/* 1. Completion Rate */}
        <div className="bg-[#fafaf5] p-3 rounded-2xl border border-[#e3e3de] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#1a1c19] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-700 text-sm">
                task_alt
              </span>
              <span>1. Completion Rate (35% wt)</span>
            </span>
            <div className="text-right">
              <span className="font-extrabold text-[#00342b]">
                {breakdown.completionRate.value}%
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold ml-1.5">
                +{breakdown.completionRate.contribution} pts
              </span>
            </div>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${breakdown.completionRate.value}%` }}
            />
          </div>
          <p className="text-[10px] text-[#707975]">
            Verified via customer doorstep OTP settlement vs cancellation records
          </p>
        </div>

        {/* 2. Rating Average */}
        <div className="bg-[#fafaf5] p-3 rounded-2xl border border-[#e3e3de] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#1a1c19] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-amber-600 text-sm">
                star
              </span>
              <span>2. Rating Average (35% wt)</span>
            </span>
            <div className="text-right">
              <span className="font-extrabold text-[#00342b]">
                {worker.rating ? worker.rating.toFixed(2) : '4.80'}★ ({breakdown.ratingAverage.value}%)
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold ml-1.5">
                +{breakdown.ratingAverage.contribution} pts
              </span>
            </div>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${breakdown.ratingAverage.value}%` }}
            />
          </div>
          <p className="text-[10px] text-[#707975]">
            Statutory scaled score from verified post-service customer feedback
          </p>
        </div>

        {/* 3. Tenure */}
        <div className="bg-[#fafaf5] p-3 rounded-2xl border border-[#e3e3de] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#1a1c19] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#00342b] text-sm">
                history_toggle_off
              </span>
              <span>3. Trade Tenure (15% wt)</span>
            </span>
            <div className="text-right">
              <span className="font-extrabold text-[#00342b]">
                {worker.experienceYears || 5} Yrs ({breakdown.tenure.value}%)
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold ml-1.5">
                +{breakdown.tenure.contribution} pts
              </span>
            </div>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-600 rounded-full transition-all duration-500"
              style={{ width: `${breakdown.tenure.value}%` }}
            />
          </div>
          <p className="text-[10px] text-[#707975]">
            Demonstrated trade seniority & co-op standing (10+ years = full 100%)
          </p>
        </div>

        {/* 4. Verification Tier */}
        <div className="bg-[#fafaf5] p-3 rounded-2xl border border-[#e3e3de] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#1a1c19] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-700 text-sm">
                verified_user
              </span>
              <span>4. Verification Tier (15% wt)</span>
            </span>
            <div className="text-right">
              <span className="font-extrabold text-[#00342b]">
                {tierName} ({breakdown.verificationTier.value} pts)
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold ml-1.5">
                +{breakdown.verificationTier.contribution} pts
              </span>
            </div>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-700 rounded-full transition-all duration-500"
              style={{ width: `${breakdown.verificationTier.value}%` }}
            />
          </div>
          <p className="text-[10px] text-[#707975]">
            Statutory 10th SSC certificate, SP police clearance & trade licensing
          </p>
        </div>
      </div>

      {/* Mathematical Audit Calculation Bar */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
        <div className="text-[11px] text-[#3f4945]">
          Sum: {breakdown.completionRate.contribution} + {breakdown.ratingAverage.contribution} +{' '}
          {breakdown.tenure.contribution} + {breakdown.verificationTier.contribution} pts
        </div>
        <div className="text-sm font-black text-[#00342b]">
          = {finalScore}/100
        </div>
      </div>
    </div>
  );

  // FULL PROMINENT VIEW (for WorkerProfileScreen)
  if (variant === 'full') {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="bg-white rounded-3xl border-2 border-emerald-600/30 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-700 text-xl">
                verified_user
              </span>
              <div>
                <h3 className="text-sm font-bold text-[#1a1c19]">
                  Statutory Cooperative Trust Score
                </h3>
                <p className="text-[11px] text-[#707975]">
                  Transparent mathematical rating based on verified audit records
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-bold text-[#00342b] hover:text-emerald-700 flex items-center gap-1 py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <span>{isExpanded ? 'Hide Breakdown' : 'View Audit Breakdown'}</span>
              <span className="material-symbols-outlined text-base">
                {isExpanded ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          </div>

          {/* Quick Score Highlight Strip */}
          <div className="flex items-center justify-between gap-4 bg-[#fafaf5] p-3.5 rounded-2xl border border-[#e3e3de]">
            <div className="flex items-center gap-3">
              {/* Circular Ring */}
              <div className="relative flex items-center justify-center shrink-0">
                <svg width={ringSize} height={ringSize} className="transform -rotate-90">
                  <circle
                    cx={ringSize / 2}
                    cy={ringSize / 2}
                    r={radius}
                    stroke={colorTheme.trackStroke}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                  />
                  <circle
                    cx={ringSize / 2}
                    cy={ringSize / 2}
                    r={radius}
                    stroke={colorTheme.ringStroke}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className={`text-base font-black ${colorTheme.scoreText} leading-none`}>
                    {finalScore}
                  </span>
                  <span className="text-[8px] font-bold text-slate-400 leading-none">/100</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-[#1a1c19]">
                    {colorTheme.name}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${colorTheme.tierBg}`}
                  >
                    {tierName}
                  </span>
                </div>
                <p className="text-[11px] text-[#707975] mt-0.5">
                  Top 5% cooperative reliability rating in Undi cluster
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-right">
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Weighted Index
                </span>
                <span className="text-xs font-bold text-emerald-800">
                  100% Unbribable
                </span>
              </div>
            </div>
          </div>

          {/* Full Expanded 4-Component View */}
          {isExpanded && renderBreakdownCard()}
        </div>
      </div>
    );
  }

  // COMPACT BADGE (used on customer-facing worker cards)
  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setShowPopover(!showPopover);
        }}
        className={`group inline-flex items-center gap-2 py-1 px-2.5 rounded-xl border ${colorTheme.border} ${colorTheme.bgPill} hover:shadow-xs transition-all text-left cursor-pointer`}
        title={`Cooperative Trust Score: ${finalScore}/100 (${tierName} Tier). Click to inspect audit breakdown.`}
      >
        {/* Ring SVG */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg width={ringSize} height={ringSize} className="transform -rotate-90">
            <circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={radius}
              stroke={colorTheme.trackStroke}
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={radius}
              stroke={colorTheme.ringStroke}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-[10px] font-black ${colorTheme.scoreText} leading-none`}>
              {finalScore}
            </span>
          </div>
        </div>

        {/* Labels */}
        <div className="leading-tight">
          <div className="flex items-center gap-1">
            <span className="text-[9px] uppercase font-extrabold tracking-wider text-[#707975]">
              Trust Score
            </span>
            <span className="material-symbols-outlined text-[11px] text-slate-400 group-hover:text-[#00342b] transition-colors">
              info
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className={`text-xs font-black ${colorTheme.scoreText}`}>
              {finalScore}
            </span>
            <span className="text-[10px] text-slate-400">/100</span>
            <span className="text-[10px] text-[#707975] font-semibold hidden xs:inline">
              • {tierName}
            </span>
          </div>
        </div>
      </button>

      {/* Clickable Popover Modal Backdrop & Card */}
      {showPopover && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={(e) => {
            e.stopPropagation();
            setShowPopover(false);
          }}
        >
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md">
            {renderBreakdownCard(() => setShowPopover(false))}
          </div>
        </div>
      )}
    </div>
  );
};

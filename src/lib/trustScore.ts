import { WorkerProfile } from '../types';

export interface ScoreComponentBreakdown {
  value: number; // Raw component score (0-100)
  weight: number; // Percentage weight (e.g. 35, 15)
  contribution: number; // Weighted contribution points towards the final score
}

export interface TrustScoreResult {
  finalScore: number;
  tierName: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  breakdown: {
    completionRate: ScoreComponentBreakdown;
    ratingAverage: ScoreComponentBreakdown;
    tenure: ScoreComponentBreakdown;
    verificationTier: ScoreComponentBreakdown;
  };
}

/**
 * Computes the Cooperative Trust Score out of 100 for a worker profile.
 *
 * Components & Weights:
 * 1. Completion Rate (35% weight): (jobsCompleted / (jobsCompleted + cancelledJobs)) * 100
 *    - Defaults to onTimePercent if no cancellation data exists yet
 * 2. Rating Average (35% weight): (rating / 5) * 100
 * 3. Tenure (15% weight): scaled score based on experienceYears (capped at 100, 10+ yrs = 100)
 * 4. Verification Tier (15% weight): Bronze (40), Silver (65), Gold (85), Platinum (100)
 *
 * Final score = (completionRate * 0.35) + (ratingScore * 0.35) + (tenureScore * 0.15) + (verificationScore * 0.15)
 * rounded to nearest whole number.
 */
export function calculateTrustScore(worker: WorkerProfile): TrustScoreResult {
  // 1. Completion Rate (35% weight)
  let rawCompletionRate: number;
  const jobsCompleted = typeof worker.jobsCompleted === 'number' ? worker.jobsCompleted : 0;
  const cancelledJobs =
    worker.cancelledJobs !== undefined && worker.cancelledJobs !== null
      ? Number(worker.cancelledJobs)
      : undefined;

  if (cancelledJobs !== undefined && !isNaN(cancelledJobs) && (jobsCompleted + cancelledJobs) > 0) {
    rawCompletionRate = (jobsCompleted / (jobsCompleted + cancelledJobs)) * 100;
  } else if (
    worker.onTimePercent !== undefined &&
    worker.onTimePercent !== null &&
    !isNaN(Number(worker.onTimePercent))
  ) {
    rawCompletionRate = Number(worker.onTimePercent);
  } else {
    // Default cooperative baseline proxy when new
    rawCompletionRate = 95;
  }
  const completionRateValue = Math.min(100, Math.max(0, Math.round(rawCompletionRate * 10) / 10));
  const completionRateContribution = Math.round(completionRateValue * 0.35 * 100) / 100;

  // 2. Rating Average (35% weight)
  const rating =
    typeof worker.rating === 'number' && !isNaN(worker.rating) ? worker.rating : 4.8;
  const rawRatingScore = (rating / 5) * 100;
  const ratingValue = Math.min(100, Math.max(0, Math.round(rawRatingScore * 10) / 10));
  const ratingContribution = Math.round(ratingValue * 0.35 * 100) / 100;

  // 3. Tenure (15% weight)
  const experienceYears =
    typeof worker.experienceYears === 'number' && !isNaN(worker.experienceYears)
      ? worker.experienceYears
      : 5;
  const rawTenure = Math.min(experienceYears / 10, 1) * 100;
  const tenureValue = Math.min(100, Math.max(0, Math.round(rawTenure * 10) / 10));
  const tenureContribution = Math.round(tenureValue * 0.15 * 100) / 100;

  // 4. Verification Tier (15% weight)
  // Map verification_tier: 'Bronze' = 40, 'Silver' = 65, 'Gold' = 85, 'Platinum' = 100
  const tierField = (
    worker.verification_tier ||
    worker.verificationTier ||
    ''
  ).toString().trim().toLowerCase();

  let tierName: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  let verificationScore: number;

  if (tierField === 'platinum') {
    tierName = 'Platinum';
    verificationScore = 100;
  } else if (tierField === 'gold') {
    tierName = 'Gold';
    verificationScore = 85;
  } else if (tierField === 'silver') {
    tierName = 'Silver';
    verificationScore = 65;
  } else if (tierField === 'bronze') {
    tierName = 'Bronze';
    verificationScore = 40;
  } else {
    // If no verification_tier is set in Supabase records:
    // Determine based on qualifications presence or default to Gold (85) for certified co-op members
    if (worker.qualifications && worker.qualifications.length >= 3) {
      tierName = 'Gold';
      verificationScore = 85;
    } else if (worker.qualifications && worker.qualifications.length >= 1) {
      tierName = 'Silver';
      verificationScore = 65;
    } else {
      tierName = 'Gold';
      verificationScore = 85;
    }
  }

  const verificationTierContribution = Math.round(verificationScore * 0.15 * 100) / 100;

  // Final score = sum of contributions, rounded to nearest whole number
  const calculatedSum =
    completionRateContribution +
    ratingContribution +
    tenureContribution +
    verificationTierContribution;
  const finalScore = Math.min(100, Math.max(0, Math.round(calculatedSum)));

  return {
    finalScore,
    tierName,
    breakdown: {
      completionRate: {
        value: completionRateValue,
        weight: 35,
        contribution: completionRateContribution,
      },
      ratingAverage: {
        value: ratingValue,
        weight: 35,
        contribution: ratingContribution,
      },
      tenure: {
        value: tenureValue,
        weight: 15,
        contribution: tenureContribution,
      },
      verificationTier: {
        value: verificationScore,
        weight: 15,
        contribution: verificationTierContribution,
      },
    },
  };
}

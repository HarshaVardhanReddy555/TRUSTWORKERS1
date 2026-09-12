import { supabase, isSupabaseConfigured } from './supabaseClient';
import {
  Booking,
  ServiceItem,
  WorkerProfile,
  TeamMember,
  TeamProfile,
  ActiveJobRequest,
  AvailabilityStatus,
  CustomerProfile,
} from '../types';
import {
  INITIAL_SERVICES,
  WORKER_RAVI,
  WORKER_SURESH,
  INITIAL_TEAM_MEMBERS,
  COOPERATIVE_TEAM_RAVI,
  INITIAL_BOOKINGS,
  SAMPLE_ACTIVE_BOOKING,
  INITIAL_ACTIVE_JOBS,
} from '../mockData';

// Helper to generate RFC4122 compliant UUID for client-generated rows
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function isValidUUID(str?: string): boolean {
  if (!str) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
}

// ----------------------------------------------------------------------
// 1. SERVICES
// ----------------------------------------------------------------------
export async function getServices(): Promise<ServiceItem[]> {
  if (!isSupabaseConfigured) {
    return INITIAL_SERVICES;
  }

  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('popular', { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.warn('Supabase getServices warning:', error.message);
      return INITIAL_SERVICES;
    }

    return data.map((row: any) => ({
      id: row.id,
      name: row.name,
      category: row.category,
      baseRatePerHour: Number(row.base_rate_per_hour),
      rating: Number(row.rating),
      jobsCount: row.jobs_count,
      badge: row.badge,
      description: row.description,
      iconName: row.icon_name,
      popular: row.popular,
    }));
  } catch (err) {
    console.warn('Fallback to INITIAL_SERVICES due to error:', err);
    return INITIAL_SERVICES;
  }
}

// ----------------------------------------------------------------------
// 2. WORKERS
// ----------------------------------------------------------------------
export function mapWorkerRowToProfile(row: any): WorkerProfile {
  return {
    id: row.id,
    name: row.name,
    title: row.title,
    phone: row.phone,
    email: row.email,
    rating: Number(row.rating),
    reviewsCount: row.reviews_count,
    experienceYears: row.experience_years,
    jobsCompleted: row.jobs_completed,
    onTimePercent: Number(row.on_time_percent),
    hourlyRate: Number(row.hourly_rate),
    avatarUrl: row.avatar_url,
    qualifications: row.qualifications || [],
    languages: row.languages || [],
    mandal: row.mandal,
    cluster: row.cluster,
    shareholderId: row.shareholder_id,
    education: row.education || {
      level: '10th Standard / SSC Passed',
      school: 'Zilla Parishad High School',
      rollNo: 'SSC-PASS',
      passYear: '2015',
    },
    kyc: row.kyc || {
      aadhaarMasked: '•••• Verified',
      upiId: 'coop.worker@upi',
    },
    isTeamLead: Boolean(row.is_team_lead),
    teamId: row.team_id,
    cancelledJobs:
      row.cancelled_jobs !== undefined && row.cancelled_jobs !== null
        ? Number(row.cancelled_jobs)
        : undefined,
    verification_tier: row.verification_tier || row.verificationTier || undefined,
    verificationTier: row.verification_tier || row.verificationTier || undefined,
  };
}

export async function getWorkers(): Promise<WorkerProfile[]> {
  if (!isSupabaseConfigured) {
    return [WORKER_RAVI, WORKER_SURESH];
  }

  try {
    const { data, error } = await supabase.from('workers').select('*');
    if (error || !data || data.length === 0) {
      if (error) console.warn('Supabase getWorkers warning:', error.message);
      return [WORKER_RAVI, WORKER_SURESH];
    }
    return data.map(mapWorkerRowToProfile);
  } catch (err) {
    console.warn('Fallback to default workers due to error:', err);
    return [WORKER_RAVI, WORKER_SURESH];
  }
}

export async function saveWorkerToSupabase(
  worker: Partial<WorkerProfile>
): Promise<WorkerProfile> {
  const finalId = isValidUUID(worker.id) ? worker.id! : generateUUID();
  const rawPhone = (worker.phone || '').trim();
  const normalizedPhone = rawPhone.startsWith('+')
    ? rawPhone
    : rawPhone.length === 10
    ? `+91 ${rawPhone}`
    : rawPhone || '+91 98480 00000';

  const workerObj: WorkerProfile = {
    id: finalId,
    name: (worker.name || 'Partner Member').trim(),
    title: (worker.title || 'Cooperative Technician').trim(),
    phone: normalizedPhone,
    email:
      (worker.email || '').trim() ||
      `${(worker.name || 'worker').toLowerCase().replace(/\s+/g, '.')}.coop@gmail.com`,
    rating: worker.rating ?? 5.0,
    reviewsCount: worker.reviewsCount ?? 0,
    experienceYears: Number(worker.experienceYears ?? 1),
    jobsCompleted: Number(worker.jobsCompleted ?? 0),
    onTimePercent: Number(worker.onTimePercent ?? 100),
    hourlyRate: Number(worker.hourlyRate ?? 250),
    avatarUrl: (worker.avatarUrl || (worker as any)?.avatar_url || '').trim(),
    qualifications: worker.qualifications || [],
    languages:
      worker.languages && worker.languages.length > 0
        ? worker.languages
        : ['Telugu', 'English'],
    mandal: worker.mandal || 'Undi Mandal',
    cluster: worker.cluster || 'Cluster A - Undi Central',
    shareholderId:
      worker.shareholderId ||
      `AP-COOP-${Math.floor(1000 + Math.random() * 9000)}`,
    education: worker.education || {
      level: '10th Standard / SSC / Matriculation (Eligible)',
      school: 'Zilla Parishad High School',
      rollNo: 'SSC-PASS',
      passYear: '2018',
    },
    kyc: worker.kyc || {
      aadhaarMasked: '•••• Verified',
      upiId: 'coop.worker@upi',
    },
    isTeamLead: Boolean(worker.isTeamLead),
    teamId: worker.teamId || undefined,
    cancelledJobs: Number(worker.cancelledJobs ?? 0),
    verification_tier: worker.verification_tier || worker.verificationTier || 'Bronze',
    verificationTier: worker.verification_tier || worker.verificationTier || 'Bronze',
  };

  if (isSupabaseConfigured) {
    try {
      const rowToUpsert: Record<string, any> = {
        id: workerObj.id,
        name: workerObj.name,
        title: workerObj.title,
        phone: workerObj.phone,
        email: workerObj.email || null,
        rating: workerObj.rating,
        reviews_count: workerObj.reviewsCount,
        experience_years: workerObj.experienceYears,
        jobs_completed: workerObj.jobsCompleted,
        on_time_percent: workerObj.onTimePercent,
        hourly_rate: workerObj.hourlyRate,
        avatar_url: workerObj.avatarUrl,
        qualifications: workerObj.qualifications,
        languages: workerObj.languages,
        mandal: workerObj.mandal,
        cluster: workerObj.cluster,
        shareholder_id: workerObj.shareholderId,
        education: workerObj.education,
        kyc: workerObj.kyc,
        is_team_lead: workerObj.isTeamLead,
      };

      if (workerObj.verification_tier) {
        rowToUpsert.verification_tier = workerObj.verification_tier;
      }
      if (workerObj.cancelledJobs != null) {
        rowToUpsert.cancelled_jobs = workerObj.cancelledJobs;
      }

      const { data, error } = await supabase
        .from('workers')
        .upsert(rowToUpsert, { onConflict: 'phone' })
        .select()
        .single();

      if (error) {
        console.warn('Supabase saveWorkerToSupabase upsert warning:', error.message);
        // Fallback without optional columns if table schema lacks them
        delete rowToUpsert.verification_tier;
        delete rowToUpsert.cancelled_jobs;

        const { data: retryData, error: retryErr } = await supabase
          .from('workers')
          .upsert(rowToUpsert, { onConflict: 'phone' })
          .select()
          .single();

        if (retryErr) {
          console.warn('Retry without extra columns error:', retryErr.message);
          // Try lookup and update
          const { data: existing } = await supabase
            .from('workers')
            .select('*')
            .eq('phone', workerObj.phone)
            .maybeSingle();

          if (existing) {
            await supabase.from('workers').update(rowToUpsert).eq('id', existing.id);
            workerObj.id = existing.id;
          }
        } else if (retryData) {
          const mapped = mapWorkerRowToProfile(retryData);
          workerObj.id = mapped.id;
          workerObj.name = mapped.name;
          workerObj.title = mapped.title;
        }
      } else if (data) {
        const mapped = mapWorkerRowToProfile(data);
        workerObj.id = mapped.id;
        workerObj.name = mapped.name;
        workerObj.title = mapped.title;
      }
    } catch (err) {
      console.warn('Error saving worker to Supabase:', err);
    }
  }

  try {
    localStorage.setItem('trustworkers_current_worker', JSON.stringify(workerObj));
  } catch (_) {}

  return workerObj;
}

export async function getWorkerByIdentifier(
  identifier: string
): Promise<WorkerProfile | null> {
  if (!identifier?.trim()) return null;
  const raw = identifier.trim();
  const clean = raw.toLowerCase();

  if (isSupabaseConfigured) {
    try {
      let query = supabase.from('workers').select('*');
      if (clean.includes('@')) {
        query = query.ilike('email', clean);
      } else if (/^[+0-9\s-]+$/.test(clean)) {
        const digits = clean.replace(/[^0-9]/g, '');
        const last10 = digits.slice(-10);
        query = query.or(`phone.eq.${raw},phone.ilike.%${last10}%`);
      } else {
        query = query.ilike('name', `%${clean}%`);
      }

      const { data, error } = await query.limit(1);
      if (!error && data && data.length > 0) {
        return mapWorkerRowToProfile(data[0]);
      }
    } catch (err) {
      console.warn('Error fetching worker from Supabase:', err);
    }
  }

  // Local fallback: check localStorage
  try {
    const saved = localStorage.getItem('trustworkers_current_worker');
    if (saved) {
      const parsed: WorkerProfile = JSON.parse(saved);
      if (
        parsed.email?.toLowerCase() === clean ||
        parsed.phone.replace(/[^0-9]/g, '').includes(clean.replace(/[^0-9]/g, '')) ||
        parsed.name.toLowerCase().includes(clean)
      ) {
        return parsed;
      }
    }
  } catch (_) {}

  // Mock workers fallback
  const mockWorkers = [WORKER_RAVI, WORKER_SURESH];
  const found = mockWorkers.find(
    (w) =>
      w.email?.toLowerCase() === clean ||
      w.phone.replace(/[^0-9]/g, '').includes(clean.replace(/[^0-9]/g, '')) ||
      w.name.toLowerCase().includes(clean)
  );

  return found || null;
}

// ----------------------------------------------------------------------
// 3. TEAMS & TEAM MEMBERS
// ----------------------------------------------------------------------
export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!isSupabaseConfigured) {
    return INITIAL_TEAM_MEMBERS;
  }

  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('rating', { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.warn('Supabase getTeamMembers warning:', error.message);
      return INITIAL_TEAM_MEMBERS;
    }

    return data.map((row: any) => ({
      id: row.id,
      name: row.name,
      role: row.role,
      avatarUrl: row.avatar_url,
      rating: Number(row.rating),
      trade: row.trade,
      experienceYears: row.experience_years,
      availability: row.availability as AvailabilityStatus,
      phone: row.phone,
      qualification: row.qualification,
      jobsCompleted: row.jobs_completed,
    }));
  } catch (err) {
    console.warn('Fallback to INITIAL_TEAM_MEMBERS due to error:', err);
    return INITIAL_TEAM_MEMBERS;
  }
}

export async function getTeamProfile(): Promise<TeamProfile> {
  if (!isSupabaseConfigured) {
    return COOPERATIVE_TEAM_RAVI;
  }

  try {
    const { data: teamRows, error: teamErr } = await supabase
      .from('teams')
      .select('*')
      .limit(1);

    const members = await getTeamMembers();

    if (teamErr || !teamRows || teamRows.length === 0) {
      if (teamErr) console.warn('Supabase getTeamProfile warning:', teamErr.message);
      return {
        ...COOPERATIVE_TEAM_RAVI,
        members,
        availableMembers: members.filter((m) => m.availability === 'Available').length,
      };
    }

    const team = teamRows[0];
    const availableCount = members.filter((m) => m.availability === 'Available').length;

    return {
      id: team.id,
      teamName: team.team_name,
      teamLead: WORKER_RAVI,
      trade: team.trade,
      rating: Number(team.rating),
      reviewsCount: team.reviews_count,
      totalMembers: members.length,
      availableMembers: availableCount,
      hourlyRate: Number(team.hourly_rate),
      members,
    };
  } catch (err) {
    console.warn('Fallback to COOPERATIVE_TEAM_RAVI due to error:', err);
    return COOPERATIVE_TEAM_RAVI;
  }
}

export async function updateMemberAvailability(
  memberId: string,
  newStatus: AvailabilityStatus
): Promise<boolean> {
  if (!isSupabaseConfigured) {
    return true;
  }

  try {
    const { error } = await supabase
      .from('team_members')
      .update({ availability: newStatus })
      .eq('id', memberId);

    if (error) {
      console.warn('Error updating member availability in Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Exception updating member availability:', err);
    return false;
  }
}

// ----------------------------------------------------------------------
// 4. BOOKINGS
// ----------------------------------------------------------------------
function mapBookingRow(row: any, assignedWorkers: WorkerProfile[]): Booking {
  return {
    id: row.id,
    serviceId: row.service_id || '40000000-0000-0000-0000-000000000001',
    serviceName: row.service_name,
    category: row.category,
    status: row.status,
    dateStr: row.date_str,
    timeWindow: row.time_window,
    workerCount: row.worker_count || 1,
    durationHours: Number(row.duration_hours || 1),
    assignedWorkers: assignedWorkers.length > 0 ? assignedWorkers : [WORKER_RAVI],
    customerId: row.customer_id,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    address: row.address,
    landmark: row.landmark,
    problemDescription: row.problem_description,
    ratePerHour: Number(row.rate_per_hour),
    totalAmount: Number(row.total_amount),
    paidAmount: row.paid_amount != null ? Number(row.paid_amount) : undefined,
    paymentMethod: row.payment_method,
    paymentStatus: row.payment_status,
    completedDate: row.completed_date,
    ratingGiven: row.rating_given != null ? Number(row.rating_given) : undefined,
    reviewComment: row.review_comment,
    stepCurrent: row.step_current || 1,
    arrivingMinutes: row.arriving_minutes != null ? Number(row.arriving_minutes) : undefined,
  };
}

export async function getBookings(): Promise<Booking[]> {
  if (!isSupabaseConfigured) {
    return INITIAL_BOOKINGS;
  }

  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, booking_assigned_workers(worker_id, workers(*))')
      .order('date_str', { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.warn('Supabase getBookings warning:', error.message);
      return INITIAL_BOOKINGS;
    }

    return data.map((row: any) => {
      const assigned: WorkerProfile[] = (row.booking_assigned_workers || [])
        .map((baw: any) => baw.workers)
        .filter(Boolean)
        .map(mapWorkerRowToProfile);

      return mapBookingRow(row, assigned);
    });
  } catch (err) {
    console.warn('Fallback to INITIAL_BOOKINGS due to error:', err);
    return INITIAL_BOOKINGS;
  }
}

export async function getActiveBooking(customerId?: string, customerPhone?: string): Promise<Booking | null> {
  if (!isSupabaseConfigured) {
    if (customerId || customerPhone) {
      return SAMPLE_ACTIVE_BOOKING;
    }
    return null;
  }

  try {
    let query = supabase
      .from('bookings')
      .select('*, booking_assigned_workers(worker_id, workers(*))')
      .in('status', ['searching', 'assigned', 'en-route', 'in-progress']);

    const conditions: string[] = [];
    if (customerId && isValidUUID(customerId)) {
      conditions.push(`customer_id.eq.${customerId}`);
    }
    if (customerPhone) {
      const cleanPhone = customerPhone.replace(/[^0-9]/g, '');
      if (cleanPhone.length >= 10) {
        const last10 = cleanPhone.slice(-10);
        conditions.push(`customer_phone.ilike.%${last10}%`);
      }
    }

    if (conditions.length > 0) {
      query = query.or(conditions.join(','));
    } else {
      return null;
    }

    const { data, error } = await query.order('date_str', { ascending: false }).limit(1);

    if (error || !data || data.length === 0) {
      if (error) console.warn('Supabase getActiveBooking warning:', error.message);
      return null;
    }

    const row = data[0];
    const assigned: WorkerProfile[] = (row.booking_assigned_workers || [])
      .map((baw: any) => baw.workers)
      .filter(Boolean)
      .map(mapWorkerRowToProfile);

    return mapBookingRow(row, assigned);
  } catch (err) {
    console.warn('Error fetching active booking:', err);
    return null;
  }
}

export async function getBookingHistoryForCustomer(
  customerId: string,
  customerPhone?: string
): Promise<Booking[]> {
  if (!isSupabaseConfigured || (!customerId && !customerPhone)) {
    return INITIAL_BOOKINGS;
  }

  try {
    let query = supabase
      .from('bookings')
      .select('*, booking_assigned_workers(worker_id, workers(*))');

    const conditions: string[] = [];
    if (customerId && isValidUUID(customerId)) {
      conditions.push(`customer_id.eq.${customerId}`);
    }
    if (customerPhone) {
      const cleanPhone = customerPhone.replace(/[^0-9]/g, '');
      if (cleanPhone.length >= 10) {
        const last10 = cleanPhone.slice(-10);
        conditions.push(`customer_phone.ilike.%${last10}%`);
      }
    }

    if (conditions.length > 0) {
      query = query.or(conditions.join(','));
    }

    const { data, error } = await query.order('date_str', { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.warn('Supabase getBookingHistoryForCustomer warning:', error.message);
      return [];
    }

    return data.map((row: any) => {
      const assigned: WorkerProfile[] = (row.booking_assigned_workers || [])
        .map((baw: any) => baw.workers)
        .filter(Boolean)
        .map(mapWorkerRowToProfile);

      return mapBookingRow(row, assigned);
    });
  } catch (err) {
    console.warn('Error fetching booking history for customer:', err);
    return [];
  }
}

export async function getBookingsForWorker(workerId: string): Promise<Booking[]> {
  if (!isSupabaseConfigured || !workerId) {
    return INITIAL_BOOKINGS;
  }

  try {
    const { data: joins, error: joinErr } = await supabase
      .from('booking_assigned_workers')
      .select('booking_id')
      .eq('worker_id', workerId);

    if (joinErr || !joins || joins.length === 0) {
      return [];
    }

    const bookingIds = joins.map((j: any) => j.booking_id);
    const { data, error } = await supabase
      .from('bookings')
      .select('*, booking_assigned_workers(worker_id, workers(*))')
      .in('id', bookingIds)
      .order('date_str', { ascending: false });

    if (error || !data) return [];

    return data.map((row: any) => {
      const assigned: WorkerProfile[] = (row.booking_assigned_workers || [])
        .map((baw: any) => baw.workers)
        .filter(Boolean)
        .map(mapWorkerRowToProfile);

      return mapBookingRow(row, assigned);
    });
  } catch (err) {
    console.warn('Error fetching bookings for worker:', err);
    return [];
  }
}

// ----------------------------------------------------------------------
// SERVICE MATCHING HELPER
// ----------------------------------------------------------------------
export function findMatchingService(
  services: Array<{ id: string; name: string; category?: string }>,
  serviceId?: string | null,
  serviceName?: string | null,
  category?: string | null
): string | null {
  if (!services || services.length === 0) return null;

  // 1. Direct ID match if serviceId is valid and exists in services table
  if (serviceId && isValidUUID(serviceId)) {
    const directIdMatch = services.find((s) => s.id.toLowerCase() === serviceId.toLowerCase());
    if (directIdMatch) {
      return directIdMatch.id;
    }
  }

  const sNameRaw = (serviceName || '').trim().toLowerCase();
  const sCatRaw = (category || '').trim().toLowerCase();

  // Strip team prefixes and trade support suffixes
  const sNameClean = sNameRaw
    .replace(/^(dual\s+team|multi-trade\s+crew|crew)\s*:\s*/i, '')
    .replace(/\s*(&|\+)\s*trade\s+support/i, '')
    .replace(/\s*-\s*.*$/, '')
    .trim();

  // 2. Exact match on clean name, raw name, or category against services table
  for (const s of services) {
    const dbName = (s.name || '').trim().toLowerCase();
    const dbCat = (s.category || '').trim().toLowerCase();

    if (
      (sNameClean && (dbName === sNameClean || dbCat === sNameClean)) ||
      (sNameRaw && (dbName === sNameRaw || dbCat === sNameRaw)) ||
      (sCatRaw && (dbCat === sCatRaw || dbName === sCatRaw))
    ) {
      return s.id;
    }
  }

  // 3. Substring / Containment match
  for (const s of services) {
    const dbName = (s.name || '').trim().toLowerCase();
    const dbCat = (s.category || '').trim().toLowerCase();

    if (
      (sNameClean && (dbName.includes(sNameClean) || sNameClean.includes(dbName))) ||
      (sNameClean && dbCat && (dbCat.includes(sNameClean) || sNameClean.includes(dbCat))) ||
      (sNameRaw && (dbName.includes(sNameRaw) || sNameRaw.includes(dbName))) ||
      (sNameRaw && dbCat && (dbCat.includes(sNameRaw) || sNameRaw.includes(dbCat))) ||
      (sCatRaw && (dbCat.includes(sCatRaw) || sCatRaw.includes(dbCat))) ||
      (sCatRaw && dbName && (dbName.includes(sCatRaw) || sCatRaw.includes(dbName)))
    ) {
      return s.id;
    }
  }

  // 4. Word-by-word token overlap
  const inputWords = `${sNameClean} ${sNameRaw} ${sCatRaw}`
    .split(/[\s,/:&+-]+/)
    .filter((w) => w.length > 2);
  for (const s of services) {
    const dbWords = `${s.name || ''} ${s.category || ''}`
      .toLowerCase()
      .split(/[\s,/:&+-]+/)
      .filter((w) => w.length > 2);
    const hasOverlap = inputWords.some((iw) =>
      dbWords.some((dw) => dw.includes(iw) || iw.includes(dw))
    );
    if (hasOverlap) {
      return s.id;
    }
  }

  // 5. Trade Root / Stem matching (e.g. "paint" matches "Painter" and "Painting")
  const TRADE_STEMS = [
    'paint', 'plumb', 'electr', 'carpent', 'applian', 'clean', 'pest', 'mason', 'weld',
    'wire', 'ac', 'cool', 'leak', 'pipe', 'tap', 'wood', 'door', 'lock', 'motor', 'pump'
  ];
  for (const stem of TRADE_STEMS) {
    const inputHasStem =
      sNameClean.includes(stem) ||
      sNameRaw.includes(stem) ||
      sCatRaw.includes(stem);

    if (inputHasStem) {
      const stemMatch = services.find((s) => {
        const dbName = (s.name || '').toLowerCase();
        const dbCat = (s.category || '').toLowerCase();
        return dbName.includes(stem) || dbCat.includes(stem);
      });
      if (stemMatch) return stemMatch.id;
    }
  }

  // 6. Fallback to first available service in list
  return services[0]?.id || null;
}

export async function createBooking(booking: Booking): Promise<Booking> {
  const finalId = isValidUUID(booking.id) ? booking.id : generateUUID();
  let resolvedServiceId: string | null = null;

  if (isSupabaseConfigured) {
    try {
      // 1. Fetch available services from Supabase table to resolve against live database rows
      const { data: dbServices, error: fetchErr } = await supabase
        .from('services')
        .select('id, name, category');

      if (!fetchErr && dbServices && dbServices.length > 0) {
        resolvedServiceId = findMatchingService(
          dbServices,
          booking.serviceId,
          booking.serviceName,
          booking.category
        );

        // Guarantee that if dbServices has rows, resolvedServiceId is one of them
        if (!resolvedServiceId || !dbServices.some((s) => s.id === resolvedServiceId)) {
          resolvedServiceId = dbServices[0].id;
        }
      }

      // 2. If list query didn't yield a result, attempt targeted ILIKE queries directly
      if (!resolvedServiceId) {
        const cleanName = (booking.serviceName || '')
          .replace(/^(dual\s+team|multi-trade\s+crew|crew)\s*:\s*/i, '')
          .replace(/\s*(&|\+)\s*trade\s+support/i, '')
          .split(':')[0]
          .trim();
        const catName = (booking.category || '').trim();

        const orConditions: string[] = [];
        if (cleanName) {
          orConditions.push(`name.ilike.%${cleanName}%`, `category.ilike.%${cleanName}%`);
        }
        if (catName) {
          orConditions.push(`name.ilike.%${catName}%`, `category.ilike.%${catName}%`);
        }

        if (orConditions.length > 0) {
          const { data: matchedRows } = await supabase
            .from('services')
            .select('id, name, category')
            .or(orConditions.join(','))
            .limit(1);

          if (matchedRows && matchedRows.length > 0) {
            resolvedServiceId = matchedRows[0].id;
          }
        }
      }
    } catch (err) {
      console.warn('Could not resolve service_id from Supabase services table:', err);
    }
  }

  // Fallback to matching against INITIAL_SERVICES if unresolved
  if (!resolvedServiceId) {
    resolvedServiceId = findMatchingService(
      INITIAL_SERVICES,
      booking.serviceId,
      booking.serviceName,
      booking.category
    );
  }

  // Safety fallback to verified UUID
  if (!resolvedServiceId) {
    resolvedServiceId = '40000000-0000-0000-0000-000000000001';
  }

  // A brand new booking MUST always start at status="searching", stepCurrent=1, paymentStatus="pending"
  const initialStatus: Booking['status'] = 'searching';
  const initialStep = 1;
  const initialPaymentStatus: 'pending' = 'pending';

  const preparedBooking: Booking = {
    ...booking,
    id: finalId,
    serviceId: resolvedServiceId,
    status: initialStatus,
    stepCurrent: initialStep,
    paymentStatus: initialPaymentStatus,
    paidAmount: undefined,
  };

  if (!isSupabaseConfigured) {
    return preparedBooking;
  }

  try {
    const rowToInsert = {
      id: finalId,
      service_id: resolvedServiceId,
      service_name: preparedBooking.serviceName,
      category: preparedBooking.category,
      status: initialStatus,
      date_str: preparedBooking.dateStr,
      time_window: preparedBooking.timeWindow,
      worker_count: preparedBooking.workerCount,
      duration_hours: preparedBooking.durationHours,
      customer_id: preparedBooking.customerId || null,
      customer_name: preparedBooking.customerName,
      customer_phone: preparedBooking.customerPhone,
      address: preparedBooking.address,
      landmark: preparedBooking.landmark || null,
      problem_description: preparedBooking.problemDescription,
      rate_per_hour: preparedBooking.ratePerHour,
      total_amount: preparedBooking.totalAmount,
      paid_amount: null,
      payment_method: preparedBooking.paymentMethod || null,
      payment_status: initialPaymentStatus,
      step_current: initialStep,
      arriving_minutes: preparedBooking.arrivingMinutes || 12,
    };

    let { error } = await supabase.from('bookings').insert(rowToInsert);

    if (error) {
      console.warn('Error inserting booking into Supabase:', error.message);
      if (error.message && (error.message.includes('customer_id') || error.message.includes('column'))) {
        const { customer_id, ...withoutCustomerId } = rowToInsert;
        const retryRes = await supabase.from('bookings').insert(withoutCustomerId);
        error = retryRes.error;
      }
      // Fallback: If FK constraint failed on service_id, retry insert with service_id: null
      if (error && error.message && (error.message.includes('foreign key') || error.message.includes('service_id'))) {
        console.warn('Retrying booking insert with service_id: null due to FK constraint...');
        await supabase.from('bookings').insert({ ...rowToInsert, service_id: null });
      }
    } else {
      // Also insert assigned workers if any have valid UUIDs
      if (preparedBooking.assignedWorkers && preparedBooking.assignedWorkers.length > 0) {
        const workerJoins = preparedBooking.assignedWorkers
          .filter((w) => isValidUUID(w.id))
          .map((w) => ({
            booking_id: finalId,
            worker_id: w.id,
          }));

        if (workerJoins.length > 0) {
          await supabase.from('booking_assigned_workers').insert(workerJoins);
        }
      }
    }
  } catch (err) {
    console.warn('Exception during createBooking:', err);
  }

  return preparedBooking;
}

export const createBookingInSupabase = createBooking;

export async function updateBookingStatusInSupabase(
  bookingId: string,
  status: 'searching' | 'assigned' | 'en-route' | 'in-progress' | 'completed' | 'cancelled',
  stepCurrent?: number,
  paidAmount?: number,
  paymentStatus?: 'pending' | 'paid',
  paymentMethod?: string,
  ratingGiven?: number,
  reviewComment?: string
): Promise<void> {
  if (!isSupabaseConfigured) return;

  try {
    const updates: Record<string, any> = { status };
    if (stepCurrent != null) updates.step_current = stepCurrent;
    if (paidAmount != null) updates.paid_amount = paidAmount;
    if (paymentStatus != null) updates.payment_status = paymentStatus;
    if (paymentMethod != null) updates.payment_method = paymentMethod;
    if (ratingGiven != null) updates.rating_given = ratingGiven;
    if (reviewComment != null) updates.review_comment = reviewComment;
    if (status === 'completed') updates.completed_date = 'Today, 05 Sep';

    const { error } = await supabase.from('bookings').update(updates).eq('id', bookingId);
    if (error) {
      console.warn('Error updating booking in Supabase:', error.message);
    }
  } catch (err) {
    console.warn('Error updating booking in Supabase:', err);
  }
}

// ----------------------------------------------------------------------
// 5. ACTIVE JOB REQUESTS
// ----------------------------------------------------------------------
export async function getActiveJobRequests(): Promise<ActiveJobRequest[]> {
  if (!isSupabaseConfigured) {
    return INITIAL_ACTIVE_JOBS;
  }

  try {
    const { data, error } = await supabase.from('active_job_requests').select('*');
    if (error || !data || data.length === 0) {
      if (error) console.warn('Supabase getActiveJobRequests warning:', error.message);
      return INITIAL_ACTIVE_JOBS;
    }

    return data.map((row: any) => ({
      id: row.id,
      customerName: row.customer_name,
      customerAvatar: row.customer_avatar,
      distanceKm: Number(row.distance_km),
      locationArea: row.location_area,
      trade: row.trade,
      title: row.title,
      description: row.description,
      rate: Number(row.rate),
      timing: row.timing,
      isUrgent: row.is_urgent,
      status: row.status,
      timeNotice: row.time_notice,
      slotType: row.slot_type,
    }));
  } catch (err) {
    console.warn('Fallback to INITIAL_ACTIVE_JOBS due to error:', err);
    return INITIAL_ACTIVE_JOBS;
  }
}

// ----------------------------------------------------------------------
// 6. CUSTOMERS & AVATAR STORAGE
// ----------------------------------------------------------------------

/**
 * Upload an avatar image file to the Supabase Storage 'avatars' bucket.
 * Gracefully falls back to a base64 Data URL if the bucket is not yet created
 * or in offline demo mode.
 */
export async function uploadAvatarToSupabase(
  file: File,
  userId: string,
  userType: 'worker' | 'customer'
): Promise<string> {
  if (!file) {
    throw new Error('No file provided for upload');
  }

  // Derive file extension and path
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const cleanExt = ['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(ext) ? ext : 'jpg';
  const safeId = (userId || 'user').replace(/[^a-zA-Z0-9_-]/g, '_');
  const filePath = `${userType}s/${safeId}_${Date.now()}.${cleanExt}`;

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type || `image/${cleanExt}`,
        });

      if (error) {
        console.warn('Supabase storage upload error:', error.message);
        return await readFileAsDataUrl(file);
      }

      if (data?.path) {
        const { data: publicUrlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(data.path);

        if (publicUrlData?.publicUrl) {
          return publicUrlData.publicUrl;
        }
      }
    } catch (err) {
      console.warn('Supabase storage upload exception:', err);
      return await readFileAsDataUrl(file);
    }
  }

  return await readFileAsDataUrl(file);
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export async function saveCustomerToSupabase(customer: {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  avatarUrl?: string;
  avatar_url?: string;
}): Promise<CustomerProfile> {
  const normalizedPhone = customer.phone?.trim() || '+91 98765 43210';
  const avatarUrl = (customer.avatarUrl || customer.avatar_url || '').trim();
  const customerObj: CustomerProfile = {
    id: customer.id || generateUUID(),
    name: customer.name.trim(),
    phone: normalizedPhone,
    email: customer.email?.trim() || undefined,
    avatarUrl: avatarUrl || undefined,
  };

  if (isSupabaseConfigured) {
    try {
      const payload: Record<string, any> = {
        id: customerObj.id,
        name: customerObj.name,
        phone: customerObj.phone,
        email: customerObj.email || null,
        avatar_url: avatarUrl || null,
      };

      // Upsert customer into the customers table on conflict (phone)
      const { data, error } = await supabase
        .from('customers')
        .upsert(payload, { onConflict: 'phone' })
        .select()
        .single();

      if (error) {
        console.warn('Supabase saveCustomerToSupabase warning:', error.message);
        // Fallback: if table doesn't have avatar_url yet, retry without it
        delete payload.avatar_url;
        const { data: retryData, error: retryErr } = await supabase
          .from('customers')
          .upsert(payload, { onConflict: 'phone' })
          .select()
          .single();

        if (!retryErr && retryData) {
          customerObj.id = retryData.id;
          customerObj.name = retryData.name;
          customerObj.phone = retryData.phone;
          customerObj.email = retryData.email || undefined;
          if (retryData.avatar_url) {
            customerObj.avatarUrl = retryData.avatar_url;
          }
        } else {
          // Fallback: check if existing customer with same phone exists and update name/email
          const { data: searchRow } = await supabase
            .from('customers')
            .select('*')
            .eq('phone', customerObj.phone)
            .maybeSingle();

          if (searchRow) {
            const updatePayload: Record<string, any> = {
              name: customerObj.name,
              email: customerObj.email || null,
            };
            if (avatarUrl) updatePayload.avatar_url = avatarUrl;

            const { error: updErr } = await supabase
              .from('customers')
              .update(updatePayload)
              .eq('id', searchRow.id);

            if (updErr && updErr.message.includes('avatar_url')) {
              delete updatePayload.avatar_url;
              await supabase
                .from('customers')
                .update(updatePayload)
                .eq('id', searchRow.id);
            }
            customerObj.id = searchRow.id;
          }
        }
      } else if (data) {
        customerObj.id = data.id;
        customerObj.name = data.name;
        customerObj.phone = data.phone;
        customerObj.email = data.email || undefined;
        if (data.avatar_url) {
          customerObj.avatarUrl = data.avatar_url;
        }
      }
    } catch (err) {
      console.warn('Error saving customer to Supabase:', err);
    }
  }

  try {
    localStorage.setItem('trustworkers_current_customer', JSON.stringify(customerObj));
  } catch (_) {}

  return customerObj;
}

export async function getCustomerByIdentifier(identifier: string): Promise<CustomerProfile | null> {
  if (!identifier?.trim()) return null;
  const clean = identifier.trim();

  if (!isSupabaseConfigured) {
    return null;
  }

  try {
    let query = supabase.from('customers').select('*');
    if (clean.includes('@')) {
      query = query.eq('email', clean);
    } else if (/^[+0-9\s-]+$/.test(clean)) {
      query = query.eq('phone', clean);
    } else {
      query = query.ilike('name', clean);
    }

    const { data, error } = await query.maybeSingle();
    if (!error && data) {
      return {
        id: data.id,
        name: data.name,
        phone: data.phone,
        email: data.email || undefined,
        avatarUrl: data.avatar_url || undefined,
      };
    }
  } catch (err) {
    console.warn('Error fetching customer from Supabase:', err);
  }
  return null;
}

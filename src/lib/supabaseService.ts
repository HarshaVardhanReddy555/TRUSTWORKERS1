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

export async function getActiveBooking(): Promise<Booking | null> {
  if (!isSupabaseConfigured) {
    return SAMPLE_ACTIVE_BOOKING;
  }

  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, booking_assigned_workers(worker_id, workers(*))')
      .in('status', ['searching', 'assigned', 'en-route', 'in-progress'])
      .order('date_str', { ascending: false })
      .limit(1);

    if (error || !data || data.length === 0) {
      if (error) console.warn('Supabase getActiveBooking warning:', error.message);
      return SAMPLE_ACTIVE_BOOKING;
    }

    const row = data[0];
    const assigned: WorkerProfile[] = (row.booking_assigned_workers || [])
      .map((baw: any) => baw.workers)
      .filter(Boolean)
      .map(mapWorkerRowToProfile);

    return mapBookingRow(row, assigned);
  } catch (err) {
    console.warn('Fallback to SAMPLE_ACTIVE_BOOKING due to error:', err);
    return SAMPLE_ACTIVE_BOOKING;
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

  const sNameRaw = (serviceName || '').trim().toLowerCase();
  const sCatRaw = (category || '').trim().toLowerCase();

  // Strip team prefixes and trade support suffixes
  const sNameClean = sNameRaw
    .replace(/^(dual\s+team|multi-trade\s+crew|crew)\s*:\s*/i, '')
    .replace(/\s*(&|\+)\s*trade\s+support/i, '')
    .replace(/\s*-\s*.*$/, '')
    .trim();

  // 1. Direct ID match if serviceId is valid and exists in services table
  if (serviceId && isValidUUID(serviceId)) {
    const directIdMatch = services.find((s) => s.id.toLowerCase() === serviceId.toLowerCase());
    if (directIdMatch) {
      const matchNameLower = directIdMatch.name.toLowerCase();
      const matchCatLower = (directIdMatch.category || '').toLowerCase();
      // Ensure directIdMatch is not contradictory to serviceName
      const isContradictory =
        sNameClean &&
        !matchNameLower.includes(sNameClean) &&
        !sNameClean.includes(matchNameLower) &&
        !matchCatLower.includes(sNameClean) &&
        !sNameClean.includes(matchCatLower);

      if (!isContradictory) {
        return directIdMatch.id;
      }
    }
  }

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

  // 4. Trade Root / Stem matching (e.g. "paint" matches "Painter" and "Painting")
  const TRADE_STEMS = ['paint', 'plumb', 'electr', 'carpent', 'applian', 'clean', 'mason', 'weld'];
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

  // 5. Fallback to first available service in list
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
    resolvedServiceId = '40000000-0000-0000-0000-000000000004';
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

    const { error } = await supabase.from('bookings').insert(rowToInsert);

    if (error) {
      console.warn('Error inserting booking into Supabase:', error.message);
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
// 6. CUSTOMERS
// ----------------------------------------------------------------------
export async function saveCustomerToSupabase(customer: {
  id?: string;
  name: string;
  phone: string;
  email?: string;
}): Promise<CustomerProfile> {
  const normalizedPhone = customer.phone?.trim() || '+91 98765 43210';
  const customerObj: CustomerProfile = {
    id: customer.id || generateUUID(),
    name: customer.name.trim(),
    phone: normalizedPhone,
    email: customer.email?.trim() || undefined,
  };

  if (isSupabaseConfigured) {
    try {
      // Upsert customer into the customers table on conflict (phone)
      const { data, error } = await supabase
        .from('customers')
        .upsert(
          {
            id: customerObj.id,
            name: customerObj.name,
            phone: customerObj.phone,
            email: customerObj.email || null,
          },
          { onConflict: 'phone' }
        )
        .select()
        .single();

      if (error) {
        console.warn('Supabase saveCustomerToSupabase warning:', error.message);
        // Fallback: check if existing customer with same phone exists and update name/email
        const { data: searchRow } = await supabase
          .from('customers')
          .select('*')
          .eq('phone', customerObj.phone)
          .maybeSingle();

        if (searchRow) {
          await supabase
            .from('customers')
            .update({
              name: customerObj.name,
              email: customerObj.email || null,
            })
            .eq('id', searchRow.id);
          customerObj.id = searchRow.id;
        }
      } else if (data) {
        customerObj.id = data.id;
        customerObj.name = data.name;
        customerObj.phone = data.phone;
        customerObj.email = data.email || undefined;
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
      };
    }
  } catch (err) {
    console.warn('Error fetching customer from Supabase:', err);
  }
  return null;
}

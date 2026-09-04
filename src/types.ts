export type UserRole = 'customer' | 'worker';

export type ScreenId =
  | 'welcome'
  | 'login'
  | 'register-customer'
  | 'register-worker'
  | 'customer-home'
  | 'schedule-service'
  | 'live-dispatch'
  | 'payment-confirm'
  | 'customer-bookings'
  | 'customer-profile'
  | 'worker-home'
  | 'worker-active-jobs'
  | 'worker-profile';

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  baseRatePerHour: number;
  rating: number;
  jobsCount: number;
  badge?: string;
  description: string;
  iconName: string;
  popular?: boolean;
}

export interface WorkerProfile {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  jobsCompleted: number;
  onTimePercent: number;
  hourlyRate: number;
  avatarUrl: string;
  qualifications: string[];
  languages: string[];
  mandal: string;
  cluster: string;
  shareholderId: string;
  education: {
    level: string;
    school: string;
    rollNo: string;
    passYear: string;
  };
  kyc: {
    aadhaarMasked: string;
    upiId: string;
  };
  isTeamLead?: boolean;
  teamId?: string;
}

export type AvailabilityStatus = 'Available' | 'On Job' | 'Off Duty';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  rating: number;
  trade: string;
  experienceYears: number;
  availability: AvailabilityStatus;
  phone: string;
  qualification: string;
  jobsCompleted: number;
}

export interface TeamProfile {
  id: string;
  teamName: string;
  teamLead: WorkerProfile;
  trade: string;
  rating: number;
  reviewsCount: number;
  totalMembers: number;
  availableMembers: number;
  hourlyRate: number;
  members: TeamMember[];
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  category: string;
  status: 'searching' | 'assigned' | 'en-route' | 'in-progress' | 'completed' | 'cancelled';
  dateStr: string;
  timeWindow: string;
  workerCount: number;
  durationHours: number;
  assignedWorkers: WorkerProfile[];
  customerName: string;
  customerPhone: string;
  address: string;
  landmark?: string;
  problemDescription: string;
  ratePerHour: number;
  totalAmount: number;
  paidAmount?: number;
  paymentMethod?: 'UPI' | 'Card' | 'Net Banking' | 'Cash';
  paymentStatus?: 'pending' | 'paid';
  completedDate?: string;
  ratingGiven?: number;
  reviewComment?: string;
  stepCurrent?: number; // 1: Matched, 2: En Route, 3: In Service, 4: Done
  arrivingMinutes?: number;
}

export interface ActiveJobRequest {
  id: string;
  customerName: string;
  customerAvatar: string;
  distanceKm: number;
  locationArea: string;
  trade: string;
  title: string;
  description: string;
  rate: number;
  timing: string;
  isUrgent?: boolean;
  status: 'pending' | 'accepted' | 'declined';
  timeNotice?: string;
  slotType?: 'urgent' | 'today' | 'tomorrow';
}

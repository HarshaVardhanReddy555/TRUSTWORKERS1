import React, { useState } from 'react';
import { ScreenId, UserRole } from '../types';

interface RegisterWorkerScreenProps {
  setCurrentScreen: (screen: ScreenId) => void;
  setUserRole: (role: UserRole) => void;
}

export const RegisterWorkerScreen: React.FC<RegisterWorkerScreenProps> = ({
  setCurrentScreen,
  setUserRole,
}) => {
  // Step 1: Personal
  const [fullName, setFullName] = useState('Ravi Kumar');
  const [mobile, setMobile] = useState('98480 23145');
  const [email, setEmail] = useState('ravi.electrician.undi@gmail.com');
  const [password, setPassword] = useState('ravi@undi2024');
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [dob, setDob] = useState('1995-06-14');

  // Step 2: Location
  const [village, setVillage] = useState('Undi');
  const [mandal, setMandal] = useState('Undi Mandal');
  const [district, setDistrict] = useState('West Godavari');
  const [stateName, setStateName] = useState('Andhra Pradesh');
  const [pincode, setPincode] = useState('534199');

  // Step 3: Trade & Skills
  const [trade, setTrade] = useState('Licensed Electrician & Wiring');
  const [experience, setExperience] = useState('7');
  const [availability, setAvailability] = useState('Full-Time (Daily)');
  const [skills, setSkills] = useState<string[]>([
    'Electrical Wiring',
    'Motor & Pump Repair',
    'Fan & Switchboards',
    'Solar Inverter Setup',
  ]);
  const [languages, setLanguages] = useState<string[]>(['Telugu', 'Hindi', 'English']);

  // Step 4: 10th Pass Verification
  const [educationLevel, setEducationLevel] = useState('10th Standard / SSC / Matriculation (Eligible)');
  const [schoolName, setSchoolName] = useState('Zilla Parishad High School, Undi (BSEA)');
  const [hallTicket, setHallTicket] = useState('SSC-2015-84920');
  const [passYear, setPassYear] = useState('2015');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>({
    name: '10th_ssc_certificate_ravi.pdf',
    size: '1.4 MB',
  });
  const [confirmEducation, setConfirmEducation] = useState(true);
  const [confirmFairTrade, setConfirmFairTrade] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSkill = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const toggleLanguage = (lang: string) => {
    if (languages.includes(lang)) {
      setLanguages(languages.filter((l) => l !== lang));
    } else {
      setLanguages([...languages, lang]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile) {
      alert('Mandatory 10th standard certificate upload is required by cooperative statute.');
      return;
    }
    if (!confirmEducation || !confirmFairTrade) {
      alert('Please check the statutory declarations to proceed.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setUserRole('worker');
      setCurrentScreen('worker-home');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#fafaf5] text-[#1a1c19] py-8 px-4 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={() => setCurrentScreen('welcome')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#707975] hover:text-[#00342b] py-2 px-3.5 rounded-xl border border-[#e3e3de] bg-white hover:bg-slate-50 transition-colors self-start"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Back to Portal Home</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#707975]">Already a registered partner?</span>
            <button
              onClick={() => {
                setUserRole('worker');
                setCurrentScreen('login');
              }}
              className="text-xs font-bold text-[#00342b] px-3 py-1.5 rounded-xl border border-[#e3e3de] bg-white hover:bg-slate-50"
            >
              Worker Login
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Worker Equity & Guidelines (4 cols, sticky) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
            {/* Title Block */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-[#ffddb5]/80 text-[#835500] px-3 py-1 rounded-full text-xs font-bold border border-[#ffaa14]/50">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span>Co-op Partner Onboarding</span>
              </div>
              <h1 className="text-3xl font-black font-display text-[#00342b] leading-tight">
                Worker Partner Registration
              </h1>
              <p className="text-xs text-[#707975] leading-relaxed">
                Join over 24,000+ cooperative worker-owners across Andhra Pradesh. Keep 100% of your labor earnings with zero commissions.
              </p>
            </div>

            {/* 100% Co-op Owned Visual Card */}
            <div className="bg-white rounded-3xl border border-[#e3e3de] p-5 flex items-center gap-4 shadow-2xs">
              <img
                src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=160&auto=format&fit=crop&q=80"
                alt="Co-op partner"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-600/40 shrink-0"
              />
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-[#00342b] text-sm">100% Cooperative Owned</div>
                <p className="text-[#3f4945] leading-snug">
                  Zero middleman commissions. Direct UPI payouts straight to your bank account.
                </p>
              </div>
            </div>

            {/* Statutory Qualification Highlight Banner */}
            <div className="bg-[#fffbeb] border-2 border-[#ffaa14] rounded-3xl p-5 space-y-3 text-xs text-[#694300] shadow-2xs">
              <div className="flex items-center gap-2 font-bold text-[#2a1800] text-sm">
                <span className="material-symbols-outlined text-[#835500] text-lg">school</span>
                <span>Statutory 10th Pass Requirement</span>
              </div>
              <p className="text-xs leading-relaxed text-[#694300]">
                Under Andhra Pradesh Cooperative Societies by-laws, all partner technicians must hold a valid 10th standard (SSC) or trade diploma certification.
              </p>
              <div className="text-[11px] font-semibold text-[#835500] bg-white/80 p-2 rounded-xl border border-amber-200">
                ✓ Uploading your SSC Hall Ticket / Marks Memo is required during step 4.
              </div>
            </div>

            {/* Help & Support Helpline */}
            <div className="bg-white rounded-3xl border border-[#e3e3de] p-5 shadow-2xs space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-[#00342b]">
                <span className="material-symbols-outlined text-base">support_agent</span>
                <span>Need Registration Help?</span>
              </div>
              <p className="text-slate-500">
                Visit your local Mandal Cooperative Facilitation Desk or call toll-free:
              </p>
              <div className="font-mono font-bold text-sm text-[#00342b]">1800-425-COOP (Toll Free)</div>
            </div>
          </div>

          {/* Right Column: Multi-Section Registration Form (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Section 1: Personal Details */}
              <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#e3e3de]">
                  <span className="material-symbols-outlined text-[#00342b] text-xl">person</span>
                  <h2 className="font-display font-bold text-base text-[#1a1c19]">
                    1. Personal Details (Government ID Linked)
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">
                      Full Name (as per Govt ID) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc9c4] text-xs font-medium focus:outline-none focus:border-[#00342b]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">
                      Mobile Number (Linked with Aadhaar / UPI) <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <span className="px-3 py-2.5 rounded-xl border border-[#bfc9c4] bg-[#eeeee9] text-xs font-semibold text-[#3f4945] flex items-center">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc9c4] text-xs font-medium focus:outline-none focus:border-[#00342b]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc9c4] text-xs font-medium focus:outline-none focus:border-[#00342b]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">
                      Create Login Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3.5 pr-10 py-2.5 rounded-xl border border-[#bfc9c4] text-xs font-medium focus:outline-none focus:border-[#00342b]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                      >
                        <span className="material-symbols-outlined text-base">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      {(['Male', 'Female', 'Other'] as const).map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setGender(g)}
                          className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                            gender === g
                              ? 'bg-[#00342b] text-white border-[#00342b]'
                              : 'bg-white text-[#3f4945] border-[#bfc9c4]'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#bfc9c4] text-xs font-medium focus:outline-none focus:border-[#00342b]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Location & Service Radius */}
              <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#e3e3de]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00342b] text-xl">location_on</span>
                    <h2 className="font-display font-bold text-base text-[#1a1c19]">
                      2. Location & Operating Base
                    </h2>
                  </div>
                  <span className="text-xs font-bold bg-[#eeeee9] text-[#3f4945] px-3 py-1 rounded-full">
                    Primary Cluster
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">
                      Town / Village Base <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc9c4] text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">
                      Mandal / Taluk <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={mandal}
                      onChange={(e) => setMandal(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc9c4] text-xs font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">
                      District <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#bfc9c4] text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#bfc9c4] text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#bfc9c4] text-xs font-medium"
                    />
                  </div>
                </div>

                <div className="bg-[#f4f4ef] p-3 rounded-xl border border-[#e3e3de] flex items-center gap-2.5 text-xs text-[#3f4945]">
                  <span className="material-symbols-outlined text-[#835500] text-lg">explore</span>
                  <span>Standard cooperative dispatch coverage: <strong>15 km radius around Undi Cluster</strong></span>
                </div>
              </div>

              {/* Section 3: Trade, Experience & Skills */}
              <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#e3e3de]">
                  <span className="material-symbols-outlined text-[#00342b] text-xl">build</span>
                  <h2 className="font-display font-bold text-base text-[#1a1c19]">
                    3. Trade, Experience & Skill Specializations
                  </h2>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1a1c19] mb-1">
                    Primary Trade Craft <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={trade}
                    onChange={(e) => setTrade(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc9c4] text-xs font-medium bg-white"
                  >
                    <option value="Licensed Electrician & Wiring">Licensed Electrician & Wiring</option>
                    <option value="Certified Plumber & Sanitary">Certified Plumber & Sanitary</option>
                    <option value="Master Carpenter & Polish">Master Carpenter & Polish</option>
                    <option value="HVAC & Appliance Technician">HVAC & Appliance Technician</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">
                      Years of Trade Experience <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        max="40"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc9c4] text-xs font-medium"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                        Years
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">
                      Shift Availability <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc9c4] text-xs font-medium bg-white"
                    >
                      <option value="Full-Time (Daily)">Full-Time (Daily)</option>
                      <option value="Part-Time (Morning)">Part-Time (Morning)</option>
                      <option value="Emergency On-Call">Emergency On-Call</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1a1c19] mb-2">
                    Select Practical Skills (Tap to add) <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      'Electrical Wiring',
                      'Motor & Pump Repair',
                      'Fan & Switchboards',
                      'Solar Inverter Setup',
                    ].map((sk) => (
                      <button
                        key={sk}
                        type="button"
                        onClick={() => toggleSkill(sk)}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition-colors ${
                          skills.includes(sk)
                            ? 'bg-[#00342b]/10 border-[#00342b] text-[#00342b] font-bold'
                            : 'bg-white border-[#bfc9c4] text-[#3f4945]'
                        }`}
                      >
                        <span>{sk}</span>
                        {skills.includes(sk) && (
                          <span className="material-symbols-outlined text-sm text-[#00342b]">
                            check_box
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1a1c19] mb-2">
                    Languages Spoken with Clients
                  </label>
                  <div className="flex gap-2">
                    {['Telugu', 'Hindi', 'English'].map((lng) => (
                      <button
                        key={lng}
                        type="button"
                        onClick={() => toggleLanguage(lng)}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                          languages.includes(lng)
                            ? 'bg-[#afefdd]/40 border-emerald-600 text-[#004d40]'
                            : 'bg-white border-slate-300 text-slate-500'
                        }`}
                      >
                        {lng} {languages.includes(lng) ? '✓' : ''}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 4: Mandatory 10th+ Qualification Audit */}
              <div className="bg-white rounded-3xl border-2 border-[#ffaa14] p-6 shadow-sm space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between pb-2 border-b border-[#e3e3de]">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#835500] text-2xl">school</span>
                    <div>
                      <h2 className="font-display font-bold text-base text-[#1a1c19]">
                        4. Mandatory 10th+ Standard Qualification
                      </h2>
                      <p className="text-xs text-[#835500]">Strict Statutory Verification Audit</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider bg-[#ffaa14] text-[#2a1800] px-3 py-1 rounded-full">
                    ! Statutory Mandate
                  </span>
                </div>

                {/* Law Box */}
                <div className="bg-[#fffbeb] border border-[#ffaa14]/60 rounded-2xl p-4 flex items-start gap-3 text-xs text-[#694300]">
                  <span className="material-symbols-outlined text-[#835500] text-xl mt-0.5 shrink-0">warning</span>
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-[#2a1800]">
                      Mandatory Minimum Education: 10th Standard (SSC)
                    </div>
                    <p className="leading-relaxed">
                      As per the Andhra Pradesh Cooperative Societies Act and TrustWorkers Governance By-laws, all partner technicians must possess a verified 10th pass memo or recognized ITI/polytechnic diploma.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">
                      Select Highest Education Completed <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={educationLevel}
                      onChange={(e) => setEducationLevel(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc9c4] text-xs font-medium bg-white"
                    >
                      <option value="10th Standard / SSC / Matriculation (Eligible)">
                        10th Standard / SSC / Matriculation (Eligible)
                      </option>
                      <option value="12th / Intermediate (+2) (Eligible)">
                        12th / Intermediate (+2) (Eligible)
                      </option>
                      <option value="ITI / Diploma in Electrical / Mechanical (Eligible)">
                        ITI / Diploma in Electrical / Mechanical (Eligible)
                      </option>
                      <option value="Polytechnic / Graduate Degree (Eligible)">
                        Polytechnic / Graduate Degree (Eligible)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">
                      10th School / Board Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="e.g. Zilla Parishad High School, Undi (BSEA)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc9c4] text-xs font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">
                      10th Roll / Hall Ticket No. <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={hallTicket}
                      onChange={(e) => setHallTicket(e.target.value)}
                      placeholder="SSC-2015-84920"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc9c4] text-xs font-mono font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c19] mb-1">
                      Year of Passing <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1980"
                      max="2026"
                      required
                      value={passYear}
                      onChange={(e) => setPassYear(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc9c4] text-xs font-medium"
                    />
                  </div>
                </div>

                {/* Upload Certificate Widget */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-[#1a1c19]">
                      Upload 10th Marks Memo / Certificate Scan <span className="text-red-500">*</span>
                    </label>
                    <span className="text-xs text-slate-400">PDF, JPG, PNG (Max 5MB)</span>
                  </div>

                  {uploadedFile ? (
                    <div className="p-4 bg-[#eef0ea] border border-emerald-600/40 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-emerald-700 text-3xl">
                          description
                        </span>
                        <div>
                          <div className="text-xs font-bold text-[#1a1c19] flex items-center gap-1">
                            <span>{uploadedFile.name}</span>
                            <span className="material-symbols-outlined text-emerald-600 text-base">
                              check_circle
                            </span>
                          </div>
                          <div className="text-xs text-slate-500">
                            {uploadedFile.size} • Ready for cooperative auditor vetting
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadedFile(null)}
                        className="text-slate-400 hover:text-red-600 p-2 rounded-full"
                        title="Remove file"
                      >
                        <span className="material-symbols-outlined text-lg">close</span>
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-emerald-600 transition-colors bg-slate-50">
                      <span className="material-symbols-outlined text-4xl text-slate-400">cloud_upload</span>
                      <div className="text-xs font-semibold text-[#1a1c19] mt-2">
                        Click or drag to upload 10th memo scan
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setUploadedFile({ name: '10th_ssc_certificate_ravi.pdf', size: '1.4 MB' })
                        }
                        className="mt-3 text-xs font-bold text-emerald-800 bg-white border border-emerald-300 px-4 py-1.5 rounded-xl hover:bg-emerald-50"
                      >
                        Attach Sample Certificate
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-[#f4f4ef] rounded-xl p-3 border border-slate-200 flex items-start gap-2.5 text-xs text-[#707975]">
                  <span className="material-symbols-outlined text-base mt-0.5 text-slate-500">lock</span>
                  <span>
                    <strong>Confidential Audit:</strong> Your certificate is examined exclusively by the West Godavari District Cooperative Audit Committee.
                  </span>
                </div>
              </div>

              {/* Declarations & Submit */}
              <div className="bg-white rounded-3xl border border-[#e3e3de] p-6 space-y-4 text-xs">
                <span className="font-bold text-[#1a1c19] block uppercase tracking-wider text-xs border-b border-slate-100 pb-2">
                  Statutory Cooperative Declarations
                </span>

                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="dec1"
                    checked={confirmEducation}
                    onChange={(e) => setConfirmEducation(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#00342b] focus:ring-[#00342b]"
                  />
                  <label htmlFor="dec1" className="text-xs text-[#3f4945] leading-relaxed select-none">
                    I solemnly confirm that I have successfully passed 10th standard (SSC) or higher, and the educational memo uploaded is authentic and belongs to me.
                  </label>
                </div>

                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="dec2"
                    checked={confirmFairTrade}
                    onChange={(e) => setConfirmFairTrade(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#00342b] focus:ring-[#00342b]"
                  />
                  <label htmlFor="dec2" className="text-xs text-[#3f4945] leading-relaxed select-none">
                    I agree to the <span className="font-bold text-[#00342b]">Cooperative By-laws</span>, Fair Trade Charter, and direct UPI bank disbursement conditions.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#00342b] hover:bg-[#004d40] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                      <span>Auditing Credentials & Issuing Member ID...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application & Verify 10th Standard</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

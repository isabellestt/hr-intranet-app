export const currentUser = {
  name: 'KSN',
  fullName: 'Kan Siew Ning',
  employeeId: '01432846',
  firstName: 'Siew Ning',
  lastName: 'Kan',
  dateOfBirth: '1990-03-15',
  gender: 'Male',
  nationality: 'Singaporean',
  mobileNumber: '+65 1234 5678',
  personalEmail: 'kan.siewning@ritz-carlton.com',
  residentialAddress: 'The Seletar Mall, Seng Kang',
  bankName: 'DBS',
  accountHolderName: 'Kan Siew Ning',
  bankAccountNumber: '1014200589901',
  bankBranch: 'Singapore',
  position: 'Guest Relations Manager',
  department: 'Front Office',
  joiningDate: '2019-06-01',
}

export const payslipData: Record<number, string[]> = {
  2026: ['January', 'February', 'March'],
  2025: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  2024: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
}

export type AttendanceRecord = {
  shiftStart: string
  shiftEnd: string
  clockIn: string
  clockOut: string
  totalHours: string
  status: 'PRESENT' | 'ABSENT' | 'LEAVE'
}

export const attendanceData: Record<string, AttendanceRecord> = {
  '2026-03-03': { shiftStart: '08:00', shiftEnd: '17:00', clockIn: '07:58', clockOut: '17:05', totalHours: '9h 07m', status: 'PRESENT' },
  '2026-03-04': { shiftStart: '08:00', shiftEnd: '17:00', clockIn: '08:12', clockOut: '17:00', totalHours: '8h 48m', status: 'PRESENT' },
  '2026-03-05': { shiftStart: '08:00', shiftEnd: '17:00', clockIn: '—', clockOut: '—', totalHours: '—', status: 'ABSENT' },
  '2026-03-06': { shiftStart: '08:00', shiftEnd: '17:00', clockIn: '08:00', clockOut: '17:00', totalHours: '9h 00m', status: 'PRESENT' },
  '2026-03-10': { shiftStart: '08:00', shiftEnd: '17:00', clockIn: '08:05', clockOut: '17:10', totalHours: '9h 05m', status: 'PRESENT' },
  '2026-03-11': { shiftStart: '08:00', shiftEnd: '17:00', clockIn: '—', clockOut: '—', totalHours: '—', status: 'LEAVE' },
  '2026-03-12': { shiftStart: '08:00', shiftEnd: '17:00', clockIn: '—', clockOut: '—', totalHours: '—', status: 'LEAVE' },
  '2026-03-17': { shiftStart: '08:00', shiftEnd: '17:00', clockIn: '07:55', clockOut: '17:02', totalHours: '9h 07m', status: 'PRESENT' },
  '2026-03-18': { shiftStart: '08:00', shiftEnd: '17:00', clockIn: '08:01', clockOut: '17:00', totalHours: '8h 59m', status: 'PRESENT' },
  '2026-03-24': { shiftStart: '08:00', shiftEnd: '17:00', clockIn: '08:00', clockOut: '17:00', totalHours: '9h 00m', status: 'PRESENT' },
  '2026-03-25': { shiftStart: '08:00', shiftEnd: '17:00', clockIn: '08:20', clockOut: '17:00', totalHours: '8h 40m', status: 'PRESENT' },
  '2026-04-01': { shiftStart: '08:00', shiftEnd: '17:00', clockIn: '08:00', clockOut: '17:00', totalHours: '9h 00m', status: 'PRESENT' },
  '2026-04-02': { shiftStart: '08:00', shiftEnd: '17:00', clockIn: '07:58', clockOut: '17:05', totalHours: '9h 07m', status: 'PRESENT' },
}

export const faqData = [
  {
    question: 'How do I apply for annual leave?',
    answer: 'Log in to the HR Intranet, navigate to Employee Self-Service > Leave Application. Fill in the required fields including start date, end date, leave type, and reason. Submit the form and await manager approval via email notification.',
  },
  {
    question: 'When are payslips made available each month?',
    answer: 'Payslips are processed and uploaded to the portal by the 25th of each month for the current month\'s salary. You will receive an email notification once your payslip is available under Employee Self-Service > Payslips.',
  },
  {
    question: 'What is the process for submitting an expense claim?',
    answer: 'Navigate to Employee Self-Service > Claims & Reimbursement. Fill in the description, expense type, amount, and attach relevant receipts. Claims must be submitted within 30 days of the expense date. Processing takes 7–10 working days.',
  },
  {
    question: 'How do I update my personal or banking information?',
    answer: 'Go to Employee Self-Service > Personal Profile. Update the relevant fields and click "Update". Changes to bank details require supporting documentation and may take 2–3 business days to process by HR.',
  },
  {
    question: 'What are the different types of leave available?',
    answer: 'The hotel offers Annual Leave (21 days per year), Medical/Sick Leave (15 days per year with a valid medical certificate), Urgent/Emergency Leave (3 days per year), and Unpaid Leave (subject to management approval). Maternity and Paternity leave are also available as per UAE Labour Law.',
  },
  {
    question: 'Who do I contact for payroll discrepancies?',
    answer: 'Please email payroll@ritzcarlton-ae.com with your Employee ID, the month in question, and a description of the discrepancy. The Payroll team will investigate and respond within 3 business days.',
  },
  {
    question: 'How are performance reviews conducted?',
    answer: 'Performance reviews are conducted bi-annually (June and December). Managers will schedule a one-on-one session with each team member. Self-assessment forms will be available on this portal under HR Processes > Performance Management two weeks before the review period.',
  },
  {
    question: 'What training programs are available to employees?',
    answer: 'The Ritz-Carlton offers a comprehensive learning curriculum including The Gold Standards training, departmental technical skills programs, leadership development courses, and cross-training opportunities. Visit Learning & Development to browse available courses and register.',
  },
]

export const announcements = [
  {
    date: 'March 28, 2026',
    title: 'Ramadan Kareem: Adjusted Working Hours',
    excerpt: 'During the Holy Month of Ramadan, working hours for all departments will be reduced by two hours daily. Please coordinate with your manager for updated schedules.',
  },
  {
    date: 'March 20, 2026',
    title: 'Gold Standards Refresher Training',
    excerpt: 'All Ladies and Gentlemen are required to complete the annual Gold Standards refresher training by April 15th. Sessions are available in the Learning & Development portal.',
  },
  {
    date: 'March 15, 2026',
    title: 'Employee Appreciation Week: April 6-10',
    excerpt: 'Join us in celebrating our incredible team! Activities include a gala dinner, wellness sessions, and special recognition awards. Stay tuned for the full schedule.',
  },
  {
    date: 'March 10, 2026',
    title: 'New Medical Insurance Provider',
    excerpt: 'Effective April 1st, our medical insurance will be provided by Daman. Please review the updated benefits summary in HR Information > Benefits Policies.',
  },
]

// ── Policy content ────────────────────────────────────────────────────────────
 
export interface PolicySection {
  heading: string
  body:     React.ReactNode
}
 
export interface Policy {
  id:       string
  label:    string
  icon:     React.ElementType
  desc:     string
  intro:    string
  contents: string[]
  sections: PolicySection[]
}
 


export const staffDirectory = [
  { name: 'Ahmed Al Rashid', role: 'Front Desk Supervisor', department: 'Front Office', id: '01432801' },
  { name: 'Priya Sharma', role: 'Housekeeping Manager', department: 'Rooms', id: '01432812' },
  { name: 'Jean-Pierre Moreau', role: 'Executive Chef', department: 'Food & Beverage', id: '01432820' },
  { name: 'Fatima Al Zaabi', role: 'HR Business Partner', department: 'Human Resources', id: '01432835' },
  { name: 'David Chen', role: 'Revenue Manager', department: 'Finance', id: '01432841' },
  { name: 'Sofia Ramirez', role: 'Guest Relations Officer', department: 'Front Office', id: '01432842' },
  { name: 'Mohammed Al Mansoori', role: 'Security Manager', department: 'Security', id: '01432850' },
  { name: 'Yuki Tanaka', role: 'Spa Director', department: 'Wellness', id: '01432860' },
  { name: 'Karim S. Nasser', role: 'Guest Relations Manager', department: 'Front Office', id: '01432846' },
  { name: 'Aisha Khalil', role: 'Training Coordinator', department: 'Human Resources', id: '01432870' },
  { name: 'Robert Williams', role: 'IT Systems Manager', department: 'Information Technology', id: '01432878' },
  { name: 'Nour El-Din', role: 'Concierge Supervisor', department: 'Front Office', id: '01432882' },
]

export interface OrgNode {
  id: string
  title: string
  color?: string
  children?: OrgNode[]
}

export const orgChartData: OrgNode = {
  id: 'gm',
  title: 'General Manager',
  children: [
    {
      id: 'am',
      title: 'Assistant Manager',
      children: [
        {
          id: 'dam',
          title: 'Deputy Assistant Manager',
          children: [
            {
              id: 'fom',
              title: 'Front Office Manager',
              color: 'blue',
              children: [
                { id: 'afom', title: 'Assistant Front Office Manager', color: 'blue' },
                { id: 'rfda', title: 'Reception/Front Desk Agents', color: 'blue' },
                { id: 'vp',   title: 'Valet & Parking', color: 'blue' },
              ],
            },
            {
              id: 'lm',
              title: 'Logistics Manager',
              color: 'teal',
              children: [
                { id: 'pm',  title: 'Purchase Manager', color: 'teal' },
                { id: 'mm',  title: 'Maintenance Manager', color: 'teal' },
                { id: 'sm',  title: 'Security Manager', color: 'teal' },
                { id: 'drv', title: 'Drivers', color: 'teal' },
              ],
            },
            {
              id: 'fbd',
              title: 'Food & Beverage Director',
              color: 'green',
              children: [
                {
                  id: 'km',
                  title: 'Kitchen Manager',
                  color: 'green',
                  children: [
                    { id: 'hc',  title: 'Head Chef', color: 'green' },
                    { id: 'lc',  title: 'Lead Chef', color: 'green' },
                    { id: 'mcc', title: 'Main Dishes Chef', color: 'green' },
                    { id: 'scc', title: 'Side Dishes Chef', color: 'green' },
                    { id: 'dc',  title: 'Dessert Chef', color: 'green' },
                  ],
                },
                {
                  id: 'rm',
                  title: 'Restaurant Manager',
                  color: 'green',
                  children: [
                    { id: 'ca', title: 'Cashiers', color: 'green' },
                    { id: 'wb', title: 'Waiters', color: 'green' },
                  ],
                },
              ],
            },
            {
              id: 'salm',
              title: 'Sales Manager',
              color: 'orange',
              children: [
                { id: 'asm',  title: 'Assistant Sales Manager', color: 'orange' },
                { id: 'resm', title: 'Reservation Manager', color: 'orange' },
                { id: 'rs',   title: 'Reservation & Salespersons', color: 'orange' },
              ],
            },
            {
              id: 'hrm',
              title: 'HR Manager',
              color: 'purple',
              children: [
                { id: 'hra', title: 'HR Assistant', color: 'purple' },
              ],
            },
            {
              id: 'fm',
              title: 'Finance Manager',
              color: 'red',
              children: [
                { id: 'acc', title: 'Accountant', color: 'red' },
                { id: 'cas', title: 'Cashier', color: 'red' },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export interface CompanyUpdate {
  id: number
  date: string
  title: string
  category: 'Operations' | 'Celebration' | 'General'
}

export const companyUpdatesData: CompanyUpdate[] = [
  { id: 1, date: '27 March', title: 'Renovation Works',        category: 'Operations'  },
  { id: 2, date: '17 February', title: 'Happy Lunar New Year!', category: 'Celebration' },
  { id: 3, date: '1 January',   title: 'Welcome to 2026!',      category: 'Celebration' },
]

// Add these to your existing @/lib/mock-data.ts

export type EventCategory = 'Company' | 'Holiday' | 'Training' | 'Social'

export interface CalendarEvent {
  id: number
  date: string        // 'YYYY-MM-DD'
  title: string
  category: EventCategory
  time?: string       // e.g. '10:00 AM – 12:00 PM'
  location?: string
  description?: string
}

export const calendarEvents: CalendarEvent[] = [
  // ── Singapore Public Holidays 2026 ──
  { id: 1,  date: '2026-01-01', title: "New Year's Day",           category: 'Holiday', description: 'Singapore public holiday' },
  { id: 2,  date: '2026-01-29', title: 'Chinese New Year (Day 1)', category: 'Holiday', description: 'Singapore public holiday' },
  { id: 3,  date: '2026-01-30', title: 'Chinese New Year (Day 2)', category: 'Holiday', description: 'Singapore public holiday' },
  { id: 4,  date: '2026-04-03', title: 'Good Friday',              category: 'Holiday', description: 'Singapore public holiday' },
  { id: 5,  date: '2026-05-01', title: 'Labour Day',               category: 'Holiday', description: 'Singapore public holiday' },
  { id: 6,  date: '2026-05-12', title: 'Vesak Day',                category: 'Holiday', description: 'Singapore public holiday' },
  { id: 7,  date: '2026-06-02', title: 'Hari Raya Haji',           category: 'Holiday', description: 'Singapore public holiday' },
  { id: 8,  date: '2026-08-09', title: 'National Day',             category: 'Holiday', description: 'Singapore public holiday' },
  { id: 9,  date: '2026-10-27', title: 'Deepavali',                category: 'Holiday', description: 'Singapore public holiday' },
  { id: 10, date: '2026-12-25', title: 'Christmas Day',            category: 'Holiday', description: 'Singapore public holiday' },

  // ── Company Events ──
  { id: 11, date: '2026-04-10', title: 'Q2 All-Hands Meeting',     category: 'Company',  time: '10:00 AM – 12:00 PM', location: 'Grand Ballroom', description: 'Quarterly company-wide briefing with department updates.' },
  { id: 12, date: '2026-04-22', title: 'Earth Day Initiative',     category: 'Social',   time: '2:00 PM – 4:00 PM',  location: 'Hotel Gardens',  description: 'Sustainability activity for all staff.' },
  { id: 13, date: '2026-05-08', title: 'Leadership Workshop',      category: 'Training', time: '9:00 AM – 5:00 PM',  location: 'Conference Room B', description: 'Full-day leadership development programme.' },
  { id: 14, date: '2026-05-15', title: 'Staff Appreciation Night', category: 'Social',   time: '7:00 PM – 10:00 PM', location: 'Rooftop Terrace', description: 'Annual staff recognition dinner.' },
  { id: 15, date: '2026-06-05', title: 'Fire Drill',               category: 'Company',  time: '11:00 AM',           location: 'All Areas',      description: 'Mandatory hotel-wide emergency evacuation drill.' },
  { id: 16, date: '2026-06-19', title: 'Mid-Year Review',          category: 'Company',  time: '10:00 AM – 1:00 PM', location: 'HR Office',      description: 'Mid-year performance review meetings with department heads.' },
  { id: 17, date: '2026-07-04', title: 'Service Excellence Training', category: 'Training', time: '9:00 AM – 12:00 PM', location: 'Training Room A', description: 'Ritz-Carlton Gold Standards refresher for all guest-facing staff.' },
  { id: 18, date: '2026-09-18', title: 'Team Building Day',        category: 'Social',   time: 'All Day',            location: 'Sentosa',        description: 'Annual outdoor team building activity.' },
  { id: 19, date: '2026-11-20', title: 'Year-End Planning',        category: 'Company',  time: '2:00 PM – 5:00 PM',  location: 'Conference Room A', description: 'Department heads present 2027 plans.' },
  { id: 20, date: '2026-12-18', title: 'Christmas Party',          category: 'Social',   time: '7:00 PM – 11:00 PM', location: 'Grand Ballroom', description: 'Annual staff Christmas celebration.' },
]

export const trainingFaqData = [
  {
    question: 'What expenses are covered (course fees, travel etc.)?',
    answer:
      'The company covers course registration fees, examination fees, and approved course materials for eligible training programmes. Travel and accommodation expenses may be reimbursed for off-site training, subject to prior manager approval. Submit all claims via Employee Self-Service > Claims & Reimbursement within 30 days of the expense date with supporting receipts.',
  },
  {
    question: 'Does the company sponsor external courses?',
    answer:
      'Yes, the company supports external courses that are relevant to your current role or career development within the hotel. You will need to submit a Training Request Form to your department head and HR at least 4 weeks before the course start date. Sponsorship is subject to business needs, budget availability, and management approval.',
  },
  {
    question: 'Do I need to attend the full course to get credit?',
    answer:
      'Yes, full attendance is required to receive course credit and any associated certification. If you miss more than 20% of a programme due to unforeseen circumstances, please inform HR and your department head immediately. Partial attendance may result in forfeiture of sponsorship and a requirement to reimburse course fees.',
  },
  {
    question: 'Is training mandatory for performance review?',
    answer:
      'Completion of assigned mandatory training programmes is taken into consideration during your annual performance review. Each employee is expected to complete a minimum of 20 training hours per year, including required compliance modules. Voluntary learning initiatives are also recognised and encouraged as part of your development plan.',
  },
  {
    question: 'Who do I contact for Learning & Development support?',
    answer:
      'For all Learning & Development enquiries, reach out to the HR department at hr-learning@ritzcarlton.com or visit the HR office on Level 2. You can also raise a support request via Employee Self-Service > HR Processes. Our L&D coordinator is available Monday to Friday, 9:00 AM – 6:00 PM.',
  },
]

export interface BirthdayEvent {
  id: number
  date: string        // 'YYYY-MM-DD'
  name: string
  department: string
}

export const BirthdayEvents: BirthdayEvent[] = [
  { id: 1,  date: '2026-01-01', name: "Alan Tan", department: "Sales" },
  { id: 2,  date: '2026-01-29', name: 'Chloe Lee', department: "Marketing" },
  { id: 3,  date: '2026-01-30', name: 'Sebastian Koh', department: "Operations" },
  { id: 4,  date: '2026-02-03', name: 'Josh Tan', department: "Finance" },
  { id: 5,  date: '2026-02-15', name: 'Noelle Goh', department: "Human Resources" },
  { id: 6,  date: '2026-03-12', name: 'Sarah Lim', department: "IT" },
  { id: 7,  date: '2026-03-13', name: 'Vera Chan', department: "Sales" },
  { id: 8,  date: '2026-03-24', name: 'Darren Yeo', department: "Operations" },
  { id: 9,  date: '2026-04-16', name: 'Darryl Poh', department: "Finance" },
  { id: 10, date: '2026-04-27', name: 'Shawn Thiah', department: "Marketing" },
]

// Add these to your existing @/lib/mock-data.ts

// ── Onboarding ────────────────────────────────────────────────────────────────

export type SurveyStatus = 'pending' | 'completed' | 'overdue'

export interface OnboardingSurvey {
  id: number
  date: string          // 'YYYY-MM-DD'
  displayDate: string   // e.g. '6 April'
  title: string
  status: SurveyStatus
  estimatedMins: number
}

export const onboardingSurveys: OnboardingSurvey[] = [
  { id: 1, date: '2026-04-06', displayDate: '6 April',  title: 'Compliance Declaration Form',  status: 'pending',   estimatedMins: 5  },
  { id: 2, date: '2026-04-13', displayDate: '13 April', title: 'First Week Check-In Survey',   status: 'pending',   estimatedMins: 10 },
  { id: 3, date: '2026-07-06', displayDate: '6 July',   title: '3rd Month Check-In Survey',    status: 'pending',   estimatedMins: 15 },
  { id: 4, date: '2026-10-06', displayDate: '6 October',title: '6th Month Review Survey',      status: 'pending',   estimatedMins: 20 },
]

export interface OnboardingDeckSlide {
  id: number
  title: string
  description: string
  icon: string    // lucide icon name as string — component maps it
}

export const onboardingDeckSlides: OnboardingDeckSlide[] = [
  { id: 1, title: 'Welcome to The Ritz-Carlton',     description: 'Our history, mission, and the Gold Standards that define our culture of excellence.',          icon: 'Hotel'        },
  { id: 2, title: 'The Credo & Motto',               description: 'Understanding "We Are Ladies and Gentlemen Serving Ladies and Gentlemen."',                   icon: 'BookOpen'     },
  { id: 3, title: 'Your First Week',                 description: 'Key contacts, building access, IT setup, uniform collection, and daily routines.',            icon: 'CalendarDays' },
  { id: 4, title: 'HR Policies Overview',            description: 'Leave entitlements, attendance expectations, code of conduct, and disciplinary procedures.',  icon: 'FileText'     },
  { id: 5, title: 'Benefits & Compensation',         description: 'Medical coverage, meal allowances, staff rates, and annual leave accrual.',                   icon: 'Wallet'       },
  { id: 6, title: 'Learning & Development',          description: 'Mandatory training timeline, e-learning platform access, and career progression pathways.',  icon: 'GraduationCap'},
]

// ── Internal Job Postings ──────────────────────────────────────────────────────

export type JobStatus    = 'Open' | 'Closing Soon' | 'Closed'
export type JobType      = 'Full-Time' | 'Part-Time' | 'Contract'
export type JobDepartment = 'Food & Beverage' | 'Front Office' | 'Housekeeping' | 'HR' | 'Finance' | 'Sales' | 'Kitchen'

export interface JobPosting {
  id: number
  title: string
  department: JobDepartment
  location: string
  type: JobType
  status: JobStatus
  postedDate: string    // 'YYYY-MM-DD'
  closingDate: string   // 'YYYY-MM-DD'
  description: string
  requirements: string[]
}

export const jobPostings: JobPosting[] = [
  {
    id: 1,
    title:       'Guest Relations Officer',
    department:  'Front Office',
    location:    'Singapore',
    type:        'Full-Time',
    status:      'Open',
    postedDate:  '2026-03-20',
    closingDate: '2026-04-20',
    description: 'Serve as the primary point of contact for VIP guests, coordinating personalised services and resolving any concerns with the highest level of professionalism.',
    requirements: [
      'Minimum 2 years of front office or guest relations experience in a 5-star hotel',
      'Excellent verbal and written communication skills in English',
      'Proficiency in Opera PMS or equivalent',
      'Ability to work rotating shifts including weekends and public holidays',
    ],
  },
  {
    id: 2,
    title:       'Junior Sous Chef',
    department:  'Kitchen',
    location:    'Singapore',
    type:        'Full-Time',
    status:      'Closing Soon',
    postedDate:  '2026-03-15',
    closingDate: '2026-04-08',
    description: 'Support the Executive Chef in daily kitchen operations, maintaining the highest standards of food quality and hygiene across all outlets.',
    requirements: [
      'Culinary diploma or equivalent professional qualification',
      'Minimum 3 years of experience in a luxury hotel or fine dining kitchen',
      'Strong knowledge of international cuisine and dietary requirements',
      'Food hygiene certification (WSQ Food Safety or equivalent)',
    ],
  },
  {
    id: 3,
    title:       'Sales Executive',
    department:  'Sales',
    location:    'Singapore',
    type:        'Full-Time',
    status:      'Open',
    postedDate:  '2026-03-28',
    closingDate: '2026-04-28',
    description: 'Drive revenue through proactive solicitation of corporate and leisure accounts, managing the full sales cycle from prospecting to contract closure.',
    requirements: [
      'Bachelor\'s degree in Business, Hospitality, or a related field',
      'Minimum 2 years of sales experience in hospitality or luxury services',
      'Strong negotiation and presentation skills',
      'Existing portfolio of corporate or MICE clients preferred',
    ],
  },
  {
    id: 4,
    title:       'Housekeeping Supervisor',
    department:  'Housekeeping',
    location:    'Singapore',
    type:        'Full-Time',
    status:      'Open',
    postedDate:  '2026-04-01',
    closingDate: '2026-05-01',
    description: 'Oversee daily housekeeping operations for assigned floors, ensuring rooms and public areas meet The Ritz-Carlton\'s rigorous cleanliness and presentation standards.',
    requirements: [
      'Minimum 2 years of supervisory experience in hotel housekeeping',
      'Meticulous attention to detail and strong organisational skills',
      'Ability to lead and motivate a team of room attendants',
      'Familiar with housekeeping management systems',
    ],
  },
  {
    id: 5,
    title:       'HR Executive',
    department:  'HR',
    location:    'Singapore',
    type:        'Full-Time',
    status:      'Closed',
    postedDate:  '2026-02-10',
    closingDate: '2026-03-10',
    description: 'Support the HR team with end-to-end recruitment, onboarding, employee relations, and HR administrative functions.',
    requirements: [
      'Degree in Human Resources Management or related discipline',
      'Minimum 1 year of HR experience, preferably in hospitality',
      'Proficiency in HRIS and Microsoft Office Suite',
      'Knowledge of Singapore Employment Act',
    ],
  },
]

// Add these to your existing @/lib/mock-data.ts

// ── Pulse Surveys ─────────────────────────────────────────────────────────────

export type PulseSurveyStatus = 'upcoming' | 'completed'

export interface PulseSurveyQuestion {
  id: number
  type: 'rating' | 'text' | 'scale' | 'multiChoice'
  question: string
  options?: string[]   // for multiChoice
}

export interface PulseSurvey {
  id: number
  title: string
  displayDate: string
  date: string          // 'YYYY-MM-DD'
  status: PulseSurveyStatus
  estimatedMins: number
  description: string
  questions: PulseSurveyQuestion[]
  completedOn?: string
}

export const pulseSurveys: PulseSurvey[] = [
  {
    id: 1,
    title:         'Employee Pulse Survey',
    displayDate:   '30 June',
    date:          '2026-06-30',
    status:        'upcoming',
    estimatedMins: 5,
    description:   'A quick check-in to understand how you are feeling about your work, team, and the hotel environment.',
    questions: [
      { id: 1, type: 'scale',       question: 'On a scale of 1–10, how satisfied are you with your current role?' },
      { id: 2, type: 'multiChoice', question: 'Which of the following best describes your mood this week?', options: ['Energised', 'Motivated', 'Neutral', 'Stressed', 'Overwhelmed'] },
      { id: 3, type: 'rating',      question: 'How well does your team communicate and collaborate?' },
      { id: 4, type: 'text',        question: 'Is there anything specific on your mind that you would like to share with management?' },
    ],
  },
  {
    id: 2,
    title:         'Q1 Engagement Survey',
    displayDate:   '31 March',
    date:          '2026-03-31',
    status:        'completed',
    estimatedMins: 8,
    description:   'Quarterly engagement health check across all departments.',
    completedOn:   '28 March 2026',
    questions: [],
  },
  {
    id: 3,
    title:         'Workplace Wellbeing Check',
    displayDate:   '30 September',
    date:          '2026-09-30',
    status:        'upcoming',
    estimatedMins: 7,
    description:   'Focused on physical and mental wellbeing — helping HR tailor support programmes for staff.',
    questions: [
      { id: 1, type: 'scale',       question: 'How would you rate your overall wellbeing at work over the past month?' },
      { id: 2, type: 'multiChoice', question: 'Which wellbeing benefits have you used in the last 3 months?', options: ['Employee Assistance Programme', 'Medical Leave', 'Team Social Events', 'Flexible Scheduling', 'None'] },
      { id: 3, type: 'rating',      question: 'Does your manager actively support your wellbeing?' },
      { id: 4, type: 'text',        question: 'What additional wellbeing support would you like to see offered?' },
    ],
  },
]

// ── Feedback / Suggestion Box ─────────────────────────────────────────────────

export type FeedbackCategory = 'Suggestion' | 'Compliment' | 'Concern' | 'Other'

export interface FeedbackItem {
  id: number
  category: FeedbackCategory
  message: string
  anonymous: boolean
  submittedOn: string
  status: 'Received' | 'Under Review' | 'Resolved'
}

// This is what the logged-in user has previously submitted (shown in "My Submissions")
export const myFeedbackHistory: FeedbackItem[] = [
  {
    id: 1,
    category:    'Suggestion',
    message:     'It would be great to have a dedicated quiet room for staff breaks during peak hours.',
    anonymous:   false,
    submittedOn: '10 March 2026',
    status:      'Under Review',
  },
  {
    id: 2,
    category:    'Compliment',
    message:     'The new staff meal rotation is excellent — a big thank you to the kitchen team!',
    anonymous:   false,
    submittedOn: '22 February 2026',
    status:      'Resolved',
  },
]

// Add these to your existing @/lib/mock-data.ts

export type SlotStatus = 'available' | 'confirmed' | 'pending' | 'cancelled'
export type FacilityType = 'Meeting Room' | 'Ballroom' | 'Board Room' | 'Training Room' | 'Event Space'

export interface FacilityRoom {
  id: string
  name: string
  type: FacilityType
  capacity: number
  floor: string
  amenities: string[]
}

export interface BookedSlot {
  roomId: string
  startHour: number   // 0–23
  endHour: number     // 1–24
  status: SlotStatus
  label?: string
}

export const facilityRooms: FacilityRoom[] = [
  { id: '1', name: 'Thames', type: 'Meeting Room',  capacity: 8,   floor: 'Level 2', amenities: ['Projector', 'Whiteboard', 'Video Conferencing'] },
  { id: '2', name: 'Amazon', type: 'Meeting Room',  capacity: 8,   floor: 'Level 2', amenities: ['Projector', 'Whiteboard'] },
  { id: '3', name: 'Nile', type: 'Board Room',    capacity: 14,  floor: 'Level 3', amenities: ['Projector', 'Video Conferencing', 'Catering Available'] },
  { id: '4', name: 'Ganges',  type: 'Meeting Room',  capacity: 6,   floor: 'Level 2', amenities: ['TV Screen', 'Whiteboard'] },
  { id: '5', name: 'Yangtze', type: 'Meeting Room',  capacity: 10,  floor: 'Level 2', amenities: ['Projector', 'Whiteboard', 'Phone'] },
  { id: '6', name: 'Sequoia', type: 'Training Room', capacity: 30,  floor: 'Level 2', amenities: ['Projector', 'Whiteboard', 'Microphone', 'Flip Chart'] },
  { id: '7', name: 'Redwood', type: 'Training Room', capacity: 30,  floor: 'Level 2', amenities: ['Projector', 'Whiteboard', 'Microphone'] },
  { id: '8', name: 'Canyon', type: 'Board Room',  capacity: 20,   floor: 'Level 3', amenities: ['Projector', 'Video Conferencing', 'Catering Available', 'Sound System'] },
  { id: '9', name: 'Zion', type: 'Board Room',    capacity: 20,  floor: 'Level 3', amenities: ['Projector', 'Video Conferencing', 'Catering Available', 'Sound System'] },
]

// Pre-seeded bookings keyed by 'YYYY-MM-DD'
function todayKeyLocal() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export const facilityBookings: Record<string, BookedSlot[]> = {
  [todayKeyLocal()]: [
    { roomId: '1', startHour: 9,  endHour: 11, status: 'confirmed', label: 'Team Standup'      },
    { roomId: '1', startHour: 14, endHour: 16, status: 'pending',   label: 'Strategy Session'  },
    { roomId: '2', startHour: 10, endHour: 12, status: 'confirmed', label: 'HR Interview'       },
    { roomId: '2', startHour: 15, endHour: 17, status: 'confirmed', label: 'Budget Review'      },
    { roomId: '3', startHour: 8,  endHour: 10, status: 'confirmed', label: 'Board Meeting'      },
    { roomId: '4',  startHour: 13, endHour: 15, status: 'pending',   label: 'Client Call'        },
    { roomId: '7', startHour: 9,  endHour: 12, status: 'confirmed', label: 'L&D Workshop'       },
    { roomId: '7', startHour: 14, endHour: 17, status: 'pending',   label: 'Onboarding'         },
    { roomId: '8', startHour: 10, endHour: 13, status: 'confirmed', label: 'Safety Training'    },
    { roomId: '9', startHour: 11, endHour: 12, status: 'cancelled', label: 'Cancelled'          },
    { roomId: '9', startHour: 16, endHour: 18, status: 'confirmed', label: 'Executive Briefing' },
  ],
}
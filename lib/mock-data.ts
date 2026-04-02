export const currentUser = {
  name: 'KSN',
  fullName: 'Karim S. Nasser',
  employeeId: '01432846',
  firstName: 'Karim',
  lastName: 'S. Nasser',
  dateOfBirth: '1990-03-15',
  gender: 'Male',
  nationality: 'Emirati',
  mobileNumber: '+971 50 123 4567',
  personalEmail: 'karim.nasser@personal.com',
  residentialAddress: 'Villa 12, Al Wasl Road\nJumeirah 1, Dubai\nUnited Arab Emirates',
  bankName: 'Emirates NBD',
  accountHolderName: 'Karim S. Nasser',
  bankAccountNumber: '1014200589901',
  bankBranch: 'Dubai Mall Branch',
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

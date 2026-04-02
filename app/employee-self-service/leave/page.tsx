import PageLayout from '@/components/page-layout'
import LeaveApplication from '@/components/ess/leave-application'

const navItems = [
  { label: 'Personal Profile', href: '/employee-self-service' },
  { label: 'Payslips', href: '/employee-self-service/payslips' },
  { label: 'Leave Application', href: '/employee-self-service/leave' },
  { label: 'Attendance', href: '/employee-self-service/attendance' },
  { label: 'Claims & Reimbursement', href: '/employee-self-service/claims' },
]

export default function LeavePage() {
  return (
    <PageLayout sectionTitle="Employee Self-Service" navItems={navItems}>
      <LeaveApplication />
    </PageLayout>
  )
}

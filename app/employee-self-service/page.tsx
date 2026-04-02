import PageLayout from '@/components/page-layout'
import PersonalProfile from '@/components/ess/personal-profile'

const navItems = [
  { label: 'Personal Profile', href: '/employee-self-service' },
  { label: 'Payslips', href: '/employee-self-service/payslips' },
  { label: 'Leave Application', href: '/employee-self-service/leave' },
  { label: 'Attendance', href: '/employee-self-service/attendance' },
  { label: 'Claims & Reimbursement', href: '/employee-self-service/claims' },
]

export default function ESSPage() {
  return (
    <PageLayout sectionTitle="Employee Self-Service" navItems={navItems}>
      <PersonalProfile />
    </PageLayout>
  )
}

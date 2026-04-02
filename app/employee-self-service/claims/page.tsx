import PageLayout from '@/components/page-layout'
import ClaimsReimbursement from '@/components/ess/claims-reimbursement'

const navItems = [
  { label: 'Personal Profile', href: '/employee-self-service' },
  { label: 'Payslips', href: '/employee-self-service/payslips' },
  { label: 'Leave Application', href: '/employee-self-service/leave' },
  { label: 'Attendance', href: '/employee-self-service/attendance' },
  { label: 'Claims & Reimbursement', href: '/employee-self-service/claims' },
]

export default function ClaimsPage() {
  return (
    <PageLayout sectionTitle="Employee Self-Service" navItems={navItems}>
      <ClaimsReimbursement />
    </PageLayout>
  )
}

import PageLayout from '@/components/page-layout'
import EmployeeHandbook from '@/components/hr/employee-handbook'
import HRLayout from '@/components/hr/hr-layout'

const navItems = [
  { label: 'HR Policy Library', href: '/hr-information' },
  { label: 'Employee Handbook', href: '/hr-information/handbook' },
  { label: 'Benefits Policies', href: '/hr-information/benefits' },
  { label: 'FAQ', href: '/hr-information/faq' },
]

export default function HandbookPage() {
  return (
    <HRLayout>
      <EmployeeHandbook />
    </HRLayout>
  )
}

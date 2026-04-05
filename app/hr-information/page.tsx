import PageLayout from '@/components/page-layout'
import HRPolicyLibrary from '@/components/hr/policy-library'
import HRLayout from '@/components/hr/hr-layout'

const navItems = [
  { label: 'HR Policy Library', href: '/hr-information' },
  { label: 'Employee Handbook', href: '/hr-information/handbook' },
  { label: 'Benefits Policies', href: '/hr-information/benefits' },
  { label: 'FAQ', href: '/hr-information/faq' },
]

export default function HRInformationPage() {
  return (
    <HRLayout>
      <HRPolicyLibrary />
    </HRLayout>
  )
}

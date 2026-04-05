import PageLayout from '@/components/page-layout'
import BenefitsPolicies from '@/components/hr/benefits-policies'
import HRLayout from '@/components/hr/hr-layout'

const navItems = [
  { label: 'HR Policy Library', href: '/hr-information' },
  { label: 'Employee Handbook', href: '/hr-information/handbook' },
  { label: 'Benefits Policies', href: '/hr-information/benefits' },
  { label: 'FAQ', href: '/hr-information/faq' },
]

export default function BenefitsPage() {
  return (
    <HRLayout>
      <BenefitsPolicies />
    </HRLayout>
  )
}

import { StubPage } from '@/components/stub-page'

const navItems = [
  { label: 'Onboarding', href: '/hr-processes' },
  { label: 'Performance Management', href: '/hr-processes/performance' },
  { label: 'Offboarding', href: '/hr-processes/offboarding' },
]

export default function HRProcessesPage() {
  return (
    <StubPage config={{
      sectionTitle: 'HR Processes',
      navItems,
      description: 'Streamlined HR workflows for onboarding, performance management, and career transitions. This section is under development.',
    }} />
  )
}

import { StubPage } from '@/components/stub-page'

const navItems = [
  { label: 'Team Directory', href: '/people-communication' },
  { label: 'Announcements', href: '/people-communication/announcements' },
  { label: 'Org Chart', href: '/people-communication/org-chart' },
]

export default function PeopleCommunicationPage() {
  return (
    <StubPage config={{
      sectionTitle: 'People & Communication',
      navItems,
      description: 'Connect with your colleagues, view organisational charts, and stay updated with company announcements.',
    }} />
  )
}

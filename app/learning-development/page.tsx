import { StubPage } from '@/components/stub-page'

const navItems = [
  { label: 'Course Catalog', href: '/learning-development' },
  { label: 'My Learning Path', href: '/learning-development/my-path' },
  { label: 'Certifications', href: '/learning-development/certifications' },
]

export default function LearningDevelopmentPage() {
  return (
    <StubPage config={{
      sectionTitle: 'Learning & Development',
      navItems,
      description: 'Explore training programmes, track your professional development, and earn certifications through The Ritz-Carlton University.',
    }} />
  )
}

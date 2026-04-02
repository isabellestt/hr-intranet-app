import { StubPage } from '@/components/stub-page'

const navItems = [
  { label: 'Pulse Surveys', href: '/engagement-feedback' },
  { label: 'Recognition', href: '/engagement-feedback/recognition' },
  { label: 'Feedback Hub', href: '/engagement-feedback/feedback' },
]

export default function EngagementFeedbackPage() {
  return (
    <StubPage config={{
      sectionTitle: 'Engagement & Feedback',
      navItems,
      description: 'Share your voice, recognise your colleagues, and help shape our culture through surveys and continuous feedback.',
    }} />
  )
}

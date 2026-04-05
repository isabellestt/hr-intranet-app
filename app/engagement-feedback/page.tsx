import { StubPage } from '@/components/stub-page'
import EngagementLayout from '@/components/engagement-feedback/engagement-layout'
import PulseSurvey from '@/components/engagement-feedback/pulse-survey'

export default function EngagementFeedbackPage() {
  return (
    <EngagementLayout>
      <PulseSurvey />
    </EngagementLayout>
  )
}

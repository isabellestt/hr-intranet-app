import { StubPage } from '@/components/stub-page'
import PeopleLayout from '@/components/people-communication/people-layout'
import OrgChart from '@/components/people-communication/org-chart'

export default function PeopleCommunicationPage() {
  return (
    <PeopleLayout>
      <OrgChart />
    </PeopleLayout>
  )
}

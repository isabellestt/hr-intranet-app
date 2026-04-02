import { StubPage } from '@/components/stub-page'

const navItems = [
  { label: 'My Tasks', href: '/work-tasks' },
  { label: 'Team Calendar', href: '/work-tasks/calendar' },
  { label: 'Project Tracker', href: '/work-tasks/projects' },
]

export default function WorkTasksPage() {
  return (
    <StubPage config={{
      sectionTitle: 'Work & Task Management',
      navItems,
      description: 'Manage your tasks, projects, and team schedules. This section is under development and will be available soon.',
    }} />
  )
}

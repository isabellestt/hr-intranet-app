import TasksLayout from '@/components/work-tasks/tasks-layout'
import CalendarWidget from '@/components/calendar-widget'
import CompanyCalendar from '@/components/work-tasks/company-calendar'

export default function WorkTasksPage() {
  return (
    <TasksLayout>
      <CompanyCalendar />
    </TasksLayout>
  
  )
}

import PageLayout from '@/components/page-layout'
import { Clock } from 'lucide-react'

type StubConfig = {
  sectionTitle: string
  navItems: { label: string; href: string }[]
  description: string
}

export function StubPage({ config }: { config: StubConfig }) {
  return (
    <PageLayout sectionTitle={config.sectionTitle} navItems={config.navItems}>
      <div className="p-8 min-h-full flex flex-col items-center justify-center gap-6 text-center" style={{ backgroundColor: '#1A2E55' }}>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(184,212,232,0.15)' }}
        >
          <Clock className="w-8 h-8" style={{ color: '#B8D4E8' }} />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold text-white mb-2">{config.sectionTitle}</h2>
          <p className="text-white/60 font-sans text-sm max-w-md leading-relaxed">{config.description}</p>
        </div>
        <div
          className="px-6 py-2 rounded-full text-sm font-semibold font-sans"
          style={{ backgroundColor: '#B8D4E8', color: '#1A2E55' }}
        >
          Coming Soon
        </div>
      </div>
    </PageLayout>
  )
}

'use client'

import TopNavbar from './top-navbar'
import Sidebar from './sidebar'

type NavItem = { label: string; href: string }

type PageLayoutProps = {
  sectionTitle: string
  navItems: NavItem[]
  children: React.ReactNode
}

export default function PageLayout({ sectionTitle, navItems, children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopNavbar />
      <div className="flex flex-1">
        <Sidebar sectionTitle={sectionTitle} items={navItems} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

'use client'

import TopNavbar from './top-navbar'
import Footer from './footer'

type NavItem = { label: string; href: string }

type PageLayoutProps = {
  pageTitle: string
  navItems: NavItem[]
  activeTab?: string
  onTabChange?: (tab: string) => void
  children: React.ReactNode
}

export default function PageLayout({ 
  pageTitle, 
  navItems, 
  activeTab,
  onTabChange,
  children 
}: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopNavbar />
      
      {/* Page Hero Banner */}
      <div className="bg-[#1B2A4A] py-8 px-6">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-white tracking-wide">
            {pageTitle}
          </h1>
          <div className="w-12 h-0.5 bg-[#B8975A] mt-3" />
        </div>
      </div>

      {/* Sub-navigation Tab Bar */}
      {navItems.length > 0 && (
        <div className="border-b border-[#E5E5E5] bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <nav className="flex gap-6 overflow-x-auto">
              {navItems.map((item) => {
                const isActive = activeTab === item.href
                return (
                  <button
                    key={item.href}
                    onClick={() => onTabChange?.(item.href)}
                    className={`py-4 text-sm font-sans font-medium whitespace-nowrap transition-colors relative ${
                      isActive
                        ? 'text-[#1B2A4A]'
                        : 'text-[#888] hover:text-[#1B2A4A]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B8975A]" />
                    )}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Content Area */}
      <main className="flex-1">
        <div className="max-w-[1200px] mx-auto px-6 py-10">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  )
}

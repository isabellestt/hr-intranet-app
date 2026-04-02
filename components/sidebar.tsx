'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

type NavItem = {
  label: string
  href: string
}

type SidebarProps = {
  sectionTitle: string
  items: NavItem[]
}

export default function Sidebar({ sectionTitle, items }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className="w-[250px] flex-shrink-0 min-h-full flex flex-col py-5 px-3 gap-2"
      style={{ backgroundColor: '#f4f6f9' }}
    >
      {/* Section Title */}
      <div className="mb-3 pl-3 border-l-4 border-[#1A2E55]">
        <span className="font-serif text-sm font-semibold text-[#1A2E55] leading-tight block">
          {sectionTitle}
        </span>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-1.5">
        {items.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative flex items-center justify-between px-4 py-2.5 rounded-full text-sm font-medium transition-all
                ${isActive
                  ? 'text-white shadow-sm'
                  : 'hover:bg-[#C9B99A]/30 text-[#3d3028]'
                }
              `}
              style={isActive ? { backgroundColor: '#1A2E55' } : { backgroundColor: '#C9B99A' }}
            >
              <span className="font-sans">{item.label}</span>
              {isActive && <ChevronRight className="w-4 h-4 flex-shrink-0" />}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

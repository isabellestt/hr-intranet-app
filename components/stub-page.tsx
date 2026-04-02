'use client'

import TopNavbar from './top-navbar'
import Footer from './footer'
import { Clock } from 'lucide-react'

type StubConfig = {
  pageTitle: string
  description: string
}

export function StubPage({ config }: { config: StubConfig }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopNavbar />
      
      {/* Page Hero Banner */}
      <div className="bg-[#1B2A4A] py-8 px-6">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-white tracking-wide">
            {config.pageTitle}
          </h1>
          <div className="w-12 h-0.5 bg-[#B8975A] mt-3" />
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center py-20 px-6">
        <div className="bg-white border border-[#E5E5E5] shadow-sm p-12 max-w-md w-full text-center">
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-[#E5E5E5]">
            <Clock className="w-8 h-8 text-[#1B2A4A]" />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-[#1B2A4A] mb-3">Coming Soon</h2>
          <p className="text-sm font-sans text-[#666] leading-relaxed mb-8">
            {config.description}
          </p>
          <button className="px-6 py-3 bg-[#1B2A4A] text-white text-sm font-sans font-medium tracking-wide hover:bg-[#2a3d5c] transition-colors">
            Contact HR
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { trainingFaqData } from '@/lib/mock-data'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="p-6 min-h-full" style={{ backgroundColor: '#1A2E55' }}>
      <h2 className="font-serif text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
      <div className="space-y-2 max-w-3xl">
        {trainingFaqData.map((item, i) => (
          <div key={i} className="rounded-lg overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 hover:bg-white/5 transition-colors"
            >
              <span className="font-sans font-semibold text-white text-sm">{item.question}</span>
              {open === i
                ? <ChevronUp className="w-4 h-4 text-[#B8D4E8] flex-shrink-0" />
                : <ChevronDown className="w-4 h-4 text-white/50 flex-shrink-0" />}
            </button>
            {open === i && (
              <div className="px-5 pb-4">
                <div className="h-px bg-white/10 mb-3" />
                <p className="text-white/75 text-sm font-sans leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

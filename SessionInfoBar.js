'use client'

import { Building2, User, Mail, Users, Briefcase } from 'lucide-react'

export default function SessionInfoBar({ sessionData, currentIndex, total, progress }) {
  return (
    <div className="info-card p-5 mb-6">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
          <span className="text-white font-semibold text-sm">{sessionData.firmName}</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-white/40 flex-shrink-0" />
          <span className="text-white/70 text-sm">{sessionData.contactName}</span>
        </div>
        {sessionData.email && (
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-white/40 flex-shrink-0" />
            <span className="text-white/70 text-sm">{sessionData.email}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-white/40 flex-shrink-0" />
          <span className="text-white/50 text-xs bg-white/10 px-2 py-1 rounded-full">{sessionData.practiceArea}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-white/40 flex-shrink-0" />
          <span className="text-white/50 text-xs bg-white/10 px-2 py-1 rounded-full">{sessionData.firmSize}</span>
        </div>
        <div className="ml-auto text-right">
          <p className="text-white/40 text-xs">Questions</p>
          <p className="text-white font-bold text-sm">{currentIndex + 1}/{total}</p>
        </div>
      </div>
    </div>
  )
}
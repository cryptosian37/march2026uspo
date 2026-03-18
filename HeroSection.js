'use client';

import { Shield, Lock, FileText } from 'lucide-react';

export default function HeroSection({ onStart }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&h=900&fit=crop&q=80)',
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(15,21,35,0.87)' }} />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(15,21,35,0.5), #0f1523)',
          }}
        />
      </div>

      <header className="relative z-10 px-6 py-6 flex items-center justify-between max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded flex items-center justify-center"
            style={{ border: '1px solid #c9a84c' }}
          >
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#c9a84c' }} />
          </div>
          <span
            className="text-lg tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif", color: '#e8e4dc' }}
          >
            Your Law Firm
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs tracking-widest uppercase" style={{ color: '#6b7a8d' }}>
          <Lock size={12} />
          <span>Strictly Confidential</span>
        </div>
      </header>

      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
            style={{
              backgroundColor: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.3)',
            }}
          >
            <Shield size={13} style={{ color: '#c9a84c' }} />
            <span
              className="text-xs tracking-widest uppercase font-medium"
              style={{ color: '#c9a84c' }}
            >
              Confidential &amp; Secure
            </span>
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif", color: '#e8e4dc' }}
          >
            Confidential Client
            <br />
            <span style={{ color: '#c9a84c' }}>Discovery Questionnaire</span>
          </h1>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed font-light"
            style={{ color: '#8a96a8' }}
          >
            Help us understand your legal matter before your initial consultation.
            Your responses are encrypted and kept strictly confidential.
          </p>

          <p
            className="text-sm max-w-xl mx-auto mb-12 leading-relaxed"
            style={{ color: '#5a6478' }}
          >
            These questions ensure your first consultation is as focused and productive as possible —
            allowing our attorneys to come fully prepared on your behalf.
          </p>

          <button
            onClick={onStart}
            className="btn-primary text-base"
            style={{ padding: '1rem 2.5rem', boxShadow: '0 8px 32px rgba(201,168,76,0.15)' }}
          >
            Begin Questionnaire
          </button>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { icon: Lock, label: 'End-to-End Encrypted', sub: 'All data secured in transit' },
              {
                icon: Shield,
                label: 'Strictly Confidential',
                sub: 'Protected by attorney-client privilege',
              },
              {
                icon: FileText,
                label: 'No Obligation',
                sub: 'Completing this form does not create a legal relationship',
              },
            ].map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 p-4 rounded-xl"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <Icon size={18} style={{ color: '#c9a84c' }} />
                <span className="text-xs font-semibold tracking-wide" style={{ color: '#c9a84c' }}>
                  {label}
                </span>
                <span className="text-xs text-center leading-relaxed" style={{ color: '#5a6478' }}>
                  {sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
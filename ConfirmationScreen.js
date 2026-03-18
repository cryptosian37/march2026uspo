'use client';

import { CheckCircle, Calendar, FileDown, Shield } from 'lucide-react';

export default function ConfirmationScreen({ data }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ backgroundColor: '#0f1523' }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.3)',
            }}
          >
            <CheckCircle size={40} style={{ color: '#c9a84c' }} />
          </div>
        </div>

        <div className="mb-3">
          <span
            className="text-xs tracking-widest uppercase font-semibold"
            style={{ color: '#c9a84c' }}
          >
            Questionnaire Received
          </span>
        </div>

        <h1
          className="text-4xl md:text-5xl mb-4 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif", color: '#e8e4dc' }}
        >
          Thank You,{' '}
          <span style={{ color: '#c9a84c' }}>
            {data?.preferredName || data?.fullName?.split(' ')[0] || 'Valued Client'}
          </span>
        </h1>

        <p
          className="text-lg leading-relaxed mb-8 max-w-lg mx-auto font-light"
          style={{ color: '#8a96a8' }}
        >
          Your confidential questionnaire has been received and securely stored. A member of our
          intake team will review your matter and be in contact within{' '}
          <strong style={{ color: '#e8e4dc', fontWeight: 500 }}>1–2 business days</strong>.
        </p>

        <div className="form-card text-left mb-8">
          <h3
            className="text-xl mb-5"
            style={{ fontFamily: "'Playfair Display', serif", color: '#e8e4dc' }}
          >
            What Happens Next
          </h3>
          <div className="space-y-4">
            {[
              {
                step: '01',
                title: 'Review',
                desc: 'Our intake team reviews your responses and assigns the most suitable attorney for your matter.',
              },
              {
                step: '02',
                title: 'Contact',
                desc: `We will reach out to you via ${data?.contactMethod || 'your preferred contact method'} within 1–2 business days.`,
              },
              {
                step: '03',
                title: 'Consultation',
                desc: 'Your initial consultation will be arranged — a focused, confidential discussion about your legal options.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex items-start gap-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: 'rgba(201,168,76,0.1)',
                    border: '1px solid rgba(201,168,76,0.2)',
                  }}
                >
                  <span
                    className="text-xs font-bold"
                    style={{ color: '#c9a84c' }}
                  >
                    {step}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: '#e8e4dc' }}>
                    {title}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: '#6b7a8d' }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button className="btn-primary flex items-center justify-center gap-2">
            <Calendar size={16} />
            Book a Consultation
          </button>
          <button className="btn-secondary flex items-center justify-center gap-2">
            <FileDown size={16} />
            What to Expect Next (PDF)
          </button>
        </div>

        <div
          className="flex items-center justify-center gap-2 text-xs"
          style={{ color: '#3a4560' }}
        >
          <Shield size={13} />
          <span>
            Your responses are encrypted, securely stored, and handled in strict accordance with our
            privacy policy.
          </span>
        </div>
      </div>
    </div>
  );
}
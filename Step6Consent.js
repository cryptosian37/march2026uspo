'use client';

import { Shield, FileText, Bell } from 'lucide-react';

export default function Step6Consent({ data, onChange, errors }) {
  const toggle = (field) => onChange({ ...data, [field]: !data[field] });

  const CONSENTS = [
    {
      field: 'consentNoRelationship',
      icon: FileText,
      title: 'No Attorney-Client Relationship',
      text: 'I understand that completing this questionnaire does not create an attorney-client relationship. Such a relationship will only be established upon written confirmation of representation by the firm.',
      required: true,
    },
    {
      field: 'consentAccuracy',
      icon: Shield,
      title: 'Accuracy of Information',
      text: 'I confirm that the information provided in this questionnaire is accurate and complete to the best of my knowledge.',
      required: true,
    },
    {
      field: 'consentMarketing',
      icon: Bell,
      title: 'Legal Updates & Firm News',
      text: 'I would like to receive relevant legal updates, newsletters, and firm news from time to time. I understand I may unsubscribe at any time.',
      required: false,
    },
  ];

  return (
    <div className="step-enter">
      <div className="mb-8">
        <h2
          className="text-3xl mb-2"
          style={{ fontFamily: "'Playfair Display', serif", color: '#e8e4dc' }}
        >
          Consent &amp; Acknowledgements
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: '#6b7a8d' }}>
          Please review and confirm the following statements before submitting your questionnaire.
        </p>
      </div>

      <div className="space-y-4">
        {CONSENTS.map(({ field, icon: Icon, title, text, required }) => {
          const checked = !!data[field];
          const hasError = required && errors?.[field];
          return (
            <div
              key={field}
              className="rounded-xl p-5 cursor-pointer transition-all duration-200"
              style={{
                border: `1px solid ${checked ? '#c9a84c' : hasError ? 'rgba(248,113,113,0.5)' : '#1e2c45'}`,
                backgroundColor: checked ? '#1e2840' : hasError ? '#1a0d0d' : '#141d2f',
              }}
              onClick={() => toggle(field)}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-5 h-5 rounded flex-shrink-0 mt-0.5 flex items-center justify-center transition-all"
                  style={{
                    border: `2px solid ${checked ? '#c9a84c' : hasError ? '#f87171' : '#3a4560'}`,
                    backgroundColor: checked ? '#c9a84c' : 'transparent',
                  }}
                >
                  {checked && (
                    <span style={{ color: '#0f1523', fontSize: '11px', fontWeight: 'bold' }}>
                      ✓
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon size={15} style={{ color: checked ? '#c9a84c' : '#4a5568' }} />
                    <span className="text-sm font-semibold" style={{ color: '#e8e4dc' }}>
                      {title}
                      {required && (
                        <span style={{ color: '#c9a84c', marginLeft: '4px' }}>*</span>
                      )}
                      {!required && (
                        <span
                          style={{
                            color: '#4a5568',
                            fontSize: '0.75rem',
                            marginLeft: '8px',
                            fontWeight: 400,
                          }}
                        >
                          (optional)
                        </span>
                      )}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: '#6b7a8d' }}>
                    {text}
                  </p>
                </div>
              </div>
              {hasError && (
                <p className="error-message mt-2 ml-9">
                  <span>⚠</span> This acknowledgement is required to proceed.
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div
        className="mt-8 p-5 rounded-xl"
        style={{ backgroundColor: '#0a1020', border: '1px solid #1e2c45' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Shield size={15} style={{ color: '#c9a84c' }} />
          <span
            className="text-xs font-semibold tracking-wide uppercase"
            style={{ color: '#c9a84c' }}
          >
            Privacy Notice
          </span>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: '#4a5568' }}>
          Your personal information is collected solely for the purpose of evaluating your legal
          matter and facilitating an initial consultation. It will not be shared with third parties
          without your consent, except as required by law. All data is stored securely and handled
          in accordance with applicable privacy legislation.
        </p>
      </div>
    </div>
  );
}
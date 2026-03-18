'use client';

import FormField from '../FormField';

const URGENCY_OPTIONS = [
  { value: 'emergency', label: 'Emergency', sub: 'Immediate risk or legal threat' },
  { value: 'high', label: 'High', sub: 'Action required within 7 days' },
  { value: 'medium', label: 'Medium', sub: 'Needs attention within 30 days' },
  { value: 'low', label: 'Low', sub: 'More than 30 days — planning ahead' },
];

export default function Step2MatterType({ data, onChange, errors }) {
  const handle = (field) => (e) => onChange({ ...data, [field]: e.target.value });

  return (
    <div className="step-enter">
      <div className="mb-8">
        <h2
          className="text-3xl mb-2"
          style={{ fontFamily: "'Playfair Display', serif", color: '#e8e4dc' }}
        >
          Matter Type &amp; Urgency
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: '#6b7a8d' }}>
          Understanding the nature and urgency of your matter allows us to allocate the right
          attorney and resources.
        </p>
      </div>

      <FormField label="Type of Legal Matter" required error={errors?.matterType}>
        <select
          className={`form-input ${errors?.matterType ? 'error' : ''}`}
          value={data.matterType || ''}
          onChange={handle('matterType')}
        >
          <option value="">Select matter type...</option>
          <option>Family Law (divorce, custody, adoption)</option>
          <option>Business / Commercial Law</option>
          <option>Employment Law</option>
          <option>Property / Real Estate</option>
          <option>Civil Litigation / Dispute Resolution</option>
          <option>Criminal Defense</option>
          <option>Estate Planning &amp; Wills</option>
          <option>Immigration</option>
          <option>Intellectual Property</option>
          <option>Other</option>
        </select>
      </FormField>

      <FormField
        label="Describe Your Legal Matter"
        required
        error={errors?.matterDescription}
        hint="Please describe the situation in your own words. Do not worry about legal terminology — just explain what happened."
      >
        <textarea
          className={`form-input ${errors?.matterDescription ? 'error' : ''}`}
          style={{ minHeight: '120px' }}
          placeholder="Describe your situation here..."
          value={data.matterDescription || ''}
          onChange={handle('matterDescription')}
        />
      </FormField>

      <FormField label="How Urgent Is Your Matter?" required error={errors?.urgency}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
          {URGENCY_OPTIONS.map((opt) => (
            <div
              key={opt.value}
              className={`custom-radio ${data.urgency === opt.value ? 'selected' : ''}`}
              onClick={() => onChange({ ...data, urgency: opt.value })}
            >
              <div
                className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5 transition-all"
                style={{
                  border: `2px solid ${data.urgency === opt.value ? '#c9a84c' : '#3a4560'}`,
                  backgroundColor: data.urgency === opt.value ? '#c9a84c' : 'transparent',
                }}
              />
              <div>
                <p className="text-sm font-medium" style={{ color: '#e8e4dc' }}>
                  {opt.label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#5a6478' }}>
                  {opt.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
        {errors?.urgency && (
          <p className="error-message mt-2">
            <span>⚠</span> {errors.urgency}
          </p>
        )}
      </FormField>

      <FormField
        label="Desired Outcome"
        optional
        hint="What would a successful resolution of this matter look like for you?"
      >
        <textarea
          className="form-input"
          style={{ minHeight: '100px' }}
          placeholder="Describe your best-case scenario or desired outcome..."
          value={data.desiredOutcome || ''}
          onChange={handle('desiredOutcome')}
        />
      </FormField>
    </div>
  );
}
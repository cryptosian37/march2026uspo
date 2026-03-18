'use client';

import FormField from '../FormField';

export default function Step1AboutYou({ data, onChange, errors }) {
  const handle = (field) => (e) => onChange({ ...data, [field]: e.target.value });

  return (
    <div className="step-enter">
      <div className="mb-8">
        <h2
          className="text-3xl mb-2"
          style={{ fontFamily: "'Playfair Display', serif", color: '#e8e4dc' }}
        >
          About You
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: '#6b7a8d' }}>
          Please provide your contact details so we can reach you promptly and accurately.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <FormField label="Full Legal Name" required error={errors?.fullName}>
          <input
            type="text"
            className={`form-input ${errors?.fullName ? 'error' : ''}`}
            placeholder="As it appears on your ID"
            value={data.fullName || ''}
            onChange={handle('fullName')}
          />
        </FormField>

        <FormField label="Preferred Name" optional>
          <input
            type="text"
            className="form-input"
            placeholder="What you'd like to be called"
            value={data.preferredName || ''}
            onChange={handle('preferredName')}
          />
        </FormField>

        <FormField label="Email Address" required error={errors?.email}>
          <input
            type="email"
            className={`form-input ${errors?.email ? 'error' : ''}`}
            placeholder="your@email.com"
            value={data.email || ''}
            onChange={handle('email')}
          />
        </FormField>

        <FormField label="Mobile Phone" required error={errors?.phone}>
          <input
            type="tel"
            className={`form-input ${errors?.phone ? 'error' : ''}`}
            placeholder="+1 (555) 000-0000"
            value={data.phone || ''}
            onChange={handle('phone')}
          />
        </FormField>

        <FormField label="Best Time to Contact" required error={errors?.contactTime}>
          <select
            className={`form-input ${errors?.contactTime ? 'error' : ''}`}
            value={data.contactTime || ''}
            onChange={handle('contactTime')}
          >
            <option value="">Select preferred time...</option>
            <option>Morning (8am – 12pm)</option>
            <option>Afternoon (12pm – 5pm)</option>
            <option>Evening (5pm – 7pm)</option>
            <option>Anytime</option>
          </select>
        </FormField>

        <FormField label="Preferred Contact Method" required error={errors?.contactMethod}>
          <select
            className={`form-input ${errors?.contactMethod ? 'error' : ''}`}
            value={data.contactMethod || ''}
            onChange={handle('contactMethod')}
          >
            <option value="">Select method...</option>
            <option>Phone call</option>
            <option>Email</option>
            <option>SMS / Text message</option>
            <option>Video call</option>
          </select>
        </FormField>
      </div>

      <div className="mt-2">
        <h3
          className="text-xs uppercase tracking-widest font-semibold mb-4 pb-2"
          style={{ color: '#8a96a8', borderBottom: '1px solid #1e2c45' }}
        >
          Physical Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <div className="md:col-span-2">
            <FormField label="Street Address" optional>
              <input
                type="text"
                className="form-input"
                placeholder="123 Main Street"
                value={data.street || ''}
                onChange={handle('street')}
              />
            </FormField>
          </div>
          <FormField label="City" optional>
            <input
              type="text"
              className="form-input"
              placeholder="City"
              value={data.city || ''}
              onChange={handle('city')}
            />
          </FormField>
          <FormField label="State / Region" optional>
            <input
              type="text"
              className="form-input"
              placeholder="State or Region"
              value={data.state || ''}
              onChange={handle('state')}
            />
          </FormField>
          <FormField label="Postal Code" optional>
            <input
              type="text"
              className="form-input"
              placeholder="Postal Code"
              value={data.postalCode || ''}
              onChange={handle('postalCode')}
            />
          </FormField>
          <FormField label="How did you hear about us?" optional>
            <select
              className="form-input"
              value={data.referralSource || ''}
              onChange={handle('referralSource')}
            >
              <option value="">Select source...</option>
              <option>Referral from a friend or family</option>
              <option>Google Search</option>
              <option>Prior client</option>
              <option>LinkedIn or Social Media</option>
              <option>Legal directory</option>
              <option>Other</option>
            </select>
          </FormField>
        </div>
      </div>
    </div>
  );
}
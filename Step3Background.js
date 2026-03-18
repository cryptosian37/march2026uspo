'use client';

import FormField from '../FormField';

export default function Step3Background({ data, onChange, errors }) {
  const handle = (field) => (e) => onChange({ ...data, [field]: e.target.value });
  const handleBool = (field, value) => onChange({ ...data, [field]: value });

  return (
    <div className="step-enter">
      <div className="mb-8">
        <h2
          className="text-3xl mb-2"
          style={{ fontFamily: "'Playfair Display', serif", color: '#e8e4dc' }}
        >
          Background &amp; History
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: '#6b7a8d' }}>
          Context and history help our attorneys assess your position and advise you more
          effectively.
        </p>
      </div>

      <FormField label="When Did This Issue First Arise?" optional>
        <input
          type="date"
          className="form-input"
          value={data.issueDate || ''}
          onChange={handle('issueDate')}
          style={{ colorScheme: 'dark' }}
        />
      </FormField>

      <FormField
        label="Have you previously consulted another attorney about this matter?"
        required
        error={errors?.priorAttorney}
      >
        <div className="flex gap-3 mt-1">
          {['Yes', 'No'].map((opt) => (
            <div
              key={opt}
              className={`custom-radio flex-1 justify-center ${data.priorAttorney === opt ? 'selected' : ''}`}
              onClick={() => handleBool('priorAttorney', opt)}
            >
              <div
                className="w-4 h-4 rounded-full flex-shrink-0 transition-all"
                style={{
                  border: `2px solid ${data.priorAttorney === opt ? '#c9a84c' : '#3a4560'}`,
                  backgroundColor: data.priorAttorney === opt ? '#c9a84c' : 'transparent',
                }}
              />
              <span className="text-sm font-medium" style={{ color: '#e8e4dc' }}>
                {opt}
              </span>
            </div>
          ))}
        </div>
        {errors?.priorAttorney && (
          <p className="error-message mt-2">
            <span>⚠</span> {errors.priorAttorney}
          </p>
        )}
      </FormField>

      {data.priorAttorney === 'Yes' && (
        <FormField label="Please describe your prior consultation" optional>
          <textarea
            className="form-input"
            style={{ minHeight: '80px' }}
            placeholder="Briefly describe the outcome or advice received..."
            value={data.priorAttorneyDetails || ''}
            onChange={handle('priorAttorneyDetails')}
          />
        </FormField>
      )}

      <FormField
        label="Are there any court dates or important deadlines already set?"
        required
        error={errors?.hasDeadlines}
      >
        <div className="flex gap-3 mt-1">
          {['Yes', 'No'].map((opt) => (
            <div
              key={opt}
              className={`custom-radio flex-1 justify-center ${data.hasDeadlines === opt ? 'selected' : ''}`}
              onClick={() => handleBool('hasDeadlines', opt)}
            >
              <div
                className="w-4 h-4 rounded-full flex-shrink-0 transition-all"
                style={{
                  border: `2px solid ${data.hasDeadlines === opt ? '#c9a84c' : '#3a4560'}`,
                  backgroundColor: data.hasDeadlines === opt ? '#c9a84c' : 'transparent',
                }}
              />
              <span className="text-sm font-medium" style={{ color: '#e8e4dc' }}>
                {opt}
              </span>
            </div>
          ))}
        </div>
        {errors?.hasDeadlines && (
          <p className="error-message mt-2">
            <span>⚠</span> {errors.hasDeadlines}
          </p>
        )}
      </FormField>

      {data.hasDeadlines === 'Yes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <FormField label="Deadline / Court Date" optional>
            <input
              type="date"
              className="form-input"
              value={data.deadlineDate || ''}
              onChange={handle('deadlineDate')}
              style={{ colorScheme: 'dark' }}
            />
          </FormField>
          <FormField label="Details about the deadline" optional>
            <input
              type="text"
              className="form-input"
              placeholder="Brief description..."
              value={data.deadlineDetails || ''}
              onChange={handle('deadlineDetails')}
            />
          </FormField>
        </div>
      )}

      <FormField
        label="Key Individuals or Organisations Involved"
        optional
        hint="List names, roles, and their relationship to you (e.g., opposing party, employer, landlord)."
      >
        <textarea
          className="form-input"
          style={{ minHeight: '100px' }}
          placeholder="e.g. John Smith – opposing party (former business partner)..."
          value={data.keyParties || ''}
          onChange={handle('keyParties')}
        />
      </FormField>
    </div>
  );
}
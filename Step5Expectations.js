'use client';

import FormField from '../FormField';

const BUDGET_OPTIONS = [
  { value: 'under_1k', label: 'Under $1,000' },
  { value: '1k_5k', label: '$1,000 – $5,000' },
  { value: '5k_15k', label: '$5,000 – $15,000' },
  { value: '15k_50k', label: '$15,000 – $50,000' },
  { value: 'over_50k', label: 'Over $50,000' },
  { value: 'unsure', label: 'Unsure / Need guidance' },
];

const CONCERN_OPTIONS = [
  'Cost and billing transparency',
  'Uncertainty about the legal process',
  'Timeline to resolution',
  'Confidentiality of my information',
  'Whether I have a strong case',
  'Prior negative experience with lawyers',
  'Other',
];

export default function Step5Expectations({ data, onChange, errors }) {
  const handle = (field) => (e) => onChange({ ...data, [field]: e.target.value });
  const handleBool = (field, value) => onChange({ ...data, [field]: value });

  const toggleConcern = (concern) => {
    const current = data.concerns || [];
    const updated = current.includes(concern)
      ? current.filter((c) => c !== concern)
      : [...current, concern];
    onChange({ ...data, concerns: updated });
  };

  return (
    <div className="step-enter">
      <div className="mb-8">
        <h2
          className="text-3xl mb-2"
          style={{ fontFamily: "'Playfair Display', serif", color: '#e8e4dc' }}
        >
          Financial &amp; Expectations
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: '#6b7a8d' }}>
          Understanding your experience and expectations helps us structure our engagement in a way
          that works for you.
        </p>
      </div>

      <FormField label="Have you worked with a lawyer before?" required error={errors?.priorLawyer}>
        <div className="flex gap-3 mt-1">
          {['Yes', 'No'].map((opt) => (
            <div
              key={opt}
              className={`custom-radio flex-1 justify-center ${data.priorLawyer === opt ? 'selected' : ''}`}
              onClick={() => handleBool('priorLawyer', opt)}
            >
              <div
                className="w-4 h-4 rounded-full flex-shrink-0 transition-all"
                style={{
                  border: `2px solid ${data.priorLawyer === opt ? '#c9a84c' : '#3a4560'}`,
                  backgroundColor: data.priorLawyer === opt ? '#c9a84c' : 'transparent',
                }}
              />
              <span className="text-sm font-medium" style={{ color: '#e8e4dc' }}>
                {opt}
              </span>
            </div>
          ))}
        </div>
        {errors?.priorLawyer && (
          <p className="error-message mt-2">
            <span>⚠</span> {errors.priorLawyer}
          </p>
        )}
      </FormField>

      {data.priorLawyer === 'Yes' && (
        <FormField label="Briefly describe your experience" optional>
          <textarea
            className="form-input"
            style={{ minHeight: '80px' }}
            placeholder="What worked well, or what could have been better..."
            value={data.priorLawyerExperience || ''}
            onChange={handle('priorLawyerExperience')}
          />
        </FormField>
      )}

      <FormField label="How would you describe your budget for this matter?" required error={errors?.budget}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-1">
          {BUDGET_OPTIONS.map((opt) => (
            <div
              key={opt.value}
              className={`custom-radio justify-center text-center ${data.budget === opt.value ? 'selected' : ''}`}
              onClick={() => onChange({ ...data, budget: opt.value })}
            >
              <div
                className="w-4 h-4 rounded-full flex-shrink-0 transition-all"
                style={{
                  border: `2px solid ${data.budget === opt.value ? '#c9a84c' : '#3a4560'}`,
                  backgroundColor: data.budget === opt.value ? '#c9a84c' : 'transparent',
                }}
              />
              <span className="text-sm" style={{ color: '#c8d0da' }}>
                {opt.label}
              </span>
            </div>
          ))}
        </div>
        {errors?.budget && (
          <p className="error-message mt-2">
            <span>⚠</span> {errors.budget}
          </p>
        )}
      </FormField>

      <FormField label="What concerns you most about engaging a lawyer for this issue?" optional>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
          {CONCERN_OPTIONS.map((concern) => {
            const selected = (data.concerns || []).includes(concern);
            return (
              <div
                key={concern}
                className={`custom-checkbox ${selected ? 'selected' : ''}`}
                onClick={() => toggleConcern(concern)}
              >
                <div
                  className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center transition-all"
                  style={{
                    border: `2px solid ${selected ? '#c9a84c' : '#3a4560'}`,
                    backgroundColor: selected ? '#c9a84c' : 'transparent',
                  }}
                >
                  {selected && (
                    <span style={{ color: '#0f1523', fontSize: '10px', fontWeight: 'bold' }}>
                      ✓
                    </span>
                  )}
                </div>
                <span className="text-sm" style={{ color: '#c8d0da' }}>
                  {concern}
                </span>
              </div>
            );
          })}
        </div>
      </FormField>

      <FormField
        label="Is there anything else we should know before our first call?"
        optional
        hint="Feel free to share any additional context, concerns, or questions you have at this stage."
      >
        <textarea
          className="form-input"
          style={{ minHeight: '100px' }}
          placeholder="Any additional information..."
          value={data.additionalInfo || ''}
          onChange={handle('additionalInfo')}
        />
      </FormField>
    </div>
  );
}
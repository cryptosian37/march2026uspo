'use client';

import FormField from '../FormField';
import { Upload } from 'lucide-react';

const DOC_TYPES = [
  'Written agreements / contracts',
  'Court documents or orders',
  'Correspondence (emails, letters)',
  'Financial records',
  'Photographs or evidence',
  'Medical or expert reports',
  'Identity documents',
  'Other supporting documents',
];

const STORAGE_OPTIONS = [
  'Local files on my device',
  'Cloud storage (Google Drive, Dropbox, etc.)',
  'Paper copies only',
  'Held by another party',
  'Other',
];

export default function Step4Documents({ data, onChange, errors }) {
  const handleBool = (field, value) => onChange({ ...data, [field]: value });

  const toggleDocType = (type) => {
    const current = data.docTypes || [];
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    onChange({ ...data, docTypes: updated });
  };

  const toggleStorage = (opt) => {
    const current = data.storageLocations || [];
    const updated = current.includes(opt)
      ? current.filter((o) => o !== opt)
      : [...current, opt];
    onChange({ ...data, storageLocations: updated });
  };

  return (
    <div className="step-enter">
      <div className="mb-8">
        <h2
          className="text-3xl mb-2"
          style={{ fontFamily: "'Playfair Display', serif", color: '#e8e4dc' }}
        >
          Documents &amp; Evidence
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: '#6b7a8d' }}>
          Understanding what documentation you hold helps us assess the strength of your position.
        </p>
      </div>

      <FormField label="Do you have written documents related to this matter?" required error={errors?.hasDocs}>
        <div className="flex gap-3 mt-1">
          {['Yes', 'No', 'Not sure'].map((opt) => (
            <div
              key={opt}
              className={`custom-radio flex-1 justify-center ${data.hasDocs === opt ? 'selected' : ''}`}
              onClick={() => handleBool('hasDocs', opt)}
            >
              <div
                className="w-4 h-4 rounded-full flex-shrink-0 transition-all"
                style={{
                  border: `2px solid ${data.hasDocs === opt ? '#c9a84c' : '#3a4560'}`,
                  backgroundColor: data.hasDocs === opt ? '#c9a84c' : 'transparent',
                }}
              />
              <span className="text-sm font-medium" style={{ color: '#e8e4dc' }}>
                {opt}
              </span>
            </div>
          ))}
        </div>
        {errors?.hasDocs && (
          <p className="error-message mt-2">
            <span>⚠</span> {errors.hasDocs}
          </p>
        )}
      </FormField>

      {(data.hasDocs === 'Yes' || data.hasDocs === 'Not sure') && (
        <>
          <FormField label="Which types of documents do you have?" optional>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              {DOC_TYPES.map((type) => {
                const selected = (data.docTypes || []).includes(type);
                return (
                  <div
                    key={type}
                    className={`custom-checkbox ${selected ? 'selected' : ''}`}
                    onClick={() => toggleDocType(type)}
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
                      {type}
                    </span>
                  </div>
                );
              })}
            </div>
          </FormField>

          <FormField label="Where are these documents stored?" optional>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              {STORAGE_OPTIONS.map((opt) => {
                const selected = (data.storageLocations || []).includes(opt);
                return (
                  <div
                    key={opt}
                    className={`custom-checkbox ${selected ? 'selected' : ''}`}
                    onClick={() => toggleStorage(opt)}
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
                      {opt}
                    </span>
                  </div>
                );
              })}
            </div>
          </FormField>
        </>
      )}

      <div
        className="mt-4 rounded-xl p-8 text-center"
        style={{
          border: '2px dashed #2a3550',
          backgroundColor: 'rgba(15,26,46,0.5)',
        }}
      >
        <Upload size={28} className="mx-auto mb-3" style={{ color: '#3a4560' }} />
        <p className="text-sm font-medium mb-1" style={{ color: '#6b7a8d' }}>
          Secure Document Upload
        </p>
        <p
          className="text-xs leading-relaxed max-w-xs mx-auto"
          style={{ color: '#3a4560' }}
        >
          You will be able to securely upload supporting documents once we confirm representation.
          This area will be activated after your initial consultation.
        </p>
        <div
          className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2"
          style={{
            backgroundColor: '#1a2035',
            border: '1px solid #2a3550',
            opacity: 0.6,
            cursor: 'not-allowed',
          }}
        >
          <Upload size={13} style={{ color: '#c9a84c' }} />
          <span className="text-xs tracking-wide" style={{ color: '#c9a84c' }}>
            Upload Documents (Available Post-Consultation)
          </span>
        </div>
      </div>
    </div>
  );
}
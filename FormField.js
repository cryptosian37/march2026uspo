'use client';

export default function FormField({ label, required, optional, error, children, hint }) {
  return (
    <div className="mb-5">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="required-mark">*</span>}
          {optional && <span className="optional-mark">(optional)</span>}
        </label>
      )}
      {hint && (
        <p className="text-xs mb-2 leading-relaxed" style={{ color: '#4a5568' }}>
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p className="error-message">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}
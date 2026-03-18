'use client';

import { useState } from 'react';

export default function SessionSetup({ onComplete }) {
  const [form, setForm] = useState({
    agentName: '',
    firmName: '',
    contactName: '',
    contactRole: '',
    contactPhone: '',
    sessionDate: new Date().toISOString().split('T')[0],
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.agentName.trim()) e.agentName = 'Your name is required';
    if (!form.firmName.trim()) e.firmName = 'Firm name is required';
    if (!form.contactName.trim()) e.contactName = 'Contact name is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onComplete(form);
  };

  const Field = ({ label, name, placeholder, required, type = 'text' }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
        {label} {required && <span style={{ color: '#2563eb' }}>*</span>}
      </label>
      <input
        type={type}
        className="form-input"
        placeholder={placeholder}
        value={form[name]}
        onChange={(e) => setForm(p => ({ ...p, [name]: e.target.value }))}
        style={errors[name] ? { borderColor: '#ef4444' } : {}}
      />
      {errors[name] && (
        <span style={{ fontSize: 12, color: '#ef4444' }}>{errors[name]}</span>
      )}
    </div>
  );

  return (
    <div className="app-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 600 }} className="animate-fade-in">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: 999,
            padding: '6px 16px',
            marginBottom: 20
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2563eb' }} />
            <span style={{ color: '#2563eb', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              New Session
            </span>
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 32,
            fontWeight: 700,
            color: '#0a0e1a',
            marginBottom: 10,
            letterSpacing: '-0.02em'
          }}>
            Session Setup
          </h1>
          <p style={{ color: '#64748b', fontSize: 15, lineHeight: 1.6 }}>
            Enter your details and the prospect's information before beginning the discovery call.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '36px 40px' }}>
          {/* Agent Section */}
          <div style={{ marginBottom: 28 }}>
            <div className="section-label" style={{ marginBottom: 16 }}>Your Details</div>
            <Field label="Your Name" name="agentName" placeholder="e.g. Sarah Johnson" required />
          </div>

          <div className="divider" />

          {/* Prospect Section */}
          <div>
            <div className="section-label" style={{ marginBottom: 16 }}>Prospect Details</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <Field label="Law Firm Name" name="firmName" placeholder="e.g. Morrison & Hayes LLP" required />
              </div>
              <Field label="Contact Name" name="contactName" placeholder="e.g. James Morrison" required />
              <Field label="Contact Role" name="contactRole" placeholder="e.g. Managing Partner" />
              <Field label="Phone Number" name="contactPhone" placeholder="+1 (555) 000-0000" type="tel" />
              <Field label="Session Date" name="sessionDate" type="date" />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'flex-end' }}>
          <button
            className="btn-primary"
            onClick={handleSubmit}
            style={{ padding: '14px 32px' }}
          >
            Start Discovery Session →
          </button>
        </div>
      </div>
    </div>
  );
}
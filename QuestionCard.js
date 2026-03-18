'use client';

import { useState, useEffect } from 'react';

export default function QuestionCard({ question, answer, onAnswer, onNext, onBack, isFirst, isLast, tierColor }) {
  const [selected, setSelected] = useState(answer || (question.type === 'multi' ? [] : ''));
  const [note, setNote] = useState('');

  useEffect(() => {
    setSelected(answer || (question.type === 'multi' ? [] : ''));
  }, [question.id]);

  const handleSelect = (value) => {
    if (question.type === 'multi') {
      const arr = Array.isArray(selected) ? selected : [];
      const next = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
      setSelected(next);
      onAnswer(next);
    } else {
      setSelected(value);
      onAnswer(value);
    }
  };

  const handleNext = () => {
    const score = question.options?.find(o => o.value === selected)?.score || 0;
    onNext(score);
  };

  const canProceed = question.type === 'multi'
    ? (Array.isArray(selected) && selected.length > 0) || question.optional
    : selected !== '' || question.optional;

  const tierColors = { 1: '#3b82f6', 2: '#8b5cf6', 3: '#0891b2' };
  const tc = tierColors[question.tier] || '#2563eb';

  return (
    <div className="glass-card" style={{ padding: '36px 40px' }}>
      {/* Question Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{
            background: `${tc}18`,
            color: tc,
            border: `1px solid ${tc}30`,
            padding: '4px 12px',
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}>
            Tier {question.tier}
          </span>
          {question.category && (
            <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>
              {question.category}
            </span>
          )}
        </div>
        <h2 style={{
          fontSize: 22,
          fontWeight: 700,
          color: '#0a0e1a',
          lineHeight: 1.4,
          marginBottom: question.helper ? 10 : 0,
          letterSpacing: '-0.01em'
        }}>
          {question.question}
        </h2>
        {question.helper && (
          <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>
            {question.helper}
          </p>
        )}
      </div>

      {/* Options */}
      {(question.type === 'single' || question.type === 'multi') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {question.options?.map((opt) => {
            const isSelected = question.type === 'multi'
              ? (Array.isArray(selected) && selected.includes(opt.value))
              : selected === opt.value;
            return (
              <div
                key={opt.value}
                className={`option-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelect(opt.value)}
                style={isSelected ? { borderColor: tc, background: `${tc}0a`, boxShadow: `0 0 0 3px ${tc}18` } : {}}
              >
                <div className="option-dot" style={isSelected ? { borderColor: tc, background: tc } : {}}>
                  {isSelected && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'white' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: isSelected ? '#0a0e1a' : '#374151' }}>
                    {opt.label}
                  </div>
                  {opt.desc && (
                    <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{opt.desc}</div>
                  )}
                </div>
                {opt.score !== undefined && (
                  <div style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: opt.score >= 8 ? '#059669' : opt.score >= 5 ? '#d97706' : '#dc2626',
                    background: opt.score >= 8 ? '#ecfdf5' : opt.score >= 5 ? '#fffbeb' : '#fef2f2',
                    padding: '3px 10px',
                    borderRadius: 999
                  }}>
                    {opt.score >= 8 ? '▲' : opt.score >= 5 ? '◆' : '▼'} {opt.score >= 8 ? 'Strong' : opt.score >= 5 ? 'Mid' : 'Low'}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Text Input */}
      {question.type === 'text' && (
        <div style={{ marginBottom: 24 }}>
          <textarea
            className="form-input"
            rows={4}
            placeholder={question.placeholder || 'Type your notes here...'}
            value={selected}
            onChange={(e) => { setSelected(e.target.value); onAnswer(e.target.value); }}
            style={{ resize: 'vertical' }}
          />
        </div>
      )}

      {/* Agent Note */}
      {question.allowNote && (
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 6, display: 'block' }}>
            📝 Agent Note (optional)
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Add a note for this question..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{ fontSize: 13 }}
          />
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
        <button
          className="btn-secondary"
          onClick={onBack}
          disabled={isFirst}
          style={{ opacity: isFirst ? 0.4 : 1, padding: '11px 24px' }}
        >
          ← Back
        </button>
        <button
          className="btn-primary"
          onClick={handleNext}
          disabled={!canProceed}
          style={{
            opacity: !canProceed ? 0.5 : 1,
            cursor: !canProceed ? 'not-allowed' : 'pointer',
            background: canProceed ? `linear-gradient(135deg, ${tc}, ${tc}cc)` : undefined,
            boxShadow: canProceed ? `0 4px 14px ${tc}40` : 'none'
          }}
        >
          {isLast ? 'Complete Session ✓' : 'Next Question →'}
        </button>
      </div>
    </div>
  );
}
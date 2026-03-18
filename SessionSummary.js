'use client';

import { useState } from 'react';
import { questions } from '../data/questions';

export default function SessionSummary({ sessionData, answers, scores, onReset }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const totalScore = scores.reduce((a, b) => a + (b || 0), 0);
  const maxScore = questions.filter(q => q.type !== 'multi').length * 10;
  const pct = Math.round((totalScore / maxScore) * 100);

  let qualification, qualColor, qualBg, qualBorder, qualDesc;
  if (pct >= 75) {
    qualification = 'HOT LEAD';
    qualColor = '#059669';
    qualBg = '#ecfdf5';
    qualBorder = '#a7f3d0';
    qualDesc = 'Excellent fit. High budget, strong intent, and clear pain point. Prioritise this prospect.';
  } else if (pct >= 50) {
    qualification = 'WARM LEAD';
    qualColor = '#d97706';
    qualBg = '#fffbeb';
    qualBorder = '#fde68a';
    qualDesc = 'Good potential. Some friction but worth nurturing. Follow up within 48 hours.';
  } else {
    qualification = 'COLD LEAD';
    qualColor = '#dc2626';
    qualBg = '#fef2f2';
    qualBorder = '#fecaca';
    qualDesc = 'Low readiness for PPC right now. Consider a lower-cost entry offer or revisit in 60 days.';
  }

  const tierScores = [1, 2, 3].map(tier => {
    const tierQs = questions.filter(q => q.tier === tier && q.type !== 'multi');
    const tierMax = tierQs.length * 10;
    const tierTotal = tierQs.reduce((acc, q) => {
      const idx = questions.indexOf(q);
      return acc + (scores[idx] || 0);
    }, 0);
    return { tier, score: tierTotal, max: tierMax, pct: Math.round((tierTotal / tierMax) * 100) };
  });

  const tierInfo = {
    1: { label: 'Business Profile', color: '#3b82f6' },
    2: { label: 'Digital Readiness', color: '#8b5cf6' },
    3: { label: 'PPC Potential', color: '#0891b2' },
  };

  const keyInsights = [];
  if (answers.q2 === 'personal_injury' || answers.q2 === 'criminal' || answers.q2 === 'family') {
    keyInsights.push({ icon: '🎯', text: 'High-intent practice area — strong keyword demand on Google Ads', type: 'positive' });
  }
  if (answers.q6 === 'tried_failed') {
    keyInsights.push({ icon: '⚡', text: 'Previously tried and stopped ads — address past failures directly in your pitch', type: 'warning' });
  }
  if (answers.q9 === '7to15k' || answers.q9 === 'above15k') {
    keyInsights.push({ icon: '💰', text: 'Budget is strong — capable of competing in premium keyword auctions', type: 'positive' });
  }
  if (answers.q5 === 'outdated' || answers.q5 === 'none') {
    keyInsights.push({ icon: '🌐', text: 'Weak website — bundle landing page service or insist on pre-launch improvements', type: 'warning' });
  }
  if (answers.q8 === 'none' || answers.q8 === 'basic') {
    keyInsights.push({ icon: '📊', text: 'No/limited tracking — ROI will be hard to prove without call tracking setup', type: 'warning' });
  }
  if (answers.q10 === 'asap' || answers.q10 === '30days') {
    keyInsights.push({ icon: '🚀', text: 'High urgency — send proposal within 24 hours', type: 'positive' });
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionData, answers, scores, totalScore, pct, qualification }),
      });
      setSaved(true);
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  return (
    <div className="app-bg" style={{ minHeight: '100vh', padding: '32px 24px 64px' }}>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 780, margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 32,
          flexWrap: 'wrap',
          gap: 16
        }}>
          <div>
            <div className="section-label" style={{ marginBottom: 6 }}>Session Complete</div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 28,
              fontWeight: 700,
              color: '#0a0e1a',
              letterSpacing: '-0.02em'
            }}>
              Discovery Report
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className="btn-secondary"
              onClick={onReset}
              style={{ padding: '10px 20px', fontSize: 13 }}
            >
              + New Session
            </button>
            <button
              className="btn-primary"
              onClick={handleSave}
              disabled={saving || saved}
              style={{ padding: '10px 20px', fontSize: 13, opacity: saved ? 0.7 : 1 }}
            >
              {saved ? '✓ Saved' : saving ? 'Saving...' : '💾 Save Report'}
            </button>
          </div>
        </div>

        {/* Score Card */}
        <div className="glass-card" style={{ padding: '32px 36px', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Score Ring */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: 130,
                height: 130,
                borderRadius: '50%',
                background: `conic-gradient(${qualColor} ${pct}%, #e2e8f0 0%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 12,
                  background: '#fff',
                  borderRadius: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: 26, fontWeight: 800, color: qualColor, lineHeight: 1 }}>{pct}%</span>
                  <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, marginTop: 2 }}>SCORE</span>
                </div>
              </div>
            </div>

            {/* Qualification */}
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{
                display: 'inline-block',
                background: qualBg,
                color: qualColor,
                border: `1.5px solid ${qualBorder}`,
                padding: '6px 16px',
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: '0.1em',
                marginBottom: 12
              }}>
                {qualification}
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#0a0e1a', marginBottom: 8 }}>
                {sessionData?.firmName}
              </div>
              <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>{qualDesc}</div>
            </div>

            {/* Meta */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 160 }}>
              {[
                { label: 'Contact', value: sessionData?.contactName },
                { label: 'Role', value: sessionData?.contactRole || '—' },
                { label: 'Consultant', value: sessionData?.agentName },
                { label: 'Date', value: sessionData?.sessionDate },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>{item.label}</span>
                  <span style={{ fontSize: 12, color: '#374151', fontWeight: 600 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tier Scores */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
          {tierScores.map(({ tier, score, max, pct: tp }) => {
            const t = tierInfo[tier];
            return (
              <div key={tier} className="glass-card" style={{ padding: '20px 22px' }}>
                <div style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: t.color,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: 4
                }}>Tier {tier}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 14 }}>{t.label}</div>
                <div className="progress-bar-track" style={{ marginBottom: 8 }}>
                  <div style={{
                    height: '100%',
                    width: `${tp}%`,
                    background: t.color,
                    borderRadius: 999,
                    transition: 'width 0.6s ease'
                  }} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0a0e1a' }}>
                  {score}/{max} <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>({tp}%)</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Insights */}
        {keyInsights.length > 0 && (
          <div className="glass-card" style={{ padding: '28px 32px', marginBottom: 20 }}>
            <div className="section-label" style={{ marginBottom: 18 }}>Key Insights</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {keyInsights.map((insight, i) => (
                <div key={i} style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  padding: '12px 16px',
                  borderRadius: 10,
                  background: insight.type === 'positive' ? '#f0fdf4' : '#fffbeb',
                  border: `1px solid ${insight.type === 'positive' ? '#bbf7d0' : '#fde68a'}`
                }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{insight.icon}</span>
                  <span style={{ fontSize: 14, color: '#374151', lineHeight: 1.5, fontWeight: 500 }}>{insight.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Answer Review */}
        <div className="glass-card" style={{ padding: '28px 32px', marginBottom: 20 }}>
          <div className="section-label" style={{ marginBottom: 18 }}>Answer Review</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {questions.map((q, i) => {
              const ans = answers[q.id];
              const displayAns = Array.isArray(ans) ? ans.join(', ') : ans || '—';
              const optLabel = q.options?.find(o => o.value === ans)?.label || displayAns;
              return (
                <div key={q.id} style={{
                  display: 'flex',
                  gap: 16,
                  padding: '14px 0',
                  borderBottom: i < questions.length - 1 ? '1px solid #f1f5f9' : 'none',
                  alignItems: 'flex-start'
                }}>
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: tierInfo[q.tier].color + '15',
                    color: tierInfo[q.tier].color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 800,
                    flexShrink: 0
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: '#64748b', marginBottom: 3 }}>{q.question}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#0a0e1a' }}>{optLabel}</div>
                  </div>
                  {scores[i] !== undefined && q.type !== 'multi' && (
                    <div style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: scores[i] >= 8 ? '#059669' : scores[i] >= 5 ? '#d97706' : '#dc2626',
                      flexShrink: 0
                    }}>
                      {scores[i]}/10
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Steps */}
        <div className="glass-card" style={{ padding: '28px 32px' }}>
          <div className="section-label" style={{ marginBottom: 18 }}>Recommended Next Steps</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(pct >= 75
              ? [
                { step: '1', text: 'Send a tailored proposal within 24 hours', color: '#2563eb' },
                { step: '2', text: 'Prepare a competitive landscape analysis for their market', color: '#2563eb' },
                { step: '3', text: 'Book a 30-minute strategy call to walk through projected ROI', color: '#2563eb' },
              ]
              : pct >= 50
              ? [
                { step: '1', text: 'Follow up within 48 hours with a case study in their practice area', color: '#d97706' },
                { step: '2', text: 'Address any objections identified in the session notes', color: '#d97706' },
                { step: '3', text: 'Offer a free website/ad audit to demonstrate value', color: '#d97706' },
              ]
              : [
                { step: '1', text: 'Send educational content on PPC for law firms', color: '#dc2626' },
                { step: '2', text: 'Schedule a follow-up in 60 days', color: '#dc2626' },
                { step: '3', text: 'Consider proposing a smaller pilot engagement first', color: '#dc2626' },
              ]
            ).map(item => (
              <div key={item.step} style={{
                display: 'flex',
                gap: 14,
                alignItems: 'center',
                padding: '14px 16px',
                borderRadius: 10,
                border: '1.5px solid #e2e8f0',
                background: '#fafbff'
              }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: `${item.color}15`,
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: 14,
                  flexShrink: 0
                }}>{item.step}</div>
                <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
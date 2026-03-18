'use client';

import { useState } from 'react';
import { questions } from '../data/questions';
import QuestionCard from './QuestionCard';

export default function DiscoveryQuestionnaire({ sessionData, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState([]);

  const current = questions[currentIndex];
  const progress = Math.round(((currentIndex) / questions.length) * 100);

  const handleAnswer = (questionId, answer, score) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = (score) => {
    const newScores = [...scores];
    newScores[currentIndex] = score || 0;
    setScores(newScores);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      onComplete(answers, newScores);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex(i => i - 1);
  };

  const tierInfo = {
    1: { label: 'Business Profile', color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe' },
    2: { label: 'Digital Readiness', color: '#8b5cf6', bg: '#f5f3ff', border: '#ddd6fe' },
    3: { label: 'PPC Potential', color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc' },
  };

  const currentTier = tierInfo[current.tier];

  return (
    <div className="app-bg" style={{ minHeight: '100vh', padding: '24px' }}>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>

        {/* Top Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 32,
          padding: '16px 20px',
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 12,
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
        }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0a0e1a' }}>{sessionData?.firmName}</div>
            <div style={{ fontSize: 12, color: '#64748b' }}>{sessionData?.contactName} · {sessionData?.agentName}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#2563eb' }}>{progress}% Complete</div>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>Q{currentIndex + 1} of {questions.length}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: 12 }}>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Tier Indicators */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
          {[1, 2, 3].map(tier => {
            const t = tierInfo[tier];
            const isActive = current.tier === tier;
            const isDone = questions.filter(q => q.tier === tier).every(q => {
              const qIdx = questions.indexOf(q);
              return qIdx < currentIndex;
            });
            return (
              <div key={tier} style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: 10,
                background: isActive ? t.bg : isDone ? '#f8fafc' : '#f8fafc',
                border: `1.5px solid ${isActive ? t.border : '#e2e8f0'}`,
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: isActive ? t.color : isDone ? '#94a3b8' : '#94a3b8',
                  marginBottom: 2
                }}>Tier {tier}</div>
                <div style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: isActive ? t.color : '#94a3b8'
                }}>{t.label}</div>
              </div>
            );
          })}
        </div>

        {/* Question */}
        <div className="animate-fade-in" key={currentIndex}>
          <QuestionCard
            question={current}
            answer={answers[current.id]}
            onAnswer={(ans) => handleAnswer(current.id, ans)}
            onNext={handleNext}
            onBack={handleBack}
            isFirst={currentIndex === 0}
            isLast={currentIndex === questions.length - 1}
            tierColor={currentTier.color}
          />
        </div>
      </div>
    </div>
  );
}
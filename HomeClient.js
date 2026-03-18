'use client';

import { useState } from 'react';
import LandingPage from './LandingPage';
import SessionSetup from './SessionSetup';
import DiscoveryQuestionnaire from './DiscoveryQuestionnaire';
import SessionSummary from './SessionSummary';

export default function HomeClient() {
  const [phase, setPhase] = useState('landing');
  const [sessionData, setSessionData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState([]);

  const handleStart = () => setPhase('setup');

  const handleSessionSetup = (data) => {
    setSessionData(data);
    setPhase('questionnaire');
  };

  const handleComplete = (finalAnswers, finalScores) => {
    setAnswers(finalAnswers);
    setScores(finalScores);
    setPhase('summary');
  };

  const handleReset = () => {
    setPhase('landing');
    setSessionData(null);
    setAnswers({});
    setScores([]);
  };

  return (
    <>
      {phase === 'landing' && <LandingPage onStart={handleStart} />}
      {phase === 'setup' && <SessionSetup onComplete={handleSessionSetup} />}
      {phase === 'questionnaire' && (
        <DiscoveryQuestionnaire
          sessionData={sessionData}
          onComplete={handleComplete}
        />
      )}
      {phase === 'summary' && (
        <SessionSummary
          sessionData={sessionData}
          answers={answers}
          scores={scores}
          onReset={handleReset}
        />
      )}
    </>
  );
}
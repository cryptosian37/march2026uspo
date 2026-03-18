'use client';

const STEPS = ['About You', 'Matter Type', 'Background', 'Documents', 'Expectations', 'Consent'];

export default function ProgressBar({ currentStep, totalSteps }) {
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-xs tracking-widest uppercase font-medium"
          style={{ color: '#6b7a8d' }}
        >
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-xs font-semibold tracking-wide" style={{ color: '#c9a84c' }}>
          {progress}% Complete
        </span>
      </div>

      <div
        className="w-full rounded-full overflow-hidden mb-5"
        style={{ height: '4px', backgroundColor: '#1e2c45' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(to right, #c9a84c, #d4b560)',
          }}
        />
      </div>

      <div className="hidden md:flex items-center justify-between">
        {STEPS.map((label, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          return (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                style={{
                  backgroundColor: isCompleted ? '#c9a84c' : 'transparent',
                  border: `2px solid ${isCompleted ? '#c9a84c' : isCurrent ? '#c9a84c' : '#2a3550'}`,
                  color: isCompleted ? '#0f1523' : isCurrent ? '#c9a84c' : '#3a4560',
                }}
              >
                {isCompleted ? '✓' : stepNum}
              </div>
              <span
                className="text-xs tracking-wide"
                style={{
                  color: isCurrent ? '#c9a84c' : isCompleted ? '#6b7a8d' : '#3a4560',
                }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
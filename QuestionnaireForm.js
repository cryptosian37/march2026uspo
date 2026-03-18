'use client';

import { useState } from 'react';
import ProgressBar from './ProgressBar';
import Step1AboutYou from './steps/Step1AboutYou';
import Step2MatterType from './steps/Step2MatterType';
import Step3Background from './steps/Step3Background';
import Step4Documents from './steps/Step4Documents';
import Step5Expectations from './steps/Step5Expectations';
import Step6Consent from './steps/Step6Consent';
import { Lock, ChevronLeft, ChevronRight, Send } from 'lucide-react';

const TOTAL_STEPS = 6;

function validateStep(step, data) {
  const errors = {};
  if (step === 1) {
    if (!data.fullName?.trim()) errors.fullName = 'Full legal name is required.';
    if (!data.email?.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!data.phone?.trim()) errors.phone = 'Mobile phone number is required.';
    if (!data.contactTime) errors.contactTime = 'Please select a preferred contact time.';
    if (!data.contactMethod) errors.contactMethod = 'Please select a preferred contact method.';
  }
  if (step === 2) {
    if (!data.matterType) errors.matterType = 'Please select a matter type.';
    if (!data.matterDescription?.trim())
      errors.matterDescription = 'Please briefly describe your legal matter.';
    if (!data.urgency) errors.urgency = 'Please indicate the urgency of your matter.';
  }
  if (step === 3) {
    if (!data.priorAttorney) errors.priorAttorney = 'Please select an option.';
    if (!data.hasDeadlines) errors.hasDeadlines = 'Please select an option.';
  }
  if (step === 4) {
    if (!data.hasDocs) errors.hasDocs = 'Please select an option.';
  }
  if (step === 5) {
    if (!data.priorLawyer) errors.priorLawyer = 'Please select an option.';
    if (!data.budget) errors.budget = 'Please indicate your budget range.';
  }
  if (step === 6) {
    if (!data.consentNoRelationship) errors.consentNoRelationship = true;
    if (!data.consentAccuracy) errors.consentAccuracy = true;
  }
  return errors;
}

export default function QuestionnaireForm({ onSuccess }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setErrors({});
    setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS));
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((s) => Math.max(s - 1, 1));
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    const stepErrors = validateStep(6, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        onSuccess(formData);
      } else {
        alert('There was an issue submitting your questionnaire. Please try again.');
      }
    } catch {
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepProps = { data: formData, onChange: setFormData, errors };

  return (
    <div className="min-h-screen py-10 px-4" style={{ backgroundColor: '#0f1523' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div
              className="w-7 h-7 rounded flex items-center justify-center"
              style={{ border: '1px solid #c9a84c' }}
            >
              <div
                className="w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: '#c9a84c' }}
              />
            </div>
            <span
              className="text-base tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif", color: '#e8e4dc' }}
            >
              Your Law Firm
            </span>
          </div>
          <div
            className="flex items-center justify-center gap-2 text-xs tracking-widest uppercase"
            style={{ color: '#4a5568' }}
          >
            <Lock size={11} />
            <span>Strictly Confidential — Encrypted &amp; Secure</span>
          </div>
        </div>

        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        {Object.keys(errors).length > 0 && (
          <div
            className="mb-6 p-4 rounded-lg"
            style={{
              backgroundColor: 'rgba(127,29,29,0.25)',
              border: '1px solid rgba(127,29,29,0.5)',
            }}
          >
            <p className="text-sm font-medium" style={{ color: '#f87171' }}>
              ⚠ Please correct the highlighted fields before continuing.
            </p>
          </div>
        )}

        <input
          type="text"
          name="_gotcha"
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
          readOnly
        />

        <div className="form-card">
          {currentStep === 1 && <Step1AboutYou {...stepProps} />}
          {currentStep === 2 && <Step2MatterType {...stepProps} />}
          {currentStep === 3 && <Step3Background {...stepProps} />}
          {currentStep === 4 && <Step4Documents {...stepProps} />}
          {currentStep === 5 && <Step5Expectations {...stepProps} />}
          {currentStep === 6 && <Step6Consent {...stepProps} />}

          <div
            className="flex items-center justify-between mt-10 pt-6"
            style={{ borderTop: '1px solid #1e2c45' }}
          >
            {currentStep > 1 ? (
              <button
                onClick={handleBack}
                className="btn-secondary flex items-center gap-2"
              >
                <ChevronLeft size={16} />
                Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < TOTAL_STEPS ? (
              <button
                onClick={handleNext}
                className="btn-primary flex items-center gap-2"
              >
                Next
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-primary flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full animate-spin"
                      style={{
                        border: '2px solid #0f1523',
                        borderTopColor: 'transparent',
                      }}
                    />
                    Submitting...
                  </span>
                ) : (
                  <>
                    <Send size={15} />
                    Submit Securely
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <p
          className="text-center text-xs mt-6 leading-relaxed"
          style={{ color: '#3a4560' }}
        >
          Your information is protected by attorney-client privilege and handled with the utmost
          confidentiality.
        </p>
      </div>
    </div>
  );
}
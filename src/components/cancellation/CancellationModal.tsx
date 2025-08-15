'use client';

import { useState } from 'react';
import { CancellationStep1 } from './steps/CancellationStep1';
import { CongratulationsStep } from './steps/CongratulationsStep';
import { FeedbackStep } from './steps/FeedbackStep';
import { VisaSupportStep } from './steps/VisaSupportStep';
import { ReasonStep } from './steps/ReasonStep';
import { CompletedStep } from './steps/CompletedStep';
import { OfferStep } from './steps/OfferStep';
import { OfferAcceptedStep } from './steps/OfferAcceptedStep';
import { JobSuggestionsStep } from './steps/JobSuggestionsStep';

export interface CancellationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CancellationModal({ isOpen, onClose }: CancellationModalProps) {
  const [currentStep, setCurrentStep] = useState<'initial' | 'offer' | 'offerAccepted' | 'jobSuggestions' | 'congratulations' | 'feedback' | 'reason' | 'visa' | 'completed'>('initial');
  const [foundWithMigrateMate, setFoundWithMigrateMate] = useState<null | 'yes' | 'no'>(null);
  const [completedVariant, setCompletedVariant] = useState<'yes' | 'no'>('no');

  const handleJobFound = () => {
    setCurrentStep('congratulations');
  };

  const handleBack = () => {
    // Go back one step
    setCurrentStep((prev) => {
      if (prev === 'jobSuggestions') return 'offerAccepted';
      if (prev === 'offerAccepted') return 'offer';
      if (prev === 'completed') return 'reason';
      if (prev === 'reason') return 'feedback';
      if (prev === 'visa') return 'feedback';
      // If feedback was reached after declining offer, foundWithMigrateMate will be null -> go back to offer
      if (prev === 'feedback') return foundWithMigrateMate === null ? 'offer' : 'congratulations';
      return 'initial';
    });
  };

  const handleClose = () => {
    setCurrentStep('initial');
    setFoundWithMigrateMate(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" onClick={handleClose} />
        
        <div className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 transform transition-all">
          {currentStep === 'initial' && (
            <CancellationStep1
              onClose={handleClose}
              onJobFound={handleJobFound}
              onStillLooking={() => setCurrentStep('offer')}
            />
          )}

          {currentStep === 'offer' && (
            <OfferStep
              onBack={() => setCurrentStep('initial')}
              onClose={handleClose}
              onAccept={() => setCurrentStep('offerAccepted')}
              onDecline={() => setCurrentStep('feedback')}
            />
          )}

          {currentStep === 'offerAccepted' && (
            <OfferAcceptedStep onBack={() => setCurrentStep('offer')} onClose={handleClose} onContinue={() => setCurrentStep('jobSuggestions')} />
          )}

          {currentStep === 'jobSuggestions' && (
            <JobSuggestionsStep onBack={() => setCurrentStep('offerAccepted')} onClose={handleClose} />
          )}
          
          {currentStep === 'congratulations' && (
            <CongratulationsStep
              onBack={handleBack}
              onClose={handleClose}
              onContinue={(answer) => {
                setFoundWithMigrateMate(answer);
                setCurrentStep('feedback');
              }}
            />
          )}

          {currentStep === 'feedback' && (
            <FeedbackStep
              onBack={handleBack}
              onClose={handleClose}
              onContinue={() => {
                // After feedback, ask for main reason (Step 3), then proceed to visa.
                setCurrentStep('reason');
              }}
            />
          )}

          {currentStep === 'reason' && (
            <ReasonStep
              onBack={handleBack}
              onClose={handleClose}
              onContinue={() => setCurrentStep('completed')}
            />
          )}

          {currentStep === 'visa' && (
            <VisaSupportStep
              foundWithMigrateMate={foundWithMigrateMate}
              onBack={handleBack}
              onClose={handleClose}
              onCompleted={(variant) => {
                setCompletedVariant(variant);
                setCurrentStep('completed');
              }}
            />
          )}

          {currentStep === 'completed' && (
            <CompletedStep variant={completedVariant} onBack={handleBack} onClose={handleClose} />
          )}
        </div>
      </div>
    </div>
  );
}


'use client';

import { useState } from 'react';
import { CancellationStep1 } from './steps/CancellationStep1';
import { CongratulationsStep } from './steps/CongratulationsStep';

export interface CancellationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CancellationModal({ isOpen, onClose }: CancellationModalProps) {
  const [currentStep, setCurrentStep] = useState<'initial' | 'congratulations'>('initial');

  const handleJobFound = () => {
    setCurrentStep('congratulations');
  };

  const handleBack = () => {
    setCurrentStep('initial');
  };

  const handleClose = () => {
    setCurrentStep('initial');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" onClick={handleClose} />
        
        <div className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 transform transition-all">
          {currentStep === 'initial' && (
            <CancellationStep1 onClose={handleClose} onJobFound={handleJobFound} />
          )}
          
          {currentStep === 'congratulations' && (
            <CongratulationsStep onBack={handleBack} onClose={handleClose} />
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

interface FeedbackStepProps {
  onBack: () => void;
  onClose: () => void;
  onContinue: () => void;
}

export function FeedbackStep({ onBack, onClose, onContinue }: FeedbackStepProps) {
  // Three multiple-choice responses
  const roleAppliedOptions = ['0', '1 - 5', '6 - 20', '20+'];
  const emailedOptions = ['0', '1-5', '6-20', '20+'];
  const interviewedOptions = ['0', '1-2', '3-5', '5+'];

  const [applied, setApplied] = useState<string | null>(null);
  const [emailed, setEmailed] = useState<string | null>(null);
  const [interviewed, setInterviewed] = useState<string | null>(null);

  const canContinue = Boolean(applied && emailed && interviewed);
  const [showError, setShowError] = useState(false);

  const handleContinue = () => {
    if (!canContinue) {
      setShowError(true);
      return;
    }
    onContinue();
  };

  // Clear error once all answers are filled
  useEffect(() => {
    if (canContinue && showError) setShowError(false);
  }, [canContinue, showError]);

  return (
    <div className="relative">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        {/* Mobile Header */}
        <div className="md:hidden">
          {/* Top row: title + close */}
          <div className="flex items-center justify-between">
            <span className="text-base font-medium text-gray-900">Subscription Cancellation</span>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Progress row */}
          <div className="flex items-center space-x-2 mt-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <span className="text-sm text-gray-500 ml-2">Step 2 of 3</span>
          </div>
          {/* Back */}
          <button onClick={onBack} className="mt-2 flex items-center text-gray-600 hover:text-gray-800 transition-colors">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between">
          <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-900">Subscription Cancellation</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-500">Step 2 of 3</span>
          </div>

          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      {/* Mobile top image */}
      <div className="md:hidden px-4 pt-4">
        <img
          src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          alt="New York City skyline"
          className="w-full h-40 object-cover rounded-lg"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6 px-4 md:px-6 py-4 md:py-6">
        {/* Right image on desktop */}
        <div className="hidden md:block md:order-2">
          <img
            src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="New York City skyline"
            className="w-full h-full object-cover rounded-r-xl"
          />
        </div>

        {/* Left questions */
        }
        <div className="flex flex-col md:order-1">
          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-snug break-words">What’s the main reason for cancelling?</h3>

          {showError && !canContinue && (
            <div className="mt-2 text-sm text-red-600">
              <p>Mind letting us know why you’re cancelling?</p>
              <p className="mt-0.5">It helps us understand your experience and improve the platform.<span className="align-super">*</span></p>
            </div>
          )}

          <div className="mt-4 space-y-5">
            {/* Q1 */}
            <div>
              <p className="text-sm text-gray-700 mb-2">How many roles did you apply for through Migrate Mate?</p>
              <div className="grid grid-cols-4 gap-2">
                {roleAppliedOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setApplied(opt)}
                    aria-pressed={applied === opt}
                    className={`h-10 rounded-md text-sm font-medium border ${applied === opt ? 'bg-purple-500 text-white border-purple-500' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Q2 */}
            <div>
              <p className="text-sm text-gray-700 mb-2">How many companies did you email directly?</p>
              <div className="grid grid-cols-4 gap-2">
                {emailedOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setEmailed(opt)}
                    aria-pressed={emailed === opt}
                    className={`h-10 rounded-md text-sm font-medium border ${emailed === opt ? 'bg-purple-500 text-white border-purple-500' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Q3 */}
            <div>
              <p className="text-sm text-gray-700 mb-2">How many different companies did you interview with?</p>
              <div className="grid grid-cols-4 gap-2">
                {interviewedOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setInterviewed(opt)}
                    aria-pressed={interviewed === opt}
                    className={`h-10 rounded-md text-sm font-medium border ${interviewed === opt ? 'bg-purple-500 text-white border-purple-500' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop CTAs inline */}
          <div className="hidden md:block mt-5">
            {/* Green 50% off CTA */}
            <button
              onClick={onBack}
              className="w-full h-11 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              Get 50% off | $12.50 <span className="opacity-75 line-through ml-1">$25</span>
            </button>
            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className={`mt-3 w-full h-11 rounded-lg font-semibold ${canContinue ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-100'}`}
            >
              Complete cancellation
            </button>
          </div>
        </div>
      </div>

      {/* Sticky mobile footer CTAs */}
      <div className="md:hidden sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 pt-3 pb-4">
        <button
          onClick={onBack}
          className="w-full h-11 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
        >
          Get 50% off | $12.50 <span className="opacity-75 line-through ml-1">$25</span>
        </button>
        <button
          onClick={handleContinue}
          className={`mt-3 w-full h-11 rounded-lg font-semibold ${canContinue ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-100 text-gray-500'}`}
        >
          Complete cancellation
        </button>
      </div>
    </div>
  );
}


'use client';

import { useState } from 'react';

interface FeedbackStepProps {
  onBack: () => void;
  onClose: () => void;
  onContinue: () => void;
}

export function FeedbackStep({ onBack, onClose, onContinue }: FeedbackStepProps) {
  const [feedback, setFeedback] = useState<string>('');

  const minChars = 25;
  const canContinue = feedback.trim().length >= minChars;

  const handleContinue = () => {
    if (!canContinue) return;
    console.log('Feedback submitted:', feedback.trim());
    // Defer navigation decision to parent
    onContinue();
  };

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
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
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
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
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
      <div className="flex flex-col md:flex-row">
        {/* Right image on desktop */}
        <div className="hidden md:block md:w-80 md:h-96 md:flex-shrink-0 md:order-2">
          <img
            src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="New York City skyline"
            className="w-full h-full object-cover rounded-r-xl"
          />
        </div>

        {/* Left form on desktop */}
        <div className="flex-1 p-4 md:p-6 md:order-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            What's one thing you wish we could've helped you with?
          </h3>
          <div className="border-t border-gray-200 mb-3" />
          <p className="text-sm text-gray-600 mb-4">
            We're always looking to improve, your thoughts can help us make Migrate Mate more useful for others.*
          </p>

          <div className="relative">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts..."
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <div className="text-xs text-gray-500 mt-2 text-right">Min 25 characters ({feedback.trim().length}/{minChars})</div>
          </div>

          {/* Continue Button */}
          <div className="mt-8">
            <button
              onClick={handleContinue}
              disabled={!canContinue}
              className={`w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                canContinue
                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


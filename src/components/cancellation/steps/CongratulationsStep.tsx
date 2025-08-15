'use client';

import { useState } from 'react';

interface CongratulationsStepProps {
  onBack: () => void;
  onClose: () => void;
  onContinue: (foundWithMigrateMate: 'yes' | 'no') => void;
}

export function CongratulationsStep({ onBack, onClose, onContinue }: CongratulationsStepProps) {
  const [foundWithMigrateMate, setFoundWithMigrateMate] = useState<string>('');
  const [rolesApplied, setRolesApplied] = useState<string>('');
  const [companiesEmailed, setCompaniesEmailed] = useState<string>('');
  const [companiesInterviewed, setCompaniesInterviewed] = useState<string>('');

  const handleContinue = () => {
    // Handle form submission
    console.log('Form data:', {
      foundWithMigrateMate,
      rolesApplied,
      companiesEmailed,
      companiesInterviewed
    });
    // Move to next step (feedback) and bubble up whether job was found with MigrateMate
    onContinue(foundWithMigrateMate as 'yes' | 'no');
  };

  const canContinue = foundWithMigrateMate && rolesApplied && companiesEmailed && companiesInterviewed;

  return (
    <div className="relative">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        {/* Mobile Header */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-medium text-gray-900">Subscription Cancellation</span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span className="text-sm text-gray-500 ml-2">Step 1 of 3</span>
          </div>
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-900">Subscription Cancellation</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-500">Step 1 of 3</span>
          </div>
          
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content - Responsive Layout */}
      <div className="flex flex-col md:flex-row">
        {/* Image - Hidden on mobile, Right on desktop */}
        <div className="hidden md:block md:w-80 md:h-96 md:flex-shrink-0 md:order-2">
          <img 
            src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="New York City skyline"
            className="w-full h-full object-cover rounded-r-xl"
          />
        </div>

        {/* Form content - Full width on mobile, Left on desktop */}
        <div className="flex-1 p-4 md:p-6 md:order-1">
          <div className="flex items-center mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mr-2">
              Congrats on the new role!
            </h3>
            <span className="text-2xl">🎉</span>
          </div>
          
          {/* Form Questions */}
          <div className="space-y-6">
            {/* Question 1 */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">
                Did you find this job with MigrateMate?*
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setFoundWithMigrateMate('yes')}
                  className={`px-6 py-2 text-sm font-medium rounded-lg border transition-colors ${
                    foundWithMigrateMate === 'yes'
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setFoundWithMigrateMate('no')}
                  className={`px-6 py-2 text-sm font-medium rounded-lg border transition-colors ${
                    foundWithMigrateMate === 'no'
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Question 2 */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">
                How many roles did you apply for through Migrate Mate?*
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {['0', '1-5', '6-20', '20+'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setRolesApplied(option)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                      rolesApplied === option
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3 */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">
                How many companies did you email directly?*
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {['0', '1-5', '6-20', '20+'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setCompaniesEmailed(option)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                      companiesEmailed === option
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 4 */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">
                How many different companies did you <span className="underline">interview</span> with?*
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {['0', '1-2', '3-5', '5+'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setCompaniesInterviewed(option)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                      companiesInterviewed === option
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
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


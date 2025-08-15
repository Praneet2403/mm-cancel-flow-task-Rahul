'use client';

import { useState } from 'react';

interface VisaSupportStepProps {
  onBack: () => void;
  onClose: () => void;
  foundWithMigrateMate: 'yes' | 'no' | null;
}

export function VisaSupportStep({ onBack, onClose, foundWithMigrateMate }: VisaSupportStepProps) {
  const [hasLawyer, setHasLawyer] = useState<'' | 'yes' | 'no'>('');
  const [visaType, setVisaType] = useState<string>('');
  // Require visa type when:
  //  - user selects No lawyer, OR
  //  - user selects Yes lawyer but earlier answered they did not find via MigrateMate
  const needsVisaType = hasLawyer === 'no' || (hasLawyer === 'yes' && foundWithMigrateMate === 'no');
  const canComplete = hasLawyer === '' ? false : needsVisaType ? visaType.trim().length > 0 : true;

  const handleComplete = () => {
    if (!canComplete) return;
    console.log('Visa support selection:', { hasLawyer, visaType: visaType.trim() });
    // For now, close the modal. Hook this to a cancellation handler if needed.
    onClose();
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
          {/* Progress row (mobile visual per mock: two green, one gray) */}
          <div className="flex items-center space-x-2 mt-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <span className="text-sm text-gray-500 ml-2">Step 3 of 3</span>
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
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-500">Step 3 of 3</span>
          </div>

          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content - Responsive Layout */}
      <div className="flex flex-col md:flex-row">
        {/* Right image on desktop */}
        <div className="hidden md:block md:w-80 md:h-96 md:flex-shrink-0 md:order-2">
          <img
            src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="New York City skyline"
            className="w-full h-full object-cover rounded-r-xl"
          />
        </div>

        {/* Left content */}
        <div className="flex-1 p-4 md:p-6 md:order-1">
          <div className="mb-4">
            {foundWithMigrateMate === 'yes' ? (
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
                We helped you land the job, now
                <br className="hidden md:block" /> let's help you secure your visa.
              </h3>
            ) : (
              <>
                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
                  You landed the job!
                </h3>
                <h4 className="text-2xl md:text-3xl font-extrabold italic text-gray-900 leading-tight">
                  That's what we live for.
                </h4>
                <p className="text-sm text-gray-700 mt-2">
                  Even if it wasn't through MigrateMate, let us help get your <span className="underline">visa</span> sorted.
                </p>
              </>
            )}
          </div>
          <div className="border-t border-gray-200 mb-4" />

          <p className="text-sm font-medium text-gray-700 mb-3">
            Is your company providing an immigration lawyer to help with your visa?*
          </p>

          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="hasLawyer"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                checked={hasLawyer === 'yes'}
                onChange={() => setHasLawyer('yes')}
              />
              <span className="text-sm text-gray-800">Yes</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="hasLawyer"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                checked={hasLawyer === 'no'}
                onChange={() => setHasLawyer('no')}
              />
              <span className="text-sm text-gray-800">No</span>
            </label>
          </div>

          {needsVisaType && (
            <div className="mt-4">
              <p className="text-sm text-gray-700 mb-2">
                {hasLawyer === 'no'
                  ? 'We can connect you with one of our trusted partners. What visa will you be applying for?*'
                  : 'What visa will you be applying for?*'}
              </p>
              <input
                value={visaType}
                onChange={(e) => setVisaType(e.target.value)}
                placeholder="Enter visa type..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          )}

          <div className="mt-8">
            <button
              onClick={handleComplete}
              disabled={!canComplete}
              className={`w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                canComplete
                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Complete cancellation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

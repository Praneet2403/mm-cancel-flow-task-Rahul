'use client';

import { useEffect, useState } from 'react';

interface ReasonStepProps {
  onBack: () => void;
  onClose: () => void;
  onContinue: () => void;
}

export function ReasonStep({ onBack, onClose, onContinue }: ReasonStepProps) {
  const reasons = [
    'Too expensive',
    'Platform not helpful',
    'Not enough relevant jobs',
    'Decided not to move',
    'Other',
  ];

  const [selected, setSelected] = useState<string | null>(null);
  const [price, setPrice] = useState<string>('');
  const [improveText, setImproveText] = useState<string>('');
  const [showError, setShowError] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // hide other options when one is chosen

  const needsPrice = selected === 'Too expensive';
  const needsImproveText =
    selected === 'Platform not helpful' ||
    selected === 'Not enough relevant jobs' ||
    selected === 'Decided not to move' ||
    selected === 'Other';
  const hasValidPrice = needsPrice ? price.trim().length > 0 : true;
  const minImproveChars = 25;
  const hasValidImproveText = needsImproveText ? improveText.trim().length >= minImproveChars : true;
  const canContinue = Boolean(selected && hasValidPrice && hasValidImproveText);

  const handleContinue = () => {
    if (!canContinue) {
      setShowError(true);
      return;
    }
    onContinue();
  };

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
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
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

      {/* Content */}
      {/* Mobile top image */}
      <div className="md:hidden px-4 pt-4">
        <img
          src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          alt="New York City skyline"
          className="w-full h-40 object-cover rounded-xl"
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

        {/* Left content */}
        <div className="flex flex-col md:order-1">
          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-snug break-words">What’s the main reason for cancelling?</h3>
          <p className="mt-2 text-sm text-gray-600">Please take a minute to let us know why:</p>

          {showError && !canContinue && (
            <div className="mt-2 text-sm text-red-600">
              To help us understand your experience, please select the reason for cancelling
            </div>
          )}

          <div className="mt-4 space-y-3">
            {collapsed && selected ? (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-3 select-none">
                  <input type="radio" className="h-4 w-4" checked readOnly />
                  <span className="text-sm text-gray-800">{selected}</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                  onClick={() => setCollapsed(false)}
                >
                  Change
                </button>
              </div>
            ) : (
              reasons.map((reason) => (
                <label key={reason} className="flex items-center space-x-3 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="cancel-reason"
                    className="h-4 w-4 text-gray-900 focus:ring-gray-900"
                    checked={selected === reason}
                    onChange={() => {
                      setSelected(reason);
                      setCollapsed(true);
                      // Reset price if switching away
                      if (reason !== 'Too expensive') setPrice('');
                      if (
                        reason !== 'Platform not helpful' &&
                        reason !== 'Not enough relevant jobs' &&
                        reason !== 'Decided not to move' &&
                        reason !== 'Other'
                      )
                        setImproveText('');
                    }}
                  />
                  <span className="text-sm text-gray-800">{reason}</span>
                </label>
              ))
            )}
          </div>

          {/* Conditional price input for 'Too expensive' */}
          {selected === 'Too expensive' && (
            <div className="mt-4">
              <label className="block text-sm text-gray-700 mb-1">What would be the maximum you would be willing to pay?*</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  inputMode="decimal"
                  pattern="[0-9]*"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder=""
                  className="w-full h-11 pl-7 pr-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                />
              </div>
            </div>
          )}

          {/* Conditional textarea for 'Platform not helpful', 'Not enough relevant jobs', 'Decided not to move' */}
          {needsImproveText && (
            <div className="mt-4">
              <label className="block text-sm text-gray-700 mb-1">
                {selected === 'Platform not helpful'
                  ? 'What can we change to make the platform more helpful?*'
                  : selected === 'Not enough relevant jobs'
                  ? 'In which way can we make the jobs more relevant?*'
                  : selected === 'Decided not to move'
                  ? 'What changed for you to decide to not move?*'
                  : 'What would have helped you the most?*'}
              </label>
              {!hasValidImproveText && showError && (
                <p className="text-sm text-red-600 mb-1">Please enter at least {minImproveChars} characters so we can understand your feedback*</p>
              )}
              <textarea
                value={improveText}
                onChange={(e) => setImproveText(e.target.value)}
                rows={4}
                placeholder="Enter reason here..."
                className={`w-full rounded-lg border ${!hasValidImproveText && showError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-gray-900 focus:ring-gray-900'} px-3 py-2 outline-none focus:ring-2`}
              />
              <div className={`text-right text-xs mt-1 ${!hasValidImproveText && showError ? 'text-red-600' : 'text-gray-500'}`}>Min {minImproveChars} characters ({improveText.trim().length}/{minImproveChars})</div>
            </div>
          )}

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

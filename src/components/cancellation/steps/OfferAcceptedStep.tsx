"use client";

import React from "react";

interface OfferAcceptedStepProps {
  onClose: () => void;
  onBack: () => void;
  onContinue: () => void;
}

export function OfferAcceptedStep({ onClose, onBack, onContinue }: OfferAcceptedStepProps) {
  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-gray-200">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-800 transition-colors flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <span className="text-sm md:text-base font-medium text-gray-900">Subscription</span>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6">
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
          <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 leading-snug break-words">Great choice, mate!</h3>
          <p className="mt-2 text-lg md:text-xl font-semibold text-gray-900 break-words">
            You're still on the path to your dream role. <span className="text-purple-600">Let’s make it happen together!</span>
          </p>

          <div className="mt-4 text-sm text-gray-700 space-y-1">
            <p>You’ve got XX days left on your current plan.</p>
            <p>Starting from XX date, your monthly payment will be <span className="font-semibold">$12.50</span>.</p>
          </div>

          <p className="mt-4 text-xs italic text-gray-500">You can cancel anytime before then.</p>

          <div className="mt-6">
            <button
              onClick={onContinue}
              className="w-full md:w-auto px-5 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-sm"
            >
              Land your dream role
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

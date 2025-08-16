"use client";

import React, { useEffect, useState } from "react";

interface CompletedStepProps {
  onBack: () => void;
  onClose: () => void;
  variant?: 'yes' | 'no';
}

export function CompletedStep({ onBack, onClose, variant = 'no' }: CompletedStepProps) {
  const [cancelAt, setCancelAt] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch('/api/cancellation/status');
        const json = await res.json();
        if (active && res.ok) {
          setCancelAt(json?.subscription?.cancel_at ?? null);
        }
      } catch {}
    })();
    return () => { active = false; };
  }, []);

  const formattedCancelAt = cancelAt ? new Date(cancelAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : null;
  return (
    <div className="relative">
      {/* Mobile header */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 pt-4">
          <span className="text-base font-medium text-gray-900">Subscription Cancelled</span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Progress (completed) */}
        <div className="flex items-center space-x-2 mt-2 px-4 pb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-sm text-gray-500 ml-2">Completed</span>
        </div>
        <div className="border-t border-gray-200" />
        {/* Back */}
        <button onClick={onBack} className="mt-2 px-4 pb-2 flex items-center text-gray-600 hover:text-gray-800 transition-colors">
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      {/* Desktop header */}
      <div className="hidden md:flex items-center justify-between px-6 pt-6">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-800 transition-colors flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="flex items-center space-x-3 text-sm text-gray-700">
          <span>Subscription Cancelled</span>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <span>Completed</span>
        </div>
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
        <div className="flex-1 md:order-1">
          {variant === 'yes' ? (
            <>
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-3 md:mb-4">
                All done, your cancellation’s
                <br className="hidden md:block" /> been processed.
              </h3>
              <div className="mb-6 text-sm text-gray-700">
                <p>We’re stoked to hear you’ve landed a job and sorted your visa.</p>
                <p className="mt-2">Big congrats from the team. 🙌</p>
              </div>
              {/* Finish CTA (desktop) */}
              <div className="hidden md:block border-t border-gray-200 pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold transition-colors"
                >
                  Finish
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-3 md:mb-4">
                Sorry to see you go, mate.
              </h2>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                Thanks for being with us, and you’re always welcome back.
              </h3>
              <div className="text-sm text-gray-700 space-y-2 mb-6">
                <p>Your subscription is set to end on {formattedCancelAt ?? 'your end date'}.</p>
                <p>You’ll still have full access until then. No further charges after that.</p>
                <p className="mt-2">Changed your mind? You can reactivate anytime before your end date.</p>
              </div>
              {/* Desktop CTA (Back to Jobs) */}
              <div className="hidden md:block border-t border-gray-200 pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold transition-colors"
                >
                  Back to Jobs
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="md:hidden sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <button
          onClick={onClose}
          className="w-full h-12 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold transition-colors"
        >
          {variant === 'yes' ? 'Finish' : 'Back to Jobs'}
        </button>
      </div>
    </div>
  );
}

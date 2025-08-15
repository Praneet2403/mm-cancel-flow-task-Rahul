"use client";

import React from "react";

interface CompletedStepProps {
  onBack: () => void;
  onClose: () => void;
  variant?: 'yes' | 'no';
}

export function CompletedStep({ onBack, onClose, variant = 'no' }: CompletedStepProps) {
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
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-3 md:mb-4">
              All done, your cancellation’s
              <br className="hidden md:block" /> been processed.
            </h3>
          ) : (
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-3 md:mb-4 px-0 md:px-0">
              Your cancellation’s all sorted, mate,
              <br className="hidden md:block" /> no more charges.
            </h3>
          )}

          {/* Body / message */}
          {variant === 'yes' ? (
            <div className="mb-6 text-sm text-gray-700">
              <p>We’re stoked to hear you’ve landed a job and sorted your visa.</p>
              <p className="mt-2">Big congrats from the team. 🙌</p>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5 shadow-sm mb-6">
              <div className="flex items-start">
                <img
                  src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=64&q=60"
                  alt="Agent avatar"
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900">Mihailo Bozic</div>
                  <div className="text-xs text-gray-500">mihailo@migratemate.co</div>
                  <p className="text-sm text-gray-700 mt-3">
                    I’ll be reaching out soon to help with the visa side of things.
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    We’ve got your back, whether it’s questions, paperwork, or just
                    figuring out your options.
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    Keep an eye on your inbox, I’ll be in touch shortly.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Finish CTA (desktop) */}
          <div className="hidden md:block border-t border-gray-200 pt-4">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold transition-colors"
            >
              Finish
            </button>
          </div>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="md:hidden sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <button
          onClick={onClose}
          className="w-full h-12 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold transition-colors"
        >
          Finish
        </button>
      </div>
    </div>
  );
}

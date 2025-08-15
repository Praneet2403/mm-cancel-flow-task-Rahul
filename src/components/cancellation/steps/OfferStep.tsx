"use client";

import React from "react";

interface OfferStepProps {
  onBack: () => void;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
}

export function OfferStep({ onBack, onClose, onAccept, onDecline }: OfferStepProps) {
  return (
    <div className="relative">
      {/* Mobile header */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 pt-4">
          <span className="text-base font-medium text-gray-900">Subscription Cancellation</span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Progress (Step 1 of 3) */}
        <div className="flex items-center space-x-2 mt-2 px-4 pb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <span className="text-sm text-gray-500 ml-2">Step 1 of 3</span>
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
          <span>Subscription Cancellation</span>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="w-2 h-2 rounded-full bg-gray-300" />
            <span className="w-2 h-2 rounded-full bg-gray-300" />
          </div>
          <span>Step 1 of 3</span>
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
          <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 leading-snug break-words">
            We built this to help you land the job, this makes it a little easier.
          </h3>
          <p className="text-gray-700 mt-2 mb-4 text-sm md:text-base">We’ve been there and we’re here to help you.</p>

          {/* Offer card */}
          <div className="rounded-xl border border-purple-300 bg-purple-100 p-4 md:p-5 shadow-sm mb-4">
            <div className="text-center">
              <div className="text-lg md:text-xl font-extrabold text-gray-900 leading-snug">
                Here’s <span className="underline">50% off</span> until you find a job.
              </div>
              <div className="mt-1">
                <span className="text-indigo-700 text-xl md:text-2xl font-bold">$12.50</span>
                <span className="text-indigo-700">/month</span>
                <span className="ml-2 line-through text-gray-500">$25/month</span>
              </div>
            </div>
            <button
              onClick={onAccept}
              className="mt-4 w-full rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold py-3 transition-colors"
            >
              Get 50% off
            </button>
            <p className="mt-2 text-center text-xs text-gray-600">You won’t be charged until your next billing date.</p>
          </div>

          {/* Decline */}
          <button
            onClick={onDecline}
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}

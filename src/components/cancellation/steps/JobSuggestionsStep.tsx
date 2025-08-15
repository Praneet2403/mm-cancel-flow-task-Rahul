"use client";

import React from "react";

interface JobSuggestionsStepProps {
  onBack: () => void;
  onClose: () => void;
}

export function JobSuggestionsStep({ onBack, onClose }: JobSuggestionsStepProps) {
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

      {/* Mobile top image */}
      <div className="md:hidden px-4 pt-4">
        <img
          src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          alt="New York City skyline"
          className="w-full h-40 object-cover rounded-lg"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6 px-4 md:px-6 py-4 md:py-6 pb-20 md:pb-6">
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
          <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 leading-snug break-words">
            Awesome — we’ve pulled together a few roles that seem like a great fit for you.
          </h3>
          <p className="mt-2 text-sm md:text-base text-gray-600">Take a look and see what sparks your interest.</p>

          {/* Job card mock */}
          <div className="mt-4 rounded-xl border border-gray-200 shadow-sm p-4 bg-white overflow-hidden">
            <div className="flex items-start">
              <div className="mr-3">
                <div className="w-10 h-10 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold">JM</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="font-semibold text-gray-900">Automation Controls Engineer</div>
                    <div className="text-sm text-gray-600">Randstad USA • Memphis, Tennessee</div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">Full Time</span>
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">Associate</span>
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">Bachelor’s</span>
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">On‑Site</span>
                  </div>
                </div>

                <div className="mt-2 text-xs text-emerald-700">NEW JOB</div>
                <div className="text-sm text-gray-900 font-medium">$150,000/yr – $170,000/yr</div>

                <div className="mt-2 text-xs text-gray-600">
                  Visas sponsored by company in the last year
                </div>
                <div className="mt-1 flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-800">Green Card</span>
                  <span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-800">H‑1B</span>
                  <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">TN</span>
                  <span className="px-2 py-1 rounded-full bg-pink-100 text-pink-800">OPT</span>
                </div>

                <p className="mt-3 text-sm text-gray-700 line-clamp-3">
                  The Electrical Automation Controls Engineer will design, implement, and maintain industrial automation systems, specializing in PLC programming using Siemens TIA Portal. Ideal candidates will have Bachelor’s degree in Electrical Engineering and 4+ years of experience.
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-gray-500 truncate">Company visa contact: barbara.tuck@randstadusa.com</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 rounded-md bg-purple-100 text-purple-700 text-sm font-medium hover:bg-purple-200">Save Job</button>
                    <button className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">Apply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-6 hidden md:block">
            <button onClick={onClose} className="px-5 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-sm">
              Land your dream role
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="md:hidden sticky bottom-0 left-0 right-0 bg-white px-4 pb-4 pt-3 border-t">
        <button onClick={onClose} className="w-full px-5 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-sm">
          Land your dream role
        </button>
      </div>
    </div>
  );
}

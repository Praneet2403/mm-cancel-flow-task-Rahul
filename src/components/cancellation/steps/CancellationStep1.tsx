'use client';

interface CancellationStep1Props {
  onClose: () => void;
  onJobFound: () => void;
  onStillLooking: () => void;
}

export function CancellationStep1({ onClose, onJobFound, onStillLooking }: CancellationStep1Props) {
  const handleJobFoundClick = () => {
    onJobFound();
  };

  const handleStillLookingClick = () => {
    onStillLooking();
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">
          Subscription Cancellation
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content - Responsive Layout */}
      <div className="flex flex-col md:flex-row">
        {/* Image - Top on mobile, Right on desktop */}
        <div className="w-full h-48 md:w-64 md:h-64 md:flex-shrink-0 md:order-2">
          <img 
            src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="New York City skyline"
            className="w-full h-full object-cover rounded-t-xl md:rounded-t-none md:rounded-r-xl"
          />
        </div>

        {/* Text content - Bottom on mobile, Left on desktop */}
        <div className="flex-1 p-6 md:order-1">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Hey mate,
          </h3>
          <p className="text-lg md:text-xl font-bold text-gray-900 mb-4">
            Quick one before you go.
          </p>
          <p className="text-lg md:text-xl font-bold text-gray-900 mb-6 md:mb-8 italic">
            Have you found a job yet?
          </p>
          
          <p className="text-sm text-gray-600 mb-6">
            Whatever your answer, we just want to help you take the next step. 
            With visa support, or by hearing how we can do better.
          </p>

          {/* Action buttons */}
          <div className="space-y-3">
            <button
              onClick={handleJobFoundClick}
              className="w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              Yes, I've found a job
            </button>
            <button
              onClick={handleStillLookingClick}
              className="w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              Not yet – I'm still looking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

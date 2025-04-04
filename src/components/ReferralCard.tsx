
import React from "react";

const ReferralCard = () => {
  const score = 9.3;
  const maxScore = 10;
  const percentage = (score / maxScore) * 100;
  
  // Calculate the stroke position for the gauge
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference * 0.75; // 0.75 for a 270-degree arc

  return (
    <div className="dashboard-card p-6">
      <h3 className="text-lg font-semibold mb-6">Referral Tracking</h3>
      
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-white/60">Invited</p>
            <p className="text-xl font-bold">145 people</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-white/60">Bonus</p>
            <p className="text-xl font-bold">1,465</p>
          </div>
        </div>
        
        <div className="flex justify-center mt-2">
          <div className="relative w-48 h-48">
            {/* Gauge Background */}
            <svg className="w-full h-full transform -rotate-[135deg]" viewBox="0 0 200 200">
              <circle 
                cx="100" 
                cy="100" 
                r={radius} 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth="10" 
                fill="none" 
                strokeDasharray={circumference}
                strokeDashoffset={circumference * 0.25} // 0.25 to make it a 270-degree arc
              />
              
              {/* Gauge Value */}
              <circle 
                cx="100" 
                cy="100" 
                r={radius} 
                stroke="url(#greenGradient)" 
                strokeWidth="10" 
                fill="none" 
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
              
              {/* Gradient Definition */}
              <defs>
                <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Score Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold">{score}</div>
              <div className="text-xs text-white/60">Total Score</div>
              <div className="text-xs mt-2 px-2 py-1 rounded bg-green-700/20 text-green-500">
                Safety
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralCard;


import React from "react";
import { CircleCheck } from "lucide-react";

const SatisfactionCard = () => {
  const percentage = 95;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="dashboard-card p-6">
      <h3 className="text-lg font-semibold mb-1">Satisfaction Rate</h3>
      <p className="text-sm text-white/60 mb-4">From all projects</p>
      
      <div className="flex justify-center items-center">
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            <circle 
              cx="80" 
              cy="80" 
              r={radius} 
              stroke="rgba(255,255,255,0.1)" 
              strokeWidth="8" 
              fill="none" 
            />
            
            {/* Progress Circle */}
            <circle 
              cx="80" 
              cy="80" 
              r={radius} 
              stroke="url(#blueGradient)" 
              strokeWidth="8" 
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none" 
            />
            
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <CircleCheck size={28} className="text-dashboard-accent mb-1" />
            <div className="text-3xl font-bold">{percentage}%</div>
            <div className="text-xs text-white/60">Based on likes</div>
          </div>
          
          {/* Scale Markers */}
          <div className="absolute left-0 bottom-6 text-xs text-white/40">0%</div>
          <div className="absolute right-0 bottom-6 text-xs text-white/40">100%</div>
        </div>
      </div>
    </div>
  );
};

export default SatisfactionCard;

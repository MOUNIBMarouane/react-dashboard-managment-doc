
import React from "react";
import { ArrowRight } from "lucide-react";

const WelcomeCard = () => {
  return (
    <div className="dashboard-card p-4 md:p-6 flex flex-col md:flex-row items-center overflow-hidden relative">
      <div className="md:w-1/2 z-10 mb-4 md:mb-0 text-center md:text-left">
        <p className="text-white/70 mb-1">Welcome back,</p>
        <h1 className="text-2xl font-bold mb-2">Mark Johnson</h1>
        <p className="text-white/70 text-sm mb-4">
          Glad to see you again!<br />
          Ask me anything.
        </p>
        <button className="flex items-center gap-2 text-xs text-white/70 hover:text-white mx-auto md:mx-0">
          <span>Tap to record</span>
          <ArrowRight size={14} />
        </button>
      </div>
      <div className="md:w-1/2 h-36 md:h-48 flex items-center justify-center overflow-hidden w-full">
        <img 
          src="/lovable-uploads/3f0f2cbe-5955-49bf-914e-4ab99fb975f2.png" 
          alt="Jellyfish" 
          className="object-cover h-full w-full rounded-lg transform scale-110 opacity-80"
        />
      </div>
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-dashboard-blue-light/50 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default WelcomeCard;

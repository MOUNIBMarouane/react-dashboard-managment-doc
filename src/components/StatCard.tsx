
import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive?: boolean;
  Icon: LucideIcon;
  iconBgColor: string;
}

const StatCard = ({ title, value, change, isPositive = true, Icon, iconBgColor }: StatCardProps) => {
  return (
    <div className="stat-card flex items-center justify-between p-3 md:p-4">
      <div>
        <p className="text-xs md:text-sm text-white/60 mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-lg md:text-xl font-bold text-white">{value}</h3>
          <span className={`text-xs font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{change}
          </span>
        </div>
      </div>
      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center ${iconBgColor}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
  );
};

export default StatCard;

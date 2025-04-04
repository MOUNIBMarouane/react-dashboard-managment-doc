
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
    <div className="stat-card flex items-center justify-between">
      <div>
        <p className="text-sm text-white/60 mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-xl font-bold">{value}</h3>
          <span className={`text-xs font-semibold ${isPositive ? 'text-dashboard-accent-green' : 'text-dashboard-accent-red'}`}>
            {isPositive ? '+' : ''}{change}
          </span>
        </div>
      </div>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBgColor}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
  );
};

export default StatCard;

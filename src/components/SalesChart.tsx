
import React from "react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";

const data = [
  { month: "Jan", value: 400 },
  { month: "Feb", value: 300 },
  { month: "Mar", value: 200 },
  { month: "Apr", value: 250 },
  { month: "May", value: 350 },
  { month: "Jun", value: 450 },
  { month: "Jul", value: 400 },
  { month: "Aug", value: 300 },
  { month: "Sep", value: 450 },
  { month: "Oct", value: 350 },
  { month: "Nov", value: 400 },
  { month: "Dec", value: 500 }
];

const SalesChart = () => {
  return (
    <div className="dashboard-card p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold">Sales overview</h3>
          <p className="text-sm">
            <span className="text-dashboard-accent-green">(+5%)</span>
            <span className="text-white/60"> more in 2021</span>
          </p>
        </div>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
            />
            <YAxis 
              hide={false} 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                borderColor: '#334155',
                borderRadius: '0.5rem',
                color: 'white'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#38bdf8" 
              strokeWidth={2}
              fill="url(#colorGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;


import React from "react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip 
} from "recharts";
import { BarChart2, MousePointerClick, User, ShoppingCart } from "lucide-react";

const data = [
  { name: "1", value: 400 },
  { name: "2", value: 300 },
  { name: "3", value: 200 },
  { name: "4", value: 380 },
  { name: "5", value: 220 },
  { name: "6", value: 300 },
  { name: "7", value: 420 },
  { name: "8", value: 380 },
  { name: "9", value: 450 },
  { name: "10", value: 350 },
  { name: "11", value: 200 },
  { name: "12", value: 300 }
];

const UsersChart = () => {
  return (
    <div className="dashboard-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Active Users</h3>
        <p className="text-sm">
          <span className="text-dashboard-accent-green">(+23%)</span>
          <span className="text-white/60"> than last week</span>
        </p>
      </div>
      
      <div className="h-40 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                borderColor: '#334155',
                borderRadius: '0.5rem',
                color: 'white'
              }} 
            />
            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-dashboard-blue-light/60 rounded-lg">
          <div className="w-8 h-8 rounded-lg bg-dashboard-accent flex items-center justify-center mb-2">
            <User size={16} className="text-white" />
          </div>
          <p className="text-sm text-white/60">Users</p>
          <p className="text-xl font-bold">32,984</p>
        </div>
        
        <div className="p-4 bg-dashboard-blue-light/60 rounded-lg">
          <div className="w-8 h-8 rounded-lg bg-dashboard-accent-purple flex items-center justify-center mb-2">
            <MousePointerClick size={16} className="text-white" />
          </div>
          <p className="text-sm text-white/60">Clicks</p>
          <p className="text-xl font-bold">2.42m</p>
        </div>
        
        <div className="p-4 bg-dashboard-blue-light/60 rounded-lg">
          <div className="w-8 h-8 rounded-lg bg-dashboard-accent-green flex items-center justify-center mb-2">
            <BarChart2 size={16} className="text-white" />
          </div>
          <p className="text-sm text-white/60">Sales</p>
          <p className="text-xl font-bold">2,400$</p>
        </div>
        
        <div className="p-4 bg-dashboard-blue-light/60 rounded-lg">
          <div className="w-8 h-8 rounded-lg bg-dashboard-accent-light flex items-center justify-center mb-2">
            <ShoppingCart size={16} className="text-white" />
          </div>
          <p className="text-sm text-white/60">Items</p>
          <p className="text-xl font-bold">320</p>
        </div>
      </div>
    </div>
  );
};

export default UsersChart;

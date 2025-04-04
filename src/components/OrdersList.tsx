
import React from "react";
import { PaintBucket, ShoppingBag, Server, CreditCard, Package } from "lucide-react";

// Sample orders data
const orders = [
  {
    id: 1,
    title: "$2400, Design changes",
    time: "22 DEC 7:20 PM",
    icon: <PaintBucket size={14} />,
    iconBg: "bg-dashboard-accent-purple"
  },
  {
    id: 2,
    title: "New order #4219423",
    time: "21 DEC 11:21 PM",
    icon: <ShoppingBag size={14} />,
    iconBg: "bg-dashboard-accent-red"
  },
  {
    id: 3,
    title: "Server Payments for April",
    time: "21 DEC 9:28 PM",
    icon: <Server size={14} />,
    iconBg: "bg-dashboard-accent-light"
  },
  {
    id: 4,
    title: "New card added for order #3210145",
    time: "20 DEC 3:52 PM",
    icon: <CreditCard size={14} />,
    iconBg: "bg-dashboard-accent"
  },
  {
    id: 5,
    title: "Unlock packages for Development",
    time: "19 DEC 11:35 PM",
    icon: <Package size={14} />,
    iconBg: "bg-dashboard-accent-green"
  }
];

const OrdersList = () => {
  return (
    <div className="dashboard-card p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold">Orders overview</h3>
          <p className="text-sm">
            <span className="text-dashboard-accent-green">+30%</span>
            <span className="text-white/60"> this month</span>
          </p>
        </div>
      </div>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="flex items-start gap-3">
            <div className={`w-6 h-6 rounded-full ${order.iconBg} flex items-center justify-center text-white shrink-0`}>
              {order.icon}
            </div>
            <div>
              <div className="font-medium text-sm">{order.title}</div>
              <div className="text-xs text-white/60">{order.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;

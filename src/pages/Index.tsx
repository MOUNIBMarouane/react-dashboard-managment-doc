
import React from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import WelcomeCard from "../components/WelcomeCard";
import SatisfactionCard from "../components/SatisfactionCard";
import ReferralCard from "../components/ReferralCard";
import SalesChart from "../components/SalesChart";
import UsersChart from "../components/UsersChart";
import ProjectsTable from "../components/ProjectsTable";
import OrdersList from "../components/OrdersList";
import { DollarSign, Users, UserPlus, ShoppingCart } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="dashboard-container space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard 
            title="Today's Money" 
            value="$53,000" 
            change="55%" 
            isPositive={true} 
            Icon={DollarSign} 
            iconBgColor="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatCard 
            title="Today's Users" 
            value="2,300" 
            change="5%" 
            isPositive={true} 
            Icon={Users} 
            iconBgColor="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <StatCard 
            title="New Clients" 
            value="+3,052" 
            change="14%" 
            isPositive={false} 
            Icon={UserPlus} 
            iconBgColor="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatCard 
            title="Total Sales" 
            value="$173,000" 
            change="8%" 
            isPositive={true} 
            Icon={ShoppingCart} 
            iconBgColor="bg-gradient-to-br from-orange-500 to-orange-600"
          />
        </div>
        
        {/* Info Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-1">
            <WelcomeCard />
          </div>
          <div className="lg:col-span-1">
            <SatisfactionCard />
          </div>
          <div className="lg:col-span-1">
            <ReferralCard />
          </div>
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
          <div className="lg:col-span-1">
            <UsersChart />
          </div>
        </div>
        
        {/* Projects & Orders Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2">
            <ProjectsTable />
          </div>
          <div className="lg:col-span-1">
            <OrdersList />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;

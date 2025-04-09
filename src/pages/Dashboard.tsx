
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { CircuitNavigation } from "@/components/navigation/CircuitNavigation";
import { useQuery } from "@tanstack/react-query";
import documentService from "@/services/documentService";
import { 
  FileText, 
  GitBranch, 
  CircleCheck, 
  Users, 
  TrendingUp, 
  BarChart4, 
  ShoppingBag,
  Clock 
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const sampleChartData = [
  { month: 'Jan', value: 400 },
  { month: 'Feb', value: 300 },
  { month: 'Mar', value: 200 },
  { month: 'Apr', value: 380 },
  { month: 'May', value: 500 },
  { month: 'Jun', value: 350 },
  { month: 'Jul', value: 420 },
  { month: 'Aug', value: 380 },
  { month: 'Sep', value: 510 },
  { month: 'Oct', value: 450 },
  { month: 'Nov', value: 480 },
  { month: 'Dec', value: 520 },
];

const sampleBarData = [
  { name: '1', value: 340 },
  { name: '2', value: 230 },
  { name: '3', value: 120 },
  { name: '4', value: 350 },
  { name: '5', value: 200 },
  { name: '6', value: 380 },
  { name: '7', value: 270 },
  { name: '8', value: 420 },
  { name: '9', value: 190 },
  { name: '10', value: 300 },
  { name: '11', value: 250 },
  { name: '12', value: 180 },
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch recent documents
  const { data: recentDocuments } = useQuery({
    queryKey: ["recent-documents"],
    queryFn: () => documentService.getRecentDocuments(5),
    enabled: !!user,
  });

  const stats = [
    { 
      id: 1, 
      name: "Total Documents", 
      value: recentDocuments?.length || 0, 
      change: "+5%",
      icon: FileText,
      color: "bg-blue-600",
      iconBg: "bg-blue-500/20 text-blue-500",
      link: "/documents"
    },
    { 
      id: 2, 
      name: "Active Circuits", 
      value: "5", 
      change: "+12%",
      icon: GitBranch,
      color: "bg-purple-600",
      iconBg: "bg-purple-500/20 text-purple-500",
      link: "/circuits"
    },
    { 
      id: 3, 
      name: "Pending Approvals", 
      value: "3", 
      change: "-8%",
      icon: CircleCheck,
      color: "bg-green-600",
      iconBg: "bg-green-500/20 text-green-500",
      link: "/pending-approvals"
    },
    { 
      id: 4, 
      name: "Team Members", 
      value: "12", 
      change: "+16%",
      icon: Users,
      color: "bg-amber-600",
      iconBg: "bg-amber-500/20 text-amber-500",
      link: "/admin"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-blue-400/80">
        <span>Home</span>
        <span>/</span>
        <span className="text-blue-100">Dashboard</span>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card 
            key={stat.id} 
            className="cursor-pointer bg-[#0f1642] border-blue-900/30 overflow-hidden hover:shadow-md hover:shadow-blue-900/20 transition-shadow"
            onClick={() => navigate(stat.link)}
          >
            <div className={`h-1 w-full ${stat.color}`}></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-300">{stat.name}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-semibold text-white">{stat.value}</p>
                    <span className={`text-xs ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-md ${stat.iconBg}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Welcome Card & Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Welcome Card */}
        <Card className="bg-gradient-to-br from-[#122259] to-[#0c1945] border-blue-900/30 overflow-hidden col-span-1 lg:col-span-1">
          <CardContent className="p-6 relative">
            <div className="space-y-2">
              <p className="text-blue-300">Welcome back,</p>
              <h2 className="text-2xl font-bold text-white">{user?.firstName} {user?.lastName}</h2>
              <p className="text-sm text-blue-300/80">
                Glad to see you again! Monitor your document workflow and team activity here.
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Satisfaction Rate Card */}
        <Card className="bg-[#0f1642] border-blue-900/30">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-white">Completion Rate</h3>
                <p className="text-xs text-blue-300/80">From all documents</p>
              </div>
              
              <div className="flex justify-center py-4">
                <div className="relative h-32 w-32 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="#1e3a8a" 
                      strokeWidth="8" 
                    />
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="#3b82f6" 
                      strokeWidth="8" 
                      strokeDasharray="283"
                      strokeDashoffset="62" // ~78% completion (283 * 0.22)
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-bold text-white">78%</span>
                    <span className="text-xs text-blue-300">(Based on tasks)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Activity Score */}
        <Card className="bg-[#0f1642] border-blue-900/30">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-white">Activity Score</h3>
                <p className="text-xs text-blue-300/80">{user?.lastName}'s Team</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-blue-300">Active Users</p>
                  <p className="text-2xl font-bold text-white">12</p>
                </div>
                
                <div className="relative h-16 w-16 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="#0f172a" 
                      strokeWidth="8" 
                    />
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="#10b981" 
                      strokeWidth="8" 
                      strokeDasharray="283"
                      strokeDashoffset="57" // ~80% activity (283 * 0.2)
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <span className="absolute text-xl font-bold text-white">8.7</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart */}
        <Card className="bg-[#0f1642] border-blue-900/30 col-span-1 lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium text-white">Document Activity</h3>
                <p className="text-xs text-blue-300/80">(+5%) more this month</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={sampleChartData}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      border: '1px solid #1e3a8a', 
                      borderRadius: '0.375rem',
                      color: '#f8fafc'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Bar Chart */}
        <Card className="bg-[#0f1642] border-blue-900/30">
          <CardContent className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-white">Weekly Stats</h3>
              <p className="text-xs text-blue-300/80">(+23%) than last week</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sampleBarData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" horizontal={true} vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      border: '1px solid #1e3a8a', 
                      borderRadius: '0.375rem',
                      color: '#f8fafc'
                    }}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Documents */}
      {recentDocuments && recentDocuments.length > 0 && (
        <Card className="bg-[#0f1642] border-blue-900/30">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium text-white">Recent Documents</h3>
                <p className="text-sm text-blue-300/80">Recently created or modified documents</p>
              </div>
              <Button 
                onClick={() => navigate('/documents')}
                variant="outline"
                className="border-blue-800/40 hover:bg-blue-800/20 text-blue-300"
              >
                View All
              </Button>
            </div>
            
            <div className="space-y-3">
              {recentDocuments.slice(0, 3).map(doc => (
                <div 
                  key={doc.id} 
                  className="p-3 rounded-md border border-blue-900/30 flex justify-between items-center hover:bg-blue-900/20 cursor-pointer transition-colors"
                  onClick={() => navigate(`/documents/${doc.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-900/30 p-2 rounded">
                      <FileText className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{doc.title}</p>
                      <div className="flex items-center gap-2 text-sm text-blue-300/80">
                        <span>{doc.documentType?.typeName || 'No document type'}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> 
                          {new Date(doc.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    doc.status === 1 ? 'bg-green-900/30 text-green-400' : 
                    doc.status === 2 ? 'bg-amber-900/30 text-amber-400' : 
                    'bg-blue-900/30 text-blue-400'
                  }`}>
                    {doc.status === 1 ? 'Approved' : doc.status === 2 ? 'Pending' : 'Draft'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Import Button component
import { Button } from "@/components/ui/button";

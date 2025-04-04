
import React from "react";
import { MoreVertical } from "lucide-react";

// Sample project data
const projects = [
  {
    id: 1,
    name: "Chakra Soft UI Version",
    budget: "$14,000",
    completion: 60,
    members: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    company: "XD"
  },
  {
    id: 2,
    name: "Add Progress Track",
    budget: "$3,000",
    completion: 10,
    members: ["/placeholder.svg", "/placeholder.svg"],
    company: "AT"
  },
  {
    id: 3,
    name: "Fix Platform Errors",
    budget: "Not set",
    completion: 100,
    members: ["/placeholder.svg", "/placeholder.svg"],
    company: "FP"
  },
  {
    id: 4,
    name: "Launch our Mobile App",
    budget: "$32,000",
    completion: 100,
    members: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    company: "LM"
  },
  {
    id: 5,
    name: "Add the New Pricing Page",
    budget: "$400",
    completion: 25,
    members: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    company: "AN"
  },
  {
    id: 6,
    name: "Redesign New Online Shop",
    budget: "$7,600",
    completion: 40,
    members: ["/placeholder.svg", "/placeholder.svg"],
    company: "RN"
  }
];

// Function to get progress bar color based on completion percentage
const getProgressColor = (completion: number) => {
  if (completion >= 75) return 'bg-dashboard-accent-green';
  if (completion >= 50) return 'bg-dashboard-accent';
  return 'bg-dashboard-accent-purple';
};

const ProjectsTable = () => {
  return (
    <div className="dashboard-card p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">Projects</h3>
          <p className="text-sm text-white/60">
            <span className="text-dashboard-accent-green">•</span> 30 done this month
          </p>
        </div>
        <button className="text-white/60 hover:text-white">
          <MoreVertical size={20} />
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="text-xs text-white/60 border-b border-dashboard-blue-light">
            <tr>
              <th className="py-4 px-2 text-left">COMPANIES</th>
              <th className="py-4 px-2 text-left">MEMBERS</th>
              <th className="py-4 px-2 text-left">BUDGET</th>
              <th className="py-4 px-2 text-left">COMPLETION</th>
              <th className="py-4 px-2"></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-dashboard-blue-light">
                <td className="py-4 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-dashboard-accent flex items-center justify-center text-xs font-medium">
                      {project.company}
                    </div>
                    <span>{project.name}</span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="flex -space-x-2">
                    {project.members.map((member, idx) => (
                      <div key={idx} className="w-6 h-6 rounded-full bg-dashboard-blue-light border border-dashboard-blue overflow-hidden">
                        <img src={member} alt="Member" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-2">{project.budget}</td>
                <td className="py-4 px-2">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs">{project.completion}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className={`progress-bar-value ${getProgressColor(project.completion)}`}
                        style={{ width: `${project.completion}%` }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsTable;

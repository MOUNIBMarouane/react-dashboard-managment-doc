
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface StepsManagementFiltersProps {
  circuitId: number | null;
  onCircuitChange: (value: number | null) => void;
  roleId: number | null;
  onRoleChange: (value: number | null) => void;
  isFinalStep: boolean | null;
  onFinalStepChange: (value: boolean | null) => void;
  circuits: any[];
  roles: any[];
}

export function StepsManagementFilters({
  circuitId,
  onCircuitChange,
  roleId,
  onRoleChange,
  isFinalStep,
  onFinalStepChange,
  circuits = [],
  roles = []
}: StepsManagementFiltersProps) {
  return (
    <div className="bg-gray-800/40 border border-gray-700/40 rounded-lg p-4 space-y-4">
      <h2 className="font-medium text-white">Filter Steps</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="circuit-filter" className="text-sm text-gray-300">Circuit</Label>
          <Select
            value={circuitId?.toString() || ''}
            onValueChange={(value) => onCircuitChange(value ? parseInt(value) : null)}
          >
            <SelectTrigger id="circuit-filter" className="bg-gray-900 border-gray-700">
              <SelectValue placeholder="All Circuits" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Circuits</SelectItem>
              {circuits.map((circuit) => (
                <SelectItem key={circuit.id} value={circuit.id.toString()}>
                  {circuit.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="role-filter" className="text-sm text-gray-300">Responsible Role</Label>
          <Select
            value={roleId?.toString() || ''}
            onValueChange={(value) => onRoleChange(value ? parseInt(value) : null)}
          >
            <SelectTrigger id="role-filter" className="bg-gray-900 border-gray-700">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Roles</SelectItem>
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.id.toString()}>
                  {role.roleName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="final-step-filter" className="text-sm text-gray-300">Final Steps Only</Label>
          <div className="flex items-center space-x-2">
            <Switch 
              id="final-step-filter" 
              checked={!!isFinalStep} 
              onCheckedChange={(checked) => onFinalStepChange(checked ? true : null)} 
            />
            <Label htmlFor="final-step-filter" className="text-sm text-gray-400">
              {isFinalStep ? "Final steps only" : "All steps"}
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepsManagementFilters;


import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export interface CircuitDetail {
  id: number;
  circuitDetailKey?: string;
  circuitId: number;
  title: string;
  descriptif?: string;
  orderIndex: number;
  responsibleRoleId?: number;
  isFinalStep?: boolean;
  nextCircuitDetailId?: number;
  prevCircuitDetailId?: number;
  isFinalDetail?: boolean;
}

interface CircuitDetailsListProps {
  circuitDetails: CircuitDetail[];
}

const CircuitDetailsList: React.FC<CircuitDetailsListProps> = ({ circuitDetails }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Responsible Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {circuitDetails.map((detail) => (
            <TableRow key={detail.id}>
              <TableCell className="font-medium">{detail.title}</TableCell>
              <TableCell>{detail.orderIndex}</TableCell>
              <TableCell>{detail.responsibleRoleId || 'None'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CircuitDetailsList;

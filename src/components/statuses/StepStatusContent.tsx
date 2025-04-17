
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusTable } from '@/components/statuses/StatusTable';
import { DocumentStatus } from '@/models/documentCircuit';

interface StepStatusContentProps {
  statuses: DocumentStatus[];
  onEdit: (status: DocumentStatus) => void;
  onDelete: (status: DocumentStatus) => void;
  isSimpleUser: boolean;
}

export function StepStatusContent({ 
  statuses,
  onEdit,
  onDelete,
  isSimpleUser
}: StepStatusContentProps) {
  return (
    <Card className="w-full shadow-md bg-[#111633]/70 border-blue-900/30">
      <CardHeader className="flex flex-row items-center justify-between border-b border-blue-900/30 bg-blue-900/20 p-3 sm:p-4">
        <CardTitle className="text-lg text-blue-100">Step Statuses</CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <StatusTable 
          statuses={statuses}
          onEdit={onEdit}
          onDelete={onDelete}
          isSimpleUser={isSimpleUser}
        />
      </CardContent>
    </Card>
  );
}

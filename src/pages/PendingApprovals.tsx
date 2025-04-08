
import PendingDocumentsList from '@/components/circuits/PendingDocumentsList';

export default function PendingApprovalsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#161b22] border border-gray-800 rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-semibold mb-2 text-white">Pending Approvals</h1>
        <p className="text-gray-400">
          Documents waiting for your approval or action
        </p>
      </div>
      
      <div className="bg-[#161b22] border border-gray-800 rounded-lg p-6">
        <PendingDocumentsList />
      </div>
    </div>
  );
}

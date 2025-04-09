
import PendingDocumentsList from '@/components/circuits/PendingDocumentsList';

export default function PendingApprovalsPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-[#161b22] border border-gray-800 rounded-lg p-4 md:p-6 mb-4 md:mb-6 transition-all">
        <h1 className="text-2xl md:text-3xl font-semibold mb-1 md:mb-2 text-white">Pending Approvals</h1>
        <p className="text-sm md:text-base text-gray-400">
          Documents waiting for your approval or action
        </p>
      </div>
      
      <div className="bg-[#161b22] border border-gray-800 rounded-lg p-4 md:p-6 transition-all">
        <PendingDocumentsList />
      </div>
    </div>
  );
}

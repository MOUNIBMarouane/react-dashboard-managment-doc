
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { Type } from "@/types/type";
import { useTypeManagement } from "@/hooks/useTypeManagement";
import TypeDetailsCard from "@/components/type-details/TypeDetailsCard";
import AddEditTypeDialog from "@/components/types/AddEditTypeDialog";

const TypeDetails = () => {
  const { typeId } = useParams();
  const { types, handleEditType } = useTypeManagement();
  const [type, setType] = useState<Type | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    if (typeId && types) {
      const foundType = types.find(type => type.id === typeId);
      setType(foundType || null);
    }
  }, [typeId, types]);

  const handleOpenEditDialog = (typeId: string) => {
    setIsEditDialogOpen(true);
  };

  const handleSaveType = (updatedType: Type) => {
    handleEditType(updatedType);
    setType(updatedType);
    setIsEditDialogOpen(false);
  };

  if (!type) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center py-12 text-white/60">
            Type not found
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 md:p-8 space-y-6">
        <h1 className="text-2xl font-bold text-white">Type Details</h1>
        
        <TypeDetailsCard 
          type={type} 
          onEdit={handleOpenEditDialog}
        />
      </div>

      <AddEditTypeDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveType}
        typeToEdit={type}
        isEditing={true}
      />
    </Layout>
  );
};

export default TypeDetails;

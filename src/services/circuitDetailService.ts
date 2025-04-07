
import { supabase } from "@/integrations/supabase/client";
import { CircuitDetail } from "@/types/circuit";

// Fetch circuit details for a specific circuit
export const fetchCircuitDetails = async (circuitId: string) => {
  const { data, error } = await (supabase as any)
    .from('circuit_detail')
    .select('*')
    .eq('circuit_id', parseInt(circuitId))
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  if (data) {
    // Convert numeric IDs to strings for consistency
    return data.map((detail: any) => ({
      ...detail,
      id: detail.id.toString(),
      circuit_id: detail.circuit_id.toString()
    }));
  }
  
  return [];
};

// Add a new circuit detail
export const addCircuitDetail = async (newDetail: Omit<CircuitDetail, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await (supabase as any)
    .from('circuit_detail')
    .insert([{
      ...newDetail,
      circuit_id: parseInt(newDetail.circuit_id)
    }])
    .select();

  if (error) {
    throw error;
  }
  
  if (data && data.length > 0) {
    return { 
      ...data[0], 
      id: data[0].id.toString(),
      circuit_id: data[0].circuit_id.toString()
    };
  }
  
  throw new Error('No data returned from insert operation');
};

// Update a circuit detail
export const updateCircuitDetail = async (updatedDetail: CircuitDetail) => {
  const { error } = await (supabase as any)
    .from('circuit_detail')
    .update({
      circuit_detail_key: updatedDetail.circuit_detail_key,
      title: updatedDetail.title,
      descriptif: updatedDetail.descriptif,
      updated_at: new Date().toISOString()
    })
    .eq('id', parseInt(updatedDetail.id));

  if (error) {
    throw error;
  }
  
  return updatedDetail;
};

// Delete circuit details
export const deleteCircuitDetail = async (detailId: string) => {
  const { error } = await (supabase as any)
    .from('circuit_detail')
    .delete()
    .eq('id', parseInt(detailId));

  if (error) {
    throw error;
  }
};

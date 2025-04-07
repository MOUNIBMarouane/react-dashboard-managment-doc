
import { supabase } from "@/integrations/supabase/client";
import { Circuit } from "@/types/circuit";

// Fetch all circuits from Supabase
export const fetchCircuits = async () => {
  const { data, error } = await (supabase as any)
    .from('circuit')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  if (data) {
    // Convert numeric IDs to strings for consistency
    return data.map((circuit: any) => ({
      ...circuit,
      id: circuit.id.toString()
    }));
  }
  
  return [];
};

// Delete circuits by IDs
export const deleteCircuits = async (circuitIds: string[]) => {
  const { error } = await (supabase as any)
    .from('circuit')
    .delete()
    .in('id', circuitIds.map(id => parseInt(id)));

  if (error) {
    throw error;
  }
};

// Add a new circuit
export const addCircuit = async (newCircuit: Omit<Circuit, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await (supabase as any)
    .from('circuit')
    .insert([newCircuit])
    .select();

  if (error) {
    throw error;
  }
  
  if (data && data.length > 0) {
    return { 
      ...data[0], 
      id: data[0].id.toString() 
    };
  }
  
  throw new Error('No data returned from insert operation');
};

// Update a circuit
export const updateCircuit = async (updatedCircuit: Circuit) => {
  const { error } = await (supabase as any)
    .from('circuit')
    .update({
      circuit_key: updatedCircuit.circuit_key,
      title: updatedCircuit.title,
      descriptif: updatedCircuit.descriptif,
      is_active: updatedCircuit.is_active,
      updated_at: new Date().toISOString()
    })
    .eq('id', parseInt(updatedCircuit.id));

  if (error) {
    throw error;
  }
  
  return updatedCircuit;
};

// Fetch a single circuit by ID
export const fetchCircuitById = async (circuitId: string) => {
  const { data, error } = await (supabase as any)
    .from('circuit')
    .select('*')
    .eq('id', parseInt(circuitId))
    .single();
  
  if (error) {
    throw error;
  }
  
  if (data) {
    return {
      ...data,
      id: data.id.toString()
    };
  }
  
  return null;
};

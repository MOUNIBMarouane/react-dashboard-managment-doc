
export interface Circuit {
  id: string;
  circuit_key: string;
  title: string;
  descriptif: string;
  is_active: boolean;
  crd_counter: number;
  created_at?: string;
  updated_at?: string;
}

export interface CircuitDetail {
  id: string;
  circuit_detail_key: string;
  circuit_id: string;
  title: string;
  descriptif: string;
  created_at?: string;
  updated_at?: string;
}

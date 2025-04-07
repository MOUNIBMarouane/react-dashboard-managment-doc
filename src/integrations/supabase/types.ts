export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      circuit: {
        Row: {
          circuit_key: string
          crd_counter: number
          created_at: string
          descriptif: string
          id: number
          is_active: boolean
          title: string
          updated_at: string | null
        }
        Insert: {
          circuit_key?: string
          crd_counter?: number
          created_at?: string
          descriptif?: string
          id?: number
          is_active?: boolean
          title: string
          updated_at?: string | null
        }
        Update: {
          circuit_key?: string
          crd_counter?: number
          created_at?: string
          descriptif?: string
          id?: number
          is_active?: boolean
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      circuit_detail: {
        Row: {
          circuit_detail_key: string
          circuit_id: number
          created_at: string
          descriptif: string
          id: number
          title: string
          updated_at: string | null
        }
        Insert: {
          circuit_detail_key?: string
          circuit_id: number
          created_at?: string
          descriptif?: string
          id?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          circuit_detail_key?: string
          circuit_id?: number
          created_at?: string
          descriptif?: string
          id?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "circuit_detail_circuit_id_fkey"
            columns: ["circuit_id"]
            isOneToOne: false
            referencedRelation: "circuit"
            referencedColumns: ["id"]
          },
        ]
      }
      document: {
        Row: {
          content: string | null
          created_at: string
          created_by_id: number | null
          doc_date: string | null
          id: number
          status: number
          title: string | null
          type_id: number | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at: string
          created_by_id?: number | null
          doc_date?: string | null
          id?: number
          status: number
          title?: string | null
          type_id?: number | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          created_by_id?: number | null
          doc_date?: string | null
          id?: number
          status?: number
          title?: string | null
          type_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "type"
            referencedColumns: ["id"]
          },
        ]
      }
      ligne: {
        Row: {
          article: string | null
          created_at: string | null
          document_id: number | null
          id: number
          prix: number | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          article?: string | null
          created_at?: string | null
          document_id?: number | null
          id?: number
          prix?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          article?: string | null
          created_at?: string | null
          document_id?: number | null
          id?: number
          prix?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ligne_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "document"
            referencedColumns: ["id"]
          },
        ]
      }
      log_history: {
        Row: {
          id: number
          log_time: string
          log_type: number
          user_id: number
        }
        Insert: {
          id?: number
          log_time: string
          log_type: number
          user_id: number
        }
        Update: {
          id?: number
          log_time?: string
          log_type?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "log_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      role: {
        Row: {
          id: number
          isadmin: boolean | null
          isfulluser: boolean | null
          issimpleuser: boolean | null
          role_name: string | null
        }
        Insert: {
          id?: number
          isadmin?: boolean | null
          isfulluser?: boolean | null
          issimpleuser?: boolean | null
          role_name?: string | null
        }
        Update: {
          id?: number
          isadmin?: boolean | null
          isfulluser?: boolean | null
          issimpleuser?: boolean | null
          role_name?: string | null
        }
        Relationships: []
      }
      sousligne: {
        Row: {
          attribute: string | null
          created_at: string | null
          id: number
          ligne_id: number | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          attribute?: string | null
          created_at?: string | null
          id?: number
          ligne_id?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          attribute?: string | null
          created_at?: string | null
          id?: number
          ligne_id?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sousligne_ligne_id_fkey"
            columns: ["ligne_id"]
            isOneToOne: false
            referencedRelation: "ligne"
            referencedColumns: ["id"]
          },
        ]
      }
      type: {
        Row: {
          attribute: string | null
          id: number
          typename: string | null
        }
        Insert: {
          attribute?: string | null
          id?: number
          typename?: string | null
        }
        Update: {
          attribute?: string | null
          id?: number
          typename?: string | null
        }
        Relationships: []
      }
      user: {
        Row: {
          background_picture: string | null
          created_at: string
          email: string
          first_name: string | null
          id: number
          is_active: boolean | null
          last_login: string | null
          last_name: string | null
          password: string
          profile_picture: string | null
          role_id: number | null
          updated_at: string | null
          username: string
        }
        Insert: {
          background_picture?: string | null
          created_at: string
          email: string
          first_name?: string | null
          id?: number
          is_active?: boolean | null
          last_login?: string | null
          last_name?: string | null
          password: string
          profile_picture?: string | null
          role_id?: number | null
          updated_at?: string | null
          username: string
        }
        Update: {
          background_picture?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: number
          is_active?: boolean | null
          last_login?: string | null
          last_name?: string | null
          password?: string
          profile_picture?: string | null
          role_id?: number | null
          updated_at?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "role"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

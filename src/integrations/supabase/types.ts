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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

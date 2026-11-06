export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      arts: {
        Row: {
          id: number
          naam: string
          type: string
          user_id: string | null
        }
        Insert: {
          id?: never
          naam: string
          type: string
          user_id?: string | null
        }
        Update: {
          id?: never
          naam?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      behandelingen: {
        Row: {
          duur: number
          id: number
          slug: string
          type: string
        }
        Insert: {
          duur: number
          id?: never
          slug: string
          type: string
        }
        Update: {
          duur?: number
          id?: never
          slug?: string
          type?: string
        }
        Relationships: []
      }
      beschikbaarheid: {
        Row: {
          arts_id: number
          datum: string
          eindtijd: string
          id: number
          starttijd: string
        }
        Insert: {
          arts_id: number
          datum: string
          eindtijd: string
          id?: never
          starttijd: string
        }
        Update: {
          arts_id?: number
          datum?: string
          eindtijd?: string
          id?: never
          starttijd?: string
        }
        Relationships: [
          {
            foreignKeyName: "beschikbaarheid_arts_id_fkey"
            columns: ["arts_id"]
            isOneToOne: false
            referencedRelation: "arts"
            referencedColumns: ["id"]
          },
        ]
      }
      chats: {
        Row: {
          id: string
          messages: Json
          updated_at: string
        }
        Insert: {
          id: string
          messages?: Json
          updated_at?: string
        }
        Update: {
          id?: string
          messages?: Json
          updated_at?: string
        }
        Relationships: []
      }
      chats_ai_bot: {
        Row: {
          id: string
          messages: Json
          updated_at: string
        }
        Insert: {
          id: string
          messages?: Json
          updated_at?: string
        }
        Update: {
          id?: string
          messages?: Json
          updated_at?: string
        }
        Relationships: []
      }
      reserveringen: {
        Row: {
          aangemaakt_op: string
          arts_id: number
          behandeling_id: number
          datum: string
          eindtijd: string
          email: string
          id: number
          naam: string
          starttijd: string
          updated_at: string | null
        }
        Insert: {
          aangemaakt_op?: string
          arts_id: number
          behandeling_id: number
          datum: string
          eindtijd: string
          email: string
          id?: never
          naam: string
          starttijd: string
          updated_at?: string | null
        }
        Update: {
          aangemaakt_op?: string
          arts_id?: number
          behandeling_id?: number
          datum?: string
          eindtijd?: string
          email?: string
          id?: never
          naam?: string
          starttijd?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reserveringen_arts_id_fkey"
            columns: ["arts_id"]
            isOneToOne: false
            referencedRelation: "arts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reserveringen_behandeling_id_fkey"
            columns: ["behandeling_id"]
            isOneToOne: false
            referencedRelation: "behandelingen"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      beschikbare_tijden: {
        Args: {
          p_behandeling: string
          p_datum: string
          p_interval_minuten?: number
        }
        Returns: {
          starttijd: string
        }[]
      }
      boek_afspraak: {
        Args: {
          p_behandeling: string
          p_datum: string
          p_email: string
          p_naam: string
          p_starttijd: string
        }
        Returns: {
          aangemaakt_op: string
          arts_id: number
          behandeling_id: number
          datum: string
          eindtijd: string
          email: string
          id: number
          naam: string
          starttijd: string
          updated_at: string | null
        }
        SetofOptions: {
          from: "*"
          to: "reserveringen"
          isOneToOne: true
          isSetofReturn: false
        }
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

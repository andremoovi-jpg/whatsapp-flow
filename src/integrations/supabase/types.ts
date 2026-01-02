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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      api_keys: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          key_hash: string
          key_prefix: string
          last_used_at: string | null
          name: string
          organization_id: string
          permissions: string[] | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          key_hash: string
          key_prefix: string
          last_used_at?: string | null
          name: string
          organization_id: string
          permissions?: string[] | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          key_hash?: string
          key_prefix?: string
          last_used_at?: string | null
          name?: string
          organization_id?: string
          permissions?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          audience_filter: Json | null
          completed_at: string | null
          created_at: string | null
          id: string
          name: string
          organization_id: string
          phone_number_id: string | null
          scheduled_at: string | null
          started_at: string | null
          stats: Json | null
          status: string | null
          template_id: string | null
          updated_at: string | null
        }
        Insert: {
          audience_filter?: Json | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          name: string
          organization_id: string
          phone_number_id?: string | null
          scheduled_at?: string | null
          started_at?: string | null
          stats?: Json | null
          status?: string | null
          template_id?: string | null
          updated_at?: string | null
        }
        Update: {
          audience_filter?: Json | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          name?: string
          organization_id?: string
          phone_number_id?: string | null
          scheduled_at?: string | null
          started_at?: string | null
          stats?: Json | null
          status?: string | null
          template_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_phone_number_id_fkey"
            columns: ["phone_number_id"]
            isOneToOne: false
            referencedRelation: "phone_numbers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "message_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          conversation_state: string | null
          created_at: string | null
          custom_fields: Json | null
          email: string | null
          id: string
          last_interaction_at: string | null
          name: string | null
          opted_in: boolean | null
          organization_id: string
          phone_number: string
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          conversation_state?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          email?: string | null
          id?: string
          last_interaction_at?: string | null
          name?: string | null
          opted_in?: boolean | null
          organization_id: string
          phone_number: string
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          conversation_state?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          email?: string | null
          id?: string
          last_interaction_at?: string | null
          name?: string | null
          opted_in?: boolean | null
          organization_id?: string
          phone_number?: string
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          assigned_to: string | null
          contact_id: string
          created_at: string | null
          id: string
          last_message_at: string | null
          organization_id: string
          phone_number_id: string | null
          status: string | null
          updated_at: string | null
          window_expires_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          contact_id: string
          created_at?: string | null
          id?: string
          last_message_at?: string | null
          organization_id: string
          phone_number_id?: string | null
          status?: string | null
          updated_at?: string | null
          window_expires_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          contact_id?: string
          created_at?: string | null
          id?: string
          last_message_at?: string | null
          organization_id?: string
          phone_number_id?: string | null
          status?: string | null
          updated_at?: string | null
          window_expires_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_phone_number_id_fkey"
            columns: ["phone_number_id"]
            isOneToOne: false
            referencedRelation: "phone_numbers"
            referencedColumns: ["id"]
          },
        ]
      }
      flow_edges: {
        Row: {
          created_at: string | null
          flow_id: string
          id: string
          label: string | null
          source_handle: string | null
          source_node_id: string
          target_node_id: string
        }
        Insert: {
          created_at?: string | null
          flow_id: string
          id?: string
          label?: string | null
          source_handle?: string | null
          source_node_id: string
          target_node_id: string
        }
        Update: {
          created_at?: string | null
          flow_id?: string
          id?: string
          label?: string | null
          source_handle?: string | null
          source_node_id?: string
          target_node_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "flow_edges_flow_id_fkey"
            columns: ["flow_id"]
            isOneToOne: false
            referencedRelation: "flows"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flow_edges_source_node_id_fkey"
            columns: ["source_node_id"]
            isOneToOne: false
            referencedRelation: "flow_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flow_edges_target_node_id_fkey"
            columns: ["target_node_id"]
            isOneToOne: false
            referencedRelation: "flow_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      flow_execution_logs: {
        Row: {
          error_message: string | null
          executed_at: string | null
          execution_id: string
          id: string
          input_data: Json | null
          node_id: string | null
          output_data: Json | null
          status: string | null
        }
        Insert: {
          error_message?: string | null
          executed_at?: string | null
          execution_id: string
          id?: string
          input_data?: Json | null
          node_id?: string | null
          output_data?: Json | null
          status?: string | null
        }
        Update: {
          error_message?: string | null
          executed_at?: string | null
          execution_id?: string
          id?: string
          input_data?: Json | null
          node_id?: string | null
          output_data?: Json | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flow_execution_logs_execution_id_fkey"
            columns: ["execution_id"]
            isOneToOne: false
            referencedRelation: "flow_executions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flow_execution_logs_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "flow_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      flow_executions: {
        Row: {
          completed_at: string | null
          contact_id: string | null
          error_message: string | null
          flow_id: string
          id: string
          started_at: string | null
          status: string | null
          trigger_data: Json | null
        }
        Insert: {
          completed_at?: string | null
          contact_id?: string | null
          error_message?: string | null
          flow_id: string
          id?: string
          started_at?: string | null
          status?: string | null
          trigger_data?: Json | null
        }
        Update: {
          completed_at?: string | null
          contact_id?: string | null
          error_message?: string | null
          flow_id?: string
          id?: string
          started_at?: string | null
          status?: string | null
          trigger_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "flow_executions_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flow_executions_flow_id_fkey"
            columns: ["flow_id"]
            isOneToOne: false
            referencedRelation: "flows"
            referencedColumns: ["id"]
          },
        ]
      }
      flow_nodes: {
        Row: {
          config: Json
          created_at: string | null
          flow_id: string
          id: string
          name: string | null
          position_x: number | null
          position_y: number | null
          type: string
        }
        Insert: {
          config: Json
          created_at?: string | null
          flow_id: string
          id?: string
          name?: string | null
          position_x?: number | null
          position_y?: number | null
          type: string
        }
        Update: {
          config?: Json
          created_at?: string | null
          flow_id?: string
          id?: string
          name?: string | null
          position_x?: number | null
          position_y?: number | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "flow_nodes_flow_id_fkey"
            columns: ["flow_id"]
            isOneToOne: false
            referencedRelation: "flows"
            referencedColumns: ["id"]
          },
        ]
      }
      flows: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          organization_id: string
          status: string | null
          trigger_config: Json
          trigger_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          organization_id: string
          status?: string | null
          trigger_config: Json
          trigger_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          organization_id?: string
          status?: string | null
          trigger_config?: Json
          trigger_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flows_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      message_templates: {
        Row: {
          category: string | null
          components: Json
          created_at: string | null
          example_values: Json | null
          id: string
          language: string
          name: string
          status: string | null
          synced_at: string | null
          template_id: string
          updated_at: string | null
          whatsapp_account_id: string
        }
        Insert: {
          category?: string | null
          components: Json
          created_at?: string | null
          example_values?: Json | null
          id?: string
          language: string
          name: string
          status?: string | null
          synced_at?: string | null
          template_id: string
          updated_at?: string | null
          whatsapp_account_id: string
        }
        Update: {
          category?: string | null
          components?: Json
          created_at?: string | null
          example_values?: Json | null
          id?: string
          language?: string
          name?: string
          status?: string | null
          synced_at?: string | null
          template_id?: string
          updated_at?: string | null
          whatsapp_account_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_templates_whatsapp_account_id_fkey"
            columns: ["whatsapp_account_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          contact_id: string
          content: Json
          conversation_id: string
          created_at: string | null
          delivered_at: string | null
          direction: string
          error_message: string | null
          id: string
          read_at: string | null
          sent_at: string | null
          status: string | null
          type: string
          whatsapp_message_id: string | null
        }
        Insert: {
          contact_id: string
          content: Json
          conversation_id: string
          created_at?: string | null
          delivered_at?: string | null
          direction: string
          error_message?: string | null
          id?: string
          read_at?: string | null
          sent_at?: string | null
          status?: string | null
          type: string
          whatsapp_message_id?: string | null
        }
        Update: {
          contact_id?: string
          content?: Json
          conversation_id?: string
          created_at?: string | null
          delivered_at?: string | null
          direction?: string
          error_message?: string | null
          id?: string
          read_at?: string | null
          sent_at?: string | null
          status?: string | null
          type?: string
          whatsapp_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_members: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string
          role: Database["public"]["Enums"]["app_role"] | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id: string
          role?: Database["public"]["Enums"]["app_role"] | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string
          role?: Database["public"]["Enums"]["app_role"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string | null
          id: string
          name: string
          plan: string | null
          settings: Json | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          plan?: string | null
          settings?: Json | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          plan?: string | null
          settings?: Json | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      phone_numbers: {
        Row: {
          created_at: string | null
          display_name: string | null
          id: string
          is_default: boolean | null
          phone_number: string
          phone_number_id: string
          quality_rating: string | null
          status: string | null
          updated_at: string | null
          whatsapp_account_id: string
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          id?: string
          is_default?: boolean | null
          phone_number: string
          phone_number_id: string
          quality_rating?: string | null
          status?: string | null
          updated_at?: string | null
          whatsapp_account_id: string
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          id?: string
          is_default?: boolean | null
          phone_number?: string
          phone_number_id?: string
          quality_rating?: string | null
          status?: string | null
          updated_at?: string | null
          whatsapp_account_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "phone_numbers_whatsapp_account_id_fkey"
            columns: ["whatsapp_account_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      webhook_logs: {
        Row: {
          error_message: string | null
          event_type: string | null
          id: string
          organization_id: string | null
          payload: Json | null
          processed: boolean | null
          received_at: string | null
          source: string | null
        }
        Insert: {
          error_message?: string | null
          event_type?: string | null
          id?: string
          organization_id?: string | null
          payload?: Json | null
          processed?: boolean | null
          received_at?: string | null
          source?: string | null
        }
        Update: {
          error_message?: string | null
          event_type?: string | null
          id?: string
          organization_id?: string | null
          payload?: Json | null
          processed?: boolean | null
          received_at?: string | null
          source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "webhook_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_accounts: {
        Row: {
          access_token_encrypted: string | null
          business_manager_id: string | null
          created_at: string | null
          id: string
          meta_data: Json | null
          name: string
          organization_id: string
          status: string | null
          updated_at: string | null
          waba_id: string
          webhook_verify_token: string | null
        }
        Insert: {
          access_token_encrypted?: string | null
          business_manager_id?: string | null
          created_at?: string | null
          id?: string
          meta_data?: Json | null
          name: string
          organization_id: string
          status?: string | null
          updated_at?: string | null
          waba_id: string
          webhook_verify_token?: string | null
        }
        Update: {
          access_token_encrypted?: string | null
          business_manager_id?: string | null
          created_at?: string | null
          id?: string
          meta_data?: Json | null
          name?: string
          organization_id?: string
          status?: string | null
          updated_at?: string | null
          waba_id?: string
          webhook_verify_token?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_accounts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_org_ids: { Args: { _user_id: string }; Returns: string[] }
      is_org_admin: {
        Args: { _org_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "member" | "viewer"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "member", "viewer"],
    },
  },
} as const

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
          audience_count: number | null
          audience_filter: Json | null
          audience_type: string | null
          batch_size: number | null
          completed_at: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          name: string
          organization_id: string
          paused_at: string | null
          phone_number_id: string | null
          scheduled_at: string | null
          send_rate: number | null
          started_at: string | null
          stats: Json | null
          status: string | null
          template_id: string | null
          template_variables: Json | null
          timezone: string | null
          updated_at: string | null
          whatsapp_account_id: string | null
        }
        Insert: {
          audience_count?: number | null
          audience_filter?: Json | null
          audience_type?: string | null
          batch_size?: number | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          organization_id: string
          paused_at?: string | null
          phone_number_id?: string | null
          scheduled_at?: string | null
          send_rate?: number | null
          started_at?: string | null
          stats?: Json | null
          status?: string | null
          template_id?: string | null
          template_variables?: Json | null
          timezone?: string | null
          updated_at?: string | null
          whatsapp_account_id?: string | null
        }
        Update: {
          audience_count?: number | null
          audience_filter?: Json | null
          audience_type?: string | null
          batch_size?: number | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          organization_id?: string
          paused_at?: string | null
          phone_number_id?: string | null
          scheduled_at?: string | null
          send_rate?: number | null
          started_at?: string | null
          stats?: Json | null
          status?: string | null
          template_id?: string | null
          template_variables?: Json | null
          timezone?: string | null
          updated_at?: string | null
          whatsapp_account_id?: string | null
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
          {
            foreignKeyName: "campaigns_whatsapp_account_id_fkey"
            columns: ["whatsapp_account_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          conversation_state: string | null
          created_at: string | null
          current_flow_id: string | null
          current_node_id: string | null
          custom_fields: Json | null
          email: string | null
          first_interaction_at: string | null
          flow_context: Json | null
          id: string
          last_interaction_at: string | null
          name: string | null
          opted_in: boolean | null
          opted_in_at: string | null
          opted_out_at: string | null
          organization_id: string
          phone_number: string
          profile_picture_url: string | null
          tags: string[] | null
          total_messages_received: number | null
          total_messages_sent: number | null
          updated_at: string | null
          wa_id: string | null
          whatsapp_account_id: string | null
        }
        Insert: {
          conversation_state?: string | null
          created_at?: string | null
          current_flow_id?: string | null
          current_node_id?: string | null
          custom_fields?: Json | null
          email?: string | null
          first_interaction_at?: string | null
          flow_context?: Json | null
          id?: string
          last_interaction_at?: string | null
          name?: string | null
          opted_in?: boolean | null
          opted_in_at?: string | null
          opted_out_at?: string | null
          organization_id: string
          phone_number: string
          profile_picture_url?: string | null
          tags?: string[] | null
          total_messages_received?: number | null
          total_messages_sent?: number | null
          updated_at?: string | null
          wa_id?: string | null
          whatsapp_account_id?: string | null
        }
        Update: {
          conversation_state?: string | null
          created_at?: string | null
          current_flow_id?: string | null
          current_node_id?: string | null
          custom_fields?: Json | null
          email?: string | null
          first_interaction_at?: string | null
          flow_context?: Json | null
          id?: string
          last_interaction_at?: string | null
          name?: string | null
          opted_in?: boolean | null
          opted_in_at?: string | null
          opted_out_at?: string | null
          organization_id?: string
          phone_number?: string
          profile_picture_url?: string | null
          tags?: string[] | null
          total_messages_received?: number | null
          total_messages_sent?: number | null
          updated_at?: string | null
          wa_id?: string | null
          whatsapp_account_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacts_whatsapp_account_id_fkey"
            columns: ["whatsapp_account_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          active_flow_id: string | null
          assigned_to: string | null
          contact_id: string
          created_at: string | null
          flow_paused: boolean | null
          id: string
          last_message_at: string | null
          last_message_direction: string | null
          organization_id: string
          phone_number_id: string | null
          status: string | null
          unread_count: number | null
          updated_at: string | null
          whatsapp_account_id: string | null
          window_expires_at: string | null
          window_type: string | null
        }
        Insert: {
          active_flow_id?: string | null
          assigned_to?: string | null
          contact_id: string
          created_at?: string | null
          flow_paused?: boolean | null
          id?: string
          last_message_at?: string | null
          last_message_direction?: string | null
          organization_id: string
          phone_number_id?: string | null
          status?: string | null
          unread_count?: number | null
          updated_at?: string | null
          whatsapp_account_id?: string | null
          window_expires_at?: string | null
          window_type?: string | null
        }
        Update: {
          active_flow_id?: string | null
          assigned_to?: string | null
          contact_id?: string
          created_at?: string | null
          flow_paused?: boolean | null
          id?: string
          last_message_at?: string | null
          last_message_direction?: string | null
          organization_id?: string
          phone_number_id?: string | null
          status?: string | null
          unread_count?: number | null
          updated_at?: string | null
          whatsapp_account_id?: string | null
          window_expires_at?: string | null
          window_type?: string | null
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
          {
            foreignKeyName: "conversations_whatsapp_account_id_fkey"
            columns: ["whatsapp_account_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_accounts"
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
          created_by: string | null
          description: string | null
          failed_executions: number | null
          folder: string | null
          id: string
          is_active: boolean | null
          last_execution_at: string | null
          n8n_webhook_url: string | null
          n8n_workflow_id: string | null
          name: string
          organization_id: string
          published_at: string | null
          published_by: string | null
          status: string | null
          successful_executions: number | null
          total_executions: number | null
          trigger_config: Json
          trigger_type: string
          updated_at: string | null
          version: number | null
          whatsapp_account_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          failed_executions?: number | null
          folder?: string | null
          id?: string
          is_active?: boolean | null
          last_execution_at?: string | null
          n8n_webhook_url?: string | null
          n8n_workflow_id?: string | null
          name: string
          organization_id: string
          published_at?: string | null
          published_by?: string | null
          status?: string | null
          successful_executions?: number | null
          total_executions?: number | null
          trigger_config: Json
          trigger_type: string
          updated_at?: string | null
          version?: number | null
          whatsapp_account_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          failed_executions?: number | null
          folder?: string | null
          id?: string
          is_active?: boolean | null
          last_execution_at?: string | null
          n8n_webhook_url?: string | null
          n8n_workflow_id?: string | null
          name?: string
          organization_id?: string
          published_at?: string | null
          published_by?: string | null
          status?: string | null
          successful_executions?: number | null
          total_executions?: number | null
          trigger_config?: Json
          trigger_type?: string
          updated_at?: string | null
          version?: number | null
          whatsapp_account_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flows_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flows_whatsapp_account_id_fkey"
            columns: ["whatsapp_account_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_accounts"
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
          whatsapp_account_id: string | null
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
          whatsapp_account_id?: string | null
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
          whatsapp_account_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "webhook_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "webhook_logs_whatsapp_account_id_fkey"
            columns: ["whatsapp_account_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_accounts: {
        Row: {
          access_token_encrypted: string | null
          app_id: string | null
          app_secret_encrypted: string | null
          business_manager_id: string | null
          business_name: string | null
          business_vertical: string | null
          created_at: string | null
          health_status: string | null
          id: string
          last_error_message: string | null
          last_health_check_at: string | null
          messages_sent_today: number | null
          meta_data: Json | null
          name: string
          organization_id: string
          proxy_enabled: boolean | null
          proxy_password_encrypted: string | null
          proxy_type: string | null
          proxy_url: string | null
          proxy_username: string | null
          rate_limit_per_day: number | null
          rate_limit_per_second: number | null
          rate_limit_reset_at: string | null
          status: string | null
          updated_at: string | null
          waba_id: string
          webhook_secret: string | null
          webhook_url: string | null
          webhook_verify_token: string | null
        }
        Insert: {
          access_token_encrypted?: string | null
          app_id?: string | null
          app_secret_encrypted?: string | null
          business_manager_id?: string | null
          business_name?: string | null
          business_vertical?: string | null
          created_at?: string | null
          health_status?: string | null
          id?: string
          last_error_message?: string | null
          last_health_check_at?: string | null
          messages_sent_today?: number | null
          meta_data?: Json | null
          name: string
          organization_id: string
          proxy_enabled?: boolean | null
          proxy_password_encrypted?: string | null
          proxy_type?: string | null
          proxy_url?: string | null
          proxy_username?: string | null
          rate_limit_per_day?: number | null
          rate_limit_per_second?: number | null
          rate_limit_reset_at?: string | null
          status?: string | null
          updated_at?: string | null
          waba_id: string
          webhook_secret?: string | null
          webhook_url?: string | null
          webhook_verify_token?: string | null
        }
        Update: {
          access_token_encrypted?: string | null
          app_id?: string | null
          app_secret_encrypted?: string | null
          business_manager_id?: string | null
          business_name?: string | null
          business_vertical?: string | null
          created_at?: string | null
          health_status?: string | null
          id?: string
          last_error_message?: string | null
          last_health_check_at?: string | null
          messages_sent_today?: number | null
          meta_data?: Json | null
          name?: string
          organization_id?: string
          proxy_enabled?: boolean | null
          proxy_password_encrypted?: string | null
          proxy_type?: string | null
          proxy_url?: string | null
          proxy_username?: string | null
          rate_limit_per_day?: number | null
          rate_limit_per_second?: number | null
          rate_limit_reset_at?: string | null
          status?: string | null
          updated_at?: string | null
          waba_id?: string
          webhook_secret?: string | null
          webhook_url?: string | null
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
      get_dashboard_metrics: { Args: { org_id: string }; Returns: Json }
      get_message_status_distribution: {
        Args: { org_id: string }
        Returns: Json
      }
      get_messages_per_day: { Args: { org_id: string }; Returns: Json }
      get_pending_conversations: {
        Args: { hours_threshold?: number; org_id: string }
        Returns: Json
      }
      get_recent_activity: {
        Args: { limit_count?: number; org_id: string }
        Returns: Json
      }
      get_top_flows: {
        Args: { limit_count?: number; org_id: string }
        Returns: Json
      }
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

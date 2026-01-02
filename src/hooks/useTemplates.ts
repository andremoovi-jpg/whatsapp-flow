import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useOrganization } from '@/contexts/OrganizationContext';
import { toast } from 'sonner';
import type { Json } from '@/integrations/supabase/types';

export interface TemplateButton {
  type: 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER';
  text: string;
  url?: string;
  phone_number?: string;
}

export interface TemplateComponent {
  type: 'HEADER' | 'BODY' | 'FOOTER' | 'BUTTONS';
  format?: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
  text?: string;
  buttons?: TemplateButton[];
}

export interface Template {
  id: string;
  whatsapp_account_id: string;
  template_id: string;
  name: string;
  language: string;
  category: string | null;
  status: string | null;
  components: TemplateComponent[];
  example_values: Record<string, string> | null;
  created_at: string | null;
  updated_at: string | null;
  synced_at: string | null;
}

interface TemplateFilters {
  status?: string;
  search?: string;
}

export function useTemplates(filters: TemplateFilters = {}) {
  const { currentOrg } = useOrganization();
  const organizationId = currentOrg?.id;

  return useQuery({
    queryKey: ['templates', organizationId, filters],
    queryFn: async () => {
      if (!organizationId) return [];

      // First get whatsapp accounts for this organization
      const { data: accounts, error: accountsError } = await supabase
        .from('whatsapp_accounts')
        .select('id')
        .eq('organization_id', organizationId);

      if (accountsError) throw accountsError;
      if (!accounts || accounts.length === 0) return [];

      const accountIds = accounts.map(a => a.id);

      let query = supabase
        .from('message_templates')
        .select('*')
        .in('whatsapp_account_id', accountIds)
        .order('created_at', { ascending: false });

      if (filters.status && filters.status !== 'all') {
        query = query.eq('status', filters.status.toUpperCase());
      }

      if (filters.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      return (data || []).map(t => ({
        ...t,
        components: (t.components as unknown as TemplateComponent[]) || [],
        example_values: t.example_values as Record<string, string> | null,
      })) as Template[];
    },
    enabled: !!organizationId,
  });
}

export function useSyncTemplates() {
  const queryClient = useQueryClient();
  const { currentOrg } = useOrganization();

  return useMutation({
    mutationFn: async () => {
      if (!currentOrg?.id) {
        throw new Error('Organização não selecionada');
      }

      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        throw new Error('Sessão expirada');
      }

      const { data, error } = await supabase.functions.invoke<{ synced: number; message?: string }>('sync-templates', {
        body: { organization_id: currentOrg.id },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      toast.success(`Templates sincronizados: ${data?.synced || 0} templates`);
    },
    onError: (error: Error) => {
      console.error('Sync error:', error);
      toast.error('Erro ao sincronizar templates: ' + error.message);
    },
  });
}

// Helper function to extract variables from template text
export function extractVariables(text: string): string[] {
  const matches = text.match(/\{\{(\d+)\}\}/g);
  return matches ? [...new Set(matches)] : [];
}

// Helper function to replace variables with values
export function replaceVariables(text: string, variables: Record<string, string>): string {
  let result = text;
  Object.entries(variables).forEach(([key, value]) => {
    result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value || `{{${key}}}`);
  });
  return result;
}

// Get component by type
export function getComponent(components: TemplateComponent[], type: string): TemplateComponent | undefined {
  return components.find(c => c.type === type);
}

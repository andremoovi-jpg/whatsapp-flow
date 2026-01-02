import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useOrganization } from '@/contexts/OrganizationContext';
import { toast } from 'sonner';
import type { WhatsAppAccount } from '@/contexts/WABAContext';

export interface CreateWABAData {
  name: string;
  waba_id: string;
  business_manager_id?: string;
  app_id?: string;
  access_token: string;
  app_secret?: string;
  proxy_enabled?: boolean;
  proxy_type?: string;
  proxy_url?: string;
  proxy_username?: string;
  proxy_password?: string;
}

export interface UpdateWABAData extends Partial<CreateWABAData> {
  id: string;
}

export function useWhatsAppAccounts() {
  const { currentOrg } = useOrganization();

  return useQuery({
    queryKey: ['whatsapp-accounts', currentOrg?.id],
    queryFn: async () => {
      if (!currentOrg?.id) return [];

      const { data, error } = await supabase
        .from('whatsapp_accounts')
        .select('*')
        .eq('organization_id', currentOrg.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as WhatsAppAccount[];
    },
    enabled: !!currentOrg?.id,
  });
}

export function useWhatsAppAccount(wabaId: string | undefined) {
  return useQuery({
    queryKey: ['whatsapp-account', wabaId],
    queryFn: async () => {
      if (!wabaId) return null;

      const { data, error } = await supabase
        .from('whatsapp_accounts')
        .select('*')
        .eq('id', wabaId)
        .maybeSingle();

      if (error) throw error;
      return data as WhatsAppAccount | null;
    },
    enabled: !!wabaId,
  });
}

export function useCreateWABA() {
  const queryClient = useQueryClient();
  const { currentOrg } = useOrganization();

  return useMutation({
    mutationFn: async (data: CreateWABAData) => {
      if (!currentOrg?.id) throw new Error('Organização não selecionada');

      // Generate webhook verify token
      const webhookVerifyToken = crypto.randomUUID().replace(/-/g, '');

      const { data: result, error } = await supabase
        .from('whatsapp_accounts')
        .insert({
          organization_id: currentOrg.id,
          name: data.name,
          waba_id: data.waba_id,
          business_manager_id: data.business_manager_id || null,
          app_id: data.app_id || null,
          access_token_encrypted: data.access_token, // In production, encrypt this
          app_secret_encrypted: data.app_secret || null,
          webhook_verify_token: webhookVerifyToken,
          proxy_enabled: data.proxy_enabled || false,
          proxy_type: data.proxy_type || 'http',
          proxy_url: data.proxy_url || null,
          proxy_username: data.proxy_username || null,
          proxy_password_encrypted: data.proxy_password || null,
          status: 'pending',
          health_status: 'unknown',
        })
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whatsapp-accounts'] });
      toast.success('Conta WhatsApp adicionada!');
    },
    onError: (error: Error) => {
      toast.error('Erro ao adicionar conta: ' + error.message);
    },
  });
}

export function useUpdateWABA() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, access_token, app_secret, proxy_password, ...data }: UpdateWABAData) => {
      const updateData: Record<string, unknown> = { ...data };
      
      if (access_token) {
        updateData.access_token_encrypted = access_token;
      }
      if (app_secret) {
        updateData.app_secret_encrypted = app_secret;
      }
      if (proxy_password) {
        updateData.proxy_password_encrypted = proxy_password;
      }

      const { error } = await supabase
        .from('whatsapp_accounts')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['whatsapp-accounts'] });
      queryClient.invalidateQueries({ queryKey: ['whatsapp-account', variables.id] });
      toast.success('Conta atualizada!');
    },
    onError: (error: Error) => {
      toast.error('Erro ao atualizar: ' + error.message);
    },
  });
}

export function useDeleteWABA() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (wabaId: string) => {
      const { error } = await supabase
        .from('whatsapp_accounts')
        .delete()
        .eq('id', wabaId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whatsapp-accounts'] });
      toast.success('Conta removida!');
    },
    onError: (error: Error) => {
      toast.error('Erro ao remover: ' + error.message);
    },
  });
}

export function usePhoneNumbers(wabaId: string | undefined) {
  return useQuery({
    queryKey: ['phone-numbers', wabaId],
    queryFn: async () => {
      if (!wabaId) return [];

      const { data, error } = await supabase
        .from('phone_numbers')
        .select('*')
        .eq('whatsapp_account_id', wabaId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!wabaId,
  });
}

export function useUpdatePhoneNumber() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string; display_name?: string; is_default?: boolean }) => {
      const { error } = await supabase
        .from('phone_numbers')
        .update(data)
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phone-numbers'] });
      toast.success('Número atualizado!');
    },
    onError: (error: Error) => {
      toast.error('Erro ao atualizar: ' + error.message);
    },
  });
}

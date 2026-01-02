import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useEffect } from 'react';

export interface Conversation {
  id: string;
  organization_id: string;
  contact_id: string;
  phone_number_id: string | null;
  status: string | null;
  assigned_to: string | null;
  window_expires_at: string | null;
  last_message_at: string | null;
  last_message_direction: string | null;
  unread_count: number | null;
  created_at: string | null;
  contact?: {
    id: string;
    name: string | null;
    phone_number: string;
    tags: string[] | null;
    custom_fields: Record<string, unknown> | null;
    profile_picture_url: string | null;
  };
}

export interface Message {
  id: string;
  conversation_id: string;
  contact_id: string;
  whatsapp_message_id: string | null;
  direction: string;
  type: string;
  content: Record<string, unknown>;
  status: string | null;
  error_message: string | null;
  sent_at: string | null;
  delivered_at: string | null;
  read_at: string | null;
  created_at: string | null;
}

export type ConversationFilter = 'all' | 'open' | 'pending' | 'closed';

export function useConversations(filter: ConversationFilter = 'all', search: string = '') {
  const { currentOrg } = useOrganization();

  return useQuery({
    queryKey: ['conversations', currentOrg?.id, filter, search],
    queryFn: async () => {
      if (!currentOrg?.id) return [];

      let query = supabase
        .from('conversations')
        .select(`
          *,
          contact:contacts(id, name, phone_number, tags, custom_fields, profile_picture_url)
        `)
        .eq('organization_id', currentOrg.id)
        .order('last_message_at', { ascending: false, nullsFirst: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Filter by search if provided
      let conversations = data as Conversation[];
      if (search) {
        const searchLower = search.toLowerCase();
        conversations = conversations.filter(conv => 
          conv.contact?.name?.toLowerCase().includes(searchLower) ||
          conv.contact?.phone_number?.includes(search)
        );
      }

      return conversations;
    },
    enabled: !!currentOrg?.id,
  });
}

export function useMessages(conversationId: string | null) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      if (!conversationId) return [];

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as Message[];
    },
    enabled: !!conversationId,
  });

  // Real-time subscription for new messages
  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, queryClient]);

  return query;
}

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      conversationId, 
      contactId, 
      content, 
      type = 'text' 
    }: { 
      conversationId: string; 
      contactId: string; 
      content: Record<string, unknown>; 
      type?: string;
    }) => {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          contact_id: contactId,
          direction: 'outbound',
          type,
          content: content as unknown as import('@/integrations/supabase/types').Json,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;

      // Update conversation's last_message_at
      await supabase
        .from('conversations')
        .update({ 
          last_message_at: new Date().toISOString(),
          last_message_direction: 'outbound',
        })
        .eq('id', conversationId);

      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['messages', variables.conversationId] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

export function useUpdateConversationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('conversations')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (conversationId: string) => {
      const { error } = await supabase
        .from('conversations')
        .update({ unread_count: 0 })
        .eq('id', conversationId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

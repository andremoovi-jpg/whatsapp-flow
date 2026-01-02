import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useWABA } from '@/contexts/WABAContext';
import { useState, useEffect, useCallback } from 'react';

export interface QueueMetric {
  id: string;
  whatsapp_account_id: string;
  waiting: number;
  active: number;
  completed: number;
  failed: number;
  delayed: number;
  throughput_per_second: number;
  avg_processing_time_ms: number;
  recorded_at: string;
}

export interface PhoneNumberMetric {
  id: string;
  phone_number_id: string;
  period_start: string;
  period_type: string;
  messages_sent: number;
  messages_delivered: number;
  messages_read: number;
  messages_failed: number;
  avg_delivery_time_ms: number | null;
  max_throughput_achieved: number | null;
  rate_limit_hits: number;
}

export interface QueueStatus {
  latest: {
    waiting: number;
    active: number;
    completed: number;
    failed: number;
    delayed: number;
    throughput: number;
    avgProcessingTime: number;
    recordedAt: string;
  } | null;
  history: Array<{
    recorded_at: string;
    throughput: number;
    waiting: number;
    active: number;
    completed: number;
    failed: number;
  }> | null;
  todayStats: {
    totalCompleted: number;
    totalFailed: number;
    avgThroughput: number;
    maxThroughput: number;
  };
}

export interface PhonePerformance {
  summary: {
    totalSent: number;
    totalDelivered: number;
    totalRead: number;
    totalFailed: number;
    avgDeliveryTime: number;
    maxThroughput: number;
    rateLimitHits: number;
  };
  history: Array<{
    period_start: string;
    messages_sent: number;
    messages_delivered: number;
    messages_failed: number;
    throughput: number;
  }> | null;
}

export function useQueueStatus(wabaId?: string) {
  return useQuery({
    queryKey: ['queue-status', wabaId],
    queryFn: async () => {
      if (!wabaId) return null;
      
      const { data, error } = await supabase.rpc('get_queue_status', {
        waba_id: wabaId,
      });

      if (error) throw error;
      return data as unknown as QueueStatus;
    },
    enabled: !!wabaId,
    refetchInterval: 5000,
  });
}

export function usePhonePerformance(phoneId?: string, periodType: string = 'hour') {
  return useQuery({
    queryKey: ['phone-performance', phoneId, periodType],
    queryFn: async () => {
      if (!phoneId) return null;
      
      const { data, error } = await supabase.rpc('get_phone_performance', {
        phone_id: phoneId,
        period_type_param: periodType,
      });

      if (error) throw error;
      return data as unknown as PhonePerformance;
    },
    enabled: !!phoneId,
  });
}

export function useRealtimeMetrics(wabaId?: string) {
  const [metrics, setMetrics] = useState<Array<{
    timestamp: string;
    throughput: number;
    waiting: number;
    active: number;
    completed: number;
    failed: number;
  }>>([]);

  const fetchLatest = useCallback(async () => {
    if (!wabaId) return;

    const { data, error } = await supabase
      .from('queue_metrics')
      .select('*')
      .eq('whatsapp_account_id', wabaId)
      .order('recorded_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      setMetrics(prev => {
        const newPoint = {
          timestamp: data.recorded_at,
          throughput: Number(data.throughput_per_second) || 0,
          waiting: data.waiting || 0,
          active: data.active || 0,
          completed: data.completed || 0,
          failed: data.failed || 0,
        };
        
        // Keep last 300 points (5 minutes at 1s intervals)
        const updated = [...prev, newPoint];
        return updated.slice(-300);
      });
    }
  }, [wabaId]);

  useEffect(() => {
    if (!wabaId) return;

    // Initial fetch
    fetchLatest();

    // Poll every second
    const interval = setInterval(fetchLatest, 1000);

    return () => clearInterval(interval);
  }, [wabaId, fetchLatest]);

  return metrics;
}

export function useQueueMetricsHistory(wabaId?: string, period: 'hour' | 'day' | 'week' = 'hour') {
  const intervalMap = {
    hour: '1 hour',
    day: '24 hours',
    week: '7 days',
  };

  return useQuery({
    queryKey: ['queue-metrics-history', wabaId, period],
    queryFn: async () => {
      if (!wabaId) return [];
      
      const { data, error } = await supabase
        .from('queue_metrics')
        .select('*')
        .eq('whatsapp_account_id', wabaId)
        .gte('recorded_at', new Date(Date.now() - (period === 'hour' ? 3600000 : period === 'day' ? 86400000 : 604800000)).toISOString())
        .order('recorded_at', { ascending: true });

      if (error) throw error;
      return data as QueueMetric[];
    },
    enabled: !!wabaId,
  });
}

export function usePhoneNumbersWithMetrics(wabaId?: string) {
  return useQuery({
    queryKey: ['phone-numbers-with-metrics', wabaId],
    queryFn: async () => {
      if (!wabaId) return [];
      
      const { data: phones, error: phonesError } = await supabase
        .from('phone_numbers')
        .select('*')
        .eq('whatsapp_account_id', wabaId);

      if (phonesError) throw phonesError;

      // Get metrics for each phone
      const phonesWithMetrics = await Promise.all(
        (phones || []).map(async (phone) => {
          const { data: metrics } = await supabase
            .from('phone_number_metrics')
            .select('*')
            .eq('phone_number_id', phone.id)
            .eq('period_type', 'day')
            .gte('period_start', new Date().toISOString().split('T')[0])
            .order('period_start', { ascending: false })
            .limit(1)
            .maybeSingle();

          return {
            ...phone,
            todayMetrics: metrics,
          };
        })
      );

      return phonesWithMetrics;
    },
    enabled: !!wabaId,
    refetchInterval: 10000,
  });
}

export function useRunningCampaigns() {
  const { selectedWABA } = useWABA();

  return useQuery({
    queryKey: ['running-campaigns', selectedWABA?.id],
    queryFn: async () => {
      if (!selectedWABA?.id) return [];
      
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('whatsapp_account_id', selectedWABA.id)
        .in('status', ['running', 'scheduled'])
        .order('started_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!selectedWABA?.id,
    refetchInterval: 5000,
  });
}

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      throw new Error('Não autorizado');
    }

    // Verify user session
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error('Sessão inválida');
    }

    const { organization_id } = await req.json();
    
    if (!organization_id) {
      throw new Error('organization_id é obrigatório');
    }

    console.log(`[sync-templates] Starting sync for organization: ${organization_id}`);

    // Get WhatsApp accounts for this organization
    const { data: accounts, error: accountsError } = await supabase
      .from('whatsapp_accounts')
      .select('id, waba_id, access_token_encrypted')
      .eq('organization_id', organization_id);

    if (accountsError) {
      console.error('[sync-templates] Error fetching accounts:', accountsError);
      throw new Error('Erro ao buscar contas WhatsApp');
    }

    if (!accounts || accounts.length === 0) {
      console.log('[sync-templates] No WhatsApp accounts found');
      return new Response(
        JSON.stringify({ success: true, synced: 0, message: 'Nenhuma conta WhatsApp configurada' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let totalSynced = 0;

    for (const account of accounts) {
      console.log(`[sync-templates] Processing account: ${account.id}`);

      // In a real implementation, you would:
      // 1. Decrypt access_token_encrypted
      // 2. Call Meta's Graph API to fetch templates
      // 3. For now, we'll simulate with mock data
      
      // Simulated Meta API response (in production, call the real API)
      const mockTemplates = [
        {
          id: `meta_template_${Date.now()}_1`,
          name: 'welcome_message',
          language: 'pt_BR',
          category: 'UTILITY',
          status: 'APPROVED',
          components: [
            { type: 'HEADER', format: 'TEXT', text: 'Bem-vindo! 🎉' },
            { type: 'BODY', text: 'Olá {{1}}, obrigado por entrar em contato. Como podemos ajudar?' },
            { type: 'FOOTER', text: 'Responda a qualquer momento' },
            { 
              type: 'BUTTONS', 
              buttons: [
                { type: 'QUICK_REPLY', text: 'Ver produtos' },
                { type: 'QUICK_REPLY', text: 'Falar com atendente' }
              ]
            }
          ]
        },
        {
          id: `meta_template_${Date.now()}_2`,
          name: 'order_confirmation',
          language: 'pt_BR',
          category: 'UTILITY',
          status: 'APPROVED',
          components: [
            { type: 'HEADER', format: 'TEXT', text: 'Pedido Confirmado ✅' },
            { type: 'BODY', text: 'Seu pedido #{{1}} foi confirmado!\n\nValor: R$ {{2}}\nPrazo de entrega: {{3}} dias úteis' },
            { type: 'FOOTER', text: 'Acompanhe seu pedido pelo link' },
            { 
              type: 'BUTTONS', 
              buttons: [
                { type: 'URL', text: 'Rastrear Pedido', url: 'https://example.com/track/{{1}}' }
              ]
            }
          ]
        },
        {
          id: `meta_template_${Date.now()}_3`,
          name: 'black_friday_promo',
          language: 'pt_BR',
          category: 'MARKETING',
          status: 'APPROVED',
          components: [
            { type: 'HEADER', format: 'IMAGE' },
            { type: 'BODY', text: '🔥 BLACK FRIDAY 🔥\n\nOlá {{1}}, aproveite até 70% de desconto!\n\nOferta válida até {{2}}.' },
            { type: 'FOOTER', text: 'Não perca!' },
            { 
              type: 'BUTTONS', 
              buttons: [
                { type: 'URL', text: 'Ver Ofertas', url: 'https://example.com/black-friday' },
                { type: 'QUICK_REPLY', text: 'Não tenho interesse' }
              ]
            }
          ]
        },
        {
          id: `meta_template_${Date.now()}_4`,
          name: 'nps_survey',
          language: 'pt_BR',
          category: 'UTILITY',
          status: 'PENDING',
          components: [
            { type: 'BODY', text: 'Olá {{1}}! De 0 a 10, qual a probabilidade de você recomendar nossa empresa?' },
            { 
              type: 'BUTTONS', 
              buttons: [
                { type: 'QUICK_REPLY', text: '0-6 Baixa' },
                { type: 'QUICK_REPLY', text: '7-8 Média' },
                { type: 'QUICK_REPLY', text: '9-10 Alta' }
              ]
            }
          ]
        },
        {
          id: `meta_template_${Date.now()}_5`,
          name: 'appointment_reminder',
          language: 'pt_BR',
          category: 'UTILITY',
          status: 'APPROVED',
          components: [
            { type: 'HEADER', format: 'TEXT', text: '📅 Lembrete de Agendamento' },
            { type: 'BODY', text: 'Olá {{1}}, lembrando que você tem um agendamento:\n\n📍 {{2}}\n📅 {{3}}\n⏰ {{4}}' },
            { type: 'FOOTER', text: 'Confirme sua presença' },
            { 
              type: 'BUTTONS', 
              buttons: [
                { type: 'QUICK_REPLY', text: 'Confirmar' },
                { type: 'QUICK_REPLY', text: 'Reagendar' },
                { type: 'QUICK_REPLY', text: 'Cancelar' }
              ]
            }
          ]
        }
      ];

      // Upsert templates
      for (const template of mockTemplates) {
        const { error: upsertError } = await supabase
          .from('message_templates')
          .upsert({
            whatsapp_account_id: account.id,
            template_id: template.id,
            name: template.name,
            language: template.language,
            category: template.category,
            status: template.status,
            components: template.components,
            synced_at: new Date().toISOString(),
          }, {
            onConflict: 'whatsapp_account_id,template_id',
          });

        if (upsertError) {
          console.error('[sync-templates] Error upserting template:', upsertError);
        } else {
          totalSynced++;
        }
      }
    }

    console.log(`[sync-templates] Sync complete. Total synced: ${totalSynced}`);

    return new Response(
      JSON.stringify({ success: true, synced: totalSynced }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[sync-templates] Error:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

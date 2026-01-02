import { useState } from 'react';
import { Building2, Users, Key, Webhook, Bell, CreditCard, Shield, Plug } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOrganization } from '@/contexts/OrganizationContext';

export default function Settings() {
  const { currentOrg } = useOrganization();
  const [orgName, setOrgName] = useState(currentOrg?.name || '');

  return (
    <DashboardLayout breadcrumbs={[{ label: 'Configurações' }]}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações da sua organização
          </p>
        </div>

        <Tabs defaultValue="organization" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="organization">Organização</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="billing">Faturamento</TabsTrigger>
          </TabsList>

          <TabsContent value="organization" className="space-y-6">
            {/* General Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Informações da Organização
                </CardTitle>
                <CardDescription>
                  Configure as informações básicas da sua organização
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="orgName">Nome da Organização</Label>
                    <Input
                      id="orgName"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={currentOrg?.slug || ''}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>
                <Button>Salvar Alterações</Button>
              </CardContent>
            </Card>

            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Membros da Equipe
                </CardTitle>
                <CardDescription>
                  Gerencie quem tem acesso à sua organização
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Você', email: 'admin@empresa.com', role: 'admin' },
                    { name: 'Maria Silva', email: 'maria@empresa.com', role: 'member' },
                  ].map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                        member.role === 'admin' ? 'badge-success' : 'bg-muted text-muted-foreground'
                      }`}>
                        {member.role === 'admin' ? 'Admin' : 'Membro'}
                      </span>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    Convidar Membro
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificações
                </CardTitle>
                <CardDescription>
                  Configure suas preferências de notificação
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Notificações por email', description: 'Receba alertas importantes por email', enabled: true },
                  { label: 'Novas mensagens', description: 'Notificar quando receber novas mensagens', enabled: true },
                  { label: 'Falhas de envio', description: 'Alertar sobre falhas em campanhas', enabled: true },
                  { label: 'Relatórios semanais', description: 'Resumo semanal de atividades', enabled: false },
                ].map((setting, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{setting.label}</p>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                    <Switch defaultChecked={setting.enabled} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="whatsapp" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plug className="h-5 w-5" />
                  Contas WhatsApp
                </CardTitle>
                <CardDescription>
                  Conecte e gerencie suas contas WhatsApp Business
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Plug className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Nenhuma conta conectada</h3>
                  <p className="text-muted-foreground mb-4">
                    Conecte sua conta WhatsApp Business para começar
                  </p>
                  <Button>Conectar WhatsApp</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Webhook className="h-5 w-5" />
                  Webhooks
                </CardTitle>
                <CardDescription>
                  Configure webhooks para receber eventos em tempo real
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>URL do Webhook</Label>
                  <Input placeholder="https://seu-servidor.com/webhook" />
                </div>
                <div className="space-y-2">
                  <Label>Token de Verificação</Label>
                  <Input placeholder="Token secreto" type="password" />
                </div>
                <Button>Salvar Webhook</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Chaves de API
                </CardTitle>
                <CardDescription>
                  Gerencie suas chaves de API para integrações externas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Key className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Nenhuma chave de API</h3>
                  <p className="text-muted-foreground mb-4">
                    Crie uma chave de API para integrar com seus sistemas
                  </p>
                  <Button>Criar Chave de API</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Segurança
                </CardTitle>
                <CardDescription>
                  Configure opções de segurança da API
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Rate Limiting', description: 'Limite de 1000 requisições por minuto', enabled: true },
                  { label: 'IP Whitelist', description: 'Restringir acesso por IP', enabled: false },
                  { label: 'Logs de Acesso', description: 'Registrar todas as requisições', enabled: true },
                ].map((setting, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{setting.label}</p>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                    <Switch defaultChecked={setting.enabled} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Plano Atual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div>
                    <p className="text-lg font-semibold">Plano Gratuito</p>
                    <p className="text-sm text-muted-foreground">
                      Até 1.000 mensagens/mês • 1 número
                    </p>
                  </div>
                  <Button>Fazer Upgrade</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Uso do Mês</CardTitle>
                <CardDescription>
                  Acompanhe o consumo do seu plano
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Mensagens', used: 450, total: 1000 },
                  { label: 'Contatos', used: 234, total: 500 },
                  { label: 'Campanhas', used: 3, total: 5 },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.label}</span>
                      <span className="font-medium">{item.used} / {item.total}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(item.used / item.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

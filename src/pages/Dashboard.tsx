import { 
  MessageSquare, 
  Users, 
  Send, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useOrganization } from '@/contexts/OrganizationContext';

const stats = [
  {
    title: 'Mensagens Enviadas',
    value: '12,543',
    change: '+12.5%',
    trend: 'up',
    icon: Send,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    title: 'Conversas Ativas',
    value: '234',
    change: '+8.2%',
    trend: 'up',
    icon: MessageSquare,
    color: 'text-info',
    bgColor: 'bg-info/10',
  },
  {
    title: 'Contatos Totais',
    value: '5,678',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    title: 'Taxa de Entrega',
    value: '98.5%',
    change: '-0.2%',
    trend: 'down',
    icon: CheckCircle2,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
];

const recentConversations = [
  { name: 'Maria Silva', message: 'Olá, gostaria de saber mais sobre...', time: '2 min', unread: true },
  { name: 'João Santos', message: 'Obrigado pelo atendimento!', time: '15 min', unread: false },
  { name: 'Ana Costa', message: 'Quando chega meu pedido?', time: '32 min', unread: true },
  { name: 'Pedro Lima', message: 'Vocês têm esse produto em...', time: '1h', unread: false },
];

const activeCampaigns = [
  { name: 'Black Friday 2024', status: 'running', sent: 1250, total: 5000 },
  { name: 'Lançamento Produto X', status: 'scheduled', sent: 0, total: 3200 },
  { name: 'Newsletter Mensal', status: 'completed', sent: 4500, total: 4500 },
];

export default function Dashboard() {
  const { currentOrg } = useOrganization();

  return (
    <DashboardLayout 
      breadcrumbs={[
        { label: currentOrg?.name || 'Organização' },
        { label: 'Dashboard' },
      ]}
    >
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Bom dia! 👋</h1>
            <p className="text-muted-foreground">
              Aqui está um resumo das suas atividades hoje.
            </p>
          </div>
          <Button>
            Nova Campanha
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="stat-card">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === 'up' ? 'text-success' : 'text-destructive'
                  }`}>
                    {stat.change}
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Conversations */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Conversas Recentes</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                Ver todas
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentConversations.map((conv, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {conv.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    {conv.unread && (
                      <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full border-2 border-card" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{conv.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{conv.message}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {conv.time}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Active Campaigns */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Campanhas Ativas</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                Ver todas
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeCampaigns.map((campaign, index) => (
                <div key={index} className="p-4 rounded-lg border border-border/50">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-medium">{campaign.name}</p>
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                      campaign.status === 'running' 
                        ? 'badge-success' 
                        : campaign.status === 'scheduled'
                        ? 'badge-warning'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {campaign.status === 'running' ? 'Em andamento' 
                        : campaign.status === 'scheduled' ? 'Agendada' 
                        : 'Concluída'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className="font-medium">
                        {campaign.sent.toLocaleString()} / {campaign.total.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${(campaign.sent / campaign.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Criar Fluxo', icon: TrendingUp, color: 'text-primary' },
                { label: 'Importar Contatos', icon: Users, color: 'text-info' },
                { label: 'Novo Template', icon: MessageSquare, color: 'text-success' },
                { label: 'Disparar Campanha', icon: Send, color: 'text-warning' },
              ].map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center gap-2 hover:bg-accent hover:border-primary/30"
                >
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                  <span>{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

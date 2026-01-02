import { Plus, Search, Calendar, MoreHorizontal, Send, Clock, CheckCircle2 } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const campaigns = [
  {
    id: '1',
    name: 'Black Friday 2024',
    template: 'Promoção BF',
    status: 'running',
    scheduled: null,
    stats: { total: 5000, sent: 3250, delivered: 3100, read: 2450, failed: 150 },
  },
  {
    id: '2',
    name: 'Lançamento Produto X',
    template: 'Novidades',
    status: 'scheduled',
    scheduled: '25/12/2024 às 10:00',
    stats: { total: 3200, sent: 0, delivered: 0, read: 0, failed: 0 },
  },
  {
    id: '3',
    name: 'Newsletter Dezembro',
    template: 'Newsletter Mensal',
    status: 'completed',
    scheduled: null,
    stats: { total: 4500, sent: 4500, delivered: 4380, read: 3200, failed: 120 },
  },
  {
    id: '4',
    name: 'Pesquisa de Satisfação',
    template: 'NPS Survey',
    status: 'draft',
    scheduled: null,
    stats: { total: 2000, sent: 0, delivered: 0, read: 0, failed: 0 },
  },
];

export default function Campaigns() {
  return (
    <DashboardLayout breadcrumbs={[{ label: 'Campanhas' }]}>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Campanhas</h1>
            <p className="text-muted-foreground">
              Gerencie suas campanhas de disparo em massa
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Campanha
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: 'Campanhas Ativas', value: '3', icon: Send, color: 'text-primary' },
            { label: 'Mensagens Enviadas', value: '45.2k', icon: CheckCircle2, color: 'text-success' },
            { label: 'Taxa de Entrega', value: '97.2%', icon: CheckCircle2, color: 'text-info' },
            { label: 'Agendadas', value: '5', icon: Calendar, color: 'text-warning' },
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-2.5 rounded-lg bg-muted`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar campanhas..."
              className="pl-9"
            />
          </div>
          <Button variant="outline">Todas</Button>
          <Button variant="ghost">Em andamento</Button>
          <Button variant="ghost">Agendadas</Button>
          <Button variant="ghost">Concluídas</Button>
        </div>

        {/* Campaigns List */}
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      campaign.status === 'running' ? 'bg-success/10' :
                      campaign.status === 'scheduled' ? 'bg-warning/10' :
                      campaign.status === 'completed' ? 'bg-muted' : 'bg-primary/10'
                    }`}>
                      {campaign.status === 'running' ? (
                        <Send className="h-6 w-6 text-success animate-pulse" />
                      ) : campaign.status === 'scheduled' ? (
                        <Clock className="h-6 w-6 text-warning" />
                      ) : campaign.status === 'completed' ? (
                        <CheckCircle2 className="h-6 w-6 text-muted-foreground" />
                      ) : (
                        <Send className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{campaign.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Template: {campaign.template}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      campaign.status === 'running' ? 'badge-success' :
                      campaign.status === 'scheduled' ? 'badge-warning' :
                      campaign.status === 'completed' ? 'bg-muted text-muted-foreground' :
                      'bg-primary/10 text-primary'
                    }`}>
                      {campaign.status === 'running' ? 'Em andamento' :
                       campaign.status === 'scheduled' ? 'Agendada' :
                       campaign.status === 'completed' ? 'Concluída' : 'Rascunho'}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Duplicar</DropdownMenuItem>
                        {campaign.status === 'running' && (
                          <DropdownMenuItem>Pausar</DropdownMenuItem>
                        )}
                        {campaign.status === 'draft' && (
                          <DropdownMenuItem>Iniciar</DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-destructive">
                          Cancelar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {campaign.scheduled && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>Agendada para: {campaign.scheduled}</span>
                  </div>
                )}

                <div className="grid grid-cols-5 gap-4 mb-4">
                  {[
                    { label: 'Total', value: campaign.stats.total },
                    { label: 'Enviadas', value: campaign.stats.sent },
                    { label: 'Entregues', value: campaign.stats.delivered },
                    { label: 'Lidas', value: campaign.stats.read },
                    { label: 'Falhas', value: campaign.stats.failed, error: true },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <p className={`text-lg font-semibold ${stat.error && stat.value > 0 ? 'text-destructive' : ''}`}>
                        {stat.value.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {campaign.stats.total > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className="font-medium">
                        {Math.round((campaign.stats.sent / campaign.stats.total) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={(campaign.stats.sent / campaign.stats.total) * 100} 
                      className="h-2"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  ArrowLeft, 
  Pause, 
  Play, 
  Copy, 
  X, 
  Send, 
  CheckCircle2, 
  Eye, 
  AlertCircle,
  Search,
  Clock
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  useCampaign, 
  useCampaignMessages, 
  useCampaignRealtime,
  useUpdateCampaign,
  useDuplicateCampaign
} from '@/hooks/useCampaigns';
import { toast } from 'sonner';

export default function CampaignDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: campaign, isLoading } = useCampaign(id);
  const { data: messages = [], isLoading: messagesLoading } = useCampaignMessages(id, { 
    status: statusFilter, 
    search: searchQuery 
  });
  const updateCampaign = useUpdateCampaign();
  const duplicateCampaign = useDuplicateCampaign();
  
  // Enable real-time updates
  useCampaignRealtime(id);

  if (isLoading) {
    return (
      <DashboardLayout breadcrumbs={[{ label: 'Campanhas', href: '/campaigns' }, { label: 'Carregando...' }]}>
        <div className="space-y-6">
          <Skeleton className="h-12 w-64" />
          <div className="grid gap-4 md:grid-cols-5">
            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-24" />)}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!campaign) {
    return (
      <DashboardLayout breadcrumbs={[{ label: 'Campanhas', href: '/campaigns' }, { label: 'Não encontrada' }]}>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Campanha não encontrada</p>
          <Button asChild className="mt-4">
            <Link to="/campaigns">Voltar para Campanhas</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const stats = campaign.stats;
  const progress = stats.total > 0 ? (stats.sent / stats.total) * 100 : 0;

  const handlePause = () => {
    updateCampaign.mutate({ id: campaign.id, status: 'paused' });
    toast.success('Campanha pausada');
  };

  const handleResume = () => {
    updateCampaign.mutate({ id: campaign.id, status: 'running' });
    toast.success('Campanha retomada');
  };

  const handleCancel = () => {
    updateCampaign.mutate({ id: campaign.id, status: 'cancelled' });
    toast.success('Campanha cancelada');
    navigate('/campaigns');
  };

  const handleDuplicate = async () => {
    const newCampaign = await duplicateCampaign.mutateAsync(campaign.id);
    navigate(`/campaigns/${newCampaign.id}`);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }> = {
      pending: { variant: 'secondary', label: 'Pendente' },
      running: { variant: 'default', label: 'Em andamento' },
      paused: { variant: 'outline', label: 'Pausada' },
      scheduled: { variant: 'secondary', label: 'Agendada' },
      completed: { variant: 'default', label: 'Concluída' },
      cancelled: { variant: 'destructive', label: 'Cancelada' },
      draft: { variant: 'outline', label: 'Rascunho' },
    };
    const config = variants[status] || variants.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <Send className="h-4 w-4 text-blue-500" />;
      case 'delivered': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'read': return <Eye className="h-4 w-4 text-primary" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-destructive" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <DashboardLayout 
      breadcrumbs={[
        { label: 'Campanhas', href: '/campaigns' },
        { label: campaign.name }
      ]}
    >
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/campaigns">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">{campaign.name}</h1>
                {getStatusBadge(campaign.status)}
              </div>
              {campaign.scheduled_at && (
                <p className="text-sm text-muted-foreground mt-1">
                  Agendada para: {format(new Date(campaign.scheduled_at), "PPP 'às' HH:mm", { locale: ptBR })}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {campaign.status === 'running' && (
              <Button variant="outline" onClick={handlePause}>
                <Pause className="h-4 w-4 mr-2" />
                Pausar
              </Button>
            )}
            {campaign.status === 'paused' && (
              <Button variant="outline" onClick={handleResume}>
                <Play className="h-4 w-4 mr-2" />
                Retomar
              </Button>
            )}
            <Button variant="outline" onClick={handleDuplicate}>
              <Copy className="h-4 w-4 mr-2" />
              Duplicar
            </Button>
            {['draft', 'scheduled', 'running', 'paused'].includes(campaign.status) && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancelar campanha?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Mensagens já enviadas não serão afetadas.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Voltar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCancel}>Cancelar Campanha</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid gap-4 md:grid-cols-5">
          {[
            { label: 'Total', value: stats.total, icon: Users, color: 'text-foreground' },
            { label: 'Enviadas', value: stats.sent, icon: Send, color: 'text-blue-500' },
            { label: 'Entregues', value: stats.delivered, icon: CheckCircle2, color: 'text-green-500' },
            { label: 'Lidas', value: stats.read, icon: Eye, color: 'text-primary' },
            { label: 'Falhas', value: stats.failed, icon: AlertCircle, color: 'text-destructive' },
          ].map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{metric.value.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress */}
        {stats.total > 0 && (
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progresso do envio</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{stats.sent.toLocaleString()} enviadas</span>
                <span>{stats.total.toLocaleString()} total</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Messages List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Lista de Envios</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por telefone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-48"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="sent">Enviada</SelectItem>
                    <SelectItem value="delivered">Entregue</SelectItem>
                    <SelectItem value="read">Lida</SelectItem>
                    <SelectItem value="failed">Falha</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {messagesLoading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12" />)}
              </div>
            ) : messages.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhum envio registrado ainda
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contato</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Enviada em</TableHead>
                    <TableHead>Entregue em</TableHead>
                    <TableHead>Lida em</TableHead>
                    <TableHead>Erro</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.map((msg) => (
                    <TableRow key={msg.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{msg.contact?.name || 'Sem nome'}</p>
                          <p className="text-sm text-muted-foreground">{msg.contact?.phone_number}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getMessageStatusIcon(msg.status)}
                          <span className="capitalize">{msg.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {msg.sent_at ? format(new Date(msg.sent_at), 'dd/MM HH:mm') : '-'}
                      </TableCell>
                      <TableCell>
                        {msg.delivered_at ? format(new Date(msg.delivered_at), 'dd/MM HH:mm') : '-'}
                      </TableCell>
                      <TableCell>
                        {msg.read_at ? format(new Date(msg.read_at), 'dd/MM HH:mm') : '-'}
                      </TableCell>
                      <TableCell>
                        {msg.error_message && (
                          <span className="text-destructive text-sm">{msg.error_message}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

// Import Users icon that was missed
import { Users } from 'lucide-react';

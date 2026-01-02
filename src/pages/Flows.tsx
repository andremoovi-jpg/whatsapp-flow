import { Plus, Search, MoreHorizontal, Play, Pause, GitBranch, Zap } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const flows = [
  {
    id: '1',
    name: 'Boas-vindas',
    description: 'Fluxo de boas-vindas para novos contatos',
    trigger: 'Primeira mensagem',
    status: 'active',
    executions: 1234,
    lastRun: '2 min atrás',
  },
  {
    id: '2',
    name: 'Atendimento Suporte',
    description: 'Direcionamento automático para suporte',
    trigger: 'Palavra-chave: suporte',
    status: 'active',
    executions: 856,
    lastRun: '15 min atrás',
  },
  {
    id: '3',
    name: 'Carrinho Abandonado',
    description: 'Recuperação de carrinhos abandonados',
    trigger: 'Webhook externo',
    status: 'paused',
    executions: 432,
    lastRun: '2 horas atrás',
  },
  {
    id: '4',
    name: 'Pós-venda',
    description: 'Acompanhamento após compra',
    trigger: 'Webhook externo',
    status: 'draft',
    executions: 0,
    lastRun: 'Nunca',
  },
];

export default function Flows() {
  return (
    <DashboardLayout breadcrumbs={[{ label: 'Fluxos' }]}>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Fluxos de Automação</h1>
            <p className="text-muted-foreground">
              Crie e gerencie seus fluxos de automação
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Fluxo
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar fluxos..."
              className="pl-9"
            />
          </div>
          <Button variant="outline">Todos</Button>
          <Button variant="ghost">Ativos</Button>
          <Button variant="ghost">Pausados</Button>
          <Button variant="ghost">Rascunhos</Button>
        </div>

        {/* Flows Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {flows.map((flow) => (
            <Card key={flow.id} className="hover-lift cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <GitBranch className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={flow.status === 'active'} 
                      disabled={flow.status === 'draft'}
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Duplicar</DropdownMenuItem>
                        <DropdownMenuItem>Ver logs</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <h3 className="font-semibold mb-1">{flow.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {flow.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Zap className="h-3 w-3" />
                  <span>{flow.trigger}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-lg font-semibold">{flow.executions.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">execuções</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      flow.status === 'active' 
                        ? 'badge-success' 
                        : flow.status === 'paused'
                        ? 'badge-warning'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {flow.status === 'active' ? 'Ativo' : flow.status === 'paused' ? 'Pausado' : 'Rascunho'}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{flow.lastRun}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Create New Flow Card */}
          <Card className="border-dashed hover-lift cursor-pointer">
            <CardContent className="p-5 flex flex-col items-center justify-center h-full min-h-[200px] text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-1">Criar Novo Fluxo</h3>
              <p className="text-sm text-muted-foreground">
                Comece do zero ou use um template
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

import { Plus, Search, MoreHorizontal, FileText, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const templates = [
  {
    id: '1',
    name: 'boas_vindas',
    displayName: 'Boas-vindas',
    category: 'UTILITY',
    language: 'pt_BR',
    status: 'APPROVED',
    components: {
      header: 'Bem-vindo à nossa loja! 🎉',
      body: 'Olá {{1}}, obrigado por entrar em contato conosco. Estamos aqui para ajudar!',
      footer: 'Responda MENU para ver as opções',
    },
  },
  {
    id: '2',
    name: 'confirmacao_pedido',
    displayName: 'Confirmação de Pedido',
    category: 'UTILITY',
    language: 'pt_BR',
    status: 'APPROVED',
    components: {
      header: 'Pedido Confirmado ✅',
      body: 'Seu pedido #{{1}} foi confirmado! Valor: R$ {{2}}. Prazo de entrega: {{3}} dias úteis.',
      footer: 'Acompanhe pelo link abaixo',
    },
  },
  {
    id: '3',
    name: 'promocao_black_friday',
    displayName: 'Promoção Black Friday',
    category: 'MARKETING',
    language: 'pt_BR',
    status: 'APPROVED',
    components: {
      header: '🔥 BLACK FRIDAY 🔥',
      body: 'Ei {{1}}, aproveite até 70% de desconto em todos os produtos! Oferta válida até {{2}}.',
      footer: 'Não perca essa oportunidade',
    },
  },
  {
    id: '4',
    name: 'nps_survey',
    displayName: 'Pesquisa NPS',
    category: 'UTILITY',
    language: 'pt_BR',
    status: 'PENDING',
    components: {
      header: null,
      body: 'De 0 a 10, qual a probabilidade de você recomendar nossa empresa para um amigo?',
      footer: null,
    },
  },
  {
    id: '5',
    name: 'alerta_estoque',
    displayName: 'Alerta de Estoque',
    category: 'MARKETING',
    language: 'pt_BR',
    status: 'REJECTED',
    components: {
      header: '⚠️ Estoque Baixo',
      body: '{{1}}, o produto que você quer está acabando! Restam apenas {{2}} unidades.',
      footer: null,
    },
  },
];

export default function Templates() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'PENDING':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'REJECTED':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'Aprovado';
      case 'PENDING':
        return 'Pendente';
      case 'REJECTED':
        return 'Rejeitado';
      default:
        return status;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'MARKETING':
        return 'Marketing';
      case 'UTILITY':
        return 'Utilidade';
      case 'AUTHENTICATION':
        return 'Autenticação';
      default:
        return category;
    }
  };

  return (
    <DashboardLayout breadcrumbs={[{ label: 'Templates' }]}>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Templates</h1>
            <p className="text-muted-foreground">
              Gerencie seus templates de mensagem aprovados pela Meta
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              Sincronizar
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Template
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="approved">Aprovados</TabsTrigger>
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
              <TabsTrigger value="rejected">Rejeitados</TabsTrigger>
            </TabsList>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar templates..."
                className="pl-9"
              />
            </div>
          </div>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <Card key={template.id} className="hover-lift">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                          <DropdownMenuItem>Usar em campanha</DropdownMenuItem>
                          <DropdownMenuItem>Duplicar</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <h3 className="font-semibold mb-1">{template.displayName}</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {template.name} • {template.language}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-0.5 text-xs bg-muted rounded-full">
                        {getCategoryLabel(template.category)}
                      </span>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full flex items-center gap-1 ${
                        template.status === 'APPROVED' ? 'badge-success' :
                        template.status === 'PENDING' ? 'badge-warning' :
                        'bg-destructive/10 text-destructive border border-destructive/20'
                      }`}>
                        {getStatusIcon(template.status)}
                        {getStatusLabel(template.status)}
                      </span>
                    </div>

                    <div className="p-3 bg-muted/50 rounded-lg text-sm">
                      {template.components.header && (
                        <p className="font-medium mb-1">{template.components.header}</p>
                      )}
                      <p className="text-muted-foreground">{template.components.body}</p>
                      {template.components.footer && (
                        <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
                          {template.components.footer}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="approved" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {templates.filter(t => t.status === 'APPROVED').map((template) => (
                <Card key={template.id} className="hover-lift">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full badge-success flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Aprovado
                      </span>
                    </div>
                    <h3 className="font-semibold mb-1">{template.displayName}</h3>
                    <p className="text-xs text-muted-foreground">
                      {template.name} • {getCategoryLabel(template.category)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {templates.filter(t => t.status === 'PENDING').map((template) => (
                <Card key={template.id} className="hover-lift">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-warning" />
                      </div>
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full badge-warning flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Pendente
                      </span>
                    </div>
                    <h3 className="font-semibold mb-1">{template.displayName}</h3>
                    <p className="text-xs text-muted-foreground">
                      {template.name} • Aguardando aprovação
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rejected" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {templates.filter(t => t.status === 'REJECTED').map((template) => (
                <Card key={template.id} className="hover-lift">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                        <XCircle className="h-5 w-5 text-destructive" />
                      </div>
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-destructive/10 text-destructive border border-destructive/20 flex items-center gap-1">
                        <XCircle className="h-3 w-3" />
                        Rejeitado
                      </span>
                    </div>
                    <h3 className="font-semibold mb-1">{template.displayName}</h3>
                    <p className="text-xs text-muted-foreground">
                      {template.name} • Edite e reenvie
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

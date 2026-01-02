import { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Mail, Phone, Tag } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const contacts = [
  {
    id: '1',
    name: 'Maria Silva',
    phone: '+55 11 99999-1234',
    email: 'maria@email.com',
    tags: ['Cliente', 'VIP'],
    lastInteraction: '2 min atrás',
    optedIn: true,
  },
  {
    id: '2',
    name: 'João Santos',
    phone: '+55 11 99999-5678',
    email: 'joao@email.com',
    tags: ['Lead'],
    lastInteraction: '15 min atrás',
    optedIn: true,
  },
  {
    id: '3',
    name: 'Ana Costa',
    phone: '+55 21 99999-9012',
    email: 'ana@email.com',
    tags: ['Cliente'],
    lastInteraction: '1 hora atrás',
    optedIn: true,
  },
  {
    id: '4',
    name: 'Pedro Lima',
    phone: '+55 31 99999-3456',
    email: 'pedro@email.com',
    tags: ['Lead', 'Newsletter'],
    lastInteraction: '2 horas atrás',
    optedIn: false,
  },
  {
    id: '5',
    name: 'Carla Souza',
    phone: '+55 41 99999-7890',
    email: 'carla@email.com',
    tags: ['Cliente', 'Suporte'],
    lastInteraction: '1 dia atrás',
    optedIn: true,
  },
];

export default function Contacts() {
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const toggleContact = (id: string) => {
    setSelectedContacts(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedContacts(prev =>
      prev.length === contacts.length ? [] : contacts.map(c => c.id)
    );
  };

  return (
    <DashboardLayout breadcrumbs={[{ label: 'Contatos' }]}>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Contatos</h1>
            <p className="text-muted-foreground">
              Gerencie seus contatos e leads
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              Importar
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Contato
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: 'Total de Contatos', value: '5,678' },
            { label: 'Ativos', value: '4,521' },
            { label: 'Opt-in', value: '4,102' },
            { label: 'Novos (7 dias)', value: '234' },
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Table */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar contatos..."
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>
              {selectedContacts.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {selectedContacts.length} selecionado(s)
                  </span>
                  <Button variant="outline" size="sm">
                    <Tag className="h-4 w-4 mr-2" />
                    Adicionar Tag
                  </Button>
                  <Button variant="destructive" size="sm">
                    Excluir
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedContacts.length === contacts.length}
                      onCheckedChange={toggleAll}
                    />
                  </TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Última Interação</TableHead>
                  <TableHead>Opt-in</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedContacts.includes(contact.id)}
                        onCheckedChange={() => toggleContact(contact.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">{contact.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {contact.phone}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {contact.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 text-xs bg-muted rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {contact.lastInteraction}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        contact.optedIn ? 'badge-success' : 'bg-muted text-muted-foreground'
                      }`}>
                        {contact.optedIn ? 'Sim' : 'Não'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Phone className="h-4 w-4 mr-2" />
                            Iniciar conversa
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Enviar template
                          </DropdownMenuItem>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

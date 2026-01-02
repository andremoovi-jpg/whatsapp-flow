import { useState } from 'react';
import { Search, Filter, MoreVertical, Send, Paperclip, Smile } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const conversations = [
  {
    id: '1',
    name: 'Maria Silva',
    phone: '+55 11 99999-1234',
    lastMessage: 'Olá, gostaria de saber mais sobre o produto X...',
    time: '2 min',
    unread: 2,
    status: 'open',
  },
  {
    id: '2',
    name: 'João Santos',
    phone: '+55 11 99999-5678',
    lastMessage: 'Obrigado pelo atendimento!',
    time: '15 min',
    unread: 0,
    status: 'open',
  },
  {
    id: '3',
    name: 'Ana Costa',
    phone: '+55 21 99999-9012',
    lastMessage: 'Quando chega meu pedido?',
    time: '32 min',
    unread: 1,
    status: 'pending',
  },
  {
    id: '4',
    name: 'Pedro Lima',
    phone: '+55 31 99999-3456',
    lastMessage: 'Vocês têm esse produto em estoque?',
    time: '1h',
    unread: 0,
    status: 'open',
  },
  {
    id: '5',
    name: 'Carla Souza',
    phone: '+55 41 99999-7890',
    lastMessage: 'Preciso de ajuda com meu pedido',
    time: '2h',
    unread: 3,
    status: 'open',
  },
];

const messages = [
  {
    id: '1',
    direction: 'inbound',
    content: 'Olá, gostaria de saber mais sobre o produto X. Vocês têm em estoque?',
    time: '10:30',
  },
  {
    id: '2',
    direction: 'outbound',
    content: 'Olá Maria! Sim, temos em estoque. O produto X está disponível nas cores azul, vermelho e preto.',
    time: '10:32',
  },
  {
    id: '3',
    direction: 'inbound',
    content: 'Ótimo! Qual o preço e prazo de entrega para São Paulo?',
    time: '10:35',
  },
  {
    id: '4',
    direction: 'outbound',
    content: 'O valor é R$ 299,00 e a entrega para São Paulo leva de 3 a 5 dias úteis. Posso enviar o link para compra?',
    time: '10:37',
  },
  {
    id: '5',
    direction: 'inbound',
    content: 'Sim, por favor!',
    time: '10:38',
  },
];

export default function Inbox() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState('');

  return (
    <DashboardLayout breadcrumbs={[{ label: 'Inbox' }]}>
      <div className="flex h-[calc(100vh-8rem)] bg-card rounded-xl border border-border overflow-hidden animate-fade-in">
        {/* Conversations List */}
        <div className="w-80 border-r border-border flex flex-col">
          {/* Search Header */}
          <div className="p-4 border-b border-border space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar conversas..."
                className="pl-9 bg-muted/50 border-0"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="flex-1">
                Todas
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                Não lidas
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Conversations */}
          <ScrollArea className="flex-1">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={cn(
                  'p-4 border-b border-border/50 cursor-pointer transition-colors',
                  selectedConversation?.id === conv.id
                    ? 'bg-accent'
                    : 'hover:bg-muted/50'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {conv.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    {conv.unread > 0 && (
                      <div className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary-foreground">
                          {conv.unread}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{conv.name}</p>
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-0.5">
                      {conv.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="h-16 border-b border-border flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {selectedConversation?.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-medium">{selectedConversation?.name}</p>
                <p className="text-sm text-muted-foreground">{selectedConversation?.phone}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex',
                    msg.direction === 'outbound' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[70%] rounded-2xl px-4 py-2.5',
                      msg.direction === 'outbound'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-muted rounded-bl-md'
                    )}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className={cn(
                      'text-xs mt-1',
                      msg.direction === 'outbound' 
                        ? 'text-primary-foreground/70' 
                        : 'text-muted-foreground'
                    )}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <Smile className="h-5 w-5" />
              </Button>
              <Input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1"
              />
              <Button size="icon" className="flex-shrink-0">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Details Sidebar */}
        <div className="w-72 border-l border-border p-4 hidden xl:block">
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-semibold text-primary">
                {selectedConversation?.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <h3 className="font-semibold">{selectedConversation?.name}</h3>
            <p className="text-sm text-muted-foreground">{selectedConversation?.phone}</p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase mb-2">
                Status
              </p>
              <span className="px-2.5 py-1 text-xs font-medium rounded-full badge-success">
                Ativo
              </span>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase mb-2">
                Tags
              </p>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-0.5 text-xs bg-muted rounded-full">Cliente</span>
                <span className="px-2 py-0.5 text-xs bg-muted rounded-full">VIP</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase mb-2">
                Última interação
              </p>
              <p className="text-sm">Há 2 minutos</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

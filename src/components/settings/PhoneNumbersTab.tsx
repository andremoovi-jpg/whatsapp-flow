import { useState } from 'react';
import { Phone, RefreshCw, Flag, Check, Circle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useWABA } from '@/contexts/WABAContext';
import { usePhoneNumbers, useUpdatePhoneNumber } from '@/hooks/useWhatsAppAccounts';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const qualityColors: Record<string, string> = {
  GREEN: 'text-green-600 bg-green-100 dark:bg-green-900/30',
  YELLOW: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30',
  RED: 'text-red-600 bg-red-100 dark:bg-red-900/30',
};

const statusLabels: Record<string, string> = {
  CONNECTED: 'Conectado',
  PENDING: 'Pendente',
  OFFLINE: 'Offline',
};

export function PhoneNumbersTab() {
  const { selectedWABA, availableWABAs, setSelectedWABA } = useWABA();
  const { data: phoneNumbers, isLoading, refetch } = usePhoneNumbers(selectedWABA?.id);
  const updatePhoneNumber = useUpdatePhoneNumber();
  const [syncing, setSyncing] = useState(false);

  const handleSync = async () => {
    setSyncing(true);
    // Simulate API sync
    await new Promise(resolve => setTimeout(resolve, 2000));
    await refetch();
    setSyncing(false);
    toast.success('Números sincronizados!');
  };

  const handleSetDefault = async (phoneId: string) => {
    await updatePhoneNumber.mutateAsync({ id: phoneId, is_default: true });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Números de Telefone</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie os números vinculados às suas contas WhatsApp
          </p>
        </div>
        <div className="flex gap-2">
          {availableWABAs.length > 1 && (
            <Select
              value={selectedWABA?.id || ''}
              onValueChange={(id) => {
                const waba = availableWABAs.find(w => w.id === id);
                if (waba) setSelectedWABA(waba);
              }}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Selecionar conta" />
              </SelectTrigger>
              <SelectContent>
                {availableWABAs.map(waba => (
                  <SelectItem key={waba.id} value={waba.id}>
                    {waba.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Button variant="outline" onClick={handleSync} disabled={syncing || !selectedWABA}>
            <RefreshCw className={cn('h-4 w-4 mr-2', syncing && 'animate-spin')} />
            Sincronizar
          </Button>
        </div>
      </div>

      {!selectedWABA ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Nenhuma conta selecionada</h3>
            <p className="text-muted-foreground">
              Conecte uma conta WhatsApp para ver os números
            </p>
          </CardContent>
        </Card>
      ) : isLoading ? (
        <div className="space-y-3">
          {[1, 2].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="h-24" />
            </Card>
          ))}
        </div>
      ) : phoneNumbers?.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Nenhum número encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Sincronize para buscar os números da conta
            </p>
            <Button variant="outline" onClick={handleSync} disabled={syncing}>
              <RefreshCw className={cn('h-4 w-4 mr-2', syncing && 'animate-spin')} />
              Sincronizar Números
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {phoneNumbers?.map(phone => (
            <Card key={phone.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold">{phone.phone_number}</p>
                        {phone.is_default && (
                          <Badge variant="secondary">
                            <Check className="h-3 w-3 mr-1" />
                            Padrão
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        {phone.display_name && (
                          <span>{phone.display_name}</span>
                        )}
                        <span>ID: {phone.phone_number_id}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn(
                          'px-2 py-0.5 rounded text-xs font-medium',
                          qualityColors[phone.quality_rating || 'GREEN']
                        )}>
                          {phone.quality_rating || 'N/A'}
                        </span>
                        <Badge variant={phone.status === 'CONNECTED' ? 'default' : 'outline'}>
                          <Circle className={cn(
                            'h-2 w-2 mr-1.5 fill-current',
                            phone.status === 'CONNECTED' ? 'text-green-500' : 'text-muted-foreground'
                          )} />
                          {statusLabels[phone.status || 'PENDING']}
                        </Badge>
                      </div>
                    </div>

                    {!phone.is_default && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(phone.id)}
                        disabled={updatePhoneNumber.isPending}
                      >
                        Tornar Padrão
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Sobre os Indicadores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <span className={cn('px-2 py-0.5 rounded text-xs font-medium', qualityColors.GREEN)}>
                  GREEN
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Alta qualidade. Mensagens sendo entregues normalmente.
              </p>
            </div>
            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <span className={cn('px-2 py-0.5 rounded text-xs font-medium', qualityColors.YELLOW)}>
                  YELLOW
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Qualidade média. Alguns usuários podem estar marcando como spam.
              </p>
            </div>
            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <span className={cn('px-2 py-0.5 rounded text-xs font-medium', qualityColors.RED)}>
                  RED
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Baixa qualidade. Limite de envio pode ser reduzido.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateWABA } from '@/hooks/useWhatsAppAccounts';
import type { WhatsAppAccount } from '@/contexts/WABAContext';

interface ConfigureWABAModalProps {
  waba: WhatsAppAccount;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConfigureWABAModal({ waba, open, onOpenChange }: ConfigureWABAModalProps) {
  const updateWABA = useUpdateWABA();
  const [name, setName] = useState(waba.name);
  const [accessToken, setAccessToken] = useState('');
  const [appSecret, setAppSecret] = useState('');
  const [proxyEnabled, setProxyEnabled] = useState(waba.proxy_enabled);
  const [rateLimitPerSecond, setRateLimitPerSecond] = useState(waba.rate_limit_per_second);
  const [rateLimitPerDay, setRateLimitPerDay] = useState(waba.rate_limit_per_day);

  const handleSaveGeneral = async () => {
    await updateWABA.mutateAsync({ id: waba.id, name });
  };

  const handleSaveCredentials = async () => {
    await updateWABA.mutateAsync({
      id: waba.id,
      access_token: accessToken || undefined,
      app_secret: appSecret || undefined,
    });
    setAccessToken('');
    setAppSecret('');
  };

  const handleSaveRateLimits = async () => {
    await updateWABA.mutateAsync({
      id: waba.id,
      // Note: rate limits would need to be added to the update type
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Configurar: {waba.name}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="credentials">Credenciais</TabsTrigger>
            <TabsTrigger value="proxy">Proxy</TabsTrigger>
            <TabsTrigger value="health">Saúde</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Conta</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>WABA ID</Label>
              <Input value={waba.waba_id} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Status Atual</Label>
              <Input value={waba.status} disabled className="bg-muted capitalize" />
            </div>
            {waba.last_error_message && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                <strong>Último erro:</strong> {waba.last_error_message}
              </div>
            )}
            <Button onClick={handleSaveGeneral} disabled={updateWABA.isPending}>
              {updateWABA.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : null}
              Salvar
            </Button>
          </TabsContent>

          <TabsContent value="credentials" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="access_token">Novo Access Token</Label>
              <Input
                id="access_token"
                type="password"
                placeholder="Deixe vazio para manter o atual"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="app_secret">Novo App Secret</Label>
              <Input
                id="app_secret"
                type="password"
                placeholder="Deixe vazio para manter o atual"
                value={appSecret}
                onChange={(e) => setAppSecret(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveCredentials} disabled={updateWABA.isPending || (!accessToken && !appSecret)}>
                {updateWABA.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : null}
                Atualizar Credenciais
              </Button>
              <Button variant="outline">Testar Credenciais</Button>
            </div>
          </TabsContent>

          <TabsContent value="proxy" className="space-y-4 mt-4">
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="font-medium">Usar proxy dedicado</p>
                <p className="text-sm text-muted-foreground">
                  Roteie as requisições através de um proxy
                </p>
              </div>
              <Switch
                checked={proxyEnabled}
                onCheckedChange={setProxyEnabled}
              />
            </div>
            {proxyEnabled && (
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label>Tipo de Proxy</Label>
                  <Select defaultValue="http">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="http">HTTP</SelectItem>
                      <SelectItem value="https">HTTPS</SelectItem>
                      <SelectItem value="socks5">SOCKS5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>URL do Proxy</Label>
                  <Input placeholder="http://proxy.example.com:8080" />
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="health" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border">
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-lg font-semibold capitalize">{waba.health_status}</p>
              </div>
              <div className="p-4 rounded-lg border">
                <p className="text-sm text-muted-foreground">Último Check</p>
                <p className="text-lg font-semibold">
                  {waba.last_health_check_at
                    ? new Date(waba.last_health_check_at).toLocaleString('pt-BR')
                    : 'Nunca'}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Rate Limit por Segundo</Label>
              <Input
                type="number"
                value={rateLimitPerSecond}
                onChange={(e) => setRateLimitPerSecond(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Rate Limit Diário</Label>
              <Input
                type="number"
                value={rateLimitPerDay}
                onChange={(e) => setRateLimitPerDay(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Mensagens Enviadas Hoje</Label>
              <Input value={waba.messages_sent_today} disabled className="bg-muted" />
            </div>
            <Button variant="outline" className="w-full">
              Executar Health Check
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

import { Node } from 'reactflow';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, Plus, Trash2, Copy } from 'lucide-react';
import { NodeConfig } from '@/hooks/useFlows';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NodeConfigPanelProps {
  node: Node<{ label: string; type: string; config: NodeConfig }> | null;
  onClose: () => void;
  onUpdate: (nodeId: string, config: Partial<NodeConfig>) => void;
  onDelete: (nodeId: string) => void;
}

export function NodeConfigPanel({ node, onClose, onUpdate, onDelete }: NodeConfigPanelProps) {
  if (!node) return null;

  const { type, config, label } = node.data;

  const updateConfig = (updates: Partial<NodeConfig>) => {
    onUpdate(node.id, { ...config, ...updates });
  };

  const renderConfig = () => {
    switch (type) {
      case 'trigger_keyword':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Palavras-chave</Label>
              <Input
                placeholder="ex: oi, olá, bom dia"
                value={config.keywords?.join(', ') || ''}
                onChange={(e) => updateConfig({ keywords: e.target.value.split(',').map(k => k.trim()) })}
              />
              <p className="text-xs text-muted-foreground">Separe por vírgula</p>
            </div>
            <div className="flex items-center justify-between">
              <Label>Correspondência exata</Label>
              <Switch
                checked={config.exactMatch || false}
                onCheckedChange={(checked) => updateConfig({ exactMatch: checked })}
              />
            </div>
          </div>
        );

      case 'trigger_webhook':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>URL do Webhook</Label>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={config.webhookUrl || 'Será gerada ao salvar'}
                  className="flex-1 text-xs"
                />
                <Button size="icon" variant="outline" onClick={() => navigator.clipboard.writeText(config.webhookUrl || '')}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Envie dados para esta URL para disparar o fluxo
              </p>
            </div>
          </div>
        );

      case 'action_send_text':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Mensagem</Label>
              <Textarea
                placeholder="Digite sua mensagem..."
                value={config.message || ''}
                onChange={(e) => updateConfig({ message: e.target.value })}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Variáveis disponíveis</Label>
              <div className="flex flex-wrap gap-1">
                {['{{nome}}', '{{telefone}}', '{{email}}'].map((v) => (
                  <button
                    key={v}
                    type="button"
                    className="text-xs px-2 py-1 bg-muted rounded hover:bg-muted/80"
                    onClick={() => updateConfig({ message: (config.message || '') + ' ' + v })}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'action_send_buttons':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Texto da mensagem</Label>
              <Textarea
                placeholder="Digite o texto..."
                value={config.body || ''}
                onChange={(e) => updateConfig({ body: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Botões (máx. 3)</Label>
                {(config.buttons?.length || 0) < 3 && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      updateConfig({
                        buttons: [...(config.buttons || []), { id: `btn_${Date.now()}`, text: '' }],
                      })
                    }
                  >
                    <Plus className="h-3 w-3 mr-1" /> Adicionar
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                {config.buttons?.map((btn, idx) => (
                  <div key={btn.id} className="flex gap-2">
                    <Input
                      placeholder={`Botão ${idx + 1}`}
                      value={btn.text}
                      onChange={(e) => {
                        const newButtons = [...(config.buttons || [])];
                        newButtons[idx] = { ...btn, text: e.target.value };
                        updateConfig({ buttons: newButtons });
                      }}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        const newButtons = config.buttons?.filter((_, i) => i !== idx);
                        updateConfig({ buttons: newButtons });
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'condition_tag':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Tag</Label>
              <Input
                placeholder="Nome da tag"
                value={config.tag || ''}
                onChange={(e) => updateConfig({ tag: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Contato tem a tag</Label>
              <Switch
                checked={config.hasTag !== false}
                onCheckedChange={(checked) => updateConfig({ hasTag: checked })}
              />
            </div>
          </div>
        );

      case 'condition_field':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Campo</Label>
              <Select value={config.field || ''} onValueChange={(v) => updateConfig({ field: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um campo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nome</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone_number">Telefone</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Operador</Label>
              <Select value={config.operator || 'equals'} onValueChange={(v) => updateConfig({ operator: v as NodeConfig['operator'] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equals">Igual a</SelectItem>
                  <SelectItem value="not_equals">Diferente de</SelectItem>
                  <SelectItem value="contains">Contém</SelectItem>
                  <SelectItem value="empty">Está vazio</SelectItem>
                  <SelectItem value="not_empty">Não está vazio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {!['empty', 'not_empty'].includes(config.operator || '') && (
              <div className="space-y-2">
                <Label>Valor</Label>
                <Input
                  placeholder="Digite o valor"
                  value={config.value || ''}
                  onChange={(e) => updateConfig({ value: e.target.value })}
                />
              </div>
            )}
          </div>
        );

      case 'action_delay':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Quantidade</Label>
                <Input
                  type="number"
                  min={1}
                  value={config.amount || 1}
                  onChange={(e) => updateConfig({ amount: parseInt(e.target.value) || 1 })}
                />
              </div>
              <div className="space-y-2">
                <Label>Unidade</Label>
                <Select value={config.unit || 'minutes'} onValueChange={(v) => updateConfig({ unit: v as NodeConfig['unit'] })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutes">Minutos</SelectItem>
                    <SelectItem value="hours">Horas</SelectItem>
                    <SelectItem value="days">Dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 'action_add_tag':
      case 'action_remove_tag':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{type === 'action_add_tag' ? 'Tag a adicionar' : 'Tag a remover'}</Label>
              <Input
                placeholder="Nome da tag"
                value={config.tag || ''}
                onChange={(e) => updateConfig({ tag: e.target.value })}
              />
            </div>
          </div>
        );

      case 'action_update_field':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Campo</Label>
              <Select value={config.field || ''} onValueChange={(v) => updateConfig({ field: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um campo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nome</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Novo valor</Label>
              <Input
                placeholder="Digite o valor"
                value={config.value || ''}
                onChange={(e) => updateConfig({ value: e.target.value })}
              />
            </div>
          </div>
        );

      case 'action_webhook':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>URL</Label>
              <Input
                placeholder="https://api.exemplo.com/webhook"
                value={config.url || ''}
                onChange={(e) => updateConfig({ url: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Método</Label>
              <Select value={config.method || 'POST'} onValueChange={(v) => updateConfig({ method: v as 'GET' | 'POST' })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-sm text-muted-foreground text-center py-8">
            Configuração não disponível para este tipo de nó.
          </div>
        );
    }
  };

  return (
    <div className="w-80 border-l bg-background h-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold text-sm truncate">{label}</h3>
        <Button size="icon" variant="ghost" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        {renderConfig()}
      </ScrollArea>

      <div className="p-4 border-t">
        <Button
          variant="destructive"
          size="sm"
          className="w-full"
          onClick={() => onDelete(node.id)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Excluir Nó
        </Button>
      </div>
    </div>
  );
}

import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Node, Edge } from 'reactflow';
import { ArrowLeft, Save, Play, Rocket, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { FlowCanvas } from '@/components/flows/FlowCanvas';
import {
  useFlow,
  useFlowNodes,
  useFlowEdges,
  useUpdateFlow,
  useSaveFlowCanvas,
  useToggleFlowActive,
  NodeConfig,
} from '@/hooks/useFlows';
import { Skeleton } from '@/components/ui/skeleton';

export default function FlowEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: flow, isLoading: flowLoading } = useFlow(id);
  const { data: dbNodes, isLoading: nodesLoading } = useFlowNodes(id);
  const { data: dbEdges, isLoading: edgesLoading } = useFlowEdges(id);

  const updateFlow = useUpdateFlow();
  const saveCanvas = useSaveFlowCanvas();
  const toggleActive = useToggleFlowActive();

  const [flowName, setFlowName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentNodes, setCurrentNodes] = useState<Node[]>([]);
  const [currentEdges, setCurrentEdges] = useState<Edge[]>([]);

  useEffect(() => {
    if (flow) {
      setFlowName(flow.name);
    }
  }, [flow]);

  const handleSave = useCallback(async () => {
    if (!id) return;

    // Get current flow data from window (set by FlowCanvas)
    const flowData = (window as unknown as { getFlowData?: () => { nodes: Node[]; edges: Edge[] } }).getFlowData?.();
    if (!flowData) return;

    const { nodes, edges } = flowData;

    await saveCanvas.mutateAsync({
      flowId: id,
      nodes: nodes.map((n) => ({
        id: n.id,
        type: n.data.type,
        name: n.data.label,
        config: n.data.config as NodeConfig,
        position_x: Math.round(n.position.x),
        position_y: Math.round(n.position.y),
      })),
      edges: edges.map((e) => ({
        id: e.id,
        source_node_id: e.source,
        target_node_id: e.target,
        source_handle: e.sourceHandle,
        label: e.label as string | undefined,
      })),
    });
  }, [id, saveCanvas]);

  const handleNameChange = async () => {
    if (!id || !flowName.trim()) return;
    await updateFlow.mutateAsync({ id, name: flowName.trim() });
    setIsEditing(false);
  };

  const handleToggleActive = async () => {
    if (!id || !flow) return;
    await toggleActive.mutateAsync({ flowId: id, isActive: !flow.is_active });
  };

  const isLoading = flowLoading || nodesLoading || edgesLoading;

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col">
        <div className="h-14 border-b px-4 flex items-center gap-4">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Skeleton className="h-96 w-full max-w-4xl" />
        </div>
      </div>
    );
  }

  if (!flow) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Fluxo não encontrado</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-14 border-b px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/flows')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>

          {isEditing ? (
            <Input
              value={flowName}
              onChange={(e) => setFlowName(e.target.value)}
              onBlur={handleNameChange}
              onKeyDown={(e) => e.key === 'Enter' && handleNameChange()}
              className="w-64 h-8"
              autoFocus
            />
          ) : (
            <h1
              className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors"
              onClick={() => setIsEditing(true)}
            >
              {flow.name}
            </h1>
          )}

          <div className="flex items-center gap-2 pl-4 border-l">
            <Switch
              id="flow-active"
              checked={flow.is_active}
              onCheckedChange={handleToggleActive}
            />
            <Label htmlFor="flow-active" className="text-sm text-muted-foreground">
              {flow.is_active ? 'Ativo' : 'Inativo'}
            </Label>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Play className="h-4 w-4 mr-2" />
            Testar
          </Button>
          <Button 
            size="sm" 
            onClick={handleSave}
            disabled={saveCanvas.isPending}
          >
            <Save className="h-4 w-4 mr-2" />
            {saveCanvas.isPending ? 'Salvando...' : 'Salvar'}
          </Button>
          <Button size="sm" variant="default">
            <Rocket className="h-4 w-4 mr-2" />
            Publicar
          </Button>
        </div>
      </header>

      {/* Canvas */}
      <div className="flex-1 overflow-hidden">
        <FlowCanvas
          initialNodes={dbNodes || []}
          initialEdges={dbEdges || []}
          onNodesChange={setCurrentNodes}
          onEdgesChange={setCurrentEdges}
        />
      </div>
    </div>
  );
}

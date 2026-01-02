import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { 
  MousePointerClick, MessageSquare, Webhook, Mail,
  Tag, FileText, Clock, Calendar,
  MessageCircle, LayoutGrid, List, Image,
  Plus, Minus, Edit, Globe,
  MessageSquareMore, Timer, UserRound, CircleStop,
  FileCode
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getNodeCategory, NodeConfig } from '@/hooks/useFlows';

const iconMap: Record<string, React.ElementType> = {
  trigger_button_click: MousePointerClick,
  trigger_keyword: MessageSquare,
  trigger_webhook: Webhook,
  trigger_message: Mail,
  condition_tag: Tag,
  condition_field: FileText,
  condition_time: Clock,
  condition_day: Calendar,
  action_send_text: MessageCircle,
  action_send_template: FileCode,
  action_send_buttons: LayoutGrid,
  action_send_list: List,
  action_send_media: Image,
  action_add_tag: Plus,
  action_remove_tag: Minus,
  action_update_field: Edit,
  action_webhook: Globe,
  action_wait_reply: MessageSquareMore,
  action_delay: Timer,
  action_transfer_human: UserRound,
  action_end: CircleStop,
};

const categoryStyles = {
  trigger: 'bg-purple-50 border-purple-400 dark:bg-purple-950/50 dark:border-purple-600',
  condition: 'bg-yellow-50 border-yellow-400 dark:bg-yellow-950/50 dark:border-yellow-600',
  action_message: 'bg-green-50 border-green-400 dark:bg-green-950/50 dark:border-green-600',
  action_data: 'bg-blue-50 border-blue-400 dark:bg-blue-950/50 dark:border-blue-600',
  control: 'bg-gray-50 border-gray-400 dark:bg-gray-800/50 dark:border-gray-600',
};

const categoryIconColors = {
  trigger: 'text-purple-600 dark:text-purple-400',
  condition: 'text-yellow-600 dark:text-yellow-400',
  action_message: 'text-green-600 dark:text-green-400',
  action_data: 'text-blue-600 dark:text-blue-400',
  control: 'text-gray-600 dark:text-gray-400',
};

interface FlowNodeData {
  label: string;
  type: string;
  config: NodeConfig;
}

function FlowNodeComponent({ data, selected }: NodeProps<FlowNodeData>) {
  const category = getNodeCategory(data.type);
  const Icon = iconMap[data.type] || MessageCircle;
  const isCondition = data.type.startsWith('condition_');
  const isTrigger = data.type.startsWith('trigger_');

  return (
    <div
      className={cn(
        'px-4 py-3 rounded-lg border-2 shadow-sm min-w-[180px] transition-all',
        categoryStyles[category],
        selected && 'ring-2 ring-primary ring-offset-2'
      )}
    >
      {/* Input handle (not for triggers) */}
      {!isTrigger && (
        <Handle
          type="target"
          position={Position.Top}
          className="!w-3 !h-3 !bg-muted-foreground !border-2 !border-background"
        />
      )}

      <div className="flex items-center gap-3">
        <div className={cn('p-2 rounded-md bg-background/50', categoryIconColors[category])}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{data.label}</p>
          {data.config?.message && (
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {data.config.message.slice(0, 30)}...
            </p>
          )}
        </div>
      </div>

      {/* Output handles */}
      {isCondition ? (
        <>
          <Handle
            type="source"
            position={Position.Bottom}
            id="true"
            className="!w-3 !h-3 !bg-green-500 !border-2 !border-background !left-[30%]"
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="false"
            className="!w-3 !h-3 !bg-red-500 !border-2 !border-background !left-[70%]"
          />
          <div className="flex justify-between mt-2 text-[10px] text-muted-foreground px-2">
            <span>Sim</span>
            <span>Não</span>
          </div>
        </>
      ) : data.type !== 'action_end' ? (
        <Handle
          type="source"
          position={Position.Bottom}
          className="!w-3 !h-3 !bg-muted-foreground !border-2 !border-background"
        />
      ) : null}
    </div>
  );
}

export default memo(FlowNodeComponent);

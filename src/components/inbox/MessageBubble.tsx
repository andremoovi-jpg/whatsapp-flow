import { Clock, Check, CheckCheck, AlertCircle, Play, Download, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from '@/hooks/useConversations';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface MessageBubbleProps {
  message: Message;
}

function MessageStatus({ status }: { status: string | null }) {
  switch (status) {
    case 'pending':
      return <Clock className="w-3.5 h-3.5 text-muted-foreground" />;
    case 'sent':
      return <Check className="w-3.5 h-3.5 text-muted-foreground" />;
    case 'delivered':
      return <CheckCheck className="w-3.5 h-3.5 text-muted-foreground" />;
    case 'read':
      return <CheckCheck className="w-3.5 h-3.5 text-info" />;
    case 'failed':
      return <AlertCircle className="w-3.5 h-3.5 text-destructive" />;
    default:
      return null;
  }
}

function TextMessage({ content }: { content: Record<string, unknown> }) {
  const text = content.text as string || content.body as string || '';
  return <p className="text-sm whitespace-pre-wrap">{text}</p>;
}

function TemplateMessage({ content }: { content: Record<string, unknown> }) {
  const templateName = content.template_name as string || 'Template';
  const body = content.body as string || '';
  
  return (
    <div className="space-y-1">
      <div className="text-xs bg-primary/20 text-primary-foreground/80 px-2 py-0.5 rounded inline-block">
        📋 {templateName}
      </div>
      <p className="text-sm whitespace-pre-wrap">{body}</p>
    </div>
  );
}

function InteractiveMessage({ content }: { content: Record<string, unknown> }) {
  const body = content.body as string || '';
  const buttons = content.buttons as { text: string }[] || [];
  
  return (
    <div className="space-y-2">
      <p className="text-sm whitespace-pre-wrap">{body}</p>
      {buttons.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {buttons.map((btn, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-xs bg-background/50 rounded-full border border-current/20"
            >
              {btn.text}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ImageMessage({ content, isOwn }: { content: Record<string, unknown>; isOwn: boolean }) {
  const url = content.url as string || content.link as string || '';
  const caption = content.caption as string || '';
  
  return (
    <div className="space-y-1">
      <div className="rounded-lg overflow-hidden max-w-[240px]">
        <img
          src={url || '/placeholder.svg'}
          alt="Imagem"
          className="w-full h-auto object-cover cursor-pointer hover:opacity-90 transition-opacity"
        />
      </div>
      {caption && <p className="text-sm">{caption}</p>}
    </div>
  );
}

function VideoMessage({ content }: { content: Record<string, unknown> }) {
  const url = content.url as string || content.link as string || '';
  const caption = content.caption as string || '';
  
  return (
    <div className="space-y-1">
      <div className="relative rounded-lg overflow-hidden max-w-[240px] bg-muted">
        <video src={url} className="w-full h-auto" controls />
      </div>
      {caption && <p className="text-sm">{caption}</p>}
    </div>
  );
}

function AudioMessage({ content }: { content: Record<string, unknown> }) {
  const url = content.url as string || content.link as string || '';
  
  return (
    <div className="flex items-center gap-2 min-w-[200px]">
      <button className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
        <Play className="w-4 h-4 fill-current" />
      </button>
      <div className="flex-1 h-1 bg-current/20 rounded-full">
        <div className="h-full w-0 bg-current rounded-full" />
      </div>
      <span className="text-xs">0:00</span>
    </div>
  );
}

function DocumentMessage({ content }: { content: Record<string, unknown> }) {
  const filename = content.filename as string || 'Documento';
  const url = content.url as string || content.link as string || '';
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-2 bg-background/30 rounded-lg hover:bg-background/50 transition-colors"
    >
      <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
        <FileText className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{filename}</p>
        <p className="text-xs opacity-70">Documento</p>
      </div>
      <Download className="w-4 h-4 opacity-50" />
    </a>
  );
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isOwn = message.direction === 'outbound';
  const content = message.content as Record<string, unknown>;

  const renderContent = () => {
    switch (message.type) {
      case 'text':
        return <TextMessage content={content} />;
      case 'template':
        return <TemplateMessage content={content} />;
      case 'interactive':
        return <InteractiveMessage content={content} />;
      case 'image':
        return <ImageMessage content={content} isOwn={isOwn} />;
      case 'video':
        return <VideoMessage content={content} />;
      case 'audio':
        return <AudioMessage content={content} />;
      case 'document':
        return <DocumentMessage content={content} />;
      default:
        return <TextMessage content={content} />;
    }
  };

  const time = message.created_at 
    ? format(new Date(message.created_at), 'HH:mm', { locale: ptBR })
    : '';

  return (
    <div
      className={cn(
        'flex',
        isOwn ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[70%] rounded-2xl px-4 py-2.5',
          isOwn
            ? 'bg-primary text-primary-foreground rounded-br-md'
            : 'bg-muted rounded-bl-md'
        )}
      >
        {renderContent()}
        <div className={cn(
          'flex items-center justify-end gap-1 mt-1',
          isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
        )}>
          <span className="text-xs">{time}</span>
          {isOwn && <MessageStatus status={message.status} />}
        </div>
        {message.status === 'failed' && message.error_message && (
          <p className="text-xs text-destructive mt-1">{message.error_message}</p>
        )}
      </div>
    </div>
  );
}

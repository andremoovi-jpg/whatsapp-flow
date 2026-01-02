import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { ConversationList } from '@/components/inbox/ConversationList';
import { ChatArea } from '@/components/inbox/ChatArea';
import { ContactSidebar } from '@/components/inbox/ContactSidebar';
import { SendTemplateModal } from '@/components/inbox/SendTemplateModal';
import { 
  useConversations, 
  useMessages, 
  useMarkAsRead,
  Conversation, 
  ConversationFilter,
  useSendMessage,
} from '@/hooks/useConversations';
import { toast } from 'sonner';

export default function Inbox() {
  const [searchParams, setSearchParams] = useSearchParams();
  const conversationIdParam = searchParams.get('conversation');
  
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [filter, setFilter] = useState<ConversationFilter>('all');
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [templateModalOpen, setTemplateModalOpen] = useState(false);

  const { data: conversations = [], isLoading: conversationsLoading } = useConversations(filter, search);
  const { data: messages = [], isLoading: messagesLoading } = useMessages(selectedConversation?.id || null);
  const markAsRead = useMarkAsRead();
  const sendMessage = useSendMessage();

  // Select conversation from URL param or first in list
  useEffect(() => {
    if (conversationIdParam && conversations.length > 0) {
      const conv = conversations.find(c => c.id === conversationIdParam);
      if (conv) {
        setSelectedConversation(conv);
        return;
      }
    }
    
    if (!selectedConversation && conversations.length > 0) {
      setSelectedConversation(conversations[0]);
    }
  }, [conversationIdParam, conversations, selectedConversation]);

  // Mark as read when selecting a conversation
  useEffect(() => {
    if (selectedConversation && (selectedConversation.unread_count ?? 0) > 0) {
      markAsRead.mutate(selectedConversation.id);
    }
  }, [selectedConversation?.id]);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setSearchParams({ conversation: conversation.id });
  };

  const handleSendTemplate = async (templateId: string, variables: Record<string, string>) => {
    if (!selectedConversation) return;

    try {
      await sendMessage.mutateAsync({
        conversationId: selectedConversation.id,
        contactId: selectedConversation.contact_id,
        content: {
          template_id: templateId,
          variables,
        },
        type: 'template',
      });
      toast.success('Template enviado com sucesso');
    } catch (error) {
      toast.error('Erro ao enviar template');
    }
  };

  return (
    <DashboardLayout breadcrumbs={[{ label: 'Inbox' }]}>
      <div className="flex h-[calc(100vh-8rem)] bg-card rounded-xl border border-border overflow-hidden animate-fade-in">
        {/* Conversations List */}
        <ConversationList
          conversations={conversations}
          selectedId={selectedConversation?.id || null}
          onSelect={handleSelectConversation}
          filter={filter}
          onFilterChange={setFilter}
          search={search}
          onSearchChange={setSearch}
          isLoading={conversationsLoading}
        />

        {/* Chat Area */}
        <ChatArea
          conversation={selectedConversation}
          messages={messages}
          isLoading={messagesLoading}
          onOpenTemplateModal={() => setTemplateModalOpen(true)}
        />

        {/* Contact Sidebar Toggle (for mobile) */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 xl:hidden z-10"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <PanelRightClose className="h-5 w-5" />
          ) : (
            <PanelRightOpen className="h-5 w-5" />
          )}
        </Button>

        {/* Contact Details Sidebar */}
        <ContactSidebar
          conversation={selectedConversation}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Send Template Modal */}
        <SendTemplateModal
          open={templateModalOpen}
          onOpenChange={setTemplateModalOpen}
          onSend={handleSendTemplate}
          conversationId={selectedConversation?.id || null}
        />
      </div>
    </DashboardLayout>
  );
}

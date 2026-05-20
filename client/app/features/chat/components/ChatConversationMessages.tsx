import Message from '@/app/components/ui/Message';
import { MessageIncoming } from '../types/chatTypes';

interface IChatConversationMessagesProps {
  messages: MessageIncoming[];
}

function ChatConversationMessages({ messages }: IChatConversationMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
      {messages.map((m, i) => (
        <Message key={i} user={m.user} time={m.time} content={m.content} />
      ))}
    </div>
  );
}

export default ChatConversationMessages;

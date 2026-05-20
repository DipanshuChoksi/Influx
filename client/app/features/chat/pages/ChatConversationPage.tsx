'use client';

import Loading from '@/app/components/ui/Loading';
import useChatConversation from '../hooks/useChatConversation';
import ChatNotFound from '../components/ChatNotFound';
import ConversationView from '../components/ConversationView';

function ChatConversationPage({ userId }: { userId: string }) {
  const { receiver, loading } = useChatConversation({ userId });

  if (loading) {
    return <Loading />;
  }

  if (!receiver) {
    return <ChatNotFound />;
  }

  return <ConversationView receiver={receiver} />;
}

export default ChatConversationPage;

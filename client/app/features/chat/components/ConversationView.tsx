import Sidebar from '@/app/components/ui/Sidebar';
import { User } from '@/app/types';
import useAuthStore from '@/app/features/auth/stores/auth.store';
import ChatConversationHeader from './ChatConversationHeader';
import useConversationPage from '../hooks/useConversationPage';
import ChatConversationMessages from './ChatConversationMessages';
import ChatConversationInput from './ChatConversationInput';

interface ChatClientPageProps {
  receiver: User;
}

function ConversationView({ receiver }: ChatClientPageProps) {
  const user = useAuthStore((state) => state.user);
  const messages = useConversationPage(user, receiver);
  console.log(messages);
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex overflow-hidden">
      <Sidebar />

      {/* Main Chat Area */}
      <main className="pl-20 md:pl-64 flex-1 flex flex-col h-screen">
        {/* Chat Header */}
        <ChatConversationHeader receiver={receiver} />

        {/* Messages */}
        <ChatConversationMessages messages={messages} />

        {/* Chat Input */}
        <ChatConversationInput receiver={receiver} />
      </main>
    </div>
  );
}

export default ConversationView;

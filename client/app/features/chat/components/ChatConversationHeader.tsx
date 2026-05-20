import ChatIcon from '@/app/components/icons/ChatIcon';
import ThreeDotIcon from '@/app/components/icons/ThreeDotIcon';
import { User } from '@/app/types';

function ChatConversationHeader({ receiver }: { receiver: User }) {
  return (
    <header className="h-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 px-8 flex items-center justify-between z-40 shrink-0">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
          <ChatIcon />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white leading-none">{receiver.name}</h1>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="p-2 text-slate-400 hover:text-white transition-colors">
          <ThreeDotIcon />
        </button>
      </div>
    </header>
  );
}

export default ChatConversationHeader;

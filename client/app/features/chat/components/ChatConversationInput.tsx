import { User } from '@/app/types';
import PlusIcon from '@/app/components/icons/PlusIcon';
import SmileIcon from '@/app/components/icons/SmileIcon';
import SendIcon from '@/app/components/icons/SendIcon';
import { useState } from 'react';
import { handleSendMsg } from '../api/sendMessage';
import useAuthStore from '../../auth/stores/auth.store';

function ChatConversationInput({ receiver }: { receiver: User }) {
  const user = useAuthStore((state) => state.user);
  const [message, setMessage] = useState('');

  return (
    <div className="p-8 shrink-0">
      <div className="max-w-4xl mx-auto relative group">
        <div className="absolute inset-x-0 -top-8 flex justify-center opacity-0 group-focus-within:opacity-100 transition-opacity">
          <span className="text-[10px] font-medium text-slate-500 italic">Alice, Bob, and 2 others are typing...</span>
        </div>
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-2 flex items-center gap-2 shadow-2xl shadow-indigo-500/5 group-focus-within:border-indigo-500/50 group-focus-within:ring-4 group-focus-within:ring-indigo-500/10 transition-all">
          <button className="p-3 text-slate-500 hover:text-indigo-400 transition-colors">
            <PlusIcon />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message to the server..."
            className="flex-1 bg-transparent border-none py-4 px-2 text-sm text-white focus:outline-none placeholder:text-slate-600"
          />
          <div className="flex items-center gap-1 pr-2">
            <button className="p-2.5 text-slate-500 hover:text-amber-400 transition-colors">
              <SmileIcon />
            </button>
            <button
              className="p-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-500 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-600/20"
              onClick={() => {
                handleSendMsg(message, user, receiver);
                setMessage('');
              }}
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatConversationInput;

import { useRouter } from 'next/navigation';

function ChatNotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">User not found</h1>
      <button onClick={() => router.back()} className="px-6 py-2 bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-colors">
        Back to Chats
      </button>
    </div>
  );
}

export default ChatNotFound;

'use client';

import ChatConversationPage from '@/app/features/chat/pages/ChatConversationPage';
import { use } from 'react';

function Page({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params);
  return <ChatConversationPage userId={userId} />;
}
export default Page;

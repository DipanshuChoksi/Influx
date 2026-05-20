import PartyRoom from './components/PartyRoom';

export default async function WatchPartyRoomPage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await params;

  return (
    <main className="pl-20 md:pl-64 flex-1 flex flex-col h-screen p-8">
      <PartyRoom roomId={roomId} />
    </main>
  );
}

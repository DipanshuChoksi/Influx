import Sidebar from '../../components/ui/Sidebar';
import PartyRoom from './components/PartyRoom';

export default async function WatchPartyRoomPage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await params;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex overflow-hidden">
      {/* Side Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="pl-20 md:pl-64 flex-1 flex flex-col h-screen p-8">
        <PartyRoom roomId={roomId} />
      </main>
    </div>
  );
}

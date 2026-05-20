import Sidebar from '../components/ui/Sidebar';
import SocketProvider from '../features/auth/providers/socket.provider';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SocketProvider>
      <Sidebar />
      <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">{children}</div>
    </SocketProvider>
  );
}

export default DashboardLayout;

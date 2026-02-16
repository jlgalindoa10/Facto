import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, BarChart2, User, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { path: '/app', icon: Home, label: 'Inicio' },
  { path: '/app/invoices', icon: FileText, label: 'Facturas' },
  { path: '/app/insights', icon: BarChart2, label: 'Insights' },
  { path: '/app/profile', icon: User, label: 'Perfil' },
];

export default function B2CLayout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-border">
        <Link to="/" className="font-display text-xl font-bold text-gradient">FACTO</Link>
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
          </button>
          <Link to="/app/profile" className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
            JP
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="pb-20 px-4 py-4">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card/95 backdrop-blur-md border-t border-border z-50">
        <div className="flex justify-around py-2">
          {tabs.map(tab => {
            const isActive = location.pathname === tab.path;
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors text-xs',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <tab.icon className={cn('h-5 w-5', isActive && 'text-primary')} />
                <span className="font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, List, Users, BarChart3, Settings, Menu, X, ChevronUp, Crown, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { businesses } from '@/data/mockData';
import { Button } from '@/components/ui/button';

const navItems = [
  { path: '/business', icon: Home, label: 'Inicio' },
  { path: '/business/transactions', icon: List, label: 'Transacciones' },
  { path: '/business/customers', icon: Users, label: 'Clientes' },
  { path: '/business/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/business/invoicing', icon: FileText, label: 'Facturación Rápida' },
  { path: '/business/settings', icon: Settings, label: 'Configuración' },
];

const biz = businesses[0];

export default function B2BLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <>
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/" className="font-display text-2xl font-bold text-sidebar-primary">FACTO</Link>
        <p className="text-xs text-sidebar-foreground/60 mt-1">Dashboard Negocio</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      {sidebarOpen && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="text-sm font-medium text-sidebar-foreground truncate">{biz.name}</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs px-2 py-0.5 rounded-full bg-warning/20 text-warning font-medium">
              {biz.plan === 'pro' ? 'Pro' : 'Freemium'}
            </span>
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-2 text-sidebar-foreground/60 hover:text-sidebar-foreground text-xs">
            <Crown className="h-3 w-3 mr-1" /> Mejorar plan
          </Button>
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className={cn(
        'hidden lg:flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 shrink-0',
        sidebarOpen ? 'w-60' : 'w-16'
      )}>
        <SidebarContent />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 border-t border-sidebar-border text-sidebar-foreground/60 hover:text-sidebar-foreground flex items-center justify-center"
        >
          <ChevronUp className={cn('h-4 w-4 transition-transform', sidebarOpen ? '-rotate-90' : 'rotate-90')} />
        </button>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-60 h-full bg-sidebar flex flex-col">
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-sidebar-foreground">
              <X className="h-5 w-5" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-muted">
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="font-display font-semibold text-lg truncate">{biz.name}</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
              {biz.contactName.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

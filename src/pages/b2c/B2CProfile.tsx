import { users } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, CreditCard, Shield, Bell, HelpCircle, LogOut, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const currentUser = users[0];

export default function B2CProfile() {
  return (
    <div className="space-y-6">
      {/* Avatar + Info */}
      <div className="flex flex-col items-center text-center">
        <div className="h-20 w-20 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-display font-bold mb-3">
          {currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>
        <h2 className="font-display font-bold text-xl">{currentUser.name}</h2>
        <p className="text-sm text-muted-foreground">{currentUser.email}</p>
      </div>

      {/* Info Cards */}
      <div className="bg-card rounded-xl border border-border divide-y divide-border">
        {[
          { icon: User, label: 'Nombre', value: currentUser.name },
          { icon: Mail, label: 'Email', value: currentUser.email },
          { icon: Phone, label: 'Teléfono', value: currentUser.phone },
          { icon: CreditCard, label: 'Cédula', value: `***${currentUser.cedula.slice(-6)}` },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3">
            <item.icon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{item.label}</span>
            <span className="ml-auto text-sm font-medium">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Payment Methods */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h3 className="font-semibold text-sm mb-3">Métodos de pago vinculados</h3>
        <div className="space-y-2">
          {['Nequi', 'Tarjeta débito Bancolombia'].map((m, i) => (
            <div key={i} className="flex items-center gap-3 bg-muted rounded-lg px-3 py-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{m}</span>
              <Badge variant="secondary" className="ml-auto text-[10px]">Vinculado</Badge>
            </div>
          ))}
        </div>
        <Button variant="ghost" size="sm" className="w-full mt-2 text-primary" onClick={() => toast.info('Próximamente')}>
          <Plus className="h-4 w-4 mr-1" /> Agregar método
        </Button>
      </div>

      {/* Privacy */}
      <div className="bg-card rounded-xl border border-border p-4 space-y-4">
        <h3 className="font-semibold text-sm flex items-center gap-2"><Shield className="h-4 w-4" /> Configuración de privacidad</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Compartir data anónima</div>
            <div className="text-xs text-muted-foreground">Ganas cashback cuando está activado</div>
          </div>
          <Switch defaultChecked />
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-xl border border-border p-4 space-y-3">
        <h3 className="font-semibold text-sm flex items-center gap-2"><Bell className="h-4 w-4" /> Notificaciones</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm">Facturas nuevas</span>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Ofertas personalizadas</span>
          <Switch defaultChecked />
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-start" onClick={() => toast.info('Centro de ayuda próximamente')}>
          <HelpCircle className="h-4 w-4 mr-2" /> Centro de ayuda
        </Button>
        <Button variant="ghost" className="w-full justify-start text-destructive" asChild>
          <Link to="/"><LogOut className="h-4 w-4 mr-2" /> Cerrar sesión</Link>
        </Button>
      </div>
    </div>
  );
}

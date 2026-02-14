import { businesses } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Hash, Tag, MapPin, Link2, Users, CreditCard, Crown, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const biz = businesses[0];

const plans = [
  { name: 'Freemium', price: '$0/mes', features: ['200 transacciones/mes', '1 usuario dashboard', 'Analytics básico'], current: biz.plan === 'freemium' },
  { name: 'Pro', price: '$150,000 COP/mes', features: ['Transacciones ilimitadas', '5 usuarios', 'Analytics avanzado + cross-industry', 'Soporte prioritario', 'Campañas automatizadas'], current: biz.plan === 'pro' },
  { name: 'Enterprise', price: 'Personalizado', features: ['Todo lo anterior', 'Múltiples sedes', 'API access', 'Consultoría dedicada'], current: false },
];

export default function B2BSettings() {
  const [pricingOpen, setPricingOpen] = useState(false);

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="font-display text-2xl font-bold">Configuración</h1>

      {/* Business Info */}
      <div className="bg-card rounded-xl border border-border p-5 space-y-4">
        <h3 className="font-semibold flex items-center gap-2"><Building2 className="h-4 w-4" /> Información del Negocio</h3>
        {[
          { icon: Building2, label: 'Nombre', value: biz.name },
          { icon: Hash, label: 'NIT', value: biz.nit },
          { icon: Tag, label: 'Categoría', value: biz.category.charAt(0).toUpperCase() + biz.category.slice(1) },
          { icon: MapPin, label: 'Dirección', value: biz.address },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
            <item.icon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{item.label}</span>
            <span className="ml-auto text-sm font-medium">{item.value}</span>
          </div>
        ))}
      </div>

      {/* POS Integration */}
      <div className="bg-card rounded-xl border border-border p-5 space-y-4">
        <h3 className="font-semibold flex items-center gap-2"><Link2 className="h-4 w-4" /> Integración de POS</h3>
        <Select defaultValue="none">
          <SelectTrigger><SelectValue placeholder="Sistema POS" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No seleccionado</SelectItem>
            <SelectItem value="alegra">Alegra</SelectItem>
            <SelectItem value="siigo">Siigo</SelectItem>
            <SelectItem value="aloha">Aloha</SelectItem>
            <SelectItem value="other">Otro</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-destructive border-destructive/30">No conectado</Badge>
        </div>
        <Button variant="outline" className="w-full" onClick={() => toast.info('Nos contactaremos contigo para configurar la integración')}>
          Conectar POS
        </Button>
      </div>

      {/* Team */}
      <div className="bg-card rounded-xl border border-border p-5 space-y-3">
        <h3 className="font-semibold flex items-center gap-2"><Users className="h-4 w-4" /> Equipo</h3>
        <div className="flex items-center gap-3 bg-muted rounded-lg px-3 py-2">
          <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">CM</div>
          <div>
            <div className="text-sm font-medium">{biz.contactName}</div>
            <div className="text-xs text-muted-foreground">Admin</div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-full text-primary" onClick={() => toast.info('Próximamente')}>
          + Invitar usuario
        </Button>
      </div>

      {/* Plan */}
      <div className="bg-card rounded-xl border border-border p-5 space-y-3">
        <h3 className="font-semibold flex items-center gap-2"><CreditCard className="h-4 w-4" /> Plan y Facturación</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm">Plan actual:</span>
          <Badge className="bg-warning/20 text-warning">{biz.plan === 'pro' ? 'Pro' : 'Freemium'}</Badge>
        </div>
        <div className="bg-muted rounded-lg p-3 text-sm space-y-1">
          <div className="flex justify-between"><span className="text-muted-foreground">Transacciones</span><span>150 / ilimitadas</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Usuarios</span><span>1 / 5</span></div>
        </div>
        <Button className="w-full gradient-primary text-primary-foreground border-0" onClick={() => setPricingOpen(true)}>
          <Crown className="h-4 w-4 mr-2" /> Ver planes
        </Button>
      </div>

      {/* Pricing Modal */}
      <Dialog open={pricingOpen} onOpenChange={setPricingOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display">Planes FACTO</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {plans.map(plan => (
              <div key={plan.name} className={`rounded-xl border p-4 ${plan.current ? 'border-primary bg-primary/5' : 'border-border'}`}>
                <h4 className="font-display font-bold">{plan.name}</h4>
                <div className="text-lg font-bold mt-1">{plan.price}</div>
                <ul className="mt-3 space-y-2">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.current ? (
                  <Badge className="mt-3 bg-primary/20 text-primary">Plan actual</Badge>
                ) : (
                  <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => toast.info('Cambio de plan próximamente')}>
                    Seleccionar
                  </Button>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

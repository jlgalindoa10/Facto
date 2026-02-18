import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Sparkles, ChevronRight, BellRing, Receipt, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { transactions, getBusinessById, formatCOP, categoryLabels, users } from '@/data/mockData';
import InvoiceDetailModal from '@/components/InvoiceDetailModal';
import type { Transaction } from '@/data/mockData';
import { toast } from 'sonner';

const currentUser = users[0];
const userTxns = transactions.filter(t => t.userId === currentUser.id).slice(0, 15);

export default function B2CHome() {
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [checkedIn, setCheckedIn] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Cashback Hero */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="gradient-primary rounded-2xl p-6 text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-4 w-4 opacity-80" />
            <span className="text-sm opacity-80">Tu saldo acumulado</span>
          </div>
          <div className="text-4xl font-display font-bold tabular-nums mb-1">
            {formatCOP(currentUser.monthCashback)}
          </div>
          <p className="text-sm opacity-70 mb-4">Ganado este mes por compartir tu data</p>
          <Button size="sm" className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0" onClick={() => toast.info('Redención de cashback próximamente')}>
            Redimir
          </Button>
        </div>
      </motion.div>

      {/* Trust Badge */}
      <div className="flex items-center gap-2 px-3 py-2 bg-secondary/10 rounded-lg">
        <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
        <span className="text-xs text-muted-foreground">Data protegida · Anonimizada · Conforme Ley 1581</span>
      </div>

      {/* Restaurant Mode (Check-in) */}
      <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
        <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
          🍽️ Modo Restaurante
        </h3>

        {!checkedIn ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Selecciona dónde estás para pedir tu cuenta o llamar al mesero.
            </p>
            <Select onValueChange={(val) => setCheckedIn(val)}>
              <SelectTrigger>
                <SelectValue placeholder="🔍 ¿Dónde estás comiendo?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="el-cielo">El Cielo - Zona G</SelectItem>
                <SelectItem value="crepes">Crepes & Waffles - Andino</SelectItem>
                <SelectItem value="osaka">Osaka - P. La 93</SelectItem>
                <SelectItem value="home-burgers">Home Burgers - Calle 81</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between bg-primary/5 p-3 rounded-lg border border-primary/10">
              <div>
                <div className="text-xs text-muted-foreground">Estás en:</div>
                <div className="font-bold text-primary">
                  {['El Cielo', 'Crepes & Waffles', 'Osaka', 'Home Burgers'].find(n => n.toLowerCase().includes(checkedIn.replace('-', ' '))) || 'Restaurante'}
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setCheckedIn(null)} className="h-8 text-xs">
                Salir
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-auto py-3 flex flex-col gap-1 border-primary/20 hover:bg-primary/5"
                onClick={() => toast.success('Mesero notificado', { description: 'Alguien vendrá a tu mesa pronto.' })}
              >
                <BellRing className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium">Llamar Mesero</span>
              </Button>
              <Button
                className="h-auto py-3 flex flex-col gap-1 gradient-primary text-primary-foreground shadow-md"
                onClick={() => {
                  toast.success('Cuenta solicitada', { description: 'El restaurante ha recibido tu solicitud.' });
                  // Here we would trigger the B2B side update
                }}
              >
                <Receipt className="h-5 w-5" />
                <span className="text-xs font-medium">Pedir Cuenta</span>
              </Button>
            </div>

            <Button variant="secondary" className="w-full text-xs h-8">
              <Utensils className="mr-2 h-3 w-3" /> Ver Menú Digital
            </Button>
          </div>
        )}
      </div>

      {/* Recent Invoices */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-semibold text-lg">Facturas Recientes</h2>
          <span className="text-xs text-muted-foreground">{userTxns.length} facturas</span>
        </div>
        <div className="space-y-2">
          {userTxns.map((txn, i) => {
            const biz = getBusinessById(txn.businessId);
            const timeAgo = Math.floor((Date.now() - txn.createdAt.getTime()) / (1000 * 60 * 60));
            const timeLabel = timeAgo < 1 ? 'Hace un momento' : timeAgo < 24 ? `Hace ${timeAgo}h` : `Hace ${Math.floor(timeAgo / 24)}d`;

            return (
              <motion.button
                key={txn.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedTxn(txn)}
                className="w-full bg-card rounded-xl border border-border p-4 flex items-center gap-3 hover:shadow-card transition-all text-left"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  {biz?.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{biz?.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{timeLabel}</span>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      {categoryLabels[biz?.category || ''] || biz?.category}
                    </Badge>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-semibold text-sm tabular-nums">{formatCOP(txn.amount)}</div>
                  <Badge variant="secondary" className="text-[10px] bg-secondary/20 text-secondary">
                    Recibida ✓
                  </Badge>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => toast.info('Agregar factura manual próximamente')}
        className="fixed bottom-20 right-4 max-w-md mx-auto h-14 w-14 rounded-full gradient-primary shadow-glow flex items-center justify-center text-primary-foreground z-40"
      >
        <Plus className="h-6 w-6" />
      </button>

      <InvoiceDetailModal transaction={selectedTxn} open={!!selectedTxn} onClose={() => setSelectedTxn(null)} />
    </div>
  );
}

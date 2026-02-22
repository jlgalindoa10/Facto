import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { transactions, getBusinessById, formatCOP, categoryLabels, users } from '@/data/mockData';
import InvoiceDetailModal from '@/components/InvoiceDetailModal';
import type { Transaction } from '@/data/mockData';
import { toast } from 'sonner';

const currentUser = users[0];
const userTxns = transactions.filter(t => t.userId === currentUser.id).slice(0, 15);

export default function B2CHome() {
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);

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

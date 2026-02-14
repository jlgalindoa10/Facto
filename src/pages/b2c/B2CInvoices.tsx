import { useState } from 'react';
import { motion } from 'framer-motion';
import { transactions, getBusinessById, formatCOP, categoryLabels, users } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';
import InvoiceDetailModal from '@/components/InvoiceDetailModal';
import type { Transaction } from '@/data/mockData';

const currentUser = users[0];
const allTxns = transactions.filter(t => t.userId === currentUser.id);

export default function B2CInvoices() {
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);

  // Group by month
  const grouped: Record<string, Transaction[]> = {};
  allTxns.forEach(t => {
    const key = t.createdAt.toLocaleDateString('es-CO', { year: 'numeric', month: 'long' });
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(t);
  });

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Todas las Facturas</h1>

      {Object.entries(grouped).map(([month, txns]) => (
        <div key={month}>
          <h3 className="text-sm font-medium text-muted-foreground mb-2 capitalize">{month}</h3>
          <div className="space-y-2">
            {txns.map((txn, i) => {
              const biz = getBusinessById(txn.businessId);
              return (
                <motion.button
                  key={txn.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => setSelectedTxn(txn)}
                  className="w-full bg-card rounded-xl border border-border p-3 flex items-center gap-3 hover:shadow-card transition-all text-left"
                >
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                    {biz?.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{biz?.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {txn.createdAt.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-semibold text-sm tabular-nums">{formatCOP(txn.amount)}</div>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      {categoryLabels[biz?.category || ''] || 'Otro'}
                    </Badge>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}

      <InvoiceDetailModal transaction={selectedTxn} open={!!selectedTxn} onClose={() => setSelectedTxn(null)} />
    </div>
  );
}

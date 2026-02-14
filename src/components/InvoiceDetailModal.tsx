import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Transaction, getBusinessById, formatCOP, paymentMethodLabels } from '@/data/mockData';
import { Download, AlertCircle, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  transaction: Transaction | null;
  open: boolean;
  onClose: () => void;
}

export default function InvoiceDetailModal({ transaction, open, onClose }: Props) {
  if (!transaction) return null;
  const biz = getBusinessById(transaction.businessId);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
              {biz?.name.charAt(0)}
            </div>
            <div>
              <div>{biz?.name}</div>
              <div className="text-xs text-muted-foreground font-normal">{transaction.createdAt.toLocaleString('es-CO')}</div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="bg-muted rounded-lg p-3 text-xs text-muted-foreground">
            Factura #{transaction.id}
          </div>

          {/* Items */}
          <div>
            <h4 className="text-sm font-medium mb-2">Detalle</h4>
            <div className="space-y-2">
              {transaction.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{item.name} <span className="text-muted-foreground">×{item.qty}</span></span>
                  <span className="tabular-nums">{formatCOP(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="border-t border-border pt-3 space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="tabular-nums">{formatCOP(transaction.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">IVA (19%)</span>
              <span className="tabular-nums">{formatCOP(transaction.iva)}</span>
            </div>
            {transaction.tip > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Propina</span>
                <span className="tabular-nums">{formatCOP(transaction.tip)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-base pt-2 border-t border-border">
              <span>Total</span>
              <span className="tabular-nums">{formatCOP(transaction.amount)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="flex items-center justify-between bg-muted rounded-lg p-3">
            <span className="text-sm text-muted-foreground">Método de pago</span>
            <Badge variant="secondary">{paymentMethodLabels[transaction.paymentMethod]}</Badge>
          </div>

          {/* Cashback */}
          <div className="gradient-cashback rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-secondary-foreground">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Cashback ganado</span>
            </div>
            <span className="font-bold text-secondary-foreground tabular-nums">+ {formatCOP(transaction.cashbackEarned)}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button className="flex-1" variant="outline" onClick={() => toast.info('Descarga de PDF próximamente')}>
              <Download className="h-4 w-4 mr-2" /> Descargar PDF
            </Button>
            <Button variant="ghost" size="icon" onClick={() => toast.info('Reporte enviado')}>
              <AlertCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

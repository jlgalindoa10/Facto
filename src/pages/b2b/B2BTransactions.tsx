import { useState } from 'react';
import { transactions, businesses, getUserById, formatCOP, paymentMethodLabels } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Eye } from 'lucide-react';
import { toast } from 'sonner';

const biz = businesses[0];
const bizTxns = transactions.filter(t => t.businessId === biz.id);

const statusColors: Record<string, string> = {
  completed: 'bg-secondary/20 text-secondary',
  pending: 'bg-warning/20 text-warning',
  failed: 'bg-destructive/20 text-destructive',
};
const statusLabels: Record<string, string> = {
  completed: 'Procesada',
  pending: 'Pendiente',
  failed: 'Fallida',
};

export default function B2BTransactions() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [page, setPage] = useState(0);

  const filtered = bizTxns.filter(t => {
    if (statusFilter !== 'all' && t.status !== statusFilter) return false;
    if (methodFilter !== 'all' && t.paymentMethod !== methodFilter) return false;
    return true;
  });

  const pageSize = 10;
  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="font-display text-2xl font-bold">Transacciones</h1>
        <Button variant="outline" size="sm" onClick={() => toast.info('Exportación próximamente')}>
          <Download className="h-4 w-4 mr-2" /> Exportar Excel
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={statusFilter} onValueChange={v => { setStatusFilter(v); setPage(0); }}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Estado" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="completed">Procesadas</SelectItem>
            <SelectItem value="pending">Pendientes</SelectItem>
            <SelectItem value="failed">Fallidas</SelectItem>
          </SelectContent>
        </Select>
        <Select value={methodFilter} onValueChange={v => { setMethodFilter(v); setPage(0); }}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Método" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="nequi">Nequi</SelectItem>
            <SelectItem value="card">Tarjeta</SelectItem>
            <SelectItem value="cash">Efectivo</SelectItem>
            <SelectItem value="daviplata">Daviplata</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground self-center">{filtered.length} resultados</span>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left px-4 py-3 font-medium">ID</th>
              <th className="text-left px-4 py-3 font-medium">Fecha</th>
              <th className="text-left px-4 py-3 font-medium">Cliente</th>
              <th className="text-right px-4 py-3 font-medium">Subtotal</th>
              <th className="text-right px-4 py-3 font-medium">IVA</th>
              <th className="text-right px-4 py-3 font-medium">Propina</th>
              <th className="text-right px-4 py-3 font-medium">Total</th>
              <th className="text-left px-4 py-3 font-medium">Método</th>
              <th className="text-left px-4 py-3 font-medium">Estado</th>
              <th className="text-center px-4 py-3 font-medium">Acción</th>
            </tr>
          </thead>
          <tbody>
            {paged.map(txn => {
              const user = getUserById(txn.userId);
              return (
                <tr key={txn.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{txn.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                    {txn.createdAt.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-4 py-3">{user?.dataSharing ? `${user.name.split(' ')[0]} ${user.name.split(' ')[1]?.charAt(0)}.` : 'Anónimo'}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatCOP(txn.subtotal)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatCOP(txn.iva)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatCOP(txn.tip)}</td>
                  <td className="px-4 py-3 text-right font-medium tabular-nums">{formatCOP(txn.amount)}</td>
                  <td className="px-4 py-3"><Badge variant="outline" className="text-xs">{paymentMethodLabels[txn.paymentMethod]}</Badge></td>
                  <td className="px-4 py-3"><Badge className={`text-xs ${statusColors[txn.status]}`}>{statusLabels[txn.status]}</Badge></td>
                  <td className="px-4 py-3 text-center">
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="h-3.5 w-3.5" /></Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Página {page + 1} de {totalPages}</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(p => p - 1)}>Anterior</Button>
          <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>Siguiente</Button>
        </div>
      </div>
    </div>
  );
}

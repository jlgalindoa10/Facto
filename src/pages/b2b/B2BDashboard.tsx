import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Receipt, Clock, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import KPICard from '@/components/KPICard';
import { Badge } from '@/components/ui/badge';
import { transactions, businesses, getUserById, formatCOP, paymentMethodLabels, getDailyRevenue } from '@/data/mockData';

const biz = businesses[0];
const bizTxns = transactions.filter(t => t.businessId === biz.id);
const totalRevenue = bizTxns.reduce((s, t) => s + t.amount, 0);
const avgTicket = Math.round(totalRevenue / bizTxns.length);
const dailyData = getDailyRevenue(biz.id, 30);

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

export default function B2BDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Dashboard</h1>
        <Badge variant="outline" className="text-xs">Últimos 30 días</Badge>
      </div>

      {/* KPIs */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard title="Revenue Total" value={formatCOP(totalRevenue)} change="+12.5%" icon={DollarSign} subtitle="vs. período anterior" />
        <KPICard title="Transacciones" value={bizTxns.length.toLocaleString()} change="+8.3%" icon={ShoppingCart} />
        <KPICard title="Ticket Promedio" value={formatCOP(avgTicket)} change="+3.8%" icon={Receipt} />
        <KPICard title="Tiempo Prom. Cobro" value="1.2 min" change="-85%" changePositive={true} icon={Clock} subtitle="vs. 9 min sin FACTO" />
      </motion.div>

      {/* Revenue Chart */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold">Revenue por día</h3>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="hsl(215,16%,47%)" interval={4} />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" tickFormatter={(v) => `$${Math.round(v / 1000000)}M`} />
              <Tooltip formatter={(v: number) => formatCOP(v)} labelStyle={{ fontWeight: 600 }} />
              <Bar dataKey="revenue" fill="hsl(217,91%,53%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="bg-card rounded-xl border border-border">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-display font-semibold">Facturas Recientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left px-5 py-3 font-medium">Fecha</th>
                <th className="text-left px-5 py-3 font-medium">Cliente</th>
                <th className="text-right px-5 py-3 font-medium">Monto</th>
                <th className="text-left px-5 py-3 font-medium">Método</th>
                <th className="text-left px-5 py-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              {bizTxns.slice(0, 10).map(txn => {
                const user = getUserById(txn.userId);
                return (
                  <tr key={txn.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">
                      {txn.createdAt.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-5 py-3">
                      {user?.dataSharing ? `${user.name.split(' ')[0]} ${user.name.split(' ')[1]?.charAt(0)}.` : `Anónimo #${txn.userId.slice(-4)}`}
                    </td>
                    <td className="px-5 py-3 text-right font-medium tabular-nums">{formatCOP(txn.amount)}</td>
                    <td className="px-5 py-3">
                      <Badge variant="outline" className="text-xs">{paymentMethodLabels[txn.paymentMethod]}</Badge>
                    </td>
                    <td className="px-5 py-3">
                      <Badge className={`text-xs ${statusColors[txn.status]}`}>{statusLabels[txn.status]}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

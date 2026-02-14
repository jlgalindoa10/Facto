import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { transactions, getBusinessById, formatCOP, users, getMonthlySpending, categoryLabels } from '@/data/mockData';
import { TrendingUp, Receipt, Sparkles, MapPin } from 'lucide-react';

const currentUser = users[0];
const userTxns = transactions.filter(t => t.userId === currentUser.id);
const totalSpent = userTxns.reduce((s, t) => s + t.amount, 0);
const totalCashback = userTxns.reduce((s, t) => s + t.cashbackEarned, 0);
const monthlyData = getMonthlySpending(currentUser.id);

// Category breakdown
const categorySpend: Record<string, number> = {};
userTxns.forEach(t => {
  const biz = getBusinessById(t.businessId);
  const cat = biz?.category || 'otros';
  categorySpend[cat] = (categorySpend[cat] || 0) + t.amount;
});
const categoryData = Object.entries(categorySpend).map(([key, value]) => ({
  name: categoryLabels[key] || key,
  value: Math.round((value / totalSpent) * 100),
})).sort((a, b) => b.value - a.value);

const COLORS = ['hsl(217,91%,53%)', 'hsl(263,70%,50%)', 'hsl(160,84%,39%)', 'hsl(38,92%,50%)', 'hsl(215,16%,47%)'];

// Top places
const bizVisits: Record<string, number> = {};
userTxns.forEach(t => {
  bizVisits[t.businessId] = (bizVisits[t.businessId] || 0) + 1;
});
const topPlaces = Object.entries(bizVisits)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 3)
  .map(([id, count]) => ({ name: getBusinessById(id)?.name || id, visits: count }));

export default function B2CInsights() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Insights</h1>

      {/* Summary Cards */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
        {[
          { label: 'Total gastado', value: formatCOP(totalSpent), icon: TrendingUp, color: 'bg-primary/10 text-primary' },
          { label: 'Cashback ganado', value: formatCOP(totalCashback), icon: Sparkles, color: 'bg-secondary/10 text-secondary' },
          { label: 'Facturas', value: String(userTxns.length), icon: Receipt, color: 'bg-accent/10 text-accent' },
          { label: 'Categoría top', value: categoryData[0]?.name || '-', icon: MapPin, color: 'bg-warning/10 text-warning' },
        ].map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl border border-border p-4 min-w-[140px] shrink-0 flex-1"
          >
            <div className={`h-8 w-8 rounded-lg ${card.color} flex items-center justify-center mb-2`}>
              <card.icon className="h-4 w-4" />
            </div>
            <div className="font-bold text-base tabular-nums">{card.value}</div>
            <div className="text-xs text-muted-foreground">{card.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Category Chart */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-display font-semibold mb-4">Gastos por Categoría</h3>
        <div className="flex items-center gap-6">
          <div className="w-36 h-36">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={categoryData} dataKey="value" cx="50%" cy="50%" outerRadius={60} innerRadius={35}>
                  {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 flex-1">
            {categoryData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2 text-sm">
                <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="flex-1">{d.name}</span>
                <span className="font-medium tabular-nums">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Trend Chart */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-display font-semibold mb-4">Tendencia de Gasto</h3>
        <div className="h-48">
          <ResponsiveContainer>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215,16%,47%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" tickFormatter={(v) => `$${Math.round(v / 1000)}K`} />
              <Tooltip formatter={(v: number) => formatCOP(v)} />
              <Line type="monotone" dataKey="amount" stroke="hsl(217,91%,53%)" strokeWidth={2.5} dot={{ r: 4, fill: 'hsl(217,91%,53%)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Top Places */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-display font-semibold mb-3">Lugares Favoritos</h3>
        <div className="space-y-3">
          {topPlaces.map((place, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{place.name}</div>
              </div>
              <span className="text-sm text-muted-foreground tabular-nums">{place.visits} visitas</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Legend } from 'recharts';
import { businesses, transactions, formatCOP, getHourlyHeatmap } from '@/data/mockData';
import { Lightbulb, TrendingUp, Award, BarChart3 } from 'lucide-react';
import KPICard from '@/components/KPICard';

const biz = businesses[0];
const bizTxns = transactions.filter(t => t.businessId === biz.id);

// Top products
const productSales: Record<string, { qty: number; revenue: number }> = {};
bizTxns.forEach(t => {
  t.items.forEach(item => {
    if (!productSales[item.name]) productSales[item.name] = { qty: 0, revenue: 0 };
    productSales[item.name].qty += item.qty;
    productSales[item.name].revenue += item.price * item.qty;
  });
});
const topProducts = Object.entries(productSales)
  .sort((a, b) => b[1].revenue - a[1].revenue)
  .slice(0, 8)
  .map(([name, data]) => ({ name: name.length > 18 ? name.slice(0, 18) + '…' : name, ...data }));

// Benchmark data
const benchmarkData = [
  { metric: 'Ticket Promedio', you: 36300, average: 32000, top25: 45000 },
  { metric: 'Revenue/Día', you: 1510000, average: 1200000, top25: 2100000 },
];

// Projection data
const monthlyRevenue = Array.from({ length: 6 }, (_, i) => {
  const d = new Date();
  d.setMonth(d.getMonth() - (5 - i));
  const mTxns = bizTxns.filter(t => t.createdAt.getMonth() === d.getMonth() && t.createdAt.getFullYear() === d.getFullYear());
  return {
    month: d.toLocaleDateString('es-CO', { month: 'short' }),
    revenue: mTxns.reduce((s, t) => s + t.amount, 0),
    projected: null as number | null,
  };
});
// Add projection
const lastRevenue = monthlyRevenue[monthlyRevenue.length - 1]?.revenue || 0;
const growth = 1.07;
for (let i = 1; i <= 2; i++) {
  const d = new Date();
  d.setMonth(d.getMonth() + i);
  monthlyRevenue.push({
    month: d.toLocaleDateString('es-CO', { month: 'short' }),
    revenue: 0,
    projected: Math.round(lastRevenue * Math.pow(growth, i)),
  });
}

// Heatmap simplified - peak hours
const heatData = getHourlyHeatmap(biz.id);
const peakHours = [...heatData].sort((a, b) => b.count - a.count).slice(0, 3);

export default function B2BAnalytics() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Analytics</h1>

      {/* Executive Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard
          title="Tasa de Retención"
          value="68%"
          change="+23%"
          icon={TrendingUp}
          subtitle="Industria: 45%"
          tooltip="Porcentaje de clientes únicos que regresan en menos de 30 días."
        />
        <KPICard
          title="Rotación de Mesas"
          value="2.3 turnos"
          change="+53%"
          icon={BarChart3}
          subtitle="Antes: 1.5"
          tooltip="Promedio de veces que se ocupa una mesa completa durante un turno de servicio."
        />
        <KPICard
          title="NPS Estimado"
          value="72"
          change="+60%"
          icon={Award}
          subtitle="Industria: 45"
          tooltip="Net Promoter Score calculado basado en feedback directo y propinas voluntarias."
        />
      </div>

      {/* Top Products */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-display font-semibold mb-4">Top Productos Más Vendidos</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" tickFormatter={(v) => `$${Math.round(v / 1000)}K`} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" width={130} />
              <Tooltip formatter={(v: number) => formatCOP(v)} />
              <Bar dataKey="revenue" fill="hsl(217,91%,53%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Peak Hours */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-display font-semibold mb-4">Horas Pico</h3>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {peakHours.map((h, i) => (
            <div key={i} className="bg-primary/5 border border-primary/10 rounded-lg p-3 text-center">
              <div className="font-bold text-lg">{h.day} {h.hour}:00</div>
              <div className="text-xs text-muted-foreground">{h.count} transacciones</div>
            </div>
          ))}
        </div>
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 flex items-start gap-2 text-sm">
          <Lightbulb className="h-4 w-4 text-warning shrink-0 mt-0.5" />
          <span>Tus horas más rentables son: <strong>{peakHours[0]?.day} {peakHours[0]?.hour}:00</strong>. Considera staffing adicional.</span>
        </div>
      </motion.div>

      {/* Benchmark */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-display font-semibold mb-4">Comparativa de Industria</h3>
        <p className="text-sm text-muted-foreground mb-4">¿Cómo te comparas con otros restaurantes en Bogotá?</p>
        <div className="space-y-4">
          {benchmarkData.map(b => (
            <div key={b.metric}>
              <div className="text-sm font-medium mb-2">{b.metric}</div>
              <div className="space-y-1.5">
                {[
                  { label: 'Tu negocio', value: b.you, color: 'bg-primary', pct: (b.you / b.top25) * 100 },
                  { label: 'Promedio', value: b.average, color: 'bg-muted-foreground/30', pct: (b.average / b.top25) * 100 },
                  { label: 'Top 25%', value: b.top25, color: 'bg-secondary', pct: 100 },
                ].map(bar => (
                  <div key={bar.label} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-20">{bar.label}</span>
                    <div className="flex-1 h-5 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${bar.color} rounded-full transition-all`} style={{ width: `${bar.pct}%` }} />
                    </div>
                    <span className="text-xs font-medium tabular-nums w-20 text-right">{formatCOP(bar.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 mt-4 flex items-start gap-2 text-sm">
          <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <span>Estás por encima del promedio en ticket promedio (+12.5%) pero puedes mejorar frecuencia de visita.</span>
        </div>
      </motion.div>

      {/* Revenue Projection */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-display font-semibold mb-4">Proyección de Revenue</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215,16%,47%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" tickFormatter={(v) => `$${Math.round(v / 1000000)}M`} />
              <Tooltip formatter={(v: number) => formatCOP(v)} />
              <Legend />
              <Line type="monotone" dataKey="revenue" name="Revenue" stroke="hsl(217,91%,53%)" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="projected" name="Proyección" stroke="hsl(263,70%,50%)" strokeWidth={2} strokeDasharray="6 3" dot={{ r: 4 }} connectNulls={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}

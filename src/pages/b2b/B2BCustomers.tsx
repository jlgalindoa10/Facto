import { useState } from 'react';
import { motion } from 'framer-motion';
import { customerInsights, getUserById, formatCOP, segmentLabels, segmentColors } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Users, Crown, AlertTriangle, UserPlus } from 'lucide-react';
import CustomerInsightModal from '@/components/CustomerInsightModal';
import type { CustomerInsight } from '@/data/mockData';
import { toast } from 'sonner';

const segments = [
  { key: 'vip', label: 'Clientes VIP', icon: Crown, color: 'border-warning/30 bg-warning/5', count: 0, revenue: 0, avgTicket: 0 },
  { key: 'regular', label: 'Regulares', icon: Users, color: 'border-primary/30 bg-primary/5', count: 0, revenue: 0, avgTicket: 0 },
  { key: 'churn_risk', label: 'En Riesgo de Churn', icon: AlertTriangle, color: 'border-destructive/30 bg-destructive/5', count: 0, revenue: 0, avgTicket: 0 },
  { key: 'new', label: 'Nuevos', icon: UserPlus, color: 'border-secondary/30 bg-secondary/5', count: 0, revenue: 0, avgTicket: 0 },
];

// Calculate segment stats
customerInsights.forEach(ci => {
  const seg = segments.find(s => s.key === ci.segment);
  if (seg) {
    seg.count++;
    seg.revenue += ci.totalSpent;
    seg.avgTicket += ci.avgTicket;
  }
});
segments.forEach(s => { if (s.count > 0) s.avgTicket = Math.round(s.avgTicket / s.count); });

export default function B2BCustomers() {
  const [selectedInsight, setSelectedInsight] = useState<CustomerInsight | null>(null);
  const [segmentFilter, setSegmentFilter] = useState('all');

  const filtered = segmentFilter === 'all' ? customerInsights : customerInsights.filter(ci => ci.segment === segmentFilter);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Clientes</h1>

      {/* Segment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {segments.filter(s => s.count > 0).map((seg, i) => (
          <motion.div key={seg.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className={`rounded-xl border p-4 ${seg.color} cursor-pointer hover:shadow-elevated transition-shadow`}
            onClick={() => setSegmentFilter(seg.key)}
          >
            <seg.icon className="h-5 w-5 text-muted-foreground mb-2" />
            <div className="font-display font-bold text-lg">{seg.count} clientes</div>
            <div className="text-sm text-muted-foreground">{seg.label}</div>
            <div className="text-xs text-muted-foreground mt-1">Ticket prom: {formatCOP(seg.avgTicket)}</div>
          </motion.div>
        ))}
      </div>

      {/* Filter + Table */}
      <div className="flex items-center gap-3">
        <Select value={segmentFilter} onValueChange={setSegmentFilter}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Segmento" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="vip">VIP</SelectItem>
            <SelectItem value="regular">Regular</SelectItem>
            <SelectItem value="occasional">Ocasional</SelectItem>
            <SelectItem value="new">Nuevo</SelectItem>
            <SelectItem value="churn_risk">En Riesgo</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">{filtered.length} clientes</span>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left px-4 py-3 font-medium">Cliente</th>
              <th className="text-left px-4 py-3 font-medium">Segmento</th>
              <th className="text-right px-4 py-3 font-medium">Visitas</th>
              <th className="text-right px-4 py-3 font-medium">Ticket Prom.</th>
              <th className="text-right px-4 py-3 font-medium">Total</th>
              <th className="text-left px-4 py-3 font-medium">Última visita</th>
              <th className="text-center px-4 py-3 font-medium">Cross-Industry</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(ci => {
              const user = getUserById(ci.userId);
              const daysSince = Math.floor((Date.now() - ci.lastVisit.getTime()) / 86400000);
              return (
                <tr key={ci.userId} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 font-medium">
                    {user?.dataSharing ? `${user.name.split(' ')[0]} ${user.name.split(' ')[1]?.charAt(0)}.` : `Anónimo #${ci.userId.slice(-4)}`}
                  </td>
                  <td className="px-4 py-3"><Badge className={`text-xs ${segmentColors[ci.segment]}`}>{segmentLabels[ci.segment]}</Badge></td>
                  <td className="px-4 py-3 text-right tabular-nums">{ci.visitCount}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatCOP(ci.avgTicket)}</td>
                  <td className="px-4 py-3 text-right font-medium tabular-nums">{formatCOP(ci.totalSpent)}</td>
                  <td className="px-4 py-3 text-muted-foreground">Hace {daysSince}d</td>
                  <td className="px-4 py-3 text-center">
                    <Button variant="ghost" size="sm" className="text-primary" onClick={() => setSelectedInsight(ci)}>
                      <Eye className="h-3.5 w-3.5 mr-1" /> Ver perfil
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <CustomerInsightModal insight={selectedInsight} open={!!selectedInsight} onClose={() => setSelectedInsight(null)} />
    </div>
  );
}

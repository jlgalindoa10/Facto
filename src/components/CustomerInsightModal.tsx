import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CustomerInsight, getUserById, formatCOP, segmentLabels, segmentColors } from '@/data/mockData';
import { Lightbulb, Target, MapPin, Clock, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { toast } from 'sonner';

interface Props {
  insight: CustomerInsight | null;
  open: boolean;
  onClose: () => void;
}

const COLORS = ['hsl(217,91%,53%)', 'hsl(263,70%,50%)', 'hsl(160,84%,39%)', 'hsl(38,92%,50%)', 'hsl(215,16%,47%)'];

export default function CustomerInsightModal({ insight, open, onClose }: Props) {
  if (!insight) return null;
  const user = getUserById(insight.userId);
  const chartData = Object.entries(insight.crossIndustry).filter(([, v]) => v > 0).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value,
  }));

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-3">
            <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
              {user?.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <div>{user?.name.split(' ')[0]} {user?.name.split(' ')[1]?.charAt(0)}.</div>
              <Badge className={segmentColors[insight.segment]}>{segmentLabels[insight.segment]}</Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-muted rounded-lg p-3 text-center">
              <div className="text-lg font-bold tabular-nums">{insight.visitCount}</div>
              <div className="text-xs text-muted-foreground">Visitas</div>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <div className="text-lg font-bold tabular-nums">{formatCOP(insight.avgTicket)}</div>
              <div className="text-xs text-muted-foreground">Ticket prom.</div>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <div className="text-lg font-bold tabular-nums">{formatCOP(insight.totalSpent)}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
          </div>

          {/* Cross-Industry Chart */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Comportamiento Cross-Industry
            </h4>
            <p className="text-xs text-muted-foreground mb-3">Este cliente es un consumidor frecuente de:</p>
            <div className="flex items-center gap-4">
              <div className="w-32 h-32">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={chartData} dataKey="value" cx="50%" cy="50%" outerRadius={55} innerRadius={30}>
                      {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => `${v}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1.5 flex-1">
                {chartData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-2 text-sm">
                    <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="flex-1">{d.name}</span>
                    <span className="font-medium tabular-nums">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Patterns */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Patrones de Consumo
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2 bg-muted rounded-lg p-3">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <span>Prefiere establecimientos en <strong>{insight.preferredZone}</strong></span>
              </div>
              <div className="flex items-start gap-2 bg-muted rounded-lg p-3">
                <TrendingUp className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <span>Gasta típicamente <strong>{insight.avgSpendRange}</strong> por visita</span>
              </div>
              <div className="flex items-start gap-2 bg-muted rounded-lg p-3">
                <Clock className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <span>Horarios preferidos: <strong>{insight.preferredHours}</strong></span>
              </div>
            </div>
          </div>

          {/* Marketing Insights */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-warning" />
              Oportunidades de Marketing
            </h4>
            <div className="space-y-2">
              {insight.marketingInsights.map((tip, i) => (
                <div key={i} className="bg-warning/10 border border-warning/20 rounded-lg p-3 text-sm flex items-start gap-2">
                  <span>💡</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benchmark */}
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-2">Benchmark</h4>
            <p className="text-sm text-muted-foreground">Cliente con este perfil tiene LTV promedio de <strong>{formatCOP(850000)}</strong> en tu categoría.</p>
            <p className="text-sm text-muted-foreground mt-1">Retención típica: <strong>6 meses</strong> si se fideliza en primeras 3 visitas.</p>
          </div>

          <Button className="w-full gradient-primary text-primary-foreground border-0" onClick={() => toast.info('Campañas personalizadas próximamente')}>
            Crear campaña para clientes similares
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  changePositive?: boolean;
  icon: LucideIcon;
  subtitle?: string;
}

export default function KPICard({ title, value, change, changePositive = true, icon: Icon, subtitle }: KPICardProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-elevated transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-muted-foreground font-medium">{title}</span>
        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div className="text-2xl font-display font-bold tabular-nums">{value}</div>
      {change && (
        <div className="flex items-center gap-1.5 mt-1.5">
          {changePositive ? <TrendingUp className="h-3.5 w-3.5 text-success" /> : <TrendingDown className="h-3.5 w-3.5 text-destructive" />}
          <span className={cn('text-sm font-medium tabular-nums', changePositive ? 'text-success' : 'text-destructive')}>
            {change}
          </span>
          {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
        </div>
      )}
      {!change && subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );
}

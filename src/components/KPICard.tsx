import { LucideIcon, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  subtitle?: string;
  tooltip?: string;
}

export default function KPICard({ title, value, change, icon: Icon, subtitle, tooltip }: KPICardProps) {
  const isPositive = change.startsWith('+');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {title}
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground hover:text-foreground transition-colors" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-[200px] text-xs">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs mt-1">
          <span className={isPositive ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
            {change}
          </span>
          {!change && subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

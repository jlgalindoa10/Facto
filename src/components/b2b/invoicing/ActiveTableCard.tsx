import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Clock, User, CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { QuickInvoiceButton } from "./QuickInvoiceButton";

export type TableStatus = "occupied" | "payment-requested" | "invoiced" | "free";

export interface TableData {
    id: string;
    tableName: string;
    status: TableStatus;
    customerName?: string;
    amount: number;
    itemsCount: number;
    timeSeated: string; // e.g. "1h 20m"
}

interface ActiveTableCardProps {
    table: TableData;
    onInvoiceGenerated: (tableId: string) => void;
}

export function ActiveTableCard({ table, onInvoiceGenerated }: ActiveTableCardProps) {
    const getStatusColor = (status: TableStatus) => {
        switch (status) {
            case "occupied": return "bg-blue-100 text-blue-800 border-blue-200";
            case "payment-requested": return "bg-orange-100 text-orange-800 border-orange-200 animate-pulse";
            case "invoiced": return "bg-green-100 text-green-800 border-green-200";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusLabel = (status: TableStatus) => {
        switch (status) {
            case "occupied": return "Ocupada";
            case "payment-requested": return "PIDIÓ CUENTA";
            case "invoiced": return "Facturada";
            default: return "Libre";
        }
    };

    return (
        <Card className={`overflow-hidden transition-all hover:shadow-md ${table.status === 'payment-requested' ? 'border-orange-300 ring-2 ring-orange-100' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/30">
                <CardTitle className="text-lg font-bold">{table.tableName}</CardTitle>
                <Badge variant="outline" className={`${getStatusColor(table.status)} border`}>
                    {getStatusLabel(table.status)}
                </Badge>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-muted-foreground">
                            <User className="mr-2 h-4 w-4" />
                            {table.customerName || "Cliente Anónimo"}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                            <Clock className="mr-2 h-4 w-4" />
                            {table.timeSeated}
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm font-medium text-muted-foreground">Total Consumo</span>
                        <span className="text-xl font-bold text-primary">{formatCurrency(table.amount)}</span>
                    </div>

                    <div className="text-xs text-muted-foreground text-right">
                        {table.itemsCount} ítems en la orden
                    </div>
                </div>
            </CardContent>
            <CardFooter className="bg-muted/10 p-3">
                {table.status === 'invoiced' ? (
                    <Button variant="outline" className="w-full text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 pointer-events-none">
                        <CheckCircle2 className="mr-2 h-4 w-4" /> Factura Enviada
                    </Button>
                ) : (
                    <QuickInvoiceButton
                        tableId={table.id}
                        amount={table.amount}
                        onSuccess={() => onInvoiceGenerated(table.id)}
                    />
                )}
            </CardFooter>
        </Card>
    );
}

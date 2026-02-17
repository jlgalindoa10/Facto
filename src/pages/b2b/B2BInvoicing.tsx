import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ActiveTableCard, TableData, TableStatus } from "@/components/b2b/invoicing/ActiveTableCard";

// Mock Data
const MOCK_TABLES: TableData[] = [
    { id: "1", tableName: "Mesa 1", status: "occupied", customerName: "Juan Pérez", amount: 150000, itemsCount: 3, timeSeated: "45m" },
    { id: "2", tableName: "Mesa 2", status: "payment-requested", customerName: "Ana Gómez", amount: 85000, itemsCount: 2, timeSeated: "1h 10m" },
    { id: "3", tableName: "Terraza 1", status: "free", amount: 0, itemsCount: 0, timeSeated: "-" },
    { id: "4", tableName: "Barra 3", status: "invoiced", customerName: "Carlos Ruiz", amount: 45000, itemsCount: 1, timeSeated: "25m" },
    { id: "5", tableName: "Mesa 4", status: "occupied", customerName: "Fam. Rodríguez", amount: 320000, itemsCount: 8, timeSeated: "1h 45m" },
    { id: "6", tableName: "Terraza 2", status: "payment-requested", customerName: "Luis Díaz", amount: 120000, itemsCount: 4, timeSeated: "2h 05m" },
];

export default function B2BInvoicing() {
    const [tables, setTables] = useState<TableData[]>(MOCK_TABLES);
    const [filter, setFilter] = useState<string>("all");
    const [search, setSearch] = useState("");

    const handleInvoiceGenerated = (tableId: string) => {
        setTables(prev => prev.map(t =>
            t.id === tableId ? { ...t, status: "invoiced" } : t
        ));
    };

    const filteredTables = tables.filter(table => {
        const matchesSearch = table.tableName.toLowerCase().includes(search.toLowerCase()) ||
            (table.customerName?.toLowerCase().includes(search.toLowerCase()) ?? false);
        const matchesFilter = filter === "all" || table.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Hub de Facturación</h1>
                    <p className="text-muted-foreground">Gestiona mesas y facturación rápida en tiempo real.</p>
                </div>
                <Button className="w-full md:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> Nueva Orden
                </Button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por mesa o cliente..."
                        className="pl-8"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="occupied">Ocupadas</SelectItem>
                        <SelectItem value="payment-requested">Pidiendo Cuenta</SelectItem>
                        <SelectItem value="free">Libres</SelectItem>
                        <SelectItem value="invoiced">Facturadas</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Grid of Tables */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredTables.map(table => (
                    <ActiveTableCard
                        key={table.id}
                        table={table}
                        onInvoiceGenerated={handleInvoiceGenerated}
                    />
                ))}
            </div>
        </div>
    );
}

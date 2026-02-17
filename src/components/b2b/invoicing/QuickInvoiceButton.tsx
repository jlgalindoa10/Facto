import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface QuickInvoiceButtonProps {
    tableId: string;
    amount: number;
    onSuccess: () => void;
}

export function QuickInvoiceButton({ tableId, amount, onSuccess }: QuickInvoiceButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateInvoice = async () => {
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            toast.success("Factura generada exitosamente", {
                description: `Se ha enviado la factura por $${amount} al cliente.`,
                duration: 3000,
            });
            onSuccess();
        }, 1500);
    };

    return (
        <Button
            onClick={handleGenerateInvoice}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white shadow-sm"
        >
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generando...
                </>
            ) : (
                <>
                    <Sparkles className="mr-2 h-4 w-4 text-yellow-300" /> Generar Factura
                </>
            )}
        </Button>
    );
}

import { Loader2 } from 'lucide-react';

export default function PageLoader() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />

            <div className="relative z-10 flex flex-col items-center">
                {/* FACTO Logo with pulse effect */}
                <div className="h-16 w-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 mb-8 animate-pulse">
                    <span className="text-white font-bold text-3xl italic">F</span>
                </div>

                {/* Spinner */}
                <div className="flex items-center gap-3 text-slate-500">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="text-sm font-medium">Cargando experiencia...</span>
                </div>
            </div>
        </div>
    );
}

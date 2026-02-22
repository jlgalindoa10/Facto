import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BarChart3, Smartphone, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
    return (
        <div className="min-h-screen bg-background">
            {/* Nav */}
            <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="font-display text-2xl font-bold text-gradient">FACTO</Link>
                    <div className="flex gap-3">
                        <Button variant="ghost" asChild><Link to="/app">Soy Consumidor</Link></Button>
                        <Button asChild className="gradient-primary text-primary-foreground border-0"><Link to="/business">Soy Negocio</Link></Button>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-24 px-6 bg-slate-50 min-h-[calc(100vh-80px)]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
                            ¿Por qué FACTO?
                        </span>
                        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                            El fin de la fricción en la facturación y los pagos
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            La industria de restaurantes pierde millones en propinas y rotación por procesos de cobro lentos, y los usuarios detestan dictar sus datos para facturar. Creamos FACTO para resolver ambos problemas mediante data inteligente.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16 items-center mt-20">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-10">
                            <div className="flex gap-5">
                                <div className="h-14 w-14 rounded-2xl gradient-primary text-primary-foreground flex flex-shrink-0 items-center justify-center shadow-lg shadow-primary/20">
                                    <BarChart3 className="h-7 w-7" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">Para el Restaurante (B2B)</h3>
                                    <p className="text-muted-foreground mb-4 text-lg">La factura electrónica se convierte en tu mejor herramienta de fidelización y conocimiento del cliente.</p>
                                    <ul className="space-y-3 text-muted-foreground">
                                        <li className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-primary" /> Conoce quién es tu cliente sin preguntarle</li>
                                        <li className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-primary" /> Aumenta la rotación de mesas (+20%) al agilizar el cobro</li>
                                        <li className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-primary" /> Incrementa las propinas para tu staff al mejorar la experiencia</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <div className="h-14 w-14 rounded-2xl gradient-secondary text-secondary-foreground flex flex-shrink-0 items-center justify-center shadow-lg shadow-secondary/20">
                                    <Smartphone className="h-7 w-7" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">Para el Usuario (B2C)</h3>
                                    <p className="text-muted-foreground mb-4 text-lg">Pagar en un restaurante nunca fue tan rápido ni tan recompensante para ti.</p>
                                    <ul className="space-y-3 text-muted-foreground">
                                        <li className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-secondary" /> Tu data tiene valor: gana Cashback automático</li>
                                        <li className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-secondary" /> Olvídate de deletrear tu correo para la factura electrónica</li>
                                        <li className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-secondary" /> Centraliza todos tus gastos fijos y variables en una sola app</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-[2.5rem]" />
                            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-10 max-w-md mx-auto border border-white">
                                <div className="flex items-center gap-5 mb-8">
                                    <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center shadow-inner"><Users className="text-slate-500 h-8 w-8" /></div>
                                    <div>
                                        <div className="font-bold text-xl text-slate-900">Ecosistema Conectado</div>
                                        <div className="text-emerald-600 flex items-center gap-1.5 font-medium"><TrendingUp className="h-4 w-4" /> Win-Win Inmediato</div>
                                    </div>
                                </div>
                                <div className="space-y-6 relative">
                                    <div className="absolute left-7 top-10 bottom-8 w-1 bg-slate-100 rounded-full" />
                                    <div className="relative pl-16">
                                        <div className="absolute left-4 top-1 h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center"><div className="h-3 w-3 rounded-full bg-primary" /></div>
                                        <div className="font-bold text-slate-900">1. Transacción rápida</div>
                                        <div className="text-sm text-muted-foreground">B2C paga y comparte data</div>
                                    </div>
                                    <div className="relative pl-16">
                                        <div className="absolute left-4 top-1 h-7 w-7 rounded-full bg-secondary/20 flex items-center justify-center"><div className="h-3 w-3 rounded-full bg-secondary" /></div>
                                        <div className="font-bold text-slate-900">2. Emisión inteligente</div>
                                        <div className="text-sm text-muted-foreground">B2B factura electrónica y analiza patrones</div>
                                    </div>
                                    <div className="relative pl-16">
                                        <div className="absolute left-4 top-1 h-7 w-7 rounded-full bg-accent/20 flex items-center justify-center"><div className="h-3 w-3 rounded-full bg-accent" /></div>
                                        <div className="font-bold text-slate-900">3. Recompensa</div>
                                        <div className="text-sm text-muted-foreground">Ambos se benefician: Cashback y CRM</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-border text-center text-sm text-muted-foreground">
                <p>© 2026 FACTO · Facturación inteligente · Bogotá, Colombia</p>
            </footer>
        </div>
    );
}

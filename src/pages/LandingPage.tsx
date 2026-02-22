import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    ArrowRight,
    BarChart3,
    Smartphone,
    Zap,
    ShieldCheck,
    UtensilsCrossed,
    Sparkles,
    PieChart,
    Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-50 overflow-x-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-border">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg italic">F</span>
                        </div>
                        <span className="text-xl font-display font-bold text-slate-900 tracking-tight">FACTO</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Características</a>
                        <a href="#business" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Para Negocios</a>
                        <a href="#consumers" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Para Usuarios</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/app">
                            <Button variant="ghost" size="sm" className="hidden sm:flex">Iniciar Sesión</Button>
                        </Link>
                        <Link to="/business">
                            <Button size="sm" className="gradient-primary text-white border-0 shadow-lg shadow-primary/20">Dashboard B2B</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full -z-10 opacity-20 pointer-events-none">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-[120px] mix-blend-multiply filter animate-blob" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-[120px] mix-blend-multiply filter animate-blob animation-delay-2000" />
                    <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-accent rounded-full blur-[120px] mix-blend-multiply filter animate-blob animation-delay-4000" />
                </div>

                <div className="container mx-auto px-4 text-center">
                    <motion.div {...fadeIn}>
                        <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm bg-white/50 backdrop-blur-sm border-slate-200 text-primary shadow-sm">
                            <Sparkles className="h-3.5 w-3.5 mr-2 inline" />
                            Revolucionando la facturación en LATAM
                        </Badge>
                        <h1 className="text-5xl lg:text-7xl font-display font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
                            Facturación Inteligente <br />
                            <span className="text-primary italic">Sin Fricciones</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg lg:text-xl text-slate-600 mb-10 leading-relaxed">
                            La plataforma dual que conecta a restaurantes y consumidores para una experiencia de pago ultrarrápida, segura y con beneficios reales.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button size="lg" className="h-14 px-8 text-lg font-bold gradient-primary shadow-glow border-0">
                                Llevar FACTO a mi Negocio <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-semibold border-slate-200 bg-white/50 backdrop-blur-sm">
                                Descargar App Usuario
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="mt-20 relative max-w-5xl mx-auto"
                    >
                        <div className="relative z-10 bg-white p-2 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                            <div className="bg-slate-50 rounded-xl aspect-[16/9] flex items-center justify-center overflow-hidden">
                                <div className="grid grid-cols-2 gap-4 w-full h-full p-8 md:p-12">
                                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div className="p-3 bg-primary/10 rounded-lg text-primary"><BarChart3 /></div>
                                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">+24%</Badge>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Impacto en Propina</div>
                                            <div className="text-3xl font-bold text-slate-900 italic">$3.5M COP</div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-900 rounded-xl shadow-lg p-6 flex flex-col justify-between text-white">
                                        <div className="flex justify-between items-start">
                                            <div className="p-3 bg-white/10 rounded-lg text-white"><Smartphone /></div>
                                            <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-1">Cashback Acumulado</div>
                                            <div className="text-3xl font-bold italic">$125.400</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Floating elements */}
                        <div className="absolute -top-6 -right-6 h-24 w-24 bg-accent rounded-full blur-2xl opacity-40 animate-pulse" />
                        <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-primary rounded-full blur-3xl opacity-20" />
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 border-y border-slate-200 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { label: 'Visitas Mensuales', value: '450K+' },
                            { label: 'Restaurantes Aliados', value: '1,200+' },
                            { label: 'Cashback Entregado', value: '$840M+' },
                            { label: 'Satisfacción NPS', value: '72ptos' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center group">
                                <div className="text-3xl lg:text-4xl font-black text-slate-900 mb-2 italic group-hover:text-primary transition-colors">{stat.value}</div>
                                <div className="text-sm font-semibold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-32 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl lg:text-5xl font-display font-black text-slate-900 mb-6 italic italic">La Magia del Ecosistema Dual</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">Dos caras de la misma moneda diseñadas para eliminar la fricción en el momento más crítico del servicio.</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* B2B Card */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-8 text-primary/5 group-hover:text-primary/10 transition-colors">
                                <BarChart3 size={160} />
                            </div>
                            <div className="relative z-10">
                                <Badge className="mb-6 bg-primary/10 text-primary border-0 px-4 py-1">PARA NEGOCIOS</Badge>
                                <h3 className="text-3xl font-display font-black text-slate-900 mb-6 italic italic tracking-tighter">
                                    Maximiza tu Rentabilidad con Data Inteligente
                                </h3>
                                <ul className="space-y-4 mb-10">
                                    <li className="flex items-center gap-3 text-slate-600">
                                        <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                            <Zap className="h-3.5 w-3.5 text-emerald-600" />
                                        </div>
                                        <span>Facturación automática en un click</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-600">
                                        <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                            <Zap className="h-3.5 w-3.5 text-emerald-600" />
                                        </div>
                                        <span>Analytics avanzado de rotación de mesas</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-600">
                                        <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                            <Zap className="h-3.5 w-3.5 text-emerald-600" />
                                        </div>
                                        <span>Benchmark vs la industria local</span>
                                    </li>
                                </ul>
                                <Link to="/business">
                                    <Button className="w-full h-14 text-lg font-bold gradient-primary shadow-glow border-0">Explorar Dashboard B2B</Button>
                                </Link>
                            </div>
                        </motion.div>

                        {/* B2C Card */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-slate-900 rounded-3xl p-8 lg:p-12 shadow-xl shadow-slate-900/10 text-white relative overflow-hidden group border border-white/5"
                        >
                            <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-white/10 transition-colors">
                                <Smartphone size={160} />
                            </div>
                            <div className="relative z-10">
                                <Badge className="mb-6 bg-white/10 text-white border-0 px-4 py-1">PARA USUARIOS</Badge>
                                <h3 className="text-3xl font-display font-black mb-6 italic italic tracking-tighter">
                                    Paga, Factura y Gana en Cuestión de Segundos
                                </h3>
                                <ul className="space-y-4 mb-10">
                                    <li className="flex items-center gap-3 text-white/70">
                                        <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                            <Zap className="h-3.5 w-3.5 text-white" />
                                        </div>
                                        <span>Acumula Cashback por cada comida</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-white/70">
                                        <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                            <Zap className="h-3.5 w-3.5 text-white" />
                                        </div>
                                        <span>Factura electrónica oficial inmediata</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-white/70">
                                        <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                            <Zap className="h-3.5 w-3.5 text-white" />
                                        </div>
                                        <span>Insights de tus gastos mensuales</span>
                                    </li>
                                </ul>
                                <Link to="/app">
                                    <Button className="w-full h-14 text-lg font-bold bg-white text-slate-900 hover:bg-slate-100 border-0">Iniciar mi App FACTO</Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <Badge variant="outline" className="mb-6 border-slate-200">SEGURIDAD Y CONFIANZA</Badge>
                            <h2 className="text-4xl font-display font-black text-slate-900 mb-8 italic italic tracking-tight">
                                Tus datos, tu valor. <br />
                                Protección nivel bancario.
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-8">
                                <div className="flex gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                                        <ShieldCheck className="text-emerald-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1 italic">Ley 1581 (Habeas Data)</h4>
                                        <p className="text-sm text-slate-600">Tus datos personales están 100% anonimizados y protegidos.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                                        <Zap className="text-emerald-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1 italic">Velocidad Extrema</h4>
                                        <p className="text-sm text-slate-600">Procesamos transacciones locales en menos de 2 segundos.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <div className="relative z-10 bg-slate-50 border border-slate-200 p-8 rounded-3xl">
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className={`p-4 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-between transition-all opacity-${100 - (i * 20)}`}>
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-slate-100" />
                                                <div>
                                                    <div className="h-3 w-24 bg-slate-100 rounded-full mb-2" />
                                                    <div className="h-2 w-32 bg-slate-50 rounded-full" />
                                                </div>
                                            </div>
                                            <div className="h-6 w-12 bg-primary/10 rounded-md" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full bg-primary/10 blur-[100px] -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center">
                                    <span className="text-slate-950 font-bold text-lg italic">F</span>
                                </div>
                                <span className="text-xl font-display font-bold tracking-tight">FACTO</span>
                            </div>
                            <p className="text-slate-400 max-w-sm leading-relaxed">
                                Transformando la economía de los restaurantes en Latinoamérica a través de la data y la automatización inteligente.
                            </p>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6 italic">Producto</h5>
                            <ul className="space-y-4 text-sm text-slate-400 font-medium">
                                <li><a href="#" className="hover:text-white transition-colors">B2B Dashboard</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">B2C App</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Analytics de Industria</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Integraciones POS</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6 italic">Compañía</h5>
                            <ul className="space-y-4 text-sm text-slate-400 font-medium">
                                <li><a href="#" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Seguridad</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Prensa</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Glosario Fintech</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-white/10 flex flex-col md:row items-center justify-between gap-6 text-sm text-slate-500 font-medium">
                        <p>© 2026 Facto Technologies Inc. Todos los derechos reservados.</p>
                        <div className="flex items-center gap-8">
                            <a href="#" className="hover:text-white transition-colors">Terminos de Servicio</a>
                            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

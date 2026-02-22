import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, BarChart3, Zap, Shield, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Landing = () => {
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

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Facturación inteligente para Colombia 🇨🇴
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">
              Tu información<br />
              <span className="text-gradient">vale dinero</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              FACTO conecta consumidores y negocios. Gana cashback por cada compra mientras los negocios obtienen inteligencia de datos sin precedentes.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="gradient-primary text-primary-foreground border-0 text-lg px-8 py-6 shadow-glow">
              <Link to="/app">
                <Smartphone className="mr-2 h-5 w-5" /> Empezar como consumidor
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
              <Link to="/business">
                <BarChart3 className="mr-2 h-5 w-5" /> Dashboard para negocios
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border bg-card">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '10seg', label: 'Tiempo de facturación' },
            { value: '1%', label: 'Cashback por compra' },
            { value: '-85%', label: 'Tiempo de cobro' },
            { value: '78%', label: 'Data capturada' },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
              <div className="text-3xl md:text-4xl font-display font-bold text-gradient">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dual Value */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-8 shadow-elevated border border-border">
            <div className="h-12 w-12 rounded-xl gradient-cashback flex items-center justify-center mb-6">
              <Smartphone className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-3">Para Consumidores</h3>
            <p className="text-muted-foreground mb-6">Monetiza tu data de consumo + facturación automática sin fricción.</p>
            <ul className="space-y-3">
              {['Cashback en cada compra', 'Facturas organizadas automáticamente', 'Insights de tus gastos', 'Data protegida y anonimizada'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <span className="h-5 w-5 rounded-full bg-secondary/20 flex items-center justify-center"><Zap className="h-3 w-3 text-secondary" /></span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-8 shadow-elevated border border-border">
            <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-6">
              <BarChart3 className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-3">Para Negocios</h3>
            <p className="text-muted-foreground mb-6">Cobra más rápido + entiende a tu cliente como nunca antes.</p>
            <ul className="space-y-3">
              {['Cobro en menos de 10 segundos', 'Analytics en tiempo real', 'Inteligencia cross-industry', 'Segmentación automática de clientes'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <span className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center"><TrendingUp className="h-3 w-3 text-primary" /></span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* About Us / Benefits */}
      <section id="about" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
              ¿Por qué FACTO?
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              El fin de la fricción en pagos
            </h2>
            <p className="text-lg text-muted-foreground">
              La industria de restaurantes pierde millones en propinas por procesos de cobro lentos, y los usuarios detestan dictar sus datos para facturar. Creamos FACTO para resolver ambos problemas mediante data inteligente.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-xl gradient-primary text-primary-foreground flex flex-shrink-0 items-center justify-center">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Para el Restaurante (B2B)</h3>
                  <p className="text-muted-foreground mb-3">La factura electrónica se convierte en tu mejor herramienta de fidelización.</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Conoce quién es tu cliente sin preguntarle</li>
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Aumenta la rotación de mesas (+20%) al agilizar el cobro</li>
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Incrementa las propinas para tu staff</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-xl gradient-secondary text-secondary-foreground flex flex-shrink-0 items-center justify-center">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Para el Usuario (B2C)</h3>
                  <p className="text-muted-foreground mb-3">Pagar en un restaurante nunca fue tan recompensante.</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-secondary" /> Tu data tiene valor: gana Cashback automático</li>
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-secondary" /> Olvídate de deletrear tu correo para la factura electrónica</li>
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-secondary" /> Centraliza todos tus gastos en una sola app</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative bg-slate-50 p-6 rounded-3xl border border-border">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl" />
              <div className="relative bg-white rounded-2xl shadow-elevated p-8 max-w-sm mx-auto">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center"><Users className="text-slate-400" /></div>
                  <div>
                    <div className="font-bold">Ecosistema Conectado</div>
                    <div className="text-sm text-emerald-600 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Win-Win</div>
                  </div>
                </div>
                <div className="space-y-4 relative">
                  <div className="absolute left-6 top-10 bottom-6 w-0.5 bg-slate-100" />
                  <div className="relative pl-14">
                    <div className="absolute left-4 top-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center"><div className="h-2 w-2 rounded-full bg-primary" /></div>
                    <div className="text-sm font-medium">B2C paga y comparte data</div>
                  </div>
                  <div className="relative pl-14">
                    <div className="absolute left-4 top-1 h-5 w-5 rounded-full bg-secondary/20 flex items-center justify-center"><div className="h-2 w-2 rounded-full bg-secondary" /></div>
                    <div className="text-sm font-medium">B2B factura y analiza patrones</div>
                  </div>
                  <div className="relative pl-14">
                    <div className="absolute left-4 top-1 h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center"><div className="h-2 w-2 rounded-full bg-accent" /></div>
                    <div className="text-sm font-medium">Ambos se benefician instantáneamente</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12">¿Cómo funciona la magia?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Smartphone, title: 'Paga como siempre', desc: 'Usa Nequi, tarjeta o efectivo. FACTO detecta tu transacción automáticamente.' },
              { icon: Zap, title: 'Factura instantánea', desc: 'Sin dictar cédula, sin esperas. Tu factura llega en menos de 10 segundos.' },
              { icon: Shield, title: 'Gana cashback', desc: 'Recibe recompensas por compartir tu data de consumo de forma anónima.' },
            ].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center">
                <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h4 className="font-display font-bold text-lg mb-2">{step.title}</h4>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center gradient-hero rounded-3xl p-12 text-primary-foreground">
          <Users className="h-12 w-12 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Únete al ecosistema FACTO</h2>
          <p className="text-lg opacity-80 mb-8">Más de 50 usuarios y 5 negocios ya están transformando la facturación en Colombia.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 text-lg px-8">
              <Link to="/app">Comenzar gratis</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8">
              <Link to="/business">Demo para negocios</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border text-center text-sm text-muted-foreground">
        <p>© 2026 FACTO · Facturación inteligente · Bogotá, Colombia</p>
      </footer>
    </div>
  );
};

export default Landing;

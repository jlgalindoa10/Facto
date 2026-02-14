// ===== BUSINESSES =====
export interface Business {
  id: string;
  name: string;
  nit: string;
  category: string;
  email: string;
  plan: 'freemium' | 'pro' | 'enterprise';
  address: string;
  contactName: string;
}

export const businesses: Business[] = [
  { id: 'b1', name: 'Restaurante La Puerta Falsa', nit: '900123456-1', category: 'gastronomia', email: 'info@puertafalsa.co', plan: 'pro', address: 'Calle 11 #6-50, La Candelaria', contactName: 'Carlos Mendoza' },
  { id: 'b2', name: 'Andrés Carne de Res', nit: '900234567-2', category: 'gastronomia', email: 'admin@andrescarne.co', plan: 'pro', address: 'Calle 3 #11A-56, Chía', contactName: 'Andrea Ruiz' },
  { id: 'b3', name: 'Crepes & Waffles Zona G', nit: '900345678-3', category: 'gastronomia', email: 'zona-g@crepes.co', plan: 'freemium', address: 'Calle 69A #5-04', contactName: 'María López' },
  { id: 'b4', name: 'Vintrash Bar', nit: '900456789-4', category: 'entretenimiento', email: 'hola@vintrash.co', plan: 'freemium', address: 'Cra 14 #83-56, Zona T', contactName: 'Sebastián Torres' },
  { id: 'b5', name: 'Juan Valdez Chapinero', nit: '900567890-5', category: 'cafe', email: 'chapinero@juanvaldez.co', plan: 'freemium', address: 'Cra 13 #52-30', contactName: 'Laura Gómez' },
];

// ===== USERS =====
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  cedula: string;
  totalCashback: number;
  monthCashback: number;
  dataSharing: boolean;
}

const firstNames = ['Juan', 'María', 'Carlos', 'Andrea', 'Sebastián', 'Laura', 'Andrés', 'Camila', 'Diego', 'Valentina', 'Santiago', 'Daniela', 'Felipe', 'Natalia', 'Alejandro', 'Carolina', 'Mateo', 'Isabella', 'Nicolás', 'Sofía'];
const lastNames = ['García', 'Rodríguez', 'Martínez', 'López', 'González', 'Hernández', 'Pérez', 'Sánchez', 'Ramírez', 'Torres', 'Flores', 'Rivera', 'Gómez', 'Díaz', 'Cruz', 'Morales', 'Reyes', 'Gutiérrez', 'Ortiz', 'Ramos'];

export const users: User[] = Array.from({ length: 50 }, (_, i) => {
  const fn = firstNames[i % firstNames.length];
  const ln = lastNames[Math.floor(i / 2.5) % lastNames.length];
  return {
    id: `u${i + 1}`,
    name: `${fn} ${ln}`,
    email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@email.com`,
    phone: `+57 3${Math.floor(100000000 + Math.random() * 900000000)}`,
    cedula: `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    totalCashback: Math.floor(Math.random() * 200000) + 10000,
    monthCashback: Math.floor(Math.random() * 60000) + 5000,
    dataSharing: Math.random() > 0.15,
  };
});

// ===== TRANSACTIONS =====
export interface Transaction {
  id: string;
  userId: string;
  businessId: string;
  amount: number;
  subtotal: number;
  iva: number;
  tip: number;
  paymentMethod: 'nequi' | 'card' | 'cash' | 'daviplata';
  status: 'completed' | 'pending' | 'failed';
  cashbackEarned: number;
  createdAt: Date;
  items: { name: string; price: number; qty: number }[];
}

const gastronomyItems = [
  { name: 'Bandeja Paisa', price: 28000 }, { name: 'Ajiaco Santafereño', price: 22000 },
  { name: 'Lomo de Cerdo', price: 35000 }, { name: 'Trucha al Ajillo', price: 32000 },
  { name: 'Patacones con Hogao', price: 12000 }, { name: 'Limonada de Coco', price: 8000 },
  { name: 'Cerveza Artesanal', price: 14000 }, { name: 'Postre Tres Leches', price: 10000 },
  { name: 'Empanadas (3)', price: 9000 }, { name: 'Arroz con Pollo', price: 25000 },
  { name: 'Cazuela de Mariscos', price: 42000 }, { name: 'Agua Aromática', price: 5000 },
];

const barItems = [
  { name: 'Cocktail Signature', price: 28000 }, { name: 'Cerveza Importada', price: 16000 },
  { name: 'Shot Aguardiente', price: 8000 }, { name: 'Tabla de Quesos', price: 35000 },
  { name: 'Nachos Supreme', price: 22000 }, { name: 'Gin & Tonic', price: 25000 },
];

const cafeItems = [
  { name: 'Café Latte', price: 8500 }, { name: 'Cappuccino', price: 7500 },
  { name: 'Croissant', price: 6000 }, { name: 'Brownie', price: 7000 },
  { name: 'Smoothie de Frutas', price: 12000 }, { name: 'Sandwich Club', price: 15000 },
];

function randomItems(businessCategory: string): { name: string; price: number; qty: number }[] {
  const pool = businessCategory === 'entretenimiento' ? barItems : businessCategory === 'cafe' ? cafeItems : gastronomyItems;
  const count = Math.floor(Math.random() * 4) + 1;
  const selected: { name: string; price: number; qty: number }[] = [];
  for (let i = 0; i < count; i++) {
    const item = pool[Math.floor(Math.random() * pool.length)];
    selected.push({ ...item, qty: Math.floor(Math.random() * 2) + 1 });
  }
  return selected;
}

const paymentMethods: Transaction['paymentMethod'][] = ['nequi', 'card', 'cash', 'daviplata'];

export const transactions: Transaction[] = Array.from({ length: 500 }, (_, i) => {
  const biz = businesses[Math.floor(Math.random() * businesses.length)];
  const user = users[Math.floor(Math.random() * users.length)];
  const items = randomItems(biz.category);
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const iva = Math.round(subtotal * 0.19);
  const tip = Math.random() > 0.4 ? Math.round(subtotal * (Math.random() * 0.1 + 0.05)) : 0;
  const total = subtotal + iva + tip;
  const daysAgo = Math.floor(Math.random() * 90);
  const hour = Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 18 : Math.floor(Math.random() * 4) + 11;
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(hour, Math.floor(Math.random() * 60));

  return {
    id: `TXN-${String(i + 1).padStart(5, '0')}`,
    userId: user.id,
    businessId: biz.id,
    amount: total,
    subtotal,
    iva,
    tip,
    paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
    status: (Math.random() > 0.05 ? (Math.random() > 0.08 ? 'completed' : 'pending') : 'failed') as Transaction['status'],
    cashbackEarned: Math.round(total * 0.01),
    createdAt: date,
    items,
  };
}).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

// ===== CUSTOMER INSIGHTS =====
export interface CustomerInsight {
  userId: string;
  businessId: string;
  visitCount: number;
  totalSpent: number;
  avgTicket: number;
  lastVisit: Date;
  segment: 'vip' | 'regular' | 'occasional' | 'new' | 'churn_risk';
  crossIndustry: {
    gastronomia: number;
    entretenimiento: number;
    retail: number;
    cafe: number;
    otros: number;
  };
  preferredZone: string;
  avgSpendRange: string;
  frequency: string;
  preferredHours: string;
  marketingInsights: string[];
}

const zones = ['Chapinero', 'Zona T', 'La Candelaria', 'Usaquén', 'Zona G'];

export const customerInsights: CustomerInsight[] = users.slice(0, 30).map((user) => {
  const visitCount = Math.floor(Math.random() * 15) + 1;
  const totalSpent = Math.floor(Math.random() * 800000) + 50000;
  const segment: CustomerInsight['segment'] = totalSpent > 400000 ? 'vip' : visitCount > 5 ? 'regular' : visitCount > 2 ? 'occasional' : visitCount === 1 ? 'new' : 'churn_risk';
  const g = Math.floor(Math.random() * 50) + 20;
  const e = Math.floor(Math.random() * 30) + 10;
  const r = Math.floor(Math.random() * 20) + 5;
  const c = Math.floor(Math.random() * 15) + 5;
  const sum = g + e + r + c;

  return {
    userId: user.id,
    businessId: businesses[0].id,
    visitCount,
    totalSpent,
    avgTicket: Math.round(totalSpent / visitCount),
    lastVisit: new Date(Date.now() - Math.floor(Math.random() * 60) * 86400000),
    segment,
    crossIndustry: {
      gastronomia: Math.round((g / sum) * 100),
      entretenimiento: Math.round((e / sum) * 100),
      retail: Math.round((r / sum) * 100),
      cafe: Math.round((c / sum) * 100),
      otros: 100 - Math.round((g / sum) * 100) - Math.round((e / sum) * 100) - Math.round((r / sum) * 100) - Math.round((c / sum) * 100),
    },
    preferredZone: zones[Math.floor(Math.random() * zones.length)],
    avgSpendRange: `$${Math.floor(Math.random() * 30 + 20)}K - $${Math.floor(Math.random() * 40 + 50)}K`,
    frequency: `${Math.floor(Math.random() * 3) + 1}-${Math.floor(Math.random() * 2) + 3} veces por semana`,
    preferredHours: Math.random() > 0.5 ? 'Viernes y sábado, 7pm-10pm' : 'Lunes a viernes, 12pm-2pm',
    marketingInsights: [
      'Este cliente también frecuenta bares de música en vivo. Considera crear promoción combo "Cena + Bar" con aliados cercanos.',
      'Gasta más los fines de semana. Envía ofertas personalizadas los jueves.',
      'Prefiere métodos de pago digitales (Nequi). Ofrece descuento por pago digital.',
    ].slice(0, Math.floor(Math.random() * 2) + 2),
  };
});

// ===== HELPER FUNCTIONS =====
export const formatCOP = (amount: number): string => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
};

export const getBusinessById = (id: string) => businesses.find(b => b.id === id);
export const getUserById = (id: string) => users.find(u => u.id === id);

export const getTransactionsForBusiness = (businessId: string) => transactions.filter(t => t.businessId === businessId);
export const getTransactionsForUser = (userId: string) => transactions.filter(t => t.userId === userId);

export const categoryLabels: Record<string, string> = {
  gastronomia: 'Gastronomía',
  entretenimiento: 'Entretenimiento',
  cafe: 'Café',
  retail: 'Retail',
  otros: 'Otros',
};

export const paymentMethodLabels: Record<string, string> = {
  nequi: 'Nequi',
  card: 'Tarjeta',
  cash: 'Efectivo',
  daviplata: 'Daviplata',
};

export const segmentLabels: Record<string, string> = {
  vip: 'VIP',
  regular: 'Regular',
  occasional: 'Ocasional',
  new: 'Nuevo',
  churn_risk: 'En Riesgo',
};

export const segmentColors: Record<string, string> = {
  vip: 'bg-warning/20 text-warning',
  regular: 'bg-primary/20 text-primary',
  occasional: 'bg-muted text-muted-foreground',
  new: 'bg-secondary/20 text-secondary',
  churn_risk: 'bg-destructive/20 text-destructive',
};

// Monthly aggregation for charts
export function getMonthlySpending(userId: string) {
  const userTxns = getTransactionsForUser(userId);
  const months: Record<string, number> = {};
  userTxns.forEach(t => {
    const key = `${t.createdAt.getFullYear()}-${String(t.createdAt.getMonth() + 1).padStart(2, '0')}`;
    months[key] = (months[key] || 0) + t.amount;
  });
  return Object.entries(months).sort().slice(-6).map(([key, value]) => {
    const [y, m] = key.split('-');
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return { month: monthNames[parseInt(m) - 1], amount: value };
  });
}

export function getDailyRevenue(businessId: string, days = 30) {
  const txns = getTransactionsForBusiness(businessId);
  const daily: Record<string, number> = {};
  const now = new Date();
  for (let i = 0; i < days; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    daily[key] = 0;
  }
  txns.forEach(t => {
    const key = t.createdAt.toISOString().split('T')[0];
    if (daily[key] !== undefined) daily[key] += t.amount;
  });
  return Object.entries(daily).sort().map(([date, revenue]) => ({
    date: new Date(date).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' }),
    revenue,
  }));
}

export function getHourlyHeatmap(businessId: string) {
  const txns = getTransactionsForBusiness(businessId);
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const data: { day: string; hour: number; count: number }[] = [];
  for (const day of days) {
    for (let h = 10; h <= 23; h++) {
      data.push({ day, hour: h, count: 0 });
    }
  }
  txns.forEach(t => {
    const dayIdx = t.createdAt.getDay();
    const adjustedDay = dayIdx === 0 ? 6 : dayIdx - 1;
    const hour = t.createdAt.getHours();
    if (hour >= 10 && hour <= 23) {
      const entry = data.find(d => d.day === days[adjustedDay] && d.hour === hour);
      if (entry) entry.count++;
    }
  });
  return data;
}

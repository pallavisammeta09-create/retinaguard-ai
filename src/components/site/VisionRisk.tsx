import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, CartesianGrid, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { Activity, AlertCircle, TrendingUp } from "lucide-react";

const forecast = [
  { m: "Now", risk: 22 },
  { m: "M2", risk: 26 },
  { m: "M4", risk: 31 },
  { m: "M6", risk: 38 },
  { m: "M8", risk: 44 },
  { m: "M10", risk: 51 },
  { m: "M12", risk: 58 },
];

export default function VisionRisk() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground mb-4">
            <TrendingUp className="h-3.5 w-3.5" /> Predictive Analytics
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">Forecast vision loss <span className="gradient-text">months in advance</span></h2>
          <p className="mt-4 text-muted-foreground">Combine retinal imaging with clinical labs to predict 6 & 12-month risk trajectories.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl border border-border bg-card p-6 shadow-card"
          >
            <div className="text-sm text-muted-foreground">Risk Score</div>
            <div className="relative mt-4 mx-auto h-40 w-40">
              <svg viewBox="0 0 120 120" className="-rotate-90">
                <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="url(#g1)" strokeWidth="12"
                  strokeDasharray="314" strokeDashoffset="125" strokeLinecap="round" />
                <defs>
                  <linearGradient id="g1" x1="0" x2="1">
                    <stop offset="0" stopColor="hsl(var(--teal))" />
                    <stop offset="1" stopColor="hsl(var(--accent))" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 grid place-items-center text-center">
                <div>
                  <div className="font-display font-bold text-3xl">60</div>
                  <div className="text-xs text-muted-foreground">/ 100</div>
                </div>
              </div>
            </div>
            <div className="text-center mt-4 text-sm font-semibold text-warning">Moderate-High Risk</div>
            <div className="text-center text-xs text-muted-foreground mt-1">Refer within 4–6 weeks</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-card"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm font-semibold">12-Month Vision Risk Trajectory</div>
                <div className="text-xs text-muted-foreground">Probability of progression to vision-threatening DR</div>
              </div>
              <div className="text-xs text-secondary font-medium">+36 pts forecast</div>
            </div>
            <div className="h-56">
              <ResponsiveContainer>
                <AreaChart data={forecast}>
                  <defs>
                    <linearGradient id="risk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="hsl(var(--teal))" stopOpacity={0.5} />
                      <stop offset="1" stopColor="hsl(var(--teal))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                  <Area type="monotone" dataKey="risk" stroke="hsl(var(--teal))" strokeWidth={2.5} fill="url(#risk)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {[
            { label: "HbA1c", value: "8.4%", note: "Above target", icon: Activity, tone: "warning" },
            { label: "Blood Pressure", value: "142/88", note: "Stage 2 HTN", icon: AlertCircle, tone: "danger" },
            { label: "Diabetes Duration", value: "12 yrs", note: "Long-standing", icon: TrendingUp, tone: "muted" },
          ].map((c) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-muted-foreground">{c.label}</div>
                <c.icon className={`h-4 w-4 ${c.tone === "warning" ? "text-warning" : c.tone === "danger" ? "text-destructive" : "text-muted-foreground"}`} />
              </div>
              <div className="font-display font-bold text-2xl">{c.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{c.note}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

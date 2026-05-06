import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Upload as UploadIcon, LineChart, FileText, Bell, Settings, Eye, LogOut, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";

const nav = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { to: "/dashboard", icon: Users, label: "Patients" },
  { to: "/upload", icon: UploadIcon, label: "Scan Upload" },
  { to: "/dashboard", icon: LineChart, label: "Predictions" },
  { to: "/dashboard", icon: FileText, label: "Reports" },
  { to: "/dashboard", icon: Bell, label: "Alerts" },
  { to: "/dashboard", icon: Settings, label: "Settings" },
];

const trend = [{d:"Mon",s:42},{d:"Tue",s:58},{d:"Wed",s:71},{d:"Thu",s:65},{d:"Fri",s:88},{d:"Sat",s:52},{d:"Sun",s:34}];
const pie = [{n:"No DR",v:48,c:"hsl(var(--success))"},{n:"Mild",v:22,c:"hsl(var(--accent))"},{n:"Moderate",v:18,c:"hsl(var(--warning))"},{n:"Severe",v:8,c:"hsl(var(--destructive))"},{n:"PDR",v:4,c:"hsl(var(--navy))"}];
const bars = [{m:"Jan",a:62},{m:"Feb",a:71},{m:"Mar",a:84},{m:"Apr",a:92},{m:"May",a:108},{m:"Jun",a:124}];

const patients = [
  { id:"P-00482", name:"Robert Chen", age:58, severity:"Moderate", risk:60, status:"Refer", scan:"2h ago" },
  { id:"P-00481", name:"Maria Santos", age:64, severity:"Severe", risk:82, status:"Urgent", scan:"4h ago" },
  { id:"P-00480", name:"James Wilson", age:51, severity:"Mild", risk:24, status:"Monitor", scan:"6h ago" },
  { id:"P-00479", name:"Aisha Patel", age:46, severity:"No DR", risk:8, status:"OK", scan:"1d ago" },
  { id:"P-00478", name:"David Kim", age:72, severity:"PDR", risk:91, status:"Urgent", scan:"1d ago" },
  { id:"P-00477", name:"Sara Nguyen", age:39, severity:"Mild", risk:18, status:"Monitor", scan:"2d ago" },
];

const statusTone: Record<string,string> = {
  Urgent: "bg-destructive/10 text-destructive",
  Refer: "bg-warning/10 text-warning",
  Monitor: "bg-accent/15 text-accent-foreground",
  OK: "bg-success/10 text-success",
};

export default function Dashboard() {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen flex bg-muted/30">
      <aside className="hidden lg:flex w-64 bg-sidebar text-sidebar-foreground flex-col p-5 sticky top-0 h-screen">
        <Link to="/" className="flex items-center gap-2.5 mb-8">
          <div className="h-9 w-9 rounded-xl bg-gradient-accent grid place-items-center shadow-glow"><Eye className="h-5 w-5 text-white" /></div>
          <div className="font-display font-bold">RetinaGuard</div>
        </Link>
        <nav className="space-y-1 flex-1">
          {nav.map((n, i) => (
            <Link key={i} to={n.to} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              i === 0 ? "bg-sidebar-accent text-sidebar-primary-foreground font-medium" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            }`}>
              <n.icon className="h-4 w-4" /> {n.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-sidebar-border pt-4">
          <div className="flex items-center gap-3 p-2">
            <div className="h-9 w-9 rounded-full bg-gradient-accent grid place-items-center text-sm font-semibold">DR</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">Dr. Anya Sharma</div>
              <div className="text-xs text-sidebar-foreground/60 truncate">Apollo Eye</div>
            </div>
            <LogOut className="h-4 w-4 text-sidebar-foreground/60" />
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between px-6 h-16 gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search patients, scans, reports…" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button>
              <Button asChild className="bg-gradient-accent text-white hover:opacity-90"><Link to="/upload">+ New Scan</Link></Button>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          <div>
            <h1 className="font-display font-bold text-2xl">Good morning, Dr. Sharma</h1>
            <p className="text-sm text-muted-foreground">Here's what's happening across your screening program today.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { l:"Scans Today", v:"127", d:"+18% vs yesterday", tone:"text-success" },
              { l:"Pending Review", v:"23", d:"4 urgent", tone:"text-warning" },
              { l:"Avg DR Detected", v:"34%", d:"Moderate or worse", tone:"" },
              { l:"AI Confidence", v:"96.4%", d:"Past 7 days", tone:"text-secondary" },
            ].map(s=>(
              <div key={s.l} className="rounded-2xl bg-card border border-border p-5 shadow-soft">
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.l}</div>
                <div className="font-display font-bold text-3xl mt-1">{s.v}</div>
                <div className={`text-xs mt-1 ${s.tone || "text-muted-foreground"}`}>{s.d}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 rounded-2xl bg-card border border-border p-5 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <div className="font-display font-semibold">Daily Scan Volume</div>
                <div className="text-xs text-muted-foreground">Last 7 days</div>
              </div>
              <div className="h-64">
                <ResponsiveContainer>
                  <AreaChart data={trend}>
                    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="hsl(var(--teal))" stopOpacity={0.5}/><stop offset="1" stopColor="hsl(var(--teal))" stopOpacity={0}/></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="d" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                    <Area type="monotone" dataKey="s" stroke="hsl(var(--teal))" strokeWidth={2.5} fill="url(#g)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl bg-card border border-border p-5 shadow-card">
              <div className="font-display font-semibold mb-4">DR Severity Mix</div>
              <div className="h-64">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={pie} dataKey="v" nameKey="n" innerRadius={50} outerRadius={80} paddingAngle={2}>
                      {pie.map((p,i)=><Cell key={i} fill={p.c} />)}
                    </Pie>
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 rounded-2xl bg-card border border-border shadow-card overflow-hidden">
              <div className="p-5 border-b border-border flex items-center justify-between">
                <div className="font-display font-semibold">Recent Patients</div>
                <Button variant="ghost" size="sm">View all</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40 text-xs text-muted-foreground uppercase tracking-wider">
                    <tr>
                      <th className="text-left p-3 font-medium">Patient</th>
                      <th className="text-left p-3 font-medium">Severity</th>
                      <th className="text-left p-3 font-medium">Risk</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Scan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map(p=>(
                      <tr key={p.id} className="border-t border-border hover:bg-muted/30">
                        <td className="p-3"><div className="font-medium">{p.name}</div><div className="text-xs text-muted-foreground">{p.id} · {p.age}y</div></td>
                        <td className="p-3">{p.severity}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden"><div className="h-full bg-gradient-accent" style={{width:`${p.risk}%`}}/></div>
                            <span className="text-xs tabular-nums">{p.risk}</span>
                          </div>
                        </td>
                        <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full font-medium ${statusTone[p.status]}`}>{p.status}</span></td>
                        <td className="p-3 text-muted-foreground text-xs">{p.scan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl bg-card border border-border p-5 shadow-card">
              <div className="font-display font-semibold mb-4">Monthly Accuracy</div>
              <div className="h-64">
                <ResponsiveContainer>
                  <BarChart data={bars}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                    <Bar dataKey="a" fill="hsl(var(--teal))" radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import { Link } from "react-router-dom";
import Navbar from "@/components/site/Navbar";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Download, AlertTriangle, ArrowLeft, CheckCircle2 } from "lucide-react";
import fundus from "@/assets/fundus-scan.jpg";
import heatmap from "@/assets/fundus-heatmap.jpg";

const forecast = [{m:"Now",r:22},{m:"M2",r:26},{m:"M4",r:31},{m:"M6",r:38},{m:"M8",r:44},{m:"M10",r:51},{m:"M12",r:58}];

export default function Result() {
  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      <main className="container pt-28 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
            <div>
              <Link to="/upload" className="text-sm text-muted-foreground inline-flex items-center gap-1.5 hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" /> Back to upload</Link>
              <h1 className="font-display font-bold text-3xl md:text-4xl mt-3">Diagnosis Report</h1>
              <p className="text-sm text-muted-foreground mt-1">Patient P-00482 · 58y · OD · Generated {new Date().toLocaleString()}</p>
            </div>
            <Button className="bg-gradient-accent text-white hover:opacity-90"><Download className="h-4 w-4 mr-2" /> Download PDF</Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4 rounded-3xl bg-card border border-border p-5 shadow-card">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Original</div>
                  <div className="rounded-xl overflow-hidden aspect-square"><img src={fundus} className="w-full h-full object-cover" alt="Original fundus" /></div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-secondary mb-2">Grad-CAM Overlay</div>
                  <div className="rounded-xl overflow-hidden aspect-square ring-1 ring-secondary/40"><img src={heatmap} className="w-full h-full object-cover" alt="Heatmap" /></div>
                </div>
              </div>

              <div className="rounded-3xl bg-card border border-border p-6 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-display font-semibold">12-Month Vision Risk Forecast</div>
                  <div className="text-xs px-2 py-1 rounded-full bg-warning/10 text-warning font-semibold">+36 pts</div>
                </div>
                <div className="h-56">
                  <ResponsiveContainer>
                    <AreaChart data={forecast}>
                      <defs><linearGradient id="r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="hsl(var(--teal))" stopOpacity={0.5} /><stop offset="1" stopColor="hsl(var(--teal))" stopOpacity={0} /></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                      <Area type="monotone" dataKey="r" stroke="hsl(var(--teal))" strokeWidth={2.5} fill="url(#r)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-3xl bg-warning/5 border border-warning/30 p-6 flex gap-4">
                <AlertTriangle className="h-6 w-6 text-warning flex-shrink-0" />
                <div>
                  <div className="font-semibold">AI Recommendation</div>
                  <p className="text-sm text-muted-foreground mt-1">Refer to ophthalmologist within 4 weeks. Initiate intensified glycemic and BP control. Schedule follow-up imaging in 3 months. Consider anti-VEGF consult if macular involvement worsens.</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-3xl bg-primary text-primary-foreground p-6 shadow-lg">
                <div className="text-xs uppercase tracking-wider text-secondary">Diagnosis</div>
                <div className="font-display font-bold text-2xl mt-1">Moderate NPDR</div>
                <div className="text-sm text-primary-foreground/70 mt-1">ICDR Grade 3 of 4</div>
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <div className="rounded-xl bg-white/5 p-3"><div className="text-[10px] uppercase text-primary-foreground/60">Confidence</div><div className="font-display font-bold text-xl mt-0.5 text-success">96.2%</div></div>
                  <div className="rounded-xl bg-white/5 p-3"><div className="text-[10px] uppercase text-primary-foreground/60">Risk Level</div><div className="font-display font-bold text-xl mt-0.5 text-warning">High</div></div>
                </div>
              </div>

              <div className="rounded-3xl bg-card border border-border p-5 shadow-card">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Severity Distribution</div>
                <div className="space-y-2.5">
                  {[{l:"No DR",v:2},{l:"Mild",v:8},{l:"Moderate",v:72},{l:"Severe",v:14},{l:"Proliferative",v:4}].map(r=>(
                    <div key={r.l} className="flex items-center gap-2 text-xs">
                      <span className="w-24 text-muted-foreground">{r.l}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden"><div className="h-full bg-gradient-accent" style={{width:`${r.v}%`}}/></div>
                      <span className="w-9 text-right font-medium tabular-nums">{r.v}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-card border border-border p-5 shadow-card">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Detected Features</div>
                <div className="space-y-2 text-sm">
                  {["Microaneurysms (12)","Dot-blot hemorrhages (8)","Hard exudates","Cotton wool spots (3)"].map(f=>(
                    <div key={f} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" />{f}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

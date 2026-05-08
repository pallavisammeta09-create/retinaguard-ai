import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/site/Navbar";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Download, AlertTriangle, ArrowLeft, CheckCircle2 } from "lucide-react";

const forecast = [{m:"Now",r:22},{m:"M2",r:26},{m:"M4",r:31},{m:"M6",r:38},{m:"M8",r:44},{m:"M10",r:51},{m:"M12",r:58}];

const riskColor: Record<string,string> = {
  Low: "text-success", Moderate: "text-accent",
  High: "text-warning", Critical: "text-destructive"
};

export default function Result() {
  const { state } = useLocation();
  const r = state?.result;

  if (!r) return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <p className="text-muted-foreground">No result data found.</p>
      <Link to="/upload"><Button>Go back to Upload</Button></Link>
    </div>
  );

  const probs = r.class_probabilities || {};

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      <main className="container pt-28 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
            <div>
              <Link to="/upload" className="text-sm text-muted-foreground inline-flex items-center gap-1.5 hover:text-foreground">
                <ArrowLeft className="h-3.5 w-3.5" /> Back to upload
              </Link>
              <h1 className="font-display font-bold text-3xl md:text-4xl mt-3">Diagnosis Report</h1>
              <p className="text-sm text-muted-foreground mt-1">Generated {new Date().toLocaleString()}</p>
            </div>
            <Button className="bg-gradient-accent text-white hover:opacity-90">
              <Download className="h-4 w-4 mr-2" /> Download PDF
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-5">
              {/* Grad-CAM */}
              {r.gradcam_image && (
                <div className="rounded-3xl bg-card border border-border p-5 shadow-card">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Grad-CAM Overlay</div>
                      <div className="rounded-xl overflow-hidden aspect-square">
                        <img src={`data:image/jpeg;base64,${r.gradcam_image}`}
                          className="w-full h-full object-cover" alt="Grad-CAM" />
                      </div>
                    </div>
                    <div className="flex flex-col justify-center gap-3 p-4">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">AI Analysis</div>
                      <div className="font-display font-bold text-2xl">{r.prediction?.replace("_"," ")}</div>
                      <div className="text-sm text-muted-foreground">Confidence: <span className="font-bold text-foreground">{r.confidence}%</span></div>
                      <div className={`text-sm font-semibold ${riskColor[r.risk_level]}`}>
                        Risk Level: {r.risk_level}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Forecast chart */}
              <div className="rounded-3xl bg-card border border-border p-6 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-display font-semibold">12-Month Vision Risk Forecast</div>
                  <div className="text-xs px-2 py-1 rounded-full bg-warning/10 text-warning font-semibold">
                    Risk Score: {r.risk_score}
                  </div>
                </div>
                <div className="h-56">
                  <ResponsiveContainer>
                    <AreaChart data={forecast}>
                      <defs>
                        <linearGradient id="r" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0" stopColor="hsl(var(--teal))" stopOpacity={0.5} />
                          <stop offset="1" stopColor="hsl(var(--teal))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <Tooltip contentStyle={{ background:"hsl(var(--card))", border:"1px solid hsl(var(--border))", borderRadius:12 }} />
                      <Area type="monotone" dataKey="r" stroke="hsl(var(--teal))" strokeWidth={2.5} fill="url(#r)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recommendation */}
              <div className="rounded-3xl bg-warning/5 border border-warning/30 p-6 flex gap-4">
                <AlertTriangle className="h-6 w-6 text-warning flex-shrink-0" />
                <div>
                  <div className="font-semibold">AI Recommendation</div>
                  <p className="text-sm text-muted-foreground mt-1">{r.recommendation}</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {/* Main result card */}
              <div className="rounded-3xl bg-primary text-primary-foreground p-6 shadow-lg">
                <div className="text-xs uppercase tracking-wider text-secondary">Diagnosis</div>
                <div className="font-display font-bold text-2xl mt-1">{r.prediction?.replace("_"," ")}</div>
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <div className="rounded-xl bg-white/5 p-3">
                    <div className="text-[10px] uppercase text-primary-foreground/60">Confidence</div>
                    <div className="font-display font-bold text-xl mt-0.5 text-success">{r.confidence}%</div>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3">
                    <div className="text-[10px] uppercase text-primary-foreground/60">Risk Level</div>
                    <div className={`font-display font-bold text-xl mt-0.5 ${riskColor[r.risk_level]}`}>{r.risk_level}</div>
                  </div>
                </div>
              </div>

              {/* Severity distribution */}
              <div className="rounded-3xl bg-card border border-border p-5 shadow-card">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Severity Distribution</div>
                <div className="space-y-2.5">
                  {Object.entries(probs).map(([cls, val]) => (
                    <div key={cls} className="flex items-center gap-2 text-xs">
                      <span className="w-28 text-muted-foreground truncate">{cls.replace("_"," ")}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-gradient-accent" style={{width:`${((val as number)*100).toFixed(0)}%`}} />
                      </div>
                      <span className="w-10 text-right font-medium tabular-nums">
                        {((val as number)*100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scan ID */}
              <div className="rounded-3xl bg-card border border-border p-5 shadow-card">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Scan Details</div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    Scan ID: <span className="text-xs text-muted-foreground truncate">{r.scan_id?.slice(0,16)}...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    Saved to database
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    Grad-CAM generated
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

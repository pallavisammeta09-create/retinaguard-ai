import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Sparkles, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import fundus from "@/assets/fundus-scan.jpg";
import heatmap from "@/assets/fundus-heatmap.jpg";

export default function AIDemo() {
  const [phase, setPhase] = useState<"idle" | "analyzing" | "done">("idle");

  const run = () => {
    setPhase("analyzing");
    setTimeout(() => setPhase("done"), 2400);
  };

  return (
    <section id="demo" className="py-24">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1.5 text-xs font-medium text-secondary mb-4">
            <Sparkles className="h-3.5 w-3.5" /> Live AI Demo
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">See RetinaGuard AI <span className="gradient-text">analyze in real-time</span></h2>
          <p className="mt-4 text-muted-foreground">A simulated walk-through of the diagnostic pipeline using a sample fundus scan.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="relative rounded-3xl overflow-hidden border border-border bg-card shadow-card aspect-square">
            <img src={phase === "done" ? heatmap : fundus} alt="Retinal fundus" className="w-full h-full object-cover transition-all duration-700" loading="lazy" width={768} height={768} />
            {phase === "analyzing" && (
              <>
                <div className="absolute inset-0 bg-primary/30" />
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent shimmer" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="glass rounded-2xl px-5 py-3 flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-secondary animate-pulse" />
                    <span className="text-sm font-medium">AI inference in progress…</span>
                  </div>
                </div>
              </>
            )}
            {phase === "done" && (
              <div className="absolute top-4 left-4 glass rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-warning" /> Heatmap Overlay
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-card flex flex-col">
            {phase === "idle" && (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-gradient-accent grid place-items-center mb-4 shadow-glow">
                  <Upload className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-display font-semibold text-xl">Sample Fundus Scan Loaded</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-sm">Click analyze to run the demo through our cloud AI engine.</p>
                <Button onClick={run} size="lg" className="mt-6 bg-gradient-accent text-white hover:opacity-90">
                  <Sparkles className="h-4 w-4 mr-2" /> Analyze Scan
                </Button>
              </div>
            )}

            <AnimatePresence>
              {phase !== "idle" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex-1 space-y-5"
                >
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Diagnosis</div>
                    <div className="font-display font-bold text-2xl mt-1">{phase === "analyzing" ? "Analyzing…" : "Moderate NPDR"}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Stat label="Confidence" value={phase === "done" ? "96.2%" : "—"} tone="success" />
                    <Stat label="Risk Level" value={phase === "done" ? "High" : "—"} tone="warning" />
                    <Stat label="DR Grade" value={phase === "done" ? "3 / 4" : "—"} />
                    <Stat label="Inference" value={phase === "done" ? "2.4s" : "…"} />
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Severity Distribution</div>
                    <div className="space-y-2">
                      {[
                        { l: "No DR", v: phase === "done" ? 2 : 0 },
                        { l: "Mild", v: phase === "done" ? 8 : 0 },
                        { l: "Moderate", v: phase === "done" ? 72 : 0 },
                        { l: "Severe", v: phase === "done" ? 14 : 0 },
                        { l: "Proliferative", v: phase === "done" ? 4 : 0 },
                      ].map((r) => (
                        <div key={r.l} className="flex items-center gap-3 text-xs">
                          <span className="w-20 text-muted-foreground">{r.l}</span>
                          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div className="h-full bg-gradient-accent transition-all duration-1000" style={{ width: `${r.v}%` }} />
                          </div>
                          <span className="w-10 text-right tabular-nums font-medium">{r.v}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {phase === "done" && (
                    <div className="rounded-xl border border-warning/30 bg-warning/5 p-4 flex gap-3">
                      <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold">Recommendation</div>
                        <div className="text-xs text-muted-foreground mt-1">Refer to ophthalmologist within 4 weeks. Initiate optimization of glycemic and BP control.</div>
                      </div>
                    </div>
                  )}

                  {phase === "done" && (
                    <Button variant="outline" onClick={() => setPhase("idle")} className="w-full">
                      <CheckCircle2 className="h-4 w-4 mr-2" /> Run Another Scan
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "success" | "warning" }) {
  const color = tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : "text-foreground";
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-3">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`font-display font-bold text-lg mt-0.5 ${color}`}>{value}</div>
    </div>
  );
}

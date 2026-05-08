import { motion } from "framer-motion";
import { Upload, Brain, Flame, TrendingUp } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload Fundus Scan", desc: "Securely upload retinal images directly from any fundus camera or PACS system." },
  { icon: Brain, title: "AI Detects DR Severity", desc: "Our deep learning ensemble grades disease across the 5 ICDR stages in seconds." },
  { icon: Flame, title: "Explainable Heatmap", desc: "Grad-CAM overlays visualize pathological regions for clinician review and trust." },
  { icon: TrendingUp, title: "Vision Risk Forecast", desc: "Predict 6 & 12-month vision deterioration risk from imaging plus clinical data." },
];

export default function Workflow() {
  return (
    <section id="workflow" className="py-24 bg-gradient-mesh">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground mb-4">
            Clinical Workflow
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">From scan to insight in <span className="gradient-text">under 30 seconds</span></h2>
          <p className="mt-4 text-muted-foreground">A streamlined 4-step pipeline designed for high-throughput screening clinics.</p>
        </div>

        <div className="relative grid gap-6 md:grid-cols-4">
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative"
            >
              <div className="relative bg-card rounded-2xl p-6 shadow-card border border-border h-full">
                <div className="relative h-14 w-14 rounded-2xl bg-gradient-accent grid place-items-center mb-4 shadow-glow">
                  <s.icon className="h-6 w-6 text-white" />
                  <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold grid place-items-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

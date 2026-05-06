import { motion } from "framer-motion";
import fundus from "@/assets/fundus-scan.jpg";
import heatmap from "@/assets/fundus-heatmap.jpg";
import { Brain, Eye, Sparkles } from "lucide-react";

export default function Explainable() {
  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 neural-dots opacity-20" />
      <div className="absolute -top-40 right-0 h-[400px] w-[400px] bg-secondary/30 rounded-full blur-3xl" />

      <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium mb-4">
            <Brain className="h-3.5 w-3.5 text-secondary" /> Explainable AI
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">Transparent AI doctors can <span className="text-secondary">trust</span></h2>
          <p className="mt-4 text-primary-foreground/70 leading-relaxed max-w-lg">
            RetinaGuard AI highlights pathological retinal regions to improve transparency, explainability and clinician trust. Every prediction comes with a Grad-CAM saliency map.
          </p>

          <div className="mt-8 space-y-4">
            {[
              { icon: Eye, title: "Localized Pathology Maps", desc: "Visualize microaneurysms, hemorrhages and neovascularization." },
              { icon: Sparkles, title: "Clinical Reasoning Layer", desc: "Natural language summaries explaining each prediction." },
              { icon: Brain, title: "Model Confidence Bands", desc: "Per-class probability with uncertainty quantification." },
            ].map((i) => (
              <div key={i.title} className="flex gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/10 grid place-items-center flex-shrink-0">
                  <i.icon className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <div className="font-semibold">{i.title}</div>
                  <div className="text-sm text-primary-foreground/60">{i.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-wider text-primary-foreground/60">Original</div>
            <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 aspect-square">
              <img src={fundus} alt="Original fundus" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-wider text-secondary">Grad-CAM</div>
            <div className="rounded-2xl overflow-hidden ring-1 ring-secondary/40 aspect-square shadow-glow">
              <img src={heatmap} alt="Heatmap overlay" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className="col-span-2 glass-dark rounded-2xl p-4 text-sm">
            <div className="text-secondary text-xs font-semibold uppercase tracking-wider mb-1">AI Explanation</div>
            Hot zones detected in the inferior macular region indicate hard exudates and dot-blot hemorrhages — features consistent with moderate NPDR.
          </div>
        </motion.div>
      </div>
    </section>
  );
}

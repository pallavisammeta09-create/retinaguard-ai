import { Star } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { name: "Dr. Anya Sharma", role: "Senior Ophthalmologist · Apollo Eye", quote: "RetinaGuard AI cut our screening backlog by 60%. The Grad-CAM overlays make it easy to validate predictions in seconds." },
  { name: "Dr. Marcus Chen", role: "Diabetologist · Mayo Health", quote: "The vision risk forecast is a game-changer. We can finally prioritize the diabetics most likely to progress." },
  { name: "Priya Iyer", role: "Director of Operations · Aravind Eye", quote: "Deployment was seamless. PACS integration just worked, and our technicians were trained in a single afternoon." },
];

export default function Testimonials() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground mb-4">Testimonials</div>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">Trusted by clinicians who care about <span className="gradient-text">outcomes</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-7 shadow-card"
            >
              <div className="flex gap-0.5 text-warning mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-sm leading-relaxed">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-border">
                <div className="h-10 w-10 rounded-full bg-gradient-accent grid place-items-center text-white font-display font-semibold text-sm">
                  {t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

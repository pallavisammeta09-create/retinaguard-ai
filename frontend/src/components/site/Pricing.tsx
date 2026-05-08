import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "$299",
    desc: "For small clinics & private practices",
    features: ["Up to 500 scans/month", "DR detection & grading", "Explainable heatmaps", "PDF reports", "Email support"],
  },
  {
    name: "Professional",
    price: "$1,299",
    desc: "For eye hospitals & screening programs",
    features: ["Up to 5,000 scans/month", "Vision risk forecasting", "Doctor dashboard", "Patient monitoring", "EHR & PACS integration", "Priority support"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For healthcare networks & payers",
    features: ["Unlimited scans", "Dedicated AI infrastructure", "On-prem deployment", "SLA & DPA", "Custom model fine-tuning", "24/7 dedicated success"],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gradient-mesh">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground mb-4">Pricing</div>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">Plans that scale with your <span className="gradient-text">screening program</span></h2>
          <p className="mt-4 text-muted-foreground">Start with a 30-day free pilot. No credit card required.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl p-7 border transition-all ${
                p.highlight
                  ? "bg-primary text-primary-foreground border-primary shadow-lg scale-[1.03] z-10"
                  : "bg-card border-border shadow-card hover:shadow-lg"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-accent text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
              )}
              <div className="font-display font-bold text-xl">{p.name}</div>
              <div className={`text-sm mt-1 ${p.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{p.desc}</div>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display font-bold text-4xl">{p.price}</span>
                {p.price !== "Custom" && <span className={`text-sm ${p.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>/month</span>}
              </div>
              <Button className={`w-full mt-6 ${p.highlight ? "bg-gradient-accent text-white hover:opacity-90" : ""}`} variant={p.highlight ? "default" : "outline"}>
                {p.price === "Custom" ? "Contact Sales" : "Start Free Pilot"}
              </Button>
              <div className={`mt-6 pt-6 border-t space-y-3 ${p.highlight ? "border-white/10" : "border-border"}`}>
                {p.features.map((f) => (
                  <div key={f} className="flex gap-2 text-sm">
                    <Check className={`h-4 w-4 flex-shrink-0 mt-0.5 ${p.highlight ? "text-secondary" : "text-secondary"}`} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How accurate is RetinaGuard AI?", a: "Our model achieves 97.4% sensitivity and 95.1% specificity for referable DR, validated across 1.2M+ scans from 14 countries and multiple fundus camera vendors." },
  { q: "Is this clinically explainable?", a: "Yes. Every prediction is paired with a Grad-CAM heatmap, per-class confidence bands and a natural language reasoning summary." },
  { q: "Can doctors override AI predictions?", a: "Always. RetinaGuard AI is a clinical decision support tool — physicians retain final diagnostic authority and can annotate or revise reports." },
  { q: "Is patient data secure?", a: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We are SOC 2 Type II certified, HIPAA-compliant and GDPR-ready." },
  { q: "Is this HIPAA-ready?", a: "Yes. We sign BAAs, maintain audit logs, support SSO and offer optional on-prem deployment for sensitive environments." },
  { q: "Does it support longitudinal monitoring?", a: "Patients can be tracked across visits with automated progression alerts, recall reminders and trend dashboards." },
];

export default function FAQ() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground mb-4">FAQ</div>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">Questions, <span className="gradient-text">answered</span></h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`i-${i}`} className="border border-border bg-card rounded-2xl px-5 shadow-soft">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

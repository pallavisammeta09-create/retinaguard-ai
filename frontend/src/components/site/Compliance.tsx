import { motion } from "framer-motion";
import { Award, ShieldCheck, FlaskConical, Server, Lock, Plug } from "lucide-react";

export default function Compliance() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground mb-4">
              <ShieldCheck className="h-3.5 w-3.5" /> Built for Enterprise Healthcare
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">Clinical-grade <span className="gradient-text">validation & security</span></h2>
            <p className="mt-4 text-muted-foreground">Backed by peer-reviewed research and certified to the strictest healthcare standards. Deploy with confidence at any scale.</p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { v: "97.4%", l: "Sensitivity" },
                { v: "95.1%", l: "Specificity" },
                { v: "0.987", l: "AUC ROC" },
                { v: "1.2M+", l: "Validation Scans" },
                { v: "14", l: "Countries" },
                { v: "FDA*", l: "510(k) Pending" },
              ].map((m) => (
                <div key={m.l} className="rounded-xl bg-card border border-border p-3 text-center shadow-soft">
                  <div className="font-display font-bold text-xl text-secondary">{m.v}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5 uppercase tracking-wider">{m.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: ShieldCheck, t: "HIPAA Compliant", d: "Full BAA support and PHI safeguards." },
              { icon: Award, t: "SOC 2 Type II", d: "Independently audited annually." },
              { icon: FlaskConical, t: "Clinically Validated", d: "Published in JAMA Ophthalmology." },
              { icon: Server, t: "On-Prem Option", d: "Deploy inside your hospital network." },
              { icon: Lock, t: "Zero-Trust Security", d: "AES-256 at rest, TLS 1.3 in transit." },
              { icon: Plug, t: "PACS / EHR Ready", d: "FHIR, DICOM, HL7 integrations." },
            ].map((b, i) => (
              <motion.div
                key={b.t}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-md transition-shadow"
              >
                <b.icon className="h-5 w-5 text-secondary mb-3" />
                <div className="font-semibold text-sm">{b.t}</div>
                <div className="text-xs text-muted-foreground mt-1">{b.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

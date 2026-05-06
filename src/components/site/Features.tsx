import { motion } from "framer-motion";
import { Upload, Brain, Activity, LineChart, ShieldCheck, Stethoscope, Users, FileText, Eye } from "lucide-react";

const features = [
  { icon: Upload, title: "Retina Scan Upload", desc: "Drag & drop fundus images with DICOM, JPEG and PNG support. Batch upload up to 1000 patients." },
  { icon: Eye, title: "AI DR Detection", desc: "Multi-class CNN ensemble detects DR with 97.4% sensitivity, validated on diverse global datasets." },
  { icon: Activity, title: "Severity Grading", desc: "ICDR 5-stage classification: No DR, Mild, Moderate, Severe NPDR and Proliferative DR." },
  { icon: Brain, title: "Explainable AI", desc: "Grad-CAM heatmaps highlight microaneurysms, hemorrhages and exudates for clinical transparency." },
  { icon: LineChart, title: "Vision Risk Forecasting", desc: "Predict 6 / 12-month vision risk from imaging plus HbA1c, BP and clinical history." },
  { icon: Stethoscope, title: "Doctor Dashboard", desc: "Queue management, second-opinion workflow and AI-assisted reporting in one workspace." },
  { icon: Users, title: "Patient Monitoring", desc: "Longitudinal tracking with progression alerts and recall reminders." },
  { icon: FileText, title: "Clinical Reports", desc: "Auto-generated PDF reports with imaging, diagnosis and recommendations." },
  { icon: ShieldCheck, title: "Enterprise Security", desc: "HIPAA, GDPR, ISO 27001 compliant with end-to-end encryption and audit trails." },
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground mb-4">
            Platform Capabilities
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
            Everything an eye-care team needs, <span className="gradient-text">powered by AI</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            From scan ingestion to clinical reporting — RetinaGuard AI replaces fragmented tools with one validated, end-to-end platform.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-accent opacity-0 group-hover:opacity-[0.04] transition-opacity" />
              <div className="relative">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-secondary/15 to-accent/15 grid place-items-center mb-5 group-hover:scale-110 transition-transform">
                  <f.icon className="h-5 w-5 text-secondary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Eye, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="container py-16 grid gap-12 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="h-9 w-9 rounded-xl bg-gradient-accent grid place-items-center">
              <Eye className="h-5 w-5 text-white" />
            </div>
            <div className="font-display font-bold text-lg">RetinaGuard AI</div>
          </div>
          <p className="text-sm text-primary-foreground/70 max-w-sm">
            Clinical-grade AI for diabetic retinopathy detection, explainable diagnosis and vision risk prediction — built for hospitals, clinics and ophthalmologists.
          </p>
          <div className="flex gap-3 mt-6">
            {[Twitter, Linkedin, Github].map((I, i) => (
              <a key={i} href="#" className="h-9 w-9 rounded-lg border border-white/10 grid place-items-center hover:bg-white/10 transition-colors">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {[
          { title: "Product", items: ["Features", "AI Demo", "Dashboard", "Pricing", "API"] },
          { title: "Company", items: ["About", "Research", "Press", "Careers", "Contact"] },
          { title: "Legal", items: ["HIPAA", "Privacy", "Terms", "Security", "DPA"] },
        ].map((col) => (
          <div key={col.title}>
            <div className="font-semibold mb-4 text-sm">{col.title}</div>
            <ul className="space-y-2.5 text-sm text-primary-foreground/70">
              {col.items.map((i) => (
                <li key={i}><a href="#" className="hover:text-white transition-colors">{i}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/60">
          <div>© {new Date().getFullYear()} RetinaGuard AI, Inc. All rights reserved.</div>
          <div className="flex gap-4">
            <span>HIPAA Ready</span>
            <span>SOC 2 Type II</span>
            <span>ISO 13485</span>
            <span>CE Marked</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

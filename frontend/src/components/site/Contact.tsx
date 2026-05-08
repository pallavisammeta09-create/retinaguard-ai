import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Mail, Phone } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  return (
    <section id="contact" className="py-24">
      <div className="container grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground mb-4">Book a Demo</div>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">See RetinaGuard AI <span className="gradient-text">in your clinic</span></h2>
          <p className="mt-4 text-muted-foreground max-w-md">Get a 30-minute personalized walkthrough with our clinical AI specialists. We'll tailor the demo to your screening workflow.</p>

          <div className="mt-8 space-y-4">
            {[
              { icon: Calendar, label: "Same-week scheduling" },
              { icon: Mail, label: "hello@retinaguard.ai" },
              { icon: Phone, label: "+1 (555) 240-1850" },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-3 text-sm">
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-secondary/15 to-accent/15 grid place-items-center">
                  <c.icon className="h-4 w-4 text-secondary" />
                </div>
                {c.label}
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast({ title: "Demo request received", description: "Our team will reach out within 24 hours." });
            (e.target as HTMLFormElement).reset();
          }}
          className="rounded-3xl border border-border bg-card p-7 shadow-card space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" required maxLength={100} className="mt-1.5" placeholder="Dr. Anya Sharma" />
            </div>
            <div>
              <Label htmlFor="hospital">Hospital / Clinic</Label>
              <Input id="hospital" required maxLength={150} className="mt-1.5" placeholder="Apollo Eye Hospital" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Work email</Label>
              <Input id="email" type="email" required maxLength={255} className="mt-1.5" placeholder="you@hospital.org" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" maxLength={30} className="mt-1.5" placeholder="+1 555 000 0000" />
            </div>
          </div>
          <div>
            <Label htmlFor="msg">How can we help?</Label>
            <Textarea id="msg" rows={4} maxLength={1000} className="mt-1.5" placeholder="Tell us about your screening volume and goals…" />
          </div>
          <Button type="submit" size="lg" className="w-full bg-gradient-accent text-white hover:opacity-90">
            Request Demo
          </Button>
        </form>
      </div>
    </section>
  );
}

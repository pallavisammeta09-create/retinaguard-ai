import { motion } from "framer-motion";
import { ArrowRight, Activity, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-retina.jpg";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 bg-gradient-hero">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute -top-24 -right-24 h-[500px] w-[500px] bg-gradient-glow rounded-full blur-3xl opacity-60" />
      <div className="absolute -bottom-24 -left-24 h-[400px] w-[400px] bg-sky/20 rounded-full blur-3xl" />

      {/* floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-secondary/60"
          style={{
            top: `${(i * 37) % 90 + 5}%`,
            left: `${(i * 53) % 90 + 5}%`,
            animation: `float-particle ${4 + (i % 5)}s ease-in-out ${i * 0.3}s infinite`,
          }}
        />
      ))}

      <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-white/60 backdrop-blur px-3 py-1.5 text-xs font-medium text-secondary mb-6 shadow-soft">
            <Sparkles className="h-3.5 w-3.5" />
            FDA-aligned AI · Validated on 1.2M+ retinal scans
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            Detect Diabetic Retinopathy Early.{" "}
            <span className="gradient-text">Protect Vision with AI.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            AI-powered retinal screening platform for diabetic retinopathy detection, severity grading, explainable diagnosis, and future vision risk prediction.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-gradient-accent text-white hover:opacity-90 shadow-lg">
              <a href="#contact">Request Demo <ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5">
              <Link to="/upload">Try AI Screening</Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
            {[
              { v: "97.4%", l: "Detection Accuracy" },
              { v: "1,200+", l: "Hospitals Onboarded" },
              { v: "<3s", l: "Per-Scan Inference" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display font-bold text-2xl text-primary">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg ring-1 ring-white/40">
            <img src={heroImg} alt="AI retinal scanning visualization" className="w-full h-full object-cover" width={1280} height={1280} />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-transparent" />
          </div>

          {/* Floating cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -left-6 top-12 glass rounded-2xl shadow-lg p-4 w-56 animate-float"
          >
            <div className="flex items-center gap-2 text-xs font-medium text-secondary mb-2">
              <Activity className="h-3.5 w-3.5" /> AI Analysis
            </div>
            <div className="text-sm font-semibold">DR Severity: Moderate</div>
            <div className="text-xs text-muted-foreground">Confidence 96.2%</div>
            <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-[96%] bg-gradient-accent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -right-4 bottom-10 glass rounded-2xl shadow-lg p-4 w-60 animate-float"
            style={{ animationDelay: "1s" }}
          >
            <div className="flex items-center gap-2 text-xs font-medium text-warning mb-2">
              <Zap className="h-3.5 w-3.5" /> 12-Month Forecast
            </div>
            <div className="text-sm font-semibold">Vision Risk: 38%</div>
            <div className="text-xs text-muted-foreground">Refer ophthalmologist</div>
            <div className="mt-2 flex items-end gap-1 h-8">
              {[30,40,35,55,48,62,58,72].map((h,i)=>(
                <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-secondary/70 to-accent" style={{height:`${h}%`}} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute left-1/2 -translate-x-1/2 -bottom-6 glass rounded-full shadow-lg px-5 py-2.5 flex items-center gap-2"
          >
            <ShieldCheck className="h-4 w-4 text-success" />
            <span className="text-xs font-semibold">HIPAA · SOC 2 · CE</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Logo strip */}
      <div className="container relative mt-24">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">Trusted by leading healthcare networks</p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-60">
          {["Mayo Health","Apollo Vision","Aravind Eye","Singhealth","Moorfields","Bascom Palmer","NHS Trust"].map(n=>(
            <div key={n} className="font-display font-semibold text-sm tracking-tight text-primary/70">{n}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

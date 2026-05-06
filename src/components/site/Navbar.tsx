import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Eye, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/#features", label: "Features" },
  { to: "/#workflow", label: "Workflow" },
  { to: "/#demo", label: "AI Demo" },
  { to: "/#pricing", label: "Pricing" },
  { to: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || pathname !== "/" ? "glass shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative h-9 w-9 rounded-xl bg-gradient-accent grid place-items-center shadow-glow">
            <Eye className="h-5 w-5 text-white" />
            <span className="absolute inset-0 rounded-xl animate-pulse-ring bg-secondary/40" />
          </div>
          <div className="font-display font-bold text-lg leading-none">
            RetinaGuard <span className="text-secondary">AI</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.to}
              href={l.to}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/login">Sign in</Link>
          </Button>
          <Button asChild size="sm" className="bg-gradient-accent text-white hover:opacity-90 shadow-md">
            <Link to="/upload">Try AI Screening</Link>
          </Button>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border">
          <div className="container py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a key={l.to} href={l.to} onClick={() => setOpen(false)} className="py-2 text-sm font-medium">
                {l.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <Button asChild variant="outline" className="flex-1"><Link to="/login">Sign in</Link></Button>
              <Button asChild className="flex-1 bg-gradient-accent text-white"><Link to="/upload">Try Demo</Link></Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

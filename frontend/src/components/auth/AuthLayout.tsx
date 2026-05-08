import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

export default function AuthLayout({ title, subtitle, children, footer }: { title: string; subtitle: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex relative bg-primary text-primary-foreground p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 neural-dots opacity-20" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] bg-secondary/30 rounded-full blur-3xl" />
        <Link to="/" className="relative flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-accent grid place-items-center shadow-glow">
            <Eye className="h-5 w-5 text-white" />
          </div>
          <div className="font-display font-bold text-lg">RetinaGuard AI</div>
        </Link>
        <div className="relative">
          <div className="text-3xl font-display font-bold leading-tight max-w-md">"RetinaGuard AI replaced three vendors and gave us a 60% faster screening pipeline."</div>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-accent grid place-items-center font-semibold">AS</div>
            <div>
              <div className="font-semibold text-sm">Dr. Anya Sharma</div>
              <div className="text-xs text-primary-foreground/70">Senior Ophthalmologist · Apollo Eye</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="h-8 w-8 rounded-lg bg-gradient-accent grid place-items-center">
              <Eye className="h-4 w-4 text-white" />
            </div>
            <span className="font-display font-bold">RetinaGuard AI</span>
          </Link>
          <h1 className="font-display font-bold text-2xl md:text-3xl">{title}</h1>
          <p className="text-muted-foreground mt-2 text-sm">{subtitle}</p>
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-sm text-center text-muted-foreground">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

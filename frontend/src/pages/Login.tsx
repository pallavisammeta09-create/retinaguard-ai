import { Link } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your RetinaGuard AI workspace"
      footer={<>Don't have an account? <Link to="/signup" className="text-secondary font-medium">Create one</Link></>}
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <Label htmlFor="email">Work email</Label>
          <Input id="email" type="email" required className="mt-1.5" placeholder="you@hospital.org" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="pw">Password</Label>
            <Link to="/forgot-password" className="text-xs text-secondary">Forgot?</Link>
          </div>
          <Input id="pw" type="password" required className="mt-1.5" />
        </div>
        <Button type="submit" className="w-full bg-gradient-accent text-white hover:opacity-90">Sign in</Button>
        <Button type="button" variant="outline" className="w-full">Continue with SSO</Button>
      </form>
    </AuthLayout>
  );
}

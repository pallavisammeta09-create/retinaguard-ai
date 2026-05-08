import { Link } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Signup() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start a free 30-day clinical pilot"
      footer={<>Already have an account? <Link to="/login" className="text-secondary font-medium">Sign in</Link></>}
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="fn">First name</Label>
            <Input id="fn" required className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="ln">Last name</Label>
            <Input id="ln" required className="mt-1.5" />
          </div>
        </div>
        <div>
          <Label htmlFor="email">Work email</Label>
          <Input id="email" type="email" required className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="org">Hospital / Clinic</Label>
          <Input id="org" required className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="pw">Password</Label>
          <Input id="pw" type="password" required className="mt-1.5" />
        </div>
        <Button type="submit" className="w-full bg-gradient-accent text-white hover:opacity-90">Create account</Button>
        <p className="text-xs text-center text-muted-foreground">By signing up you agree to our Terms and HIPAA-compliant Privacy Policy.</p>
      </form>
    </AuthLayout>
  );
}

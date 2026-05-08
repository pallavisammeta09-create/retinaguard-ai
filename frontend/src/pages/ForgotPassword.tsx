import { Link } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {
  return (
    <AuthLayout
      title="Reset your password"
      subtitle="We'll send a secure recovery link to your email"
      footer={<><Link to="/login" className="text-secondary font-medium">Back to sign in</Link></>}
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <Label htmlFor="email">Work email</Label>
          <Input id="email" type="email" required className="mt-1.5" />
        </div>
        <Button type="submit" className="w-full bg-gradient-accent text-white hover:opacity-90">Send reset link</Button>
      </form>
    </AuthLayout>
  );
}

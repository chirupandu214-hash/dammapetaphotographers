import { useState } from "react";
import { Camera, Eye, EyeOff } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export function LoginPage() {
  const { session, profile, signIn } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  if (session && !profile?.must_change_password) {
    return <Navigate to="/" replace />;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      localStorage.setItem("remember_me", remember ? "true" : "false");

      await signIn(identifier, password);

      toast.success("Login successful.");

      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-4">
      <Card className="w-full max-w-md border-white/10 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15">
            <Camera className="h-8 w-8" />
          </div>

          <h1 className="text-2xl font-bold">
            Dhammapeta Photographers Association
          </h1>

          <p className="mt-1 text-sm text-white/70">
            Management Portal
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <Input
            placeholder="Email or registered mobile number"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="absolute right-3 top-2.5 text-slate-500"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>

            <a href="/forgot-password" className="text-blue-200 hover:underline">
              Forgot password?
            </a>
          </div>

          <Button className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </Button>
        </form>
      </Card>
    </main>
  );
}

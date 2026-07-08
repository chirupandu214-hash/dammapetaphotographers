import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function ChangePasswordPage() {
  const { profile, refreshProfile } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;

      if (profile?.id) {
        await supabase
          .from("profiles")
          .update({ must_change_password: false })
          .eq("id", profile.id);
      }

      await refreshProfile();

      toast.success("Password changed successfully.");
    } catch (error: any) {
      toast.error(error.message || "Unable to change password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-6">
        <h1 className="mb-2 text-2xl font-bold">Change Password</h1>

        <p className="mb-6 text-sm text-muted-foreground">
          For security, you must change your default password before continuing.
        </p>

        <form onSubmit={submit} className="space-y-4">
          <Input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Change Password"}
          </Button>
        </form>
      </Card>
    </main>
  );
}

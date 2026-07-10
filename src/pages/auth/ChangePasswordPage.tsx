import React, { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function ChangePasswordPage() {
  const { profile, refreshProfile } = useAuth();

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const submit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
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
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            must_change_password: false,
          })
          .eq("id", profile.id);

        if (profileError) throw profileError;
      }

      await refreshProfile();

      setPassword("");
      setConfirmPassword("");

      toast.success("Password changed successfully.");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to change password.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-6">
        <h1 className="mb-2 text-2xl font-bold">
          Change Password
        </h1>

        <p className="mb-6 text-sm text-muted-foreground">
          For security, you must change your default password before continuing.
        </p>

        <form onSubmit={submit} className="space-y-4">
          <Input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement>
            ) => setPassword(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement>
            ) => setConfirmPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Updating..." : "Change Password"}
          </Button>
        </form>
      </Card>
    </main>
  );
}

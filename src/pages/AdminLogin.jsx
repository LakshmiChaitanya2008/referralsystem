import { Link, useNavigate, useSearchParams } from "react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import supabase from "../lib/supabase";
import { ADMIN_EMAIL, isAdminUser } from "../lib/adminAuth";

function getSafeRedirect(path) {
  if (!path || !path.startsWith("/admin") || path.startsWith("//")) {
    return "/admin";
  }
  return path;
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = getSafeRedirect(searchParams.get("redirect"));
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const trimmedEmail = email.trim().toLowerCase();

      if (trimmedEmail !== ADMIN_EMAIL) {
        throw new Error("Only the admin account can sign in here.");
      }

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (signInError) {
        throw new Error("Invalid admin email or password.");
      }

      if (!isAdminUser(data.user)) {
        throw new Error("This account is not authorized for admin access.");
      }

      toast.success("Admin login successful!");
      navigate(redirectTo, { replace: true });
    } catch (loginError) {
      setError(loginError.message || "Admin login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <Card
        title="Admin Login"
        description="Sign in to view members and referral networks. Admin is separate from member accounts."
      >
        <form className="space-y-4" onSubmit={handleLogin}>
          <Input
            id="admin-email"
            name="email"
            type="email"
            label="Admin Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username"
            required
          />
          <Input
            id="admin-password"
            name="password"
            type="password"
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />

          {error ? (
            <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-400">
              {error}
            </p>
          ) : null}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in as Admin"}
          </Button>
        </form>

        <p className="mt-4 text-sm text-slate-600 dark:text-neutral-400">
          Member?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400"
          >
            Member login
          </Link>
        </p>
      </Card>
    </div>
  );
}


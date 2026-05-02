import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import toast from "react-hot-toast";
import supabase from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleLogin(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (signInError) {
        throw signInError;
      }

      toast.success("Login successful!");
      navigate("/");
    } catch (loginError) {
      setError(loginError.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <Card title="Welcome Back" description="Login to manage your referral campaigns.">
        <form className="space-y-4" onSubmit={handleLogin}>
          <Input
            id="login-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            label="Email"
            placeholder="you@company.com"
            required
          />
          <Input
            id="login-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            label="Password"
            placeholder="••••••••"
            required
          />
          {error ? (
            <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-400">
              {error}
            </p>
          ) : null}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-slate-600 dark:text-neutral-400">
          New here?{" "}
          <Link to="/signup" className="font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400">
            Create an account
          </Link>
        </p>
      </Card>
    </div>
  );
}

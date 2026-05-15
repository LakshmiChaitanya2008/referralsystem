import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import UserIdField from "../components/UserIdField";
import toast from "react-hot-toast";
import supabase from "../lib/supabase";
import {
  USER_ID_PATTERN,
  authEmailFromUserId,
  buildUserId,
} from "../lib/userIdAuth";

export default function Login() {
  const navigate = useNavigate();
  const [userIdDigits, setUserIdDigits] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleUserIdDigitsChange(digits) {
    setUserIdDigits(digits);
  }

  async function handleLogin(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const userId = buildUserId(userIdDigits);

    try {
      if (!USER_ID_PATTERN.test(userId)) {
        throw new Error(
          "User ID must start with MJ followed by exactly 9 digits (e.g. MJ123456789).",
        );
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: authEmailFromUserId(userId),
        password,
      });

      if (signInError) {
        throw new Error("Invalid user ID or password. Please try again.");
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
      <Card title="Welcome Back" description="Login with your user ID and password.">
        <form className="space-y-4" onSubmit={handleLogin}>
          <UserIdField
            id="login-user-id-digits"
            digits={userIdDigits}
            onDigitsChange={handleUserIdDigitsChange}
          />
          <Input
            id="login-password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            label="Password"
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
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-slate-600 dark:text-neutral-400">
          New here?{" "}
          <Link
            to="/signup"
            className="font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400"
          >
            Create an account
          </Link>
        </p>
      </Card>
    </div>
  );
}

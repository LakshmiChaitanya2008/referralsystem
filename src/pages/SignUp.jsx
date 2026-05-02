import { Link, useNavigate } from "react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import supabase from "../lib/supabase";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    referralCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSignUp(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedReferralCode = formData.referralCode.trim();

    try {
      let parentId = null;

      if (trimmedReferralCode) {
        const { data: parentProfile, error: parentError } = await supabase
          .from("profiles")
          .select("id")
          .eq("referral_code", trimmedReferralCode)
          .maybeSingle();

        if (parentError) throw parentError;

        if (!parentProfile) {
          throw new Error("Invalid referral code. Please check and try again.");
        }

        parentId = parentProfile.id;

        const { count, error: countError } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("parent_id", parentId);

        if (countError) throw countError;

        if (count >= 2) {
          throw new Error("Referral limit reached.");
        }
      }

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: trimmedEmail,
        password: formData.password,
      });

      if (signUpError) {
        throw signUpError;
      }

      const user = signUpData?.user;
      if (!user?.id) {
        throw new Error("Unable to create user. Please try again.");
      }

      const { error: profileError } = await supabase.from("profiles").insert({
        id: user.id,
        email: trimmedEmail,
        name: trimmedName,
        phone: trimmedPhone,
        referral_code: null,
        parent_id: parentId,
      });

      if (profileError) {
        throw profileError;
      }

      toast.success("Signup successful!");
      navigate("/");
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        referralCode: "",
      });
    } catch (signupFlowError) {
      setError(signupFlowError.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <Card
        title="Create Account"
        description="Start building your referral engine in minutes."
      >
        <form className="space-y-4" onSubmit={handleSignUp}>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            label="Full Name"
            placeholder="Laksh Sharma"
            required
          />
          <Input
            id="signup-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            label="Email"
            placeholder="you@company.com"
            required
          />
          <Input
            id="signup-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel"
            label="Phone"
            placeholder="+91 1234567890"
            required
          />
          <Input
            id="signup-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            label="Password"
            placeholder="••••••••"
            required
          />
          <Input
            id="referral-code"
            name="referralCode"
            value={formData.referralCode}
            onChange={handleChange}
            type="text"
            label="Referral Code"
            placeholder="Enter your referral code (optional)"
          />

          {error ? (
            <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-400">
              {error}
            </p>
          ) : null}

          {success ? (
            <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400">
              {success}
            </p>
          ) : null}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-slate-600 dark:text-neutral-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400"
          >
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}

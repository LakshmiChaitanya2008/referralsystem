import { Link } from "react-router";
import { useState } from "react";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import supabase from "../lib/supabase";

export default function SignUp() {
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

      let parentId = null;

      if (trimmedReferralCode) {
        const { data: parentProfile, error: parentError } = await supabase
          .from("profiles")
          .select("id")
          .eq("referral_code", trimmedReferralCode)
          .maybeSingle();

        if (parentError) {
          throw parentError;
        }

        if (!parentProfile?.id) {
          throw new Error("Referral code is invalid.");
        }

        parentId = parentProfile.id;
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

      setSuccess("Signup successful. Check your email to confirm your account.");
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
            <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </p>
          ) : null}

          {success ? (
            <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {success}
            </p>
          ) : null}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-700 hover:text-blue-800"
          >
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}

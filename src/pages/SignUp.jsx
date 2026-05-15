import { Link, useNavigate } from "react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import UserIdField from "../components/UserIdField";
import PhoneField, { isValidPhone } from "../components/PhoneField";
import supabase from "../lib/supabase";
import {
  USER_ID_PATTERN,
  authEmailFromUserId,
  buildUserId,
} from "../lib/userIdAuth";
import { isReferralLimitReached, referralLimitMessage } from "../lib/referralLimits";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    userIdDigits: "",
    phone: "",
    password: "",
    referralCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleUserIdDigitsChange(digits) {
    setFormData((prev) => ({ ...prev, userIdDigits: digits }));
  }

  function handlePhoneChange(phone) {
    setFormData((prev) => ({ ...prev, phone }));
  }

  async function handleSignUp(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const trimmedName = formData.name.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedReferralCode = formData.referralCode.trim();
    const userId = buildUserId(formData.userIdDigits);

    try {
      if (!USER_ID_PATTERN.test(userId)) {
        throw new Error(
          "User ID must start with MJ followed by exactly 9 digits (e.g. MJ123456789).",
        );
      }

      if (!isValidPhone(trimmedPhone)) {
        throw new Error("Phone number must be exactly 10 digits.");
      }

      const { data: existingUser, error: userIdLookupError } = await supabase
        .from("profiles")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

      if (userIdLookupError) throw userIdLookupError;

      if (existingUser) {
        throw new Error(
          "This user ID is already used by another account. Please choose a different one.",
        );
      }

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

        if (isReferralLimitReached(count)) {
          throw new Error(referralLimitMessage());
        }
      }

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: authEmailFromUserId(userId),
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
        user_id: userId,
        name: trimmedName,
        phone: trimmedPhone,
        referral_code: null,
        parent_id: parentId,
      });

      if (profileError) {
        if (profileError.code === "23505") {
          throw new Error(
            "This user ID is already used by another account. Please choose a different one.",
          );
        }
        throw profileError;
      }

      toast.success("Signup successful!");
      navigate("/");

      setFormData({
        name: "",
        userIdDigits: "",
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
          <UserIdField
            id="signup-user-id-digits"
            digits={formData.userIdDigits}
            onDigitsChange={handleUserIdDigitsChange}
          />
          <PhoneField
            id="signup-phone"
            value={formData.phone}
            onChange={handlePhoneChange}
          />
          <Input
            id="signup-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            label="Password"
            placeholder="••••••••"
            autoComplete="new-password"
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

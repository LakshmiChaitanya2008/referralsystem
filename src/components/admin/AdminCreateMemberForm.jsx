import { useState } from "react";
import toast from "react-hot-toast";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";
import UserIdField from "../UserIdField";
import PhoneField from "../PhoneField";
import { createMemberAsAdmin } from "../../lib/adminMemberService";

function MemberSelect({ label, value, onChange, profiles, placeholder }) {
  return (
    <div className="w-full space-y-2">
      <label className="text-sm font-medium text-slate-700 dark:text-neutral-300">{label}</label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.2)] dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-blue-500"
      >
        <option value="">{placeholder}</option>
        {profiles.map((profile) => (
          <option key={profile.id} value={profile.id}>
            {profile.name || profile.user_id} ({profile.user_id})
            {profile.referral_code ? ` · ${profile.referral_code}` : ""}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function AdminCreateMemberForm({ profiles, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    userIdDigits: "",
    phone: "",
    password: "",
    referrerId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await createMemberAsAdmin({
        name: form.name,
        userIdDigits: form.userIdDigits,
        phone: form.phone,
        password: form.password,
        referrerId: form.referrerId || null,
      });

      toast.success(`Member ${result.userId} created successfully.`);
      setForm({ name: "", userIdDigits: "", phone: "", password: "", referrerId: "" });
      onSuccess?.();
    } catch (err) {
      setError(err.message || "Could not create member.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card
      title="Create Member Account"
      description="Add a new member who can log in with User ID and password. Optionally link under a referrer now."
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Member name"
          required
        />
        <UserIdField
          id="admin-create-user-id"
          digits={form.userIdDigits}
          onDigitsChange={(digits) => setForm((prev) => ({ ...prev, userIdDigits: digits }))}
        />
        <PhoneField
          id="admin-create-phone"
          value={form.phone}
          onChange={(phone) => setForm((prev) => ({ ...prev, phone }))}
        />
        <Input
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          placeholder="Login password for member"
          autoComplete="new-password"
          required
        />
        <MemberSelect
          label="Link under referrer (optional)"
          value={form.referrerId}
          onChange={(referrerId) => setForm((prev) => ({ ...prev, referrerId }))}
          profiles={profiles}
          placeholder="No referrer — standalone member"
        />
        <p className="text-xs text-slate-500 dark:text-neutral-400">
          Each referrer can have at most 4 direct members (one parent, max 4 children).
        </p>

        {error ? (
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-400">
            {error}
          </p>
        ) : null}

        <Button type="submit" disabled={loading}>
          {loading ? "Creating member..." : "Create Member"}
        </Button>
      </form>
    </Card>
  );
}

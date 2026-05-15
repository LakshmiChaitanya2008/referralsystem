import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { linkMemberToReferrer } from "../../lib/adminMemberService";
import { countDirectReferrals } from "../../lib/memberReferral";
import { referralSlotsRemaining } from "../../lib/referralLimits";

function formatMemberOption(profile) {
  const label = profile.name || profile.user_id || "Member";
  const code = profile.referral_code ? ` · Code: ${profile.referral_code}` : "";
  return `${label} (${profile.user_id})${code}`;
}

export default function AdminLinkMemberForm({ profiles, onSuccess }) {
  const [referrerId, setReferrerId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const unlinkedMembers = useMemo(
    () => profiles.filter((profile) => !profile.parent_id),
    [profiles],
  );

  const referrers = useMemo(() => profiles, [profiles]);

  const selectedReferrer = profiles.find((profile) => profile.id === referrerId);
  const referrerSlotsLeft = selectedReferrer
    ? referralSlotsRemaining(countDirectReferrals(profiles, referrerId))
    : null;

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await linkMemberToReferrer({ memberId, referrerId, profiles });
      toast.success("Members linked successfully.");
      setReferrerId("");
      setMemberId("");
      onSuccess?.();
    } catch (err) {
      setError(err.message || "Could not link members.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card
      title="Link Members"
      description="Connect a member under a referrer when they could not use a referral code at signup."
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="w-full space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-neutral-300">
            Referrer (parent)
          </label>
          <select
            value={referrerId}
            onChange={(event) => setReferrerId(event.target.value)}
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.2)] dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
          >
            <option value="">Select referrer</option>
            {referrers.map((profile) => (
              <option key={profile.id} value={profile.id}>
                {formatMemberOption(profile)}
              </option>
            ))}
          </select>
          {referrerSlotsLeft !== null ? (
            <p className="text-xs text-slate-500 dark:text-neutral-400">
              {referrerSlotsLeft} referral slot(s) remaining under this member.
            </p>
          ) : null}
        </div>

        <div className="w-full space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-neutral-300">
            Member to link (child)
          </label>
          <select
            value={memberId}
            onChange={(event) => setMemberId(event.target.value)}
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.2)] dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
          >
            <option value="">Select member without a referrer</option>
            {unlinkedMembers.map((profile) => (
              <option key={profile.id} value={profile.id} disabled={profile.id === referrerId}>
                {formatMemberOption(profile)}
              </option>
            ))}
          </select>
          {unlinkedMembers.length === 0 ? (
            <p className="text-xs text-amber-600 dark:text-amber-400">
              All members already have a referrer. Create a new standalone member first.
            </p>
          ) : null}
        </div>

        {error ? (
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-400">
            {error}
          </p>
        ) : null}

        <Button type="submit" disabled={loading || unlinkedMembers.length === 0}>
          {loading ? "Linking..." : "Link Members"}
        </Button>
      </form>
    </Card>
  );
}

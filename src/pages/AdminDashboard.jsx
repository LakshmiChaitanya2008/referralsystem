import { useCallback, useEffect, useMemo, useState } from "react";
import Card from "../components/ui/Card";
import { ReferralTreePanel } from "../components/ReferralTreeView";
import StandaloneMemberCard from "../components/StandaloneMemberCard";
import AdminCreateMemberForm from "../components/admin/AdminCreateMemberForm";
import AdminLinkMemberForm from "../components/admin/AdminLinkMemberForm";
import supabase from "../lib/supabase";
import { filterMemberProfiles, getAdminAuthUserId } from "../lib/memberProfile";
import { buildReferralForest, getStandaloneProfiles } from "../lib/referralTree";

function StatCard({ label, value, hint }) {
  return (
    <div className="rounded-xl border border-slate-200/60 bg-white/70 p-5 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
      <p className="text-sm text-slate-500 dark:text-neutral-400">{label}</p>
      <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-400 dark:text-neutral-500">{hint}</p> : null}
    </div>
  );
}

function Skeleton({ className }) {
  return <div className={`animate-pulse rounded-md bg-slate-200 dark:bg-neutral-800 ${className}`} />;
}

export default function AdminDashboard() {
  const [profiles, setProfiles] = useState([]);
  const [adminAuthUserId, setAdminAuthUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProfiles = useCallback(async (silent = false) => {
    if (!silent) {
      setLoading(true);
    }
    setError("");

    const [{ data, error: fetchError }, { data: authData }] = await Promise.all([
      supabase
        .from("profiles")
        .select("id, name, user_id, phone, referral_code, parent_id")
        .order("name", { ascending: true }),
      supabase.auth.getUser(),
    ]);

    setAdminAuthUserId(getAdminAuthUserId(authData?.user));

    if (fetchError) {
      setError(fetchError.message || "Could not load members.");
      if (!silent) {
        setProfiles([]);
      }
    } else {
      setProfiles(data || []);
    }

    if (!silent) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  const members = useMemo(
    () => filterMemberProfiles(profiles, { adminAuthUserId }),
    [profiles, adminAuthUserId],
  );

  const forest = useMemo(() => buildReferralForest(members), [members]);
  const standaloneMembers = useMemo(() => getStandaloneProfiles(members), [members]);

  const stats = useMemo(() => {
    const total = members.length;
    const referred = members.filter((p) => p.parent_id).length;
    const inTrees = members.length - standaloneMembers.length;

    return {
      total,
      referred,
      standalone: standaloneMembers.length,
      connectedTrees: forest.length,
      inTrees,
    };
  }, [members, forest, standaloneMembers]);

  const profileById = useMemo(
    () => new Map(members.map((profile) => [profile.id, profile])),
    [members],
  );

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-28 !rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-96 !rounded-xl" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-slate-600 dark:text-neutral-400">
          Create members, link referrals manually, and view the full network.
        </p>
      </div>

      {error ? (
        <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-400">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Members" value={stats.total} hint="Registered users only" />
        <StatCard label="In Networks" value={stats.inTrees} hint="Connected in a referral tree" />
        <StatCard label="Individuals" value={stats.standalone} hint="No referrer and no referrals" />
        <StatCard label="Referral Trees" value={stats.connectedTrees} hint="Root networks with connections" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCreateMemberForm profiles={members} onSuccess={() => loadProfiles(true)} />
        <AdminLinkMemberForm profiles={members} onSuccess={() => loadProfiles(true)} />
      </div>

      <Card title="All Members" description={`${members.length} registered members.`}>
        <div className="overflow-x-auto rounded-xl border border-slate-200/60 dark:border-white/10">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50/80 text-xs uppercase tracking-wide text-slate-500 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-400">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">User ID</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Referral Code</th>
                <th className="px-4 py-3 font-medium">Referred By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-neutral-800">
              {members.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-slate-500 dark:text-neutral-400"
                  >
                    No members yet.
                  </td>
                </tr>
              ) : (
                members.map((profile) => {
                  const parent = profile.parent_id ? profileById.get(profile.parent_id) : null;

                  return (
                    <tr
                      key={profile.id}
                      className="bg-white/50 transition hover:bg-slate-50 dark:bg-transparent dark:hover:bg-white/5"
                    >
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                        {profile.name || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-neutral-300">
                        {profile.user_id || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-neutral-300">
                        {profile.phone || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-neutral-300">
                        {profile.referral_code || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-neutral-300">
                        {parent ? parent.name || parent.user_id : "—"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Card
        title="Individual Members"
        description="No referrer and no one joined under them — shown separately."
      >
        {standaloneMembers.length === 0 ? (
          <p className="text-sm text-slate-600 dark:text-neutral-400">
            No standalone members. Everyone is connected in a network.
          </p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {standaloneMembers.map((member) => (
              <StandaloneMemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </Card>

      <Card
        title="Referral Network Trees"
        description="Members connected through referrals (one parent, max 4 direct children per parent)."
      >
        {forest.length === 0 ? (
          <p className="text-sm text-slate-600 dark:text-neutral-400">
            No connected referral trees yet.
          </p>
        ) : (
          <div className="space-y-8">
            {forest.map((tree) => (
              <ReferralTreePanel key={tree.id} tree={tree} badgeLabel="Member" />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import supabase from "../lib/supabase";

function buildReferralTree(currentUserId, users) {
  if (!currentUserId || !users.length) {
    return null;
  }

  const userById = new Map(users.map((user) => [user.id, user]));

  function buildNode(userId, visited = new Set()) {
    if (visited.has(userId)) {
      return null;
    }

    const user = userById.get(userId);
    if (!user) {
      return null;
    }

    const nextVisited = new Set(visited);
    nextVisited.add(userId);

    const children = users
      .filter((candidate) => candidate.parent_id === userId)
      .map((child) => buildNode(child.id, nextVisited))
      .filter(Boolean)
      .slice(0, 2);

    return {
      ...user,
      children,
    };
  }

  return buildNode(currentUserId);
}

function formatEmailDisplay(email) {
  if (!email || !email.includes("@")) {
    return email || "No email";
  }

  const [localPart, domainPart] = email.split("@");
  if (localPart.length <= 12) {
    return email;
  }

  return `${localPart.slice(0, 12)}...@${domainPart}`;
}

function ReferralTreeNode({ node }) {
  if (!node) {
    return null;
  }

  const [leftChild, rightChild] = node.children || [];
  const hasTwoChildren = Boolean(leftChild && rightChild);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-full max-w-xs rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-md transition-transform duration-200 hover:scale-[1.03] hover:shadow-lg">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900">{node.name || node.email || "User"}</p>
            <p className="max-w-[170px] truncate overflow-hidden whitespace-nowrap text-xs text-slate-500">
              {formatEmailDisplay(node.email)}
            </p>
          </div>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
            User
          </span>
        </div>
      </div>

      {leftChild || rightChild ? (
        <div className="mt-4 flex w-full flex-col items-center gap-3">
          <div className="h-6 w-px bg-slate-300" />

          <div className="relative flex w-full max-w-3xl items-start justify-center gap-12">
            {hasTwoChildren ? (
              <div className="absolute left-1/4 right-1/4 top-0 h-px bg-slate-300" />
            ) : null}

            {[leftChild, rightChild].map((child, index) => (
              <div key={index} className="flex min-h-4 flex-1 flex-col items-center">
                {child ? <div className="h-4 w-px bg-slate-300" /> : null}
                {child ? <ReferralTreeNode node={child} /> : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function Profile() {
  const [userId, setUserId] = useState("");
  const [allProfiles, setAllProfiles] = useState([]);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    referral_code: "",
  });
  const [newReferralCode, setNewReferralCode] = useState("");
  const [referralError, setReferralError] = useState("");
  const [referralLoading, setReferralLoading] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user || !isMounted) {
        return;
      }
      setUserId(user.id);

      const { data: profile } = await supabase
        .from("profiles")
        .select("name, email, phone, referral_code")
        .eq("id", user.id)
        .maybeSingle();

      if (!isMounted) {
        return;
      }

      const { data: allUsers } = await supabase
        .from("profiles")
        .select("*");

      if (!isMounted) {
        return;
      }

      setAllProfiles(allUsers || []);

      setProfileData({
        name: profile?.name || user.user_metadata?.name || "User",
        email: profile?.email || user.email || "",
        phone: profile?.phone || "",
        referral_code: profile?.referral_code || "",
      });
    }

    loadProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  async function handleCreateCode() {
    const trimmedCode = newReferralCode.trim();
    if (!trimmedCode) {
      setReferralError("Please enter a referral code.");
      return;
    }

    setReferralError("");
    setReferralLoading(true);

    try {
      const normalizedCode = trimmedCode.toUpperCase();

      const { data: existingProfiles, error: existingError } = await supabase
        .from("profiles")
        .select("id")
        .eq("referral_code", normalizedCode)
        .neq("id", userId)
        .limit(1);

      if (existingError) {
        throw existingError;
      }

      if (existingProfiles?.length) {
        setReferralError("This referral code already exists. Try another one.");
        return;
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ referral_code: normalizedCode })
        .eq("id", userId);

      if (updateError) {
        throw updateError;
      }

      setProfileData((prev) => ({ ...prev, referral_code: normalizedCode }));
      setNewReferralCode("");
    } catch (createCodeError) {
      setReferralError(createCodeError.message || "Could not create referral code.");
    } finally {
      setReferralLoading(false);
    }
  }

  async function handleCopyCode() {
    if (!profileData.referral_code) {
      return;
    }

    await navigator.clipboard.writeText(profileData.referral_code);
    setCopyFeedback("Copied!");
    setTimeout(() => setCopyFeedback(""), 1500);
  }

  const initials = profileData.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  const referralTree = useMemo(() => buildReferralTree(userId, allProfiles), [userId, allProfiles]);

  const directReferrals = referralTree?.children?.length || 0;

  function countDescendants(node) {
    if (!node?.children?.length) {
      return 0;
    }

    return node.children.reduce((total, child) => total + 1 + countDescendants(child), 0);
  }

  const totalNetwork = countDescendants(referralTree);
  const secondLevelReferrals =
    referralTree?.children?.reduce((sum, child) => sum + (child.children?.length || 0), 0) || 0;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">Profile</h1>

      <Card title="User Info" description="Your account details and profile basics.">
        <div className="rounded-xl bg-slate-50 p-6 shadow-md">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-xl font-semibold text-white shadow-md">
                {initials || "U"}
              </div>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-slate-900">{profileData.name || "User"}</p>
                <p className="text-sm text-slate-500">{profileData.email || "-"}</p>
                <p className="text-sm text-slate-500">{profileData.phone || "-"}</p>
              </div>
            </div>
            <Button variant="secondary">Edit Profile</Button>
          </div>
        </div>
      </Card>

      <Card title="Referral Code" description="Share this code to grow your referral network.">
        {profileData.referral_code ? (
          <div className="flex flex-col gap-6 rounded-xl bg-slate-50 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Your code
              </p>
              <p className="mt-1 rounded-xl border border-blue-100 bg-white px-3 py-2 text-2xl font-bold tracking-wider text-blue-700 shadow-md">
                {profileData.referral_code}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="secondary" onClick={handleCopyCode}>
                Copy
              </Button>
              {copyFeedback ? <span className="text-sm text-emerald-600">{copyFeedback}</span> : null}
            </div>
          </div>
        ) : (
          <div className="space-y-4 rounded-xl bg-slate-50 p-6">
            <p className="text-sm text-slate-600">
              Create your referral code to start inviting people.
            </p>
            <div className="flex flex-col gap-3 md:flex-row">
              <input
                value={newReferralCode}
                onChange={(event) => setNewReferralCode(event.target.value)}
                placeholder="Enter referral code"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.2)]"
              />
              <Button onClick={handleCreateCode} disabled={referralLoading || !userId}>
                {referralLoading ? "Creating..." : "Create Code"}
              </Button>
            </div>
            {referralError ? (
              <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                {referralError}
              </p>
            ) : null}
          </div>
        )}
      </Card>

      <Card title="Network Tree" description="Snapshot of your direct and indirect referrals.">
        <p className="mb-4 text-sm text-slate-500">Total profiles fetched: {allProfiles.length}</p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-md">
            <p className="text-sm text-slate-500">Direct Referrals</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{directReferrals}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-md">
            <p className="text-sm text-slate-500">Second Level</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{secondLevelReferrals}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-md">
            <p className="text-sm text-slate-500">Total Network</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{totalNetwork}</p>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-4xl rounded-xl bg-slate-50 p-6">
          {referralTree ? (
            <ReferralTreeNode node={referralTree} />
          ) : (
            <p className="text-sm text-slate-600">No referral tree data available yet.</p>
          )}
        </div>
      </Card>
    </div>
  );
}

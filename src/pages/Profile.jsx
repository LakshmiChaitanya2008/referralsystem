import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
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

  const children = node.children || [];
  const hasTwoChildren = children.length === 2;

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-xs rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-5 py-4 shadow-md transition-transform duration-200 hover:scale-[1.03] hover:shadow-lg dark:shadow-none">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{node.name || node.email || "User"}</p>
            <p className="max-w-[170px] truncate overflow-hidden whitespace-nowrap text-xs text-slate-500 dark:text-neutral-400">
              {formatEmailDisplay(node.email)}
            </p>
          </div>
          <span className="rounded-full bg-blue-50 dark:bg-blue-900/50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:text-blue-400">
            User
          </span>
        </div>
      </div>

      {children.length > 0 ? (
        <div className="flex w-full flex-col items-center">
          <div className={`w-px bg-slate-300 dark:bg-neutral-700 ${hasTwoChildren ? "h-6" : "h-10"}`} />

          <div className="relative flex w-full min-w-max items-start justify-center">
            {children.map((child, index) => {
              const isLeftChild = index === 0;
              const isRightChild = index === 1;

              return (
                <div key={index} className="relative flex min-h-4 flex-1 flex-col items-center px-2 sm:px-4">
                  {hasTwoChildren && isLeftChild ? (
                    <div className="absolute top-0 right-0 left-1/2 h-px bg-slate-300 dark:bg-neutral-700" />
                  ) : null}
                  {hasTwoChildren && isRightChild ? (
                    <div className="absolute top-0 left-0 right-1/2 h-px bg-slate-300 dark:bg-neutral-700" />
                  ) : null}

                  {hasTwoChildren ? (
                    <div className="h-4 w-px bg-slate-300 dark:bg-neutral-700" />
                  ) : null}
                  <ReferralTreeNode node={child} />
                </div>
              );
            })}
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

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ name: "", phone: "" });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  function openEditModal() {
    setEditFormData({
      name: profileData.name || "",
      phone: profileData.phone || "",
    });
    setEditError("");
    setIsEditModalOpen(true);
  }

  async function handleUpdateProfile(event) {
    event.preventDefault();
    setEditError("");
    setEditLoading(true);

    try {
      const trimmedName = editFormData.name.trim();
      const trimmedPhone = editFormData.phone.trim();

      const { error } = await supabase
        .from("profiles")
        .update({ name: trimmedName, phone: trimmedPhone })
        .eq("id", userId);

      if (error) {
        throw error;
      }

      setProfileData((prev) => ({
        ...prev,
        name: trimmedName,
        phone: trimmedPhone,
      }));
      
      toast.success("Profile updated successfully!");
      setIsEditModalOpen(false);
    } catch (err) {
      setEditError(err.message || "Failed to update profile.");
    } finally {
      setEditLoading(false);
    }
  }

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
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Profile</h1>

      <Card title="User Info" description="Your account details and profile basics.">
        <div className="rounded-xl bg-slate-50 dark:bg-neutral-900 p-6 shadow-md dark:shadow-none dark:border dark:border-neutral-800">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-xl font-semibold text-white shadow-md">
                {initials || "U"}
              </div>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-slate-900 dark:text-white">{profileData.name || "User"}</p>
                <p className="text-sm text-slate-500 dark:text-neutral-400">{profileData.email || "-"}</p>
                <p className="text-sm text-slate-500 dark:text-neutral-400">{profileData.phone || "-"}</p>
              </div>
            </div>
            <Button variant="secondary" onClick={openEditModal}>Edit Profile</Button>
          </div>
        </div>
      </Card>

      <Card title="Referral Code" description="Share this code to grow your referral network.">
        {profileData.referral_code ? (
          <div className="flex flex-col gap-6 rounded-xl bg-slate-50 dark:bg-neutral-900 p-6 md:flex-row md:items-center md:justify-between dark:border dark:border-neutral-800">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-neutral-400">
                Your code
              </p>
              <p className="mt-1 rounded-xl border border-blue-100 dark:border-blue-900/50 bg-white dark:bg-neutral-950 px-3 py-2 text-2xl font-bold tracking-wider text-blue-700 dark:text-blue-400 shadow-md dark:shadow-none">
                {profileData.referral_code}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="secondary" onClick={handleCopyCode}>
                Copy
              </Button>
              {copyFeedback ? <span className="text-sm text-emerald-600 dark:text-emerald-400">{copyFeedback}</span> : null}
            </div>
          </div>
        ) : (
          <div className="space-y-4 rounded-xl bg-slate-50 dark:bg-neutral-900 p-6 dark:border dark:border-neutral-800">
            <p className="text-sm text-slate-600 dark:text-neutral-400">
              Create your referral code to start inviting people.
            </p>
            <div className="flex flex-col gap-3 md:flex-row">
              <input
                value={newReferralCode}
                onChange={(event) => setNewReferralCode(event.target.value)}
                placeholder="Enter referral code"
                className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:border-blue-500 dark:focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.2)] dark:focus:shadow-[0_0_0_3px_rgba(59,130,246,0.3)]"
              />
              <Button onClick={handleCreateCode} disabled={referralLoading || !userId}>
                {referralLoading ? "Creating..." : "Create Code"}
              </Button>
            </div>
            {referralError ? (
              <p className="rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/50 px-3 py-2 text-sm text-rose-700 dark:text-rose-400">
                {referralError}
              </p>
            ) : null}
          </div>
        )}
      </Card>

      <Card title="Network Tree" description="Snapshot of your direct and indirect referrals.">
        <p className="mb-4 text-sm text-slate-500 dark:text-neutral-400">Total profiles fetched: {allProfiles.length}</p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 shadow-md dark:shadow-none">
            <p className="text-sm text-slate-500 dark:text-neutral-400">Direct Referrals</p>
            <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{directReferrals}</p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 shadow-md dark:shadow-none">
            <p className="text-sm text-slate-500 dark:text-neutral-400">Second Level</p>
            <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{secondLevelReferrals}</p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 shadow-md dark:shadow-none">
            <p className="text-sm text-slate-500 dark:text-neutral-400">Total Network</p>
            <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{totalNetwork}</p>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-4xl rounded-xl bg-slate-50 dark:bg-neutral-900 dark:border dark:border-neutral-800 p-6 overflow-auto">
          {referralTree ? (
            <ReferralTreeNode node={referralTree} />
          ) : (
            <p className="text-sm text-slate-600 dark:text-neutral-400">No referral tree data available yet.</p>
          )}
        </div>
      </Card>

      {isEditModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm dark:bg-neutral-950/80">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 p-6 shadow-2xl dark:border dark:border-neutral-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Edit Profile</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <Input
                label="Full Name"
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                value={editFormData.phone}
                onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
              />
              
              {editError ? (
                <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-400">
                  {editError}
                </p>
              ) : null}

              <div className="mt-6 flex justify-end gap-3">
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={editLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={editLoading}>
                  {editLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

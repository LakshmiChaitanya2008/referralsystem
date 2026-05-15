import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuthSession from "../hooks/useAuthSession";
import { isAdminUser } from "../lib/adminAuth";

export default function AdminRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, ready } = useAuthSession();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!ready) {
      return;
    }

    if (!session) {
      const redirect = encodeURIComponent(location.pathname);
      toast.error("Please sign in as admin.");
      navigate(`/admin/login?redirect=${redirect}`, { replace: true });
      return;
    }

    if (!isAdminUser(session.user)) {
      toast.error("Admin access only.");
      navigate("/", { replace: true });
      return;
    }

    setAuthorized(true);
  }, [ready, session, navigate, location.pathname]);

  if (!ready || !authorized) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-slate-500 dark:text-neutral-400">Loading admin dashboard...</p>
      </div>
    );
  }

  return children;
}

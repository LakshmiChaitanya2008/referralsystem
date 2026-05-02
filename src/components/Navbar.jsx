import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "./ui/Button";
import supabase from "../lib/supabase";

const navItems = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadCurrentUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!isMounted) {
        return;
      }

      if (!user) {
        setIsLoggedIn(false);
        setUserName("");
        return;
      }

      setIsLoggedIn(true);

      const { data: profile } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", user.id)
        .maybeSingle();

      const resolvedName =
        profile?.name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "User";
      setUserName(resolvedName);
    }

    loadCurrentUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      loadCurrentUser();
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const initials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  async function handleLogout() {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    setIsLoggingOut(false);
    navigate("/login");
  }

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="text-lg font-bold tracking-tight text-slate-900"
          >
            LocalBazaar
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link to="/profile" className="group">
                  <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-2 py-1.5 shadow-sm transition-shadow group-hover:shadow-md">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-xs font-semibold text-white">
                      {initials || "U"}
                    </div>
                    <span className="pr-2 text-sm font-semibold text-slate-800">{userName}</span>
                  </div>
                </Link>
                <Button
                  variant="secondary"
                  className="px-3 py-2"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </Button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden text-sm font-medium text-slate-700 md:block"
                >
                  Login
                </Link>
                <Link to="/signup">
                  <Button className="px-4 py-2">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}

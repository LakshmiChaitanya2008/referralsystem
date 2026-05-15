import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "./ui/Button";
import supabase from "../lib/supabase";
import { useTheme } from "../context/ThemeContext";
import useIsAdmin from "../hooks/useIsAdmin";
import { isAdminUser } from "../lib/adminAuth";

const navItems = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Services", to: "/services" },
  { name: "Branches", to: "/branch" },
  { name: "Contact", to: "/contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isAdmin } = useIsAdmin();

  useEffect(() => {
    let isMounted = true;

    async function loadCurrentUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!isMounted) return;

      if (!user) {
        setIsLoggedIn(false);
        setUserName("");
        return;
      }

      setIsLoggedIn(true);

      if (isAdminUser(user)) {
        setUserName("Admin");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("name, user_id")
        .eq("id", user.id)
        .maybeSingle();

      const resolvedName =
        profile?.name || user.user_metadata?.name || profile?.user_id || "User";

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
    navigate(isAdmin ? "/admin/login" : "/login");
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/50 dark:border-white/[0.06] bg-white/60 dark:bg-neutral-950/60 backdrop-blur-xl py-4">
      <nav className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
        <div className="flex flex-1 justify-start">
          <Link to="/" className="flex items-center gap-2.5 transition hover:opacity-80">
            <img
              src="/logo.jpeg"
              alt="Mj Chits Logo"
              className="h-11 w-11 rounded-full border border-slate-100 object-cover dark:border-neutral-800"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
                Mj Chits
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                Private Limited
              </span>
            </div>
          </Link>
        </div>

        <div className="hidden flex-1 justify-center md:flex">
          <div className="flex items-center gap-1.5 rounded-full border border-slate-100/60 bg-slate-50 p-1.5 shadow-sm dark:border-neutral-800/60 dark:bg-neutral-900">
            {!isAdmin &&
              navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-1.5 text-[15px] font-medium transition-all ${
                      isActive
                        ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/50 dark:bg-neutral-800 dark:text-white dark:ring-neutral-700/50"
                        : "text-slate-500 hover:bg-slate-100/50 hover:text-slate-900 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-white"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            {isLoggedIn && isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `rounded-full px-4 py-1.5 text-[15px] font-medium transition-all ${
                    isActive
                      ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/50 dark:bg-neutral-800 dark:text-white dark:ring-neutral-700/50"
                      : "text-slate-500 hover:bg-slate-100/50 hover:text-slate-900 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-white"
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}
            {isLoggedIn && !isAdmin && (
              <NavLink
                to="/community"
                className={({ isActive }) =>
                  `rounded-full px-4 py-1.5 text-[15px] font-medium transition-all ${
                    isActive
                      ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/50 dark:bg-neutral-800 dark:text-white dark:ring-neutral-700/50"
                      : "text-slate-500 hover:bg-slate-100/50 hover:text-slate-900 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-white"
                  }`
                }
              >
                Community
              </NavLink>
            )}
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-5">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            )}
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              {isAdmin ? (
                <Link
                  to="/admin"
                  className="hidden text-[15px] font-medium text-slate-600 hover:text-slate-900 dark:text-neutral-300 dark:hover:text-white md:block"
                >
                  Admin Panel
                </Link>
              ) : (
                <Link
                  to="/profile"
                  className="hidden text-[15px] font-medium text-slate-600 hover:text-slate-900 dark:text-neutral-300 dark:hover:text-white md:block"
                >
                  My Profile
                </Link>
              )}
              <div className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs font-medium text-white dark:bg-neutral-700">
                  {initials || "U"}
                </div>
                <span className="text-[15px] font-medium text-slate-700 dark:text-neutral-200">
                  {userName}
                </span>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="ml-1 rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-red-500 dark:text-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-red-400"
                  title="Logout"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden text-[15px] font-medium text-slate-500 transition hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white md:block"
              >
                Member login
              </Link>
              <Link
                to="/admin/login"
                className="hidden text-[15px] font-medium text-slate-500 transition hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white md:block"
              >
                Admin
              </Link>
              <Link to="/signup">
                <Button className="!rounded-lg !px-4 !py-2 !text-[15px] !shadow-none">Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-neutral-100 transition-colors duration-200">
      <div className="pointer-events-none fixed inset-0 z-0 hidden dark:block overflow-hidden">
        <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-500/8 blur-3xl" />
      </div>
      <Navbar />
      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 py-10">
        <Outlet />
      </main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--toast-bg, #fff)',
            color: 'var(--toast-color, #333)',
          },
          className: 'dark:!bg-neutral-900 dark:!text-white dark:!border dark:!border-neutral-800'
        }}
      />
    </div>
  );
}

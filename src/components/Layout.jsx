import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-neutral-950 dark:text-neutral-50 transition-colors duration-200">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
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

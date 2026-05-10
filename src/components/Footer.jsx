import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-white/[0.06] bg-white dark:bg-neutral-950 mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-3.5 transition hover:opacity-80">
              <img src="/logo.jpeg" alt="Mj Chits Logo" className="h-14 w-14 rounded-full object-cover border border-slate-100 dark:border-neutral-800" />
              <div className="flex flex-col">
                <span className="text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
                  Mj Chits
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-neutral-400">
                  Private Limited
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-slate-500 dark:text-neutral-400 max-w-xs leading-relaxed">
              Mj Chits provides structured chit groups, transparent auctions, digital receipts, branch support, and customer-first servicing for community savings.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm">Company</h3>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-neutral-400">
              <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">About</Link></li>
              <li><Link to="/services" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Services</Link></li>
              <li><Link to="/branch" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Branches</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm">Support</h3>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-neutral-400">
              <li><Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Customer help</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Agent support</Link></li>
              <li><Link to="/branch" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Visit branch</Link></li>
              <li><a href="mailto:mjchitspvltd@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Email desk</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm">Legal</h3>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-neutral-400">
              <li><span className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer">Terms</span></li>
              <li><span className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer">Refund & Cancellation</span></li>
              <li><span className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer">Legal Notices</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-neutral-400">
            © 2026 Mj Chits Private Limited. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 dark:text-neutral-400">
            Hyderabad, Telangana, India
          </p>
        </div>
      </div>
    </footer>
  );
}

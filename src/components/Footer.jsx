import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-white/[0.06] bg-white dark:bg-neutral-950 mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              MjChits
            </Link>
            <p className="mt-4 text-sm text-slate-500 dark:text-neutral-400 max-w-xs leading-relaxed">
              MjChits provides structured chit groups, transparent auctions, digital receipts, branch support, and customer-first servicing for community savings.
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
            © 2026 MjChits Pvt Ltd. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 dark:text-neutral-400">
            Hyderabad, Telangana, India
          </p>
        </div>
      </div>
    </footer>
  );
}

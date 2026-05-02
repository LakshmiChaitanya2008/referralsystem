import { Link } from "react-router";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const metrics = [
  { value: "2.4K", label: "Local Sellers" },
  { value: "5.8K", label: "Products Listed" },
  { value: "1.1K", label: "Active Connections" },
];

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-10 text-white shadow-xl dark:from-neutral-900 dark:to-neutral-950 dark:border dark:border-neutral-800">
        {/* subtle glow */}
        <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl dark:bg-white/5"></div>

        <p className="text-sm font-semibold uppercase tracking-wide text-blue-100 dark:text-neutral-400">
          LocalBazaar
        </p>

        <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight md:text-5xl dark:text-white">
          Discover local sellers and grow your trusted network.
        </h1>

        <p className="mt-4 max-w-2xl text-base text-blue-100 md:text-lg dark:text-neutral-300">
          Connect with nearby vendors, invite others to join, and build a
          community-driven marketplace powered by trust.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/signup">
            <Button className="bg-white text-blue-700 hover:bg-blue-100 dark:bg-white dark:text-white dark:hover:bg-neutral-200 transition-all duration-200 shadow-md">
              Explore Marketplace
            </Button>
          </Link>

          <Link to="/dashboard">
            <Button
              variant="secondary"
              className="border-white/40 bg-white/10 text-white hover:bg-white/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-all duration-200"
            >
              View My Network
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {metrics.map((metric) => (
          <Card
            key={metric.label}
            className="hover:shadow-lg transition-all duration-200"
          >
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{metric.value}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-neutral-400">{metric.label}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}

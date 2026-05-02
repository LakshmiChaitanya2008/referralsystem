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
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-10 text-white shadow-xl">
        {/* subtle glow */}
        <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl"></div>

        <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">
          LocalBazaar
        </p>

        <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
          Discover local sellers and grow your trusted network.
        </h1>

        <p className="mt-4 max-w-2xl text-base text-blue-100 md:text-lg">
          Connect with nearby vendors, invite others to join, and build a
          community-driven marketplace powered by trust.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/signup">
            <Button className="bg-white text-blue-700 hover:bg-blue-100 transition-all duration-200 shadow-md">
              Explore Marketplace
            </Button>
          </Link>

          <Link to="/dashboard">
            <Button
              variant="secondary"
              className="border-white/40 bg-white/10 text-white hover:bg-white/20 transition-all duration-200"
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
            <p className="text-3xl font-bold text-slate-900">{metric.value}</p>
            <p className="mt-1 text-sm text-slate-600">{metric.label}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
